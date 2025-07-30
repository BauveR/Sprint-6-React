import { HeaderOptions } from "../../types/types";
import { DEFAULT_HEADER } from "./headerData";
import { motion } from "framer-motion";
import { GlassButton } from "../button/GlassButton";

interface HeaderProps {
  options?: HeaderOptions;
}

export const Header = ({ headerData = DEFAULT_HEADER }: HeaderProps) => {
    if (!headerData) return null;
  
    const titleParts = headerData.title.split(' ');
    const firstTitlePart = titleParts[0];
    const remainingTitle = titleParts.slice(1).join(' ');
  
    return (
      <header className="bg-gradient-to-b from-blue-700 to-blue-400 text-white py-10 px-4 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col justify-between h-full">
          <div className="flex justify-between items-start mb-8">
            <div className="pl-4">
              {/* Título animado con dos tamaños */}
              <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="mb-2 text-left"
    style={{
      fontFamily: "'Monoton', cursive",
      background: "linear-gradient(to right, white, #bae6fd)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      letterSpacing: "0.2em",
      lineHeight: 1.1,
    }}
  >
    {/* Primera línea: CREA grande */}
    <div
      style={{
        fontSize: 'clamp(3rem, 10vw, 6rem)',
        display: 'inline-block',
      }}
    >
      CREA
    </div>
    <br />
    {/* Segunda línea: tu presupuesto alineado con CREA */}
    <div
      style={{
        fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
        marginLeft: '0.1em', // opcional para alinear mejor
      }}
    >
      tu presupuesto
    </div>
  </motion.div>
  
              {/* Subtítulo */}
              <p className="text-orange-300 font-medium text-xl mt-2 text-left">
                {headerData.description}
              </p>
            </div>
  
            {/* Botón de navegación */}
            <div className="flex flex-col items-end gap-4">
            <GlassButton onClick={() => (window.location.href = "/")}>
              {headerData.buttonText}
            </GlassButton>
  
            </div>
          </div>
          <div className="h-16" />
        </div>
      </header>
    );
  };
  