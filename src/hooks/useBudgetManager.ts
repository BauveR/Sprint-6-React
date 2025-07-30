import { useState } from "react";
import { SelectedService, Budget } from "../types/types";


export const useBudgetManager = (selectedServices: SelectedService[]) => {
  const [savedBudgets, setSavedBudgets] = useState<Budget[]>([]);
  const [savedFilteredBudgets, setSavedFilteredBudgets] = useState<Budget[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderedBy, setOrderedBy] = useState('');

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
  
    const updatedBudgets = [newBudget, ...savedBudgets];
  
    let filtered: Budget[];
    if (searchTerm === '') {
      filtered = [...updatedBudgets];
    } else {
      filtered = updatedBudgets.filter(b =>
        b.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (orderedBy === 'NAME') {
      updatedBudgets.sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name));
      filtered.sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name));
    }
  
    if (orderedBy === 'DATE') {
      updatedBudgets.sort((a, b) => b.date.getTime() - a.date.getTime());
      filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
    }
  
    setSavedBudgets(updatedBudgets);
    setSavedFilteredBudgets(filtered);
  };
  

  const ordenarPorNombre = () => {
    setSavedBudgets(prev => [...prev].sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name)));
    setSavedFilteredBudgets(prev => [...prev].sort((a, b) => a.customerInfo.name.localeCompare(b.customerInfo.name)));
    setOrderedBy('NAME');
  };

  const orderByDate = () => {
    setSavedBudgets(prev => [...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    setSavedFilteredBudgets(prev => [...prev].sort((a, b) => b.date.getTime() - a.date.getTime()));
    setOrderedBy('DATE');
  };

  const filterBudgets = (term: string) => {
    setSearchTerm(term);
    if (term === '') {
      setSavedFilteredBudgets([...savedBudgets]);
      return;
    }
    setSavedFilteredBudgets(
      savedBudgets.filter(b => b.customerInfo.name.toLowerCase().includes(term.toLowerCase()))
    );
  };

  return {
    saveBudget,
    ordenarPorNombre,
    orderByDate,
    filterBudgets,
    savedBudgets,
    savedFilteredBudgets,
    orderedBy,
  };
};
