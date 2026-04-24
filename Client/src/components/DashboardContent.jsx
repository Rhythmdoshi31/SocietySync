import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, Calendar, AlertCircle, ShoppingBag, Wrench, CreditCard, Camera, UserCheck, ArrowRight } from 'lucide-react';
import PageHeader from './ui/PageHeader';
import Card from './ui/Card';
import Button from './ui/Button';

const DashboardContent = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const adminData = localStorage.getItem('admin');
    const token = localStorage.getItem('token');
  
    if ((!userData && !adminData) || !token) {
      navigate('/login');
    } else {
      try {
        const data = userData || adminData;
        setDashboardData(JSON.parse(data));
      } catch (e) {
        console.error("Error parsing dashboard data:", e);
        navigate('/login');
      }
    }
    if (adminData) setRole("admin");
  }, [navigate]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  const cards = [
    { title: 'Events', description: 'View upcoming community events', href: '/dashboard/events', icon: Calendar, color: 'text-blue-500' },
    { title: 'Complaints', description: 'Submit or track your complaints', href: '/dashboard/complaints', icon: AlertCircle, color: 'text-red-500' },
    { title: 'Ordering', description: 'Online grocery and essentials', href: '/dashboard/ordering', icon: ShoppingBag, color: 'text-emerald-500' },
    { title: 'Services', description: 'Request home maintenance services', href: '/dashboard/services', icon: Wrench, color: 'text-orange-500' },
    { title: 'Maintenance', description: 'Manage rent and society dues', href: '/dashboard/rent-maintenance', icon: CreditCard, color: 'text-purple-500' },
    { title: 'Security', description: 'View live society security cams', href: '/dashboard/security-cams', icon: Camera, color: 'text-slate-500' },
    { title: 'Visitors', description: 'Validate visitors and deliveries', href: '/dashboard/visitor-delivery', icon: UserCheck, color: 'text-cyan-500' },
  ];

  if (!dashboardData) return null;

  const firstName = (dashboardData.name || 'User').split(' ')[0];

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title={`Hi, ${firstName}`} 
        subtitle={role === "admin" ? `Administrator Access • ${dashboardData.houseNo}` : `Welcome back to ${dashboardData.houseNo}`}
      >
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-bold tracking-[0.2em] text-mistral-black/60 uppercase">{formattedDate}</p>
        </div>
        <Button 
          variant="brand" 
          className="gap-2 h-10 px-4 text-xs"
          onClick={() => navigate("/dashboard/emergency")}
        >
          <Siren className="w-3.5 h-3.5" />
          EMERGENCY SOS
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.title} 
              className="group cursor-pointer flex flex-col h-full"
              onClick={() => navigate(card.href)}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`p-2.5 rounded-xl bg-mistral-black/10 ${card.color} transition-colors group-hover:bg-mistral-black group-hover:text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-mistral-black/40 group-hover:text-mistral-black transition-colors" />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-bold text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-mistral-black/70 font-medium leading-snug">
                  {card.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardContent;