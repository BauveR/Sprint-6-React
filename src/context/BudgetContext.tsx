import { createContext, useContext, ReactNode, useState } from 'react';
import { ServiceOptions, SelectedService } from '../utils/types';

interface BudgetContextType {
    selectedServices: SelectedService[];
    toggleService: (service: ServiceOptions) => void;
    updateServiceDetails: (code: string, details: { pages?: number; languages?: number }) => void;
    total: number;
    applyAnnualDiscount: () => number; // Nueva función
    resetDiscount: () => void; // Nueva función
    discountedTotal: number | null; // Nuevo estado
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

    const toggleService = (service: ServiceOptions) => {
        setSelectedServices(prev => {
            const isAlreadySelected = prev.some(s => s.code === service.code);
            if (isAlreadySelected) {
                return prev.filter(s => s.code !== service.code);
            } else {
                if (service.code === 'web') {
                    return [...prev, { ...service, pages: 1, languages: 1 }];
                }
                return [...prev, service];
            }
        });
        // Resetear descuento al cambiar servicios
        setDiscountedTotal(null);
    };

    const updateServiceDetails = (code: string, details: { pages?: number; languages?: number }) => {
        setSelectedServices(prev =>
            prev.map(service =>
                service.code === code ? { ...service, ...details } : service
            )
        );
        // Resetear descuento al cambiar detalles
        setDiscountedTotal(null);
    };

    const calculateTotal = () => {
        return selectedServices.reduce((sum, service) => {
            let serviceTotal = service.price;
            if (service.pages) serviceTotal += (service.pages - 1) * 30;
            if (service.languages) serviceTotal += (service.languages - 1) * 30;
            return sum + serviceTotal;
        }, 0);
    };

    const total = calculateTotal();

    const applyAnnualDiscount = () => {
        const newDiscountedTotal = total * 0.8; // 20% de descuento
        setDiscountedTotal(newDiscountedTotal);
        return newDiscountedTotal;
    };

    const resetDiscount = () => {
        setDiscountedTotal(null);
    };

    return (
        <BudgetContext.Provider value={{ 
            selectedServices, 
            toggleService, 
            updateServiceDetails, 
            total,
            applyAnnualDiscount,
            resetDiscount,
            discountedTotal
        }}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (context === undefined) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context;
};