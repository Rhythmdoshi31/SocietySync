import React from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Camera, Radio, ShieldAlert } from 'lucide-react';

const cameraFeeds = [
  {
    id: 1,
    name: 'ENTRANCE CAMERA',
    location: 'MAIN GATE',
    feed: 'http://images.unsplash.com/photo-1624381805840-a88d1510240d?q=80&w=3038&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: "Live feed from main entrance security camera",
    status: "active",
  },
  {
    id: 2,
    name: 'PARKING LOT',
    location: 'BASEMENT LEVEL 1',
    feed: 'http://images.unsplash.com/photo-1572094943263-a746cbf1d05f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: "Live surveillance from basement parking lot camera",
    status: "inactive",
  },
  {
    id: 3,
    name: 'LOBBY',
    location: 'GROUND FLOOR',
    feed: 'http://images.unsplash.com/photo-1691388205881-72176912c563?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: "Live video from ground floor lobby security camera",
    status: "active",
  },
  {
    id: 4,
    name: 'ROOFTOP',
    location: 'TERRACE VIEW',
    feed: 'http://images.unsplash.com/photo-1624228653103-0f6c379fb1b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: "Live rooftop view from terrace security camera",
    status: "inactive",
  },
];

const SecurityCams = () => {
  return (
    <div className="pb-20">
      <Section
        eyebrow="SURVEILLANCE SYSTEM"
        title={<>LIVE SECURITY<br /><span className="text-brand-orange">CAMERAS</span></>}
        subtitle="Monitor common areas and entry points in real-time for enhanced community safety."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {cameraFeeds.map((cam) => (
            <Card key={cam.id} variant="white" className="p-0 overflow-hidden border border-mistral-black/5 shadow-none group">
              <div className="relative aspect-video overflow-hidden bg-mistral-black">
                <img
                  src={cam.feed}
                  alt={`${cam.alt} feed`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                />
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <Badge variant={cam.status === 'active' ? 'brand' : 'outline'} className={cam.status === 'active' ? 'bg-emerald-500 border-none' : 'bg-mistral-black/40 text-white border-white/20'}>
                    <Radio className={`w-3 h-3 mr-1 ${cam.status === 'active' ? 'animate-pulse' : ''}`} />
                    {cam.status.toUpperCase()}
                  </Badge>
                </div>
                {cam.status === 'active' && (
                  <div className="absolute bottom-6 left-6">
                    <p className="text-[10px] text-white/60 tracking-[0.3em] font-mono">REC 00:00:24</p>
                  </div>
                )}
                {cam.status === 'inactive' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-mistral-black/60 backdrop-blur-[2px]">
                    <div className="text-center">
                      <ShieldAlert className="w-8 h-8 text-white/20 mx-auto mb-2" />
                      <p className="text-[10px] tracking-widest text-white/40 uppercase">SIGNAL LOST</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-8 flex justify-between items-end">
                <div>
                  <h3 className="text-xl font-normal tracking-tight uppercase mb-1">{cam.name}</h3>
                  <p className="text-[10px] tracking-widest text-mistral-black/40 uppercase">{cam.location}</p>
                </div>
                <div className="p-3 bg-warm-ivory text-mistral-black/20">
                  <Camera size={18} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default SecurityCams;
