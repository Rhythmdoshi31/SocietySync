import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Camera, Radio, ShieldAlert } from 'lucide-react';

const cameraFeeds = [
  {
    id: 1,
    name: 'Entrance Camera',
    location: 'Main Gate',
    feed: 'http://images.unsplash.com/photo-1624381805840-a88d1510240d?q=80&w=3038&auto=format&fit=crop',
    alt: "Live feed from main entrance security camera",
    status: "active",
  },
  {
    id: 2,
    name: 'Parking Lot',
    location: 'Basement Level 1',
    feed: 'http://images.unsplash.com/photo-1572094943263-a746cbf1d05f?q=80&w=2940&auto=format&fit=crop',
    alt: "Live surveillance from basement parking lot camera",
    status: "inactive",
  },
  {
    id: 3,
    name: 'Lobby',
    location: 'Ground Floor',
    feed: 'http://images.unsplash.com/photo-1691388205881-72176912c563?q=80&w=2950&auto=format&fit=crop',
    alt: "Live video from ground floor lobby security camera",
    status: "active",
  },
  {
    id: 4,
    name: 'Rooftop',
    location: 'Terrace View',
    feed: 'http://images.unsplash.com/photo-1624228653103-0f6c379fb1b9?q=80&w=2940&auto=format&fit=crop',
    alt: "Live rooftop view from terrace security camera",
    status: "inactive",
  },
];

const SecurityCams = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Security Cams" 
        subtitle="Monitor common areas and entry points in real-time."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cameraFeeds.map((cam) => (
          <Card key={cam.id} className="p-0 overflow-hidden group border-border hover:border-mistral-black/20 transition-all">
            <div className="relative aspect-video overflow-hidden bg-mistral-black">
              <img
                src={cam.feed}
                alt={`${cam.alt} feed`}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Badge 
                  className="bg-red-600 text-white border-none flex items-center gap-1.5 h-6 px-2.5 font-bold shadow-lg"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  LIVE
                </Badge>
                <Badge className="bg-black text-white border-none h-6 px-2.5 font-bold shadow-lg">
                  CAM {cam.id.toString().padStart(2, '0')}
                </Badge>
              </div>
              {cam.status === 'active' && (
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg border border-white/20">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-[9px] text-white tracking-widest font-bold font-mono">REC 00:00:24</p>
                  </div>
                </div>
              )}
              {cam.status === 'inactive' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
                  <div className="text-center">
                    <ShieldAlert className="w-8 h-8 text-white/50 mx-auto mb-2" />
                    <p className="text-[10px] font-bold tracking-widest text-white uppercase">Signal Lost</p>
                  </div>
                </div>
              )}
            </div>
              <div className="p-4 bg-white border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-0.5">{cam.location}</p>
                  <h3 className="text-sm font-bold text-foreground">SOCIETY {cam.alt.toUpperCase()}</h3>
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <div className="w-1 h-1 bg-emerald-600 rounded-full" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">ACTIVE</span>
                </div>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SecurityCams;
