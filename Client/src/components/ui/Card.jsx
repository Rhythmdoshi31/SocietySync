import React from 'react';

const tones = {
  light:
    'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
  ethereal:
    'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] transition-all duration-500 hover:border-white/[0.12] hover:from-white/[0.06]',
};

const text = {
  light: {
    title: 'text-lg font-semibold text-slate-900',
    description: 'mt-2 text-sm leading-6 text-slate-600',
  },
  ethereal: {
    title: 'font-display text-xl font-medium tracking-wide text-[#f0eeeb]',
    description: 'mt-2 text-sm leading-relaxed text-[#8a8884]',
  },
};

const Card = ({ title, description, className = '', children, tone = 'light' }) => {
  const t = tone === 'ethereal' ? text.ethereal : text.light;
  return (
    <article className={`${tones[tone]} ${className}`}>
      {title ? <h3 className={t.title}>{title}</h3> : null}
      {description ? <p className={t.description}>{description}</p> : null}
      {children}
    </article>
  );
};

export default Card;
