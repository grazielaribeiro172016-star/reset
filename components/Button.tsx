import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "py-4 px-8 rounded-xl font-bold tracking-tight transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-200 border border-transparent shadow-lg",
    secondary: "bg-transparent text-white border border-gray-700 hover:border-white hover:bg-white/5",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};