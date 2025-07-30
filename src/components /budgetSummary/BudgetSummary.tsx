import { useState } from 'react';
import { useBudget } from '../../context/BudgetProvider';
import { SelectedServices } from './SelectedServices';
import { TotalSection } from './TotalSection';
import { CustomerForm } from './CustomerForm';
import { SavedBudgets } from './SavedBudgets';
import { SearchBar } from './SearchBar';

export const BudgetSummary = () => {
  const {
    selectedServices,
    total,
    discountedTotal,
    applyAnnualDiscount,
    resetDiscount,
    saveBudget,
    savedFilteredBudgets,
    ordenarPorNombre,
    orderByDate,
    filterBudgets,
    orderedBy,
  } = useBudget();

  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [showForm, setShowForm] = useState(false);

  const handleSave = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveBudget(customerInfo, discountedTotal);
    setCustomerInfo({ name: '', email: '', phone: '' });
    setShowForm(false);
  };  

  const generateSharedURL = () => {
    const name = encodeURIComponent(customerInfo.name);
    const services = selectedServices.map(s => s.code).join(',');
    const totalFormatted = total.toFixed(2);
    const discount = discountedTotal?.toFixed(2) ?? '';

    const query = `name=${name}&services=${services}&total=${totalFormatted}&discount=${discount}`;
    return `${window.location.origin}/shared-budget?${query}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-6">
      <h2 className="text-4xl font-bold text-blue-400 mb-4">Budget Summary</h2>

      {selectedServices.length === 0 ? (
        <p className="text-gray-500 italic">No services selected</p>
      ) : (
        <>
          <SelectedServices services={selectedServices} />
          <TotalSection
            total={total}
            discountedTotal={discountedTotal}
            onApplyDiscount={applyAnnualDiscount}
            onResetDiscount={resetDiscount}
          />

          {!showForm && (
            <button
              onClick={() => {
                const url = generateSharedURL();
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard");
              }}
              className="w-full mt-2 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-full"
            >
              Share budget
            </button>
          )}

          {!showForm ? (
            <button
              onClick={handleSave}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-full "
            >
              Save budget
            </button>
          ) : (
            <CustomerForm
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}
        </>
      )}

      <SearchBar onSearch={filterBudgets} />

      {savedFilteredBudgets.length > 0 && (
        <SavedBudgets
          budgets={savedFilteredBudgets}
          orderedBy={orderedBy}
          onOrderByName={ordenarPorNombre}
          onOrderByDate={orderByDate}
        />
      )}
    </div>
  );
};
