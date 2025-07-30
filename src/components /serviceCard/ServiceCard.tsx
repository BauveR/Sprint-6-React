import { motion } from 'framer-motion';
import { ServiceOptions } from '../../types/types';
import { useBudget } from '../../context/BudgetProvider';
import { QuantityButtons } from './QuantityButtons';
import toast from 'react-hot-toast';


interface ServiceCardProps {
  service: ServiceOptions;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
    const { selectedServices, toggleService, updateServiceDetails } = useBudget();
  
    const isSelected = selectedServices.some(s => s.code === service.code);
    const selectedService = selectedServices.find(s => s.code === service.code);
  
    const handleIncrement = (type: 'pages' | 'languages') => {
      const current = selectedService?.[type] || 1;
      const newValue = Math.min(type === 'pages' ? 10 : 4, current + 1);
      updateServiceDetails(service.code, { [type]: newValue });
    };
  
    const handleDecrement = (type: 'pages' | 'languages') => {
      const current = selectedService?.[type] || 1;
      const newValue = Math.max(1, current - 1);
      updateServiceDetails(service.code, { [type]: newValue });
    };
  
    return (
      <motion.div
        className={`border rounded-lg p-6 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
        whileHover={{
          y: -3,
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          borderColor: isSelected ? '#3b82f6' : '#f97316',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <motion.h3
              className="text-xl font-semibold text-gray-600 mb-2"
              whileHover={{ color: isSelected ? '#2563eb' : '#f97316' }}
              transition={{ duration: 0.2 }}
            >
              {service.name}
            </motion.h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <span className="text-lg font-bold text-orange-500">${service.price}</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleService(service)}
              className="form-checkbox h-6 w-6 text-blue-800 rounded"
            />
          </label>
        </div>
  
        {isSelected && service.code === 'web' && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    className="mt-4 space-y-3 overflow-hidden"
  >
    <QuantityButtons
      label="Páginas"
      value={selectedService?.pages || 1}
      onIncrement={() => handleIncrement('pages')}
      onDecrement={() => handleDecrement('pages')}
      min={1}
      max={10}
    />
    <QuantityButtons
      label="Idiomas"
      value={selectedService?.languages || 1}
      onIncrement={() => handleIncrement('languages')}
      onDecrement={() => handleDecrement('languages')}
      min={1}
      max={4}
    />

    {/* Botón para mostrar el toast */}
    <div className="flex justify-end pt-2">
      <button
        onClick={() => toast('El costo por página es de 30€')}
        className="text-sm text-blue-400 hover:underline"
      >
        ¿Costo por página o por idioma?
      </button>
    </div>
  </motion.div>
)}

      </motion.div>
    );
  };
  