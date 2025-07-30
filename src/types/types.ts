export interface HeaderOptions {
    title: string;
    description: string;
    buttonText: string;
  }

  export interface ServiceOptions {
    name: string;
    description: string;
    code: string;
    price: number;
    hasCustomOptions?: boolean;
  }

  export interface SelectedService extends ServiceOptions {
    pages?: number;
    languages?: number;
  }
  export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
  }
  
  export interface Budget {
    id: string;
    customerInfo: CustomerInfo;
    services: SelectedService[];
    total: number;
    discountedTotal: number | null;
    date: Date;
  }

  export interface BudgetContextType {
    selectedServices: SelectedService[];
    toggleService: (service: ServiceOptions) => void;
    updateServiceDetails: (code: string, details: { pages?: number; languages?: number }) => void;
  
    total: number;
    discountedTotal: number | null;
    applyAnnualDiscount: () => number;
    resetDiscount: () => void;
  
    saveBudget: (customerInfo: CustomerInfo) => void;
    ordenarPorNombre: () => void;
    orderByDate: () => void;
    filterBudgets: (term: string) => void;
  
    savedBudgets: Budget[];
    savedFilteredBudgets: Budget[];
    orderedBy: string; // 'NAME' | 'DATE'
  }
  
  export interface BudgetRecord {
    customerInfo: CustomerInfo;
    services: SelectedService[];
    total: number;
    discountedTotal: number | null;
    date: Date;
  }
  
  
  