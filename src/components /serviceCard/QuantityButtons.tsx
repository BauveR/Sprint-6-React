import { motion } from 'framer-motion';

interface QuantityButtonsProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min: number;
  max: number;
}

export const QuantityButtons = ({
  label,
  value,
  onIncrement,
  onDecrement,
  min,
  max,
}: QuantityButtonsProps) => (
  <div className="flex items-center gap-4">
    <span className="text-gray-700 font-medium">{label}</span>
    <div className="flex items-center">
      <motion.button
        onClick={onDecrement}
        disabled={value <= min}
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded-full disabled:opacity-50"
        whileTap={{ scale: 0.95 }}
      >
        -
      </motion.button>
      <span className="text-gray-700 px-4">{value}</span>
      <motion.button
        onClick={onIncrement}
        disabled={value >= max}
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-1 px-3 rounded-full disabled:opacity-50"
        whileTap={{ scale: 0.95 }}
      >
        +
      </motion.button>
    </div>
  </div>
);
