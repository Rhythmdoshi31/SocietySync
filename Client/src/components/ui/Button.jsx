import React from 'react';

const variants = {
  primary:
    'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35',
  secondary:
    'border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50',
  ghost: 'text-slate-700 hover:bg-slate-100',
  ethereal:
    'border border-white/[0.12] bg-white/[0.04] text-[#e8e6e3] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/[0.18] hover:bg-white/[0.07]',
  etherealSolid:
    'bg-[#e8e6e3] text-[#0a0a0b] hover:bg-white border border-white/10',
  etherealGhost: 'text-[#a8a6a1] hover:text-[#e8e6e3] hover:bg-white/[0.04]',
};

const Button = ({ as: Comp = 'button', variant = 'primary', className = '', ...props }) => {
  return (
    <Comp
      className={`inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-500 hover:-translate-y-0.5 ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    />
  );
};

export default Button;
