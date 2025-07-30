import { useState } from 'react';
import { SelectedService } from '../types/types';

export const useDiscount = (selectedServices: SelectedService[]) => {
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);

  const calculateTotal = () => {
    return selectedServices.reduce((sum, service) => {
      let total = service.price;
      if (service.pages) total += (service.pages - 1) * 30;
      if (service.languages) total += (service.languages - 1) * 30;
      return sum + total;
    }, 0);
  };

  const total = calculateTotal();

  const applyAnnualDiscount = () => {
    const discounted = total * 0.8;
    setDiscountedTotal(discounted);
    return discounted;
  };

  const resetDiscount = () => setDiscountedTotal(null);

  return { total, discountedTotal, applyAnnualDiscount, resetDiscount };
};
