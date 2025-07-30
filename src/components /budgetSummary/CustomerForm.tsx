import { ChangeEvent, FormEvent, useState } from 'react';
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = 'Email no válido.';
    }

    if (!/^[0-9+\-\s]{7,15}$/.test(customerInfo.phone)) {
      newErrors.phone = 'Teléfono no válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="font-medium text-gray-800">Datos del cliente</h3>

      <div>
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleInputChange}
          placeholder="Nombre completo"
          className="w-full p-2 border border-gray-300 rounded text-gray-600"
        />
        {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={customerInfo.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded text-gray-600"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          value={customerInfo.phone}
          onChange={handleInputChange}
          placeholder="Teléfono"
          className="w-full p-2 border border-gray-300 rounded text-gray-600"
        />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
      </div>

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
