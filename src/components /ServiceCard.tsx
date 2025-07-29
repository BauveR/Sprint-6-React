import { motion } from 'framer-motion';
import { ServiceOptions } from '../utils/types';
import { useBudget } from '../context/BudgetContext';

interface ServiceCardProps {
    service: ServiceOptions;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
    const { selectedServices, toggleService, updateServiceDetails } = useBudget();
    const isSelected = selectedServices.some(s => s.code === service.code);
    const selectedService = selectedServices.find(s => s.code === service.code);

    const handleIncrement = (type: 'pages' | 'languages') => {
        const currentValue = selectedService?.[type] || 1;
        const newValue = Math.min(type === 'pages' ? 10 : 4, currentValue + 1);
        updateServiceDetails(service.code, { [type]: newValue });
    };

    const handleDecrement = (type: 'pages' | 'languages') => {
        const currentValue = selectedService?.[type] || 1;
        const newValue = Math.max(1, currentValue - 1);
        updateServiceDetails(service.code, { [type]: newValue });
    };

    return (
      <motion.div
        className={`border rounded-lg p-6 ${
          isSelected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200"
        }`}
        whileHover={{
          y: -3,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          borderColor: isSelected ? "#3b82f6" : "#f97316"
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <motion.h3 
              className="text-xl font-semibold text-gray-600 mb-2"
              whileHover={{ color: isSelected ? "#2563eb" : "#f97316" }}
              transition={{ duration: 0.2 }}
            >
              {service.name}
            </motion.h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <span className="text-lg font-bold text-orange-500">
              ${service.price}
            </span>
          </div>
          <label className="inline-flex  items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleService(service)}
              className=" text-blue-600 form-checkbox h-6 w-6 rounded"
            />
          </label>
        </div>

        {isSelected && service.code === "web" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3
            }}
            className="mt-4 space-y-3 overflow-hidden"
          >
             <div>
              <div className="flex items-center">
                <motion.button
                  onClick={() => handleDecrement("pages")}
                  disabled={(selectedService?.pages || 1) <= 1}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-l disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  -
                </motion.button>
                <span className="text-gray-700 px-4 py-1 text-center">
                  {selectedService?.pages || 1}
                </span>
                <motion.button
                  onClick={() => handleIncrement("pages")}
                  disabled={(selectedService?.pages || 1) >= 10}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-r disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  +
                </motion.button>
              </div>
            </div>
            
            <div>
        
              <div className="flex items-center">
                <motion.button
                  onClick={() => handleDecrement("languages")}
                  disabled={(selectedService?.languages || 1) <= 1}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-l disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  -
                </motion.button>
                <span className="text-gray-700 px-4 py-1 text-center">
                  {selectedService?.languages || 1}
                </span>
                <motion.button
                  onClick={() => handleIncrement("languages")}
                  disabled={(selectedService?.languages || 1) >= 4}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-r disabled:opacity-50"
                  whileTap={{ scale: 0.95 }}
                >
                  +
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
};