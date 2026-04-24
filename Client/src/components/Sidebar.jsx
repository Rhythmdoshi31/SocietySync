import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  AlertCircle, 
  ShoppingBag, 
  PhoneCall, 
  Wrench, 
  CreditCard, 
  Camera, 
  UserCheck,
  LogOut,
  X
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isWorker, setisWorker] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { path: '/dashboard/events', label: 'EVENTS', icon: Calendar },
    { path: '/dashboard/complaints', label: 'COMPLAINTS', icon: AlertCircle },
    { path: '/dashboard/ordering', label: 'ORDERING', icon: ShoppingBag },
    { path: '/dashboard/emergency', label: 'EMERGENCY', icon: PhoneCall },
    { path: '/dashboard/services', label: 'SERVICES', icon: Wrench },
    { path: '/dashboard/rent-maintenance', label: 'MAINTENANCE', icon: CreditCard },
    { path: '/dashboard/security-cams', label: 'SECURITY', icon: Camera },
    { path: '/dashboard/visitor-delivery', label: 'VISITORS', icon: UserCheck },
  ];

  useEffect(() => {
    const workerData = localStorage.getItem('worker');
    if (workerData) setisWorker(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('worker');
    navigate("/login");
  };

  return (
    <aside className={`fixed inset-y-0 left-0 w-72 bg-warm-cream border-r border-mistral-black/20 flex flex-col z-40 transition-transform duration-500 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-20 flex items-center justify-between px-8 border-b border-mistral-black/20">
        <span className="text-xl font-normal tracking-tighter text-mistral-black">SOCIETY<span className="text-brand-orange">SYNC</span></span>
        <button onClick={toggleSidebar} className="md:hidden p-2">
          <X className="w-5 h-5 text-mistral-black" />
        </button>
      </div>

      <nav className="flex-1 py-8 px-4 overflow-y-auto">
        <ul className="space-y-2">
          {!isWorker && navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.label}>
                <Link
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`flex items-center gap-4 px-4 py-3 text-xs font-bold tracking-widest transition-all duration-300 ${isActive ? 'bg-mistral-black text-white shadow-lg' : 'text-mistral-black/80 hover:bg-mistral-black/10 hover:text-mistral-black'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-mistral-black/20">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-xs font-bold tracking-widest text-brand-orange hover:bg-brand-orange hover:text-white transition-all shadow-sm border border-brand-orange/20 rounded-xl"
        >
          <LogOut className="w-4 h-4" />
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;