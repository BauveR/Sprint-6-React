import { useBudget } from '../context/BudgetContext';

export const BudgetSummary = () => {
    const { 
        selectedServices, 
        total, 
        applyAnnualDiscount, 
        resetDiscount, 
        discountedTotal 
    } = useBudget();

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumen del Presupuesto</h2>
            
            {selectedServices.length === 0 ? (
                <p className="text-gray-500 italic">No hay servicios seleccionados</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200 mb-6">
                        {selectedServices.map(service => (
                            <li key={service.code} className="py-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">{service.name}</span>
                                    <span className="font-medium">${service.price}</span>
                                </div>
                                {service.pages && service.pages > 1 && (
                                    <div className="text-sm text-gray-500">
                                        {service.pages} páginas (+${(service.pages - 1) * 30})
                                    </div>
                                )}
                                {service.languages && service.languages > 1 && (
                                    <div className="text-sm text-gray-500">
                                        {service.languages} idiomas (+${(service.languages - 1) * 30})
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 pt-4 space-y-3">
                        <div className="flex justify-between">
                            <span className="text-lg font-bold text-gray-800">Total:</span>
                            <span className="text-xl font-bold text-blue-600">${total}</span>
                        </div>
                        
                        {discountedTotal ? (
                            <>
                                <div className="flex justify-between text-green-600">
                                    <span>Descuento anual (20%):</span>
                                    <span>-${(total - discountedTotal).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total con descuento:</span>
                                    <span className="text-green-600">${discountedTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={resetDiscount}
                                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-white py-2 px-4 rounded"
                                >
                                    Quitar descuento
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={applyAnnualDiscount}
                                className="w-full mt-2 bg-blue-100 hover:bg-blue-200 text-white py-2 px-4 rounded"
                            >
                                Aplicar 20% de descuento por pago anual
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};