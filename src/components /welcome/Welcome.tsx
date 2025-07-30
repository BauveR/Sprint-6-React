import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Title } from './Title';
import { GlassButton } from '../button/GlassButton'; 

export const Welcome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -20]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          navigate('/presupuesto');
        }
      },
      { threshold: 1 }
    );

    if (scrollEndRef.current) {
      observer.observe(scrollEndRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [navigate]);

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <motion.div
        style={{ opacity, scale, y }}
        className="fixed inset-0 min-h-screen bg-gradient-to-br from-blue-700 to-cyan-400 flex flex-col items-center justify-center p-4 overflow-hidden"
      >
        <Title />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-md tracking-widest text-orange-300 mb-10 font-sans mx-auto font-medium"
        >
          presupuestos personalizados para tus proyectos
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/presupuesto">
            <GlassButton>
              Comenzar
            </GlassButton>
          </Link>
        </motion.div>
      </motion.div>


      <div
        ref={scrollEndRef}
        className="absolute top-[100vh] w-full min-h-screen bg-gray-50 flex items-center justify-center"
      />
    </div>
  );
};
