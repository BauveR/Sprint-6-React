import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="bg-gradient-to-l to-blue-700 from-cyan-400 text-white py-8 px-4 shadow-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-5xl md:text-4xl font-bold mb-2">Presupuestador de Servicios</h1>
                    <p className="text-orange-500 font-bold text-xl">Selecciona los servicios que necesitas</p>
                </div>
                <Link 
                    to="/" 
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Inicio
                </Link>
            </div>
        </header>
    );
};