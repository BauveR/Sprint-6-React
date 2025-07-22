import { createContext, useContext, ReactNode, useState } from 'react';
import { ServiceOptions, SelectedService } from '../utils/types';

interface BudgetContextType {
    selectedServices: SelectedService[];
    toggleService: (service: ServiceOptions) => void;
    updateServiceDetails: (code: string, details: { pages?: number; languages?: number }) => void;
    total: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

    const toggleService = (service: ServiceOptions) => {
        setSelectedServices(prev => {
            const isAlreadySelected = prev.some(s => s.code === service.code);
            if (isAlreadySelected) {
                return prev.filter(s => s.code !== service.code);
            } else {
                // Para el servicio web, añadir con valores por defecto
                if (service.code === 'web') {
                    return [...prev, { ...service, pages: 1, languages: 1 }];
                }
                return [...prev, service];
            }
        });
    };

    const updateServiceDetails = (code: string, details: { pages?: number; languages?: number }) => {
        setSelectedServices(prev =>
            prev.map(service =>
                service.code === code ? { ...service, ...details } : service
            )
        );
    };

    const total = selectedServices.reduce((sum, service) => {
        let serviceTotal = service.price;
        if (service.pages) serviceTotal += (service.pages - 1) * 30;
        if (service.languages) serviceTotal += (service.languages - 1) * 30;
        return sum + serviceTotal;
    }, 0);

    return (
        <BudgetContext.Provider value={{ selectedServices, toggleService, updateServiceDetails, total }}>
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