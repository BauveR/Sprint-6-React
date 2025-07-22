import { createContext, useContext, ReactNode, useState } from 'react';
import { ServiceOptions } from '../utils/types';

interface BudgetContextType {
    selectedServices: ServiceOptions[];
    toggleService: (service: ServiceOptions) => void;
    total: number;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

interface BudgetProviderProps {
    children: ReactNode;
}

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
    const [selectedServices, setSelectedServices] = useState<ServiceOptions[]>([]);

    const toggleService = (service: ServiceOptions) => {
        setSelectedServices(prev => {
            const isAlreadySelected = prev.some(s => s.code === service.code);
            return isAlreadySelected
                ? prev.filter(s => s.code !== service.code)
                : [...prev, service];
        });
    };

    const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

    const value = {
        selectedServices,
        toggleService,
        total
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);
    if (!context) {
        throw new Error('useBudget debe usarse dentro de un BudgetProvider');
    }
    return context;
};