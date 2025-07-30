interface TotalSectionProps {
    total: number;
    discountedTotal: number | null;
    onApplyDiscount: () => void;
    onResetDiscount: () => void;
  }
  
  export const TotalSection = ({
    total,
    discountedTotal,
    onApplyDiscount,
    onResetDiscount,
  }: TotalSectionProps) => (
    <div className="relative 
      pt-6 
      space-y-4 
      bg-white/60 
      backdrop-blur-sm 
      rounded-xl 
      shadow-inner">
      <div className="flex justify-between">
        <span className="text-lg font-bold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-orange-600">${total.toFixed(2)}</span>
      </div>
  
      {discountedTotal ? (
        <>
          <div className="flex justify-between text-green-600">
            <span>Descuento anual (20%):</span>
            <span>-${(total - discountedTotal).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600 font-bold">
            <span>Total con descuento:</span>
            <span>${discountedTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={onResetDiscount}
            className="w-full mt-2 bg-gray-200 hover:bg-gray-200 text-gray-400 py-2 px-4 rounded-full"
          >
            Quitar descuento
          </button>
        </>
      ) : (
        <button
          onClick={onApplyDiscount}
          className="w-full bg-orange-500 hover:bg-blue-100 text-white font-extrabold py-2 px-4 rounded-full"
        >
          Aplicar 20% de descuento por pago anual
        </button>
      )}
    </div>
  );
  