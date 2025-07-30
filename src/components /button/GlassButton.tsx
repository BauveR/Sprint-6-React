import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const GlassButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
}: GlassButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        mt-8
        bg-white/10 
        backdrop-blur-md
        border border-white/30
        text-blue-100
        font-semibold 
        py-3 px-6 
        rounded-2xl
        shadow-xl
        hover:bg-white/20 
        hover:backdrop-blur-lg 
        transition-all
        duration-300
        whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </button>
  );
};
