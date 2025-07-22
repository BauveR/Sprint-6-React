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
      <div
        className={`border rounded-lg p-6 transition-all ${
          isSelected
            ? "border-blue-500 bg-blue-50 shadow-md"
            : "border-gray-200 hover:border-orange-500 hover:shadow-sm"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {service.name}
            </h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <span className="text-lg font-bold text-orange-500">
              ${service.price}
            </span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleService(service)}
              className="form-checkbox h-6 w-6 text-blue-600 rounded focus:ring-blue-500"
            />
          </label>
        </div>

        {isSelected && service.code === "web" && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Número de páginas
                <div className="tooltip ml-2">
                <div className="tooltip-content">
                  <div className=" text-orange-500 -rotate-0 text-1.5xl font-bold">
                  El costo de cada página es de 30€.
                  </div>
                </div>
                <button className="btn-white rounded-full text-blue-500">ⓘ</button>
              </div>
              </label>
              
              <div className="flex items-center">
                <button
                  onClick={() => handleDecrement("pages")}
                  disabled={(selectedService?.pages || 1) <= 1}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-l disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-gray-700 px-4 py-1 text-center">
                  {selectedService?.pages || 1}
                </span>
                <button
                  onClick={() => handleIncrement("pages")}
                  disabled={(selectedService?.pages || 1) >= 10}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-r disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Número de idiomas
                <div className="tooltip ml-2">
                <div className="tooltip-content">
                  <div className=" text-orange-500 -rotate-0 text-1.5xl font-bold">
                  El costo de cada idioma es de 30€.
                  </div>
                </div>
                <button className="btn-white rounded-full text-blue-500">ⓘ</button>
              </div>
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecrement("languages")}
                  disabled={(selectedService?.languages || 1) <= 1}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-l disabled:opacity-50"
                >
                  -
                </button>
                <span className="text-gray-700 px-4 py-1 text-center">
                  {selectedService?.languages || 1}
                </span>
                <button
                  onClick={() => handleIncrement("languages")}
                  disabled={(selectedService?.languages || 1) >= 4}
                  className="bg-orange-500 hover:bg-orange-200 text-white font-bold py-1 px-3 rounded-r disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};