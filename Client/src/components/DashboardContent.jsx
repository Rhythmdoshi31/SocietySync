import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Siren, Calendar, AlertCircle, ShoppingBag, Wrench, CreditCard, Camera, UserCheck } from 'lucide-react';
import Section from './ui/Section';
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
    { title: 'EVENTS', description: 'View upcoming community events', href: '/dashboard/events', icon: Calendar },
    { title: 'COMPLAINTS', description: 'Submit or track your complaints', href: '/dashboard/complaints', icon: AlertCircle },
    { title: 'ORDERING', description: 'Online grocery and essentials', href: '/dashboard/ordering', icon: ShoppingBag },
    { title: 'SERVICES', description: 'Request home maintenance services', href: '/dashboard/services', icon: Wrench },
    { title: 'MAINTENANCE', description: 'Manage rent and society dues', href: '/dashboard/rent-maintenance', icon: CreditCard },
    { title: 'SECURITY', description: 'View live society security cams', href: '/dashboard/security-cams', icon: Camera },
    { title: 'VISITORS', description: 'Validate visitors and deliveries', href: '/dashboard/visitor-delivery', icon: UserCheck },
  ];

  if (!dashboardData) return null;

  const firstName = (dashboardData.name || 'User').split(' ')[0].toUpperCase();

  return (
    <div className="pb-20">
      <Section
        eyebrow={formattedDate}
        title={<>HI {firstName},<br /><span className="text-brand-orange">{dashboardData.houseNo}</span></>}
        subtitle={role === "admin" ? "[ ADMINISTRATOR ACCESS ]" : "Welcome to your society dashboard. Manage your living experience with ease."}
      >
        <div className="flex gap-4 mb-16">
          <Button 
            variant="brand" 
            className="gap-2"
            onClick={() => navigate("/dashboard/emergency")}
          >
            <Siren className="w-4 h-4" />
            EMERGENCY SOS
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.title} 
                className="group cursor-pointer hover:bg-mistral-black hover:text-white transition-all duration-500"
                onClick={() => navigate(card.href)}
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-mistral-black/5 group-hover:bg-white/10 transition-colors">
                    <Icon className="w-6 h-6 text-mistral-black group-hover:text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-normal tracking-tight mb-2 uppercase">{card.title}</h3>
                <p className="text-sm text-mistral-black/40 group-hover:text-white/40 uppercase tracking-widest">
                  {card.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default DashboardContent;