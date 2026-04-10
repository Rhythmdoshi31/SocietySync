import React from 'react';
import { Link } from 'react-router-dom';

const col = {
  title: 'text-[0.65rem] font-medium uppercase tracking-[0.3em] text-[#5c5a57]',
  link: 'text-sm text-[#a8a6a1] transition-colors hover:text-[#e8e6e3]',
};

const PublicFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030304]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <p className="font-display text-2xl font-medium text-[#f0eeeb]">SocietySync</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6b6965]">
            Smart society management with a calm, precise interface — built for admins, residents, and field teams.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-8 md:grid-cols-3">
          <div>
            <p className={col.title}>Product</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/features" className={col.link}>
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className={col.link}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/demo" className={col.link}>
                  Live demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={col.title}>Company</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link to="/about" className={col.link}>
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:hello@societysync.com" className={col.link}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={col.title}>Legal</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a href="#privacy" className={col.link}>
                  Privacy
                </a>
              </li>
              <li>
                <a href="#terms" className={col.link}>
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-[#5c5a57] md:flex-row md:items-center md:px-8">
          <p>© {year} SocietySync. All rights reserved.</p>
          <p className="text-[#4a4846]">Crafted for residential communities worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
