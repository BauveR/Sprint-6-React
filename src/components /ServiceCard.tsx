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
        <div className={`border rounded-lg p-6 transition-all ${
            isSelected 
                ? 'border-blue-500 bg-blue-50 shadow-md' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
        }`}>
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <span className="text-lg font-bold text-blue-900">${service.price}</span>
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

            {isSelected && service.code === 'web' && (
                <div className="mt-4 space-y-3">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Número de páginas</label>
                        <div className="flex items-center">
                            <button 
                                onClick={() => handleDecrement('pages')}
                                className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-3 rounded-l"
                            >
                                -
                            </button>
                            <span className="text-gray-500 px-4 py-1 text-center">
                                {selectedService?.pages || 1}
                            </span>
                            <button 
                                onClick={() => handleIncrement('pages')}
                                className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-3 rounded-r"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Número de idiomas</label>
                        <div className="flex items-center">
                            <button 
                                onClick={() => handleDecrement('languages')}
                                className="bg-gray-400 hover:bg-gray-300 text-white font-bold py-1 px-3 rounded-l"
                            >
                                -
                            </button>
                            <span className="text-gray-500 px-4 py-1 text-center">
                                {selectedService?.languages || 1}
                            </span>
                            <button 
                                onClick={() => handleIncrement('languages')}
                                className="bg-gray-200 hover:bg-gray-300 text-white font-bold py-1 px-3 rounded-r"
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