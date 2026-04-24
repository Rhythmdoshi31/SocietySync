import React from 'react';

const Section = ({ eyebrow, title, subtitle, className = '', contentClassName = '', children }) => {
  return (
    <section className={`w-full max-w-7xl mx-auto px-6 py-24 md:px-12 ${className}`}>
      <div className="max-w-4xl">
        {eyebrow && (
          <p className="text-xs font-normal uppercase tracking-[0.2em] text-brand-orange mb-6">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-5xl md:text-6xl font-normal tracking-tighter text-mistral-black mb-8 leading-[0.95]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-xl text-mistral-black/70 max-w-2xl leading-relaxed mb-12">
            {subtitle}
          </p>
        )}
      </div>
      <div className={`${contentClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
