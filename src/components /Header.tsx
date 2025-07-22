import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-blue-700 to-blue-400 text-white py-10 px-4 shadow-xl">
            <div className="max-w-6xl mx-auto flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-8">
                    <div>
                    <h1 className="text-2xl mt-8 md:text-1xl font-bold pl-7 mb-1">CREA TU PRESUPUESTO</h1>
                    <h1 className="text-20xl md:text-8xl font-bold mb-4">AHORA</h1>
                        <p className="text-orange-300 font-bold text-2xl">Selecciona los servicios que te gustaría desarrollar</p>
                    </div>
                    <Link 
                        to="/" 
                            className="mt-8 bg-gradient-to-r from-white to-cyan-200 text-blue-800 text-md font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all font-sans whitespace-nowrap"
                    >
                        Volver al Inicio
                    </Link>
                </div>
                
                <div className="h-16"></div>
            </div>
        </header>
    );
};