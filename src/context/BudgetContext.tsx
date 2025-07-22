import { createContext, useContext, ReactNode, useState } from 'react';
import { ServiceOptions, SelectedService } from '../utils/types';

interface BudgetContextType {
    selectedServices: SelectedService[];
    toggleService: (service: ServiceOptions) => void;
    updateServiceDetails: (code: string, details: { pages?: number; languages?: number }) => void;
    total: number;
    applyAnnualDiscount: () => number;
    ordenarPorNombre: () => void;
    orderByDate: () => void;
    resetDiscount: () => void;
    filterBudgets: (term: string) => void;
    discountedTotal: number | null;
    orderedBy: string,
    savedBudgets: Array<{
        customerInfo: {
            name: string;
            email: string;
            phone: string;
        };
        services: SelectedService[];
        total: number;
        discountedTotal: number | null;
        date: Date;
    }>;
    savedFilteredBudgets: Array<{
        customerInfo: {
            name: string;
            email: string;
            phone: string;
        };
        services: SelectedService[];
        total: number;
        discountedTotal: number | null;
        date: Date;
    }>;
    saveBudget: (customerInfo: { name: string; email: string; phone: string }) => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
    const [savedBudgets, setSavedBudgets] = useState<BudgetContextType['savedBudgets']>([]);
    const [savedFilteredBudgets, setSavedFilteredBudgets] = useState<BudgetContextType['savedFilteredBudgets']>([]);
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ orderedBy, setOrderedBy ] =  useState<string>('');

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
            date: new Date(),
        };      

        const updatedBudgets = [newBudget, ...savedBudgets];
        const updatedFilteredBudgets = searchTerm === '' || customerInfo.name.includes(searchTerm.toLowerCase())
          ? [newBudget, ...savedFilteredBudgets]
          : savedFilteredBudgets;
      
        
        if (orderedBy === 'NAME') {
          updatedBudgets.sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name));
          updatedFilteredBudgets.sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name));
        } 
        if (orderedBy === 'DATE') {
          updatedBudgets.sort((a, b) => a.date.getTime() - b.date.getTime());
          updatedFilteredBudgets.sort((a, b) => a.date.getTime() - b.date.getTime());
        }
      
        setSavedBudgets(updatedBudgets);
        setSavedFilteredBudgets(updatedFilteredBudgets);
      };

    const ordenarPorNombre = () => {
        const sortedBudgets = [...savedBudgets].sort((a, b) => 
            a.customerInfo.name.localeCompare(b.customerInfo.name)
          );
          setSavedBudgets(sortedBudgets);
        
          const sortedFilteredBudgets = [...savedFilteredBudgets].sort((a, b) => 
            a.customerInfo.name.localeCompare(b.customerInfo.name)
          );
          setSavedFilteredBudgets(sortedFilteredBudgets);
        
        setOrderedBy('NAME');
    };

    const orderByDate = () => {
        const sortedBudgets = [...savedBudgets].sort((a, b) => 
            a.date.getTime() - b.date.getTime()
          );
          setSavedBudgets(sortedBudgets);
        
          const sortedFilteredBudgets = [...savedFilteredBudgets].sort((a, b) => 
            a.date.getTime() - b.date.getTime()
          );
          setSavedFilteredBudgets(sortedFilteredBudgets);
        
          setOrderedBy('DATE');
    }    

    const filterBudgets = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        if (searchTerm === '') {
            setSavedFilteredBudgets([...savedBudgets]);
            return;
        }
        const lowerCaseTerm = searchTerm.toLowerCase();
        const filteredBudgets = savedBudgets.filter(budget => 
            budget.customerInfo.name.toLowerCase().includes(lowerCaseTerm)
        );
        setSavedFilteredBudgets(filteredBudgets);
    }

    return (
        <BudgetContext.Provider value={{ 
            selectedServices, 
            toggleService, 
            updateServiceDetails, 
            total,
            applyAnnualDiscount,
            ordenarPorNombre,
            orderByDate,
            resetDiscount,
            discountedTotal,
            savedBudgets,
            savedFilteredBudgets,
            saveBudget,
            filterBudgets,
            orderedBy
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