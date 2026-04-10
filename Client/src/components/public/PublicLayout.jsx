import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/public-ethereal.css';
import PublicFooter from './PublicFooter';
import PublicNavbar from './PublicNavbar';

const PublicLayout = () => {
  return (
    <div className="public-ethereal relative min-h-screen ">
      <div className="noise-overlay" aria-hidden />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="orb animate-ethereal-drift -left-32 top-0 h-[420px] w-[520px] bg-[radial-gradient(circle,rgba(180,178,170,0.12)_0%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="orb animate-ethereal-drift right-[-120px] bottom-1/4 h-[380px] w-[440px] bg-[radial-gradient(circle,rgba(140,138,130,0.08)_0%,transparent_65%)]"
          style={{ animationDelay: '-6s' }}
          aria-hidden
        />
        <div
          className="absolute left-1/2 top-[28%] h-px w-[min(90vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
          aria-hidden
        />
      </div>
      <div className="relative z-10">
        <PublicNavbar />
        <Outlet />
        <PublicFooter />
      </div>
    </div>
  );
};

export default PublicLayout;
