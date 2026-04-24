import React from 'react';

const Card = ({ title, description, className = '', children, variant = 'default', padding = 'p-5', ...props }) => {
  const baseStyles = "rounded-2xl border border-border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md";
  
  const variants = {
    default: "bg-white",
    glass: "glass-light border-white/20",
    ivory: "bg-warm-ivory",
    cream: "bg-warm-cream",
    outline: "bg-transparent border border-border",
  };

  return (
    <div 
      className={`${baseStyles} ${variants[variant] ?? variants.default} ${padding} ${className}`}
      {...props}
    >
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-mistral-black/80 leading-relaxed mb-4">
          {description}
        </p>
      )}
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default Card;
