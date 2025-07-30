 
import { createContext, ReactNode, useContext } from 'react';
import { useServiceSelection } from '../hooks/useServiceSelection';
import { useBudgetManager } from '../hooks/useBudgetManager';
import { useDiscount } from '../hooks/useDiscount';
import { BudgetContextType } from '../types/types';

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const serviceSelection = useServiceSelection();
  const budgetManager = useBudgetManager(serviceSelection.selectedServices);
  const discountLogic = useDiscount(serviceSelection.selectedServices);

  const contextValue: BudgetContextType = {
    ...serviceSelection,
    ...budgetManager,
    ...discountLogic,
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('useBudget must be used within BudgetProvider');
  return context;
};
