// src/hooks/useBudgetManager.ts
import { useState, useMemo } from "react";
import { SelectedService, Budget } from "../types/types";

export const useBudgetManager = (selectedServices: SelectedService[]) => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderedBy, setOrderedBy] = useState<'NAME' | 'DATE' | ''>('');

  const saveBudget = (
    customerInfo: Budget['customerInfo'],
    discountedTotalFromHook: number | null
  ) => {
    const total = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const newBudget: Budget = {
      customerInfo,
      services: [...selectedServices],
      total,
      discountedTotal: discountedTotalFromHook,
      date: new Date(),
    };
    setBudgets(prev => [newBudget, ...prev]);
  };

  const filterBudgets = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const ordenarPorNombre = () => {
    setOrderedBy('NAME');
  };

  const orderByDate = () => {
    setOrderedBy('DATE');
  };

  const savedFilteredBudgets = useMemo(() => {
    let filtered = [...budgets];
    if (searchTerm !== '') {
      filtered = filtered.filter(b =>
        b.customerInfo.name.toLowerCase().includes(searchTerm)
      );
    }

    if (orderedBy === 'NAME') {
      filtered.sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name));
    } else if (orderedBy === 'DATE') {
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    return filtered;
  }, [budgets, searchTerm, orderedBy]);

  return {
    saveBudget,
    ordenarPorNombre,
    orderByDate,
    filterBudgets,
    savedBudgets: budgets,
    savedFilteredBudgets,
    orderedBy,
  };
};
