import { useSearchParams } from 'react-router-dom';

export const SharedBudget = () => {
  const [params] = useSearchParams();

  const name = params.get('name');
  const services = params.get('services')?.split(',') || [];
  const total = params.get('total');
  const discount = params.get('discount');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-6 max-w-xl w-full shadow-md rounded">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shared Budget</h2>
        <p className="text-gray-700"><strong>Customer:</strong> {name}</p>
        <p className="text-gray-700"><strong>Services:</strong> {services.join(', ')}</p>
        <p className="text-gray-700"><strong>Total:</strong> ${total}</p>
        {discount && (
          <p className="text-green-700 font-semibold">
            Total with discount: ${discount}
          </p>
        )}
      </div>
    </div>
  );
};
