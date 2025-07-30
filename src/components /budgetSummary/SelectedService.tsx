import { SelectedService } from '../../types/types';

interface Props {
  services: SelectedService[];
}

export const SelectedServices = ({ services }: Props) => (
  <ul className="divide-y divide-gray-200 mb-6">
    {services.map(service => (
      <li key={service.code} className="py-3">
        <div className="flex justify-between">
          <span className="text-gray-700">{service.name}</span>
          <span className="font-bold text-gray-600">${service.price}</span>
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
);
