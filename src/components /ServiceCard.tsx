import { ServiceOptions } from '../utils/types';
import { useBudget } from '../context/BudgetContext';

interface ServiceCardProps {
    service: ServiceOptions;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
    const { selectedServices, toggleService } = useBudget();
    const isSelected = selectedServices.some(s => s.code === service.code);

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
        </div>
    );
};