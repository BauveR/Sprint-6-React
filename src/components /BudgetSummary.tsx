import { useState } from 'react';
import { useBudget } from '../context/BudgetContext';

export const BudgetSummary = () => {
    const { 
        selectedServices, 
        total, 
        applyAnnualDiscount, 
        resetDiscount, 
        ordenarPorNombre,
        orderByDate,
        discountedTotal,
        savedFilteredBudgets,
        saveBudget,
        filterBudgets,
        orderedBy,
    } = useBudget();
    
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [showForm, setShowForm] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        filterBudgets(e.target.value);
    };

    const handleSaveBudget = (e: React.FormEvent) => {
        e.preventDefault();
        saveBudget(customerInfo);
        setCustomerInfo({ name: '', email: '', phone: '' });
        setShowForm(false);
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Resumen del Presupuesto
        </h2>

        {selectedServices.length === 0 ? (
          <p className="text-gray-500 italic">No hay servicios seleccionados</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 mb-6">
              {selectedServices.map((service) => (
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
                      {service.languages} idiomas (+$
                      {(service.languages - 1) * 30})
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-orange-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              {discountedTotal ? (
                <>
                  <div className="flex justify-between text-green-600">
                    <span>Descuento anual (20%):</span>
                    <span>-${(total - discountedTotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total con descuento:</span>
                    <span className="text-green-600">
                      ${discountedTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={resetDiscount}
                    className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-whithe-800 py-2 px-4 rounded"
                  >
                    Quitar descuento
                  </button>
                </>
              ) : (
                <button
                  onClick={applyAnnualDiscount}
                  className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded"
                >
                  Aplicar 20% de descuento por pago anual
                </button>
              )}
            </div>

            {/* Formulario para guardar presupuesto */}
            <div className="mt-6">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                >
                  Guardar Presupuesto
                </button>
              ) : (
                <form onSubmit={handleSaveBudget} className="space-y-3">
                  <h3 className="font-medium text-gray-800">
                    Datos del cliente
                  </h3>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Nombre completo"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Teléfono"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      disabled={
                        !customerInfo.name ||
                        !customerInfo.email ||
                        !customerInfo.phone
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}

        <div>
          <input
            type="text"
            name="search"
            onChange={handleSearchTermChange}
            placeholder="Search by name"
            className="w-full p-2 border rounded"
          />
        </div>
        {/* Historial de presupuestos guardados */}
        {savedFilteredBudgets.length > 0 && (
          <div className="mt-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                Presupuestos guardados
              </h3>
              <button
                type="button"
                className={`${
                  orderedBy === "NAME"
                    ? "bg-blue-50 shadow-md font-bold" // Bold if selected
                    : "border-gray-200" // Normal if not selected
                }`}
                onClick={ordenarPorNombre}
              >
                Nombre
              </button>
              <button
                type="button"
                className={`${
                  orderedBy === "DATE"
                    ? "bg-blue-50 shadow-md font-bold" // Bold if selected
                    : "border-gray-200" // Normal if not selected
                }`}
                onClick={orderByDate}
              >
                Fecha
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {savedFilteredBudgets.map((budget, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="font-medium">{budget.customerInfo.name}</div>
                  <div className="text-sm text-gray-600">
                    {budget.customerInfo.email}
                  </div>
                  <div className="text-sm text-gray-600">
                    {budget.customerInfo.phone}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Servicios:</span>{" "}
                    {budget.services.map((s) => s.name).join(", ")}
                  </div>
                  {budget.services.find((s) => s.code === "web") && (
                    <div className="text-xs text-gray-500">
                      {budget.services.find((s) => s.code === "web")?.pages}{" "}
                      páginas,
                      {
                        budget.services.find((s) => s.code === "web")?.languages
                      }{" "}
                      idiomas
                    </div>
                  )}
                  <div className="mt-1 font-medium">
                    Total: $
                    {budget.discountedTotal
                      ? budget.discountedTotal.toFixed(2)
                      : budget.total.toFixed(2)}
                    {budget.discountedTotal && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${budget.total.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(budget.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
};