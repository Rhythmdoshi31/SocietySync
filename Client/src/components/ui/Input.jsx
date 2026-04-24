import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">
          {label}
        </label>
      )}
      <input
        className={`bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-brand-orange mt-1">{error}</span>}
    </div>
  );
};

export default Input;
