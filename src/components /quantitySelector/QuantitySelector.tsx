interface QuantitySelectorProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    config: {
      min?: number;
      max?: number;
    };
    styles?: {
      button?: string;
      value?: string;
    };
  }
  
  export const QuantitySelector = ({
    value,
    onIncrement,
    onDecrement,
    config,
    styles,
  }: QuantitySelectorProps) => {
    const min = config.min ?? 1;
    const max = config.max ?? 10;
  
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrement}
          disabled={value <= min}
          className={styles?.button ?? "bg-blue-100 text-blue-800 px-3 py-1 rounded disabled:opacity-50"}
        >
          -
        </button>
        <span className={styles?.value ?? "px-2 font-medium text-white"}>{value}</span>
        <button
          onClick={onIncrement}
          disabled={value >= max}
          className={styles?.button ?? "bg-blue-100 text-blue-800 px-3 py-1 rounded disabled:opacity-50"}
        >
          +
        </button>
      </div>
    );
  };
  