import React from 'react';

const Card = ({ title, description, className = '', children, variant = 'default' }) => {
  const baseStyles = "p-8 shadow-mistral transition-all duration-500";
  const variants = {
    default: "bg-warm-cream",
    white: "bg-white",
    ivory: "bg-warm-ivory",
    outline: "bg-transparent border border-mistral-black/10 shadow-none",
  };

  return (
    <article className={`${baseStyles} ${variants[variant] ?? variants.default} ${className}`}>
      {title && (
        <h3 className="text-2xl font-normal tracking-tight text-mistral-black mb-2">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-mistral-black/60 leading-relaxed mb-6">
          {description}
        </p>
      )}
      {children}
    </article>
  );
};

export default Card;
