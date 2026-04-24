import React from 'react';

const variants = {
  primary:
    'bg-mistral-black text-white hover:bg-black',
  secondary:
    'bg-warm-cream text-mistral-black hover:bg-[#ffe8a3]',
  ghost: 
    'bg-mistral-black/10 text-mistral-black hover:bg-mistral-black/20',
  outline:
    'border border-mistral-black/40 bg-transparent text-mistral-black hover:bg-mistral-black/5',
  brand:
    'bg-brand-orange text-white hover:bg-brand-flame',
};

const Button = ({ as: Comp = 'button', variant = 'primary', className = '', ...props }) => {
  return (
    <Comp
      className={`inline-flex items-center justify-center px-6 py-3 text-sm font-normal tracking-tight uppercase transition-all duration-300 active:scale-[0.98] ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    />
  );
};

export default Button;
