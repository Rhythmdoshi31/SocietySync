import React, { useState } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { User, Package, Clock, MapPin, CheckCircle2, LogOut, ArrowRight } from 'lucide-react';

const visitorsAndDeliveries = [
  {
    id: 1,
    name: "RAMESH KUMAR",
    type: "Visitor",
    purpose: "GUEST VISIT - FLAT 402",
    time: "TODAY, 3:15 PM",
    status: "entered",
    photo: "http://images.unsplash.com/photo-1590361818521-0e01eae3df06?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "ZOMATO DELIVERY",
    type: "Delivery",
    purpose: "FOOD DELIVERY - FLAT 210",
    time: "TODAY, 1:00 PM",
    status: "delivered",
    photo: "http://images.unsplash.com/photo-1653389527532-884074ac1c65?q=80&w=2924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "SNEHA SHAH",
    type: "Visitor",
    purpose: "FRIEND VISIT - FLAT 103",
    time: "YESTERDAY, 5:30 PM",
    status: "left",
    photo: "http://images.unsplash.com/photo-1696315289691-5ba9a97cb975?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "AMAZON DELIVERY",
    type: "Delivery",
    purpose: "PACKAGE - FLAT 507",
    time: "YESTERDAY, 12:20 PM",
    status: "delivered",
    photo: "http://images.unsplash.com/photo-1602359337719-a8bcbd1f7b51?q=80&w=1908&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const VisitorsAndDelivery = () => {
  const [selectedType, setSelectedType] = useState('Visitor');

  const filteredList = visitorsAndDeliveries.filter(
    (entry) => entry.type === selectedType
  );

  const statusConfig = {
    entered: { color: 'text-emerald-600', icon: <ArrowRight size={10} />, label: 'ENTERED' },
    delivered: { color: 'text-blue-600', icon: <CheckCircle2 size={10} />, label: 'DELIVERED' },
    left: { color: 'text-mistral-black/40', icon: <LogOut size={10} />, label: 'LEFT' },
  };

  return (
    <div className="pb-20">
      <Section
        eyebrow="ACCESS LOGS"
        title={<>VISITORS &<br /><span className="text-brand-orange">DELIVERIES</span></>}
        subtitle="Keep track of all personnel entering the society premises for security and convenience."
      >
        <div className="flex justify-center gap-4 mb-16">
          <Button 
            variant={selectedType === 'Visitor' ? 'primary' : 'ghost'} 
            className="px-8 py-3 text-[10px]"
            onClick={() => setSelectedType('Visitor')}
          >
            VISITORS
          </Button>
          <Button 
            variant={selectedType === 'Delivery' ? 'primary' : 'ghost'} 
            className="px-8 py-3 text-[10px]"
            onClick={() => setSelectedType('Delivery')}
          >
            DELIVERIES
          </Button>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {filteredList.map((entry) => (
            <Card key={entry.id} variant="white" className="p-0 overflow-hidden border border-mistral-black/5 shadow-none group">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="relative aspect-[4/5] sm:aspect-auto overflow-hidden bg-warm-ivory">
                  <img
                    src={entry.photo}
                    alt={entry.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="brand" className="bg-mistral-black/80 text-white border-none backdrop-blur-sm">
                      {entry.type === 'Visitor' ? <User size={10} className="mr-1" /> : <Package size={10} className="mr-1" />}
                      {entry.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] tracking-[0.2em] font-normal flex items-center gap-1 ${statusConfig[entry.status].color}`}>
                        {statusConfig[entry.status].icon}
                        {statusConfig[entry.status].label}
                      </span>
                    </div>
                    <h3 className="text-xl font-normal tracking-tight uppercase mb-2">{entry.name}</h3>
                    <p className="text-sm text-mistral-black/60 leading-relaxed mb-6 uppercase tracking-widest">{entry.purpose}</p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-mistral-black/5">
                    <div className="flex items-center gap-3 text-mistral-black/30">
                      <Clock size={12} />
                      <span className="text-[10px] uppercase tracking-widest">{entry.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-mistral-black/30">
                      <MapPin size={12} />
                      <span className="text-[10px] uppercase tracking-widest">GATE 01 • MAIN ENTRY</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-mistral-black/5">
            <p className="text-xs uppercase tracking-[0.3em] text-mistral-black/20">NO RECORDS FOUND</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default VisitorsAndDelivery;
