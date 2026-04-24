import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-mistral-black text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sunshine-700 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
        <div>
          <h3 className="text-2xl font-normal tracking-tighter mb-4">SOCIETY<span className="text-brand-orange">SYNC</span></h3>
          <p className="text-sm text-white/50 leading-relaxed uppercase tracking-widest">
            Empowering Community Living through Design and Intelligence.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-normal uppercase tracking-[0.2em] text-brand-orange mb-6">QUICK LINKS</h4>
          <ul className="space-y-3">
            {['DASHBOARD', 'EVENTS', 'COMPLAINTS', 'SERVICES'].map((link) => (
              <li key={link}>
                <a href={`/dashboard/${link.toLowerCase()}`} className="text-xs tracking-widest text-white/70 hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-normal uppercase tracking-[0.2em] text-brand-orange mb-6">CONTACT</h4>
          <p className="text-xs tracking-widest text-white/70 mb-4">SUPPORT@SOCIETYSYNC.COM</p>
          <div className="flex gap-6">
            <Twitter className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Facebook className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
            <Instagram className="w-4 h-4 text-white/40 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase">
          © 2025 SOCIETYSYNC. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] tracking-[0.3em] text-white/30 hover:text-white uppercase">PRIVACY</a>
          <a href="#" className="text-[10px] tracking-[0.3em] text-white/30 hover:text-white uppercase">TERMS</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;