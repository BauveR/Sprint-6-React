import { ChangeEvent } from 'react';
import { CustomerInfo } from '../../types/types';

interface CustomerFormProps {
  customerInfo: CustomerInfo;
  setCustomerInfo: (info: CustomerInfo) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const CustomerForm = ({
  customerInfo,
  setCustomerInfo,
  onSubmit,
  onCancel,
}: CustomerFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 mt-6">
      <h3 className="font-medium text-gray-800">Datos del cliente</h3>
      <input
        type="text"
        name="name"
        value={customerInfo.name}
        onChange={handleInputChange}
        placeholder="Nombre completo"
        className="w-full p-2 border border-gray-300 rounded text-gray-600"
        required
      />
      <input
        type="email"
        name="email"
        value={customerInfo.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded text-gray-600"
        required
      />
      <input
        type="tel"
        name="phone"
        value={customerInfo.phone}
        onChange={handleInputChange}
        placeholder="Teléfono"
        className="w-full p-2 border border-gray-300 rounded text-gray-600"
        required
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};
