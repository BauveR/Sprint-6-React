import { Header } from '../components /header/Header';
import { ServiceCard } from '../components /serviceCard';
import { BudgetSummary } from '../components /budgetSummary/BudgetSummary';
import { SERVICES } from '../data/services';

export const Budget = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(service => (
              <ServiceCard key={service.code} service={service} />
            ))}
          </div>

          <BudgetSummary />
        </div>
      </div>
    </div>
  );
};
