import { SERVICES } from '../utils/Data';
import { ServiceCard } from '../components /ServiceCard';
import { BudgetSummary } from '../components /BudgetSummary';
import { Header } from '../components /Header';

export const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            <Header />
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuestros Servicios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {SERVICES.map(service => (
                                <ServiceCard
                                    key={service.code}
                                    service={service}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:w-1/3">
                        <BudgetSummary />
                    </div>
                </div>
            </div>
        </div>
    );
};