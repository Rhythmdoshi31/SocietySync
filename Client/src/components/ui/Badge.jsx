import React from 'react';

const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: "bg-mistral-black text-white",
    brand: "bg-brand-orange text-white",
    cream: "bg-warm-cream text-mistral-black",
    outline: "border border-mistral-black/40 text-mistral-black",
  };

  return (
    <span 
      className={`inline-flex items-center px-2 py-0.5 text-[10px] font-normal uppercase tracking-widest ${variants[variant] ?? variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
