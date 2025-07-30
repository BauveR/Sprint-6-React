import { motion } from 'framer-motion';

export const Title = () => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="mb-2 mx-auto text-center"
    style={{
      fontFamily: "'Monoton'",
      background: 'linear-gradient(to right, white, #bae6fd)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      fontSize: 'clamp(1rem, 9vw, 3.5rem)',
      letterSpacing: '0.3em',
      lineHeight: '1.2',
      padding: '0.5em 0',
      wordBreak: 'break-word',
    }}
  >
    <span style={{ fontSize: '100%' }}>PRESUPUESTOS</span>
    <br />
    <span style={{ fontSize: '80%' }}>PERSONALIZADOS</span>
  </motion.div>
);
