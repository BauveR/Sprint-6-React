import { createContext, useContext, ReactNode, useState } from 'react';
import { ServiceOptions, SelectedService } from '../utils/types';

interface BudgetContextType {
    selectedServices: SelectedService[];
    toggleService: (service: ServiceOptions) => void;
    updateServiceDetails: (code: string, details: { pages?: number; languages?: number }) => void;
    total: number;
    applyAnnualDiscount: () => number;
    resetDiscount: () => void;
    discountedTotal: number | null;
    savedBudgets: Array<{
        customerInfo: {
            name: string;
            email: string;
            phone: string;
        };
        services: SelectedService[];
        total: number;
        discountedTotal: number | null;
        date: string;
    }>;
    saveBudget: (customerInfo: { name: string; email: string; phone: string }) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
    const [savedBudgets, setSavedBudgets] = useState<BudgetContextType['savedBudgets']>([]);

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
        setDiscountedTotal(null);
    };

    const updateServiceDetails = (code: string, details: { pages?: number; languages?: number }) => {
        setSelectedServices(prev =>
            prev.map(service =>
                service.code === code ? { ...service, ...details } : service
            )
        );
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
        const newDiscountedTotal = total * 0.8;
        setDiscountedTotal(newDiscountedTotal);
        return newDiscountedTotal;
    };

    const resetDiscount = () => {
        setDiscountedTotal(null);
    };

    const saveBudget = (customerInfo: { name: string; email: string; phone: string }) => {
        const newBudget = {
            customerInfo,
            services: [...selectedServices],
            total,
            discountedTotal,
            date: new Date().toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        setSavedBudgets(prev => [newBudget, ...prev]);
    };

    return (
        <BudgetContext.Provider value={{ 
            selectedServices, 
            toggleService, 
            updateServiceDetails, 
            total,
            applyAnnualDiscount,
            resetDiscount,
            discountedTotal,
            savedBudgets,
            saveBudget
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