import { useState } from 'react';
import { Budget } from '../../types/types';
import { Toast } from '../toast/Toast';

interface SavedBudgetsProps {
  budgets: Budget[];
  orderedBy: string;
  onOrderByName: () => void;
  onOrderByDate: () => void;
}

export const SavedBudgets = ({
  budgets,
  orderedBy,
  onOrderByName,
  onOrderByDate,
}: SavedBudgetsProps) => {
  const [showToast, setShowToast] = useState(false);

  const formatDate = (date: Date) =>
    new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleCopyLink = (budget: Budget) => {
    const query = `name=${encodeURIComponent(budget.customerInfo.name)}&services=${budget.services
      .map(s => s.code)
      .join(',')}&total=${budget.total.toFixed(2)}&discount=${budget.discountedTotal?.toFixed(2) ?? ''}`;

    const url = `${window.location.origin}/shared-budget?${query}`;
    navigator.clipboard.writeText(url);
    setShowToast(true);
  };

  return (
    <div className="mt-6">
      <h3 className="font-bold text-gray-800 mb-2">Saved Budgets</h3>

      <div className="flex gap-4 mb-4">
        <button
          onClick={onOrderByName}
          className={`text-sm font-bold ${orderedBy === 'NAME' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          ▼ Name
        </button>
        <button
          onClick={onOrderByDate}
          className={`text-sm font-bold ${orderedBy === 'DATE' ? 'text-blue-700' : 'text-gray-400'}`}
        >
          ▼ Date
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {budgets.map((budget, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50 text-orange-600">
            <div className="font-medium">{budget.customerInfo.name}</div>
            <div className="text-sm text-gray-600">{budget.customerInfo.email}</div>
            <div className="text-sm text-gray-600">{budget.customerInfo.phone}</div>

            <div className="mt-2 text-sm text-gray-500">
              <strong>Services:</strong> {budget.services.map(s => s.name).join(', ')}
            </div>

            {budget.services.find(s => s.code === 'web') && (
              <div className="text-xs text-gray-500">
                {budget.services.find(s => s.code === 'web')?.pages} pages,{' '}
                {budget.services.find(s => s.code === 'web')?.languages} languages
              </div>
            )}

            <div className="mt-1 font-bold text-orange-600">
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

            <div className="text-xs text-gray-500 mt-1">{formatDate(budget.date)}</div>

            <button
              onClick={() => handleCopyLink(budget)}
              className="bg-orange-500 hover:bg-blue-100 text-white font-extrabold py-1.5 px-3 rounded-full transition-all duration-300 mt-6"
            >
              Share
            </button>
          </div>
        ))}
      </div>

      {showToast && (
        <Toast message="¡Enlace copiado al portapapeles!" onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};
