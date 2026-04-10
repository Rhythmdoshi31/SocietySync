import React from 'react';

const Section = ({ eyebrow, title, subtitle, className = '', contentClassName = '', children, tone = 'light' }) => {
  const isDark = tone === 'ethereal';
  const hasHeader = Boolean(eyebrow || title || subtitle);
  return (
    <section className={`mx-auto w-full max-w-6xl px-6 py-20 md:px-8 ${className}`}>
      {eyebrow ? (
        <p
          className={`text-[0.65rem] font-medium uppercase tracking-[0.35em] ${isDark ? 'text-[#6b6965]' : 'text-indigo-600'}`}
        >
          {eyebrow}
        </p>
      ) : null}
      {title ? (
        <h2
          className={`mt-4 max-w-3xl text-3xl font-normal tracking-tight md:text-4xl ${isDark ? 'font-display text-[#f5f3f0]' : 'font-bold text-slate-900'}`}
        >
          {title}
        </h2>
      ) : null}
      {subtitle ? (
        <p className={`mt-5 max-w-2xl text-base leading-relaxed ${isDark ? 'text-[#8a8884]' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      ) : null}
      <div className={`${hasHeader ? 'mt-12' : 'mt-0'} ${contentClassName}`}>{children}</div>
    </section>
  );
};

export default Section;
