import { useSearchParams } from 'react-router-dom';

export const SharedBudget = () => {
  const [params] = useSearchParams();

  const name = params.get('name');
  const services = params.get('services')?.split(',') || [];
  const total = params.get('total');
  const discount = params.get('discount');

  return (
    <div className="min-h-screen bg-orange-400 flex items-center justify-center p-6">
      <div className="bg-white p-8 max-w-2xl w-full shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 border-b pb-4">Presupuesto Detallado</h2>

        <div className="space-y-2 mb-6">
          <p className="text-gray-700 text-lg font-medium">
            <span className="font-semibold">Cliente:</span> {name}
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Servicios</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="text-gray-500 text-lg">
          <p>
            <span className="font-black">Total:</span> ${total}
          </p>
          {discount && (
            <p className="text-xl  text-green-600 font-bold mt-2">
              Total con descuento: ${discount}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
