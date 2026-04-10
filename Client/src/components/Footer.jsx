import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Events', href: '/dashboard/events' },
    { label: 'Complaints', href: '/dashboard/complaints' },
    { label: 'Services', href: '/dashboard/services' },
  ];

  const policyLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
  ];

  return (
    <footer className="bg-white shadow-md p-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Branding */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">SocietySync</h3>
          <p className="text-sm text-gray-600 mt-1">Empowering Community Living</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Quick Links</h4>
          <ul className="mt-2 space-y-1 flex items-center justify-center gap-4 underline md:no-underline">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-gray-600 hover:text-blue-600 hover:underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Contact Us</h4>
          <p className="text-sm text-gray-600 mt-2">
            Email: <a href="mailto:support@societysync.com" className="hover:text-blue-600 hover:underline">support@societysync.com</a>
          </p>
          <p className="text-sm text-gray-600">Phone: +1 (555) 123-4567</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            <a href="https://twitter.com" className="text-gray-600 hover:text-blue-600">
              <Twitter />
            </a>
            <a href="https://facebook.com" className="text-gray-600 hover:text-blue-600">
              <Facebook />
            </a>
            <a href="https://instagram.com" className="text-gray-600 hover:text-blue-600">
              <Instagram />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">© 2025 SocietySync. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;