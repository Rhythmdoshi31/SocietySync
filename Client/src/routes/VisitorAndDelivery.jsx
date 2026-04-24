import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { User, Package, Clock, MapPin, CheckCircle2, LogOut, ArrowRight, ClipboardList } from 'lucide-react';

const visitorsAndDeliveries = [
  {
    id: 1,
    name: "Ramesh Kumar",
    type: "Visitor",
    purpose: "Guest Visit - Flat 402",
    time: "Today, 3:15 PM",
    status: "entered",
    photo: "http://images.unsplash.com/photo-1590361818521-0e01eae3df06?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Zomato Delivery",
    type: "Delivery",
    purpose: "Food Delivery - Flat 210",
    time: "Today, 1:00 PM",
    status: "delivered",
    photo: "http://images.unsplash.com/photo-1653389527532-884074ac1c65?q=80&w=2924&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Sneha Shah",
    type: "Visitor",
    purpose: "Friend Visit - Flat 103",
    time: "Yesterday, 5:30 PM",
    status: "left",
    photo: "http://images.unsplash.com/photo-1696315289691-5ba9a97cb975?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Amazon Delivery",
    type: "Delivery",
    purpose: "Package - Flat 507",
    time: "Yesterday, 12:20 PM",
    status: "delivered",
    photo: "http://images.unsplash.com/photo-1602359337719-a8bcbd1f7b51?q=80&w=1908&auto=format&fit=crop",
  },
];

const VisitorsAndDelivery = () => {
  const [selectedType, setSelectedType] = useState('Visitor');

  const filteredList = visitorsAndDeliveries.filter(
    (entry) => entry.type === selectedType
  );

  const statusConfig = {
    entered: { color: 'text-emerald-600', icon: <ArrowRight size={10} />, label: 'Entered' },
    delivered: { color: 'text-blue-600', icon: <CheckCircle2 size={10} />, label: 'Delivered' },
    left: { color: 'text-mistral-black/40', icon: <LogOut size={10} />, label: 'Left' },
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Visitor Log" 
        subtitle="Real-time tracking of personnel entering the society."
      />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-stone-300 pb-4">
           <div className="flex items-center gap-2 px-1">
             <ClipboardList className="w-4 h-4 text-stone-700" />
             <h3 className="text-sm font-bold tracking-widest uppercase text-stone-800">Access Activity</h3>
           </div>
           <div className="flex gap-1.5 p-1 bg-stone-200 rounded-xl">
            {['Visitor', 'Delivery'].map((type) => (
              <button 
                key={type}
                className={`px-5 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  selectedType === type 
                  ? 'bg-white text-mistral-black shadow-sm' 
                  : 'text-mistral-black/60 hover:text-mistral-black'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}s
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredList.map((entry) => (
            <Card key={entry.id} className="p-0 overflow-hidden group border-border hover:border-mistral-black/20 transition-all">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative w-full sm:w-48 aspect-[4/5] sm:aspect-auto overflow-hidden bg-warm-ivory border-r border-border">
                  <img
                    src={entry.photo}
                    alt={entry.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="brand" className="h-5 text-[9px] px-2 font-bold bg-mistral-black/80 text-white border-none backdrop-blur-sm">
                      {entry.type === 'Visitor' ? <User size={10} className="mr-1" /> : <Package size={10} className="mr-1" />}
                      {entry.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] tracking-widest font-bold flex items-center gap-1 uppercase ${statusConfig[entry.status].color} opacity-100`}>
                        {statusConfig[entry.status].icon}
                        {statusConfig[entry.status].label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-foreground leading-tight">{entry.name}</h3>
                    <p className="text-[11px] text-mistral-black/70 font-semibold leading-relaxed">{entry.purpose}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-5 mt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-mistral-black/60">
                      <Clock size={12} className="shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-widest truncate">{entry.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-mistral-black/60">
                      <MapPin size={12} className="shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-widest truncate">GATE 01</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className="py-24 text-center border-2 border-dashed border-border rounded-2xl">
            <ClipboardList className="w-10 h-10 text-mistral-black/20 mx-auto mb-4" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-mistral-black/40">No records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorsAndDelivery;
