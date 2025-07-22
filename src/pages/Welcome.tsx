import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home } from './Home'; 

export const Welcome = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });
    
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

    return (
      <div ref={containerRef} className="h-[200vh] relative">
        <motion.div
          style={{ opacity, scale, y }}
          className="fixed inset-0 min-h-screen bg-gradient-to-br from-blue-700 to-cyan-400
                 flex flex-col items-center justify-center p-4 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl w-full text-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-2 mx-auto text-center"
              style={{
                fontFamily: "'Monoton', cursive",
                background: "linear-gradient(to right, white, #bae6fd)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontSize: "clamp(1rem, 9vw, 3.5rem)",
                letterSpacing: "0.3em",
                lineHeight: "1.2",
                padding: "0.5em 0",
                wordBreak: "break-word",
              }}
            >
              <span style={{ fontSize: "100%" }}>PRESUPUESTOS</span>
              <br />
              <span style={{ fontSize: "80%" }}>PERSONALIZADOS</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-md tracking-widest text-orange-300 mb-10 font-sans  mx-auto font-medium"
            >
              presupuestos personalizados para tus proyectos
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8"
            >
              <Link
                to="/presupuesto"
                className="bg-gradient-to-r from-white to-cyan-200 text-blue-800 text-lg font-bold py-4 
                            px-8 rounded-full shadow-lg hover:shadow-xl transition-all font-sans"
              >
                Comenzar
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 text-white"
          >
            <p className="font-sans">Desliza hacia abajo para comenzar</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute top-[100vh] w-full min-h-screen bg-gray-50">
          <Home />
        </div>
      </div>
    );
};