import { useState } from 'react';
import { ServiceOptions, SelectedService } from '../types/types';

export const useServiceSelection = () => {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);

  const toggleService = (service: ServiceOptions) => {
    setSelectedServices(prev => {
      const isSelected = prev.some(s => s.code === service.code);
      if (isSelected) return prev.filter(s => s.code !== service.code);
      return [...prev, service.code === 'web' ? { ...service, pages: 1, languages: 1 } : service];
    });
  };

  const updateServiceDetails = (code: string, details: { pages?: number; languages?: number }) => {
    setSelectedServices(prev =>
      prev.map(service =>
        service.code === code ? { ...service, ...details } : service
      )
    );
  };

  return { selectedServices, toggleService, updateServiceDetails };
};
