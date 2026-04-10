import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Button from '../ui/Button';

const navLinkClass = ({ isActive }) =>
  `text-[0.8rem] font-medium tracking-wide transition-colors duration-300 ${
    isActive ? 'text-[#e8e6e3]' : 'text-[#6b6965] hover:text-[#a8a6a1]'
  }`;

const PublicNavbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#050506]/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-medium tracking-[0.02em] text-[#f5f3f0] transition-opacity group-hover:opacity-80">
            SocietySync
          </span>
          <span className="hidden h-px w-8 bg-gradient-to-r from-[#c4c2bc]/40 to-transparent sm:block" aria-hidden />
        </Link>
        <nav className="hidden items-center gap-10 md:flex">
          <NavLink to="/features" className={navLinkClass}>
            Features
          </NavLink>
          <NavLink to="/pricing" className={navLinkClass}>
            Pricing
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/demo" className={navLinkClass}>
            Demo
          </NavLink>
        </nav>
        <Button as={Link} to="/login" variant="etherealSolid" className="!rounded-lg !px-4 !py-2 !text-xs !font-semibold !tracking-wide">
          Login
        </Button>
      </div>
      <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto border-t border-white/[0.04] px-6 py-3 md:hidden md:px-8">
        <NavLink to="/features" className={navLinkClass}>
          Features
        </NavLink>
        <NavLink to="/pricing" className={navLinkClass}>
          Pricing
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
        <NavLink to="/demo" className={navLinkClass}>
          Demo
        </NavLink>
      </nav>
    </header>
  );
};

export default PublicNavbar;
