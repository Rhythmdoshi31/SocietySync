import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Siren, Phone, X, AlertTriangle, ShieldCheck } from 'lucide-react';

const EmergencyPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEmergencyClick = () => {
    try {
      window.location.href = 'tel:+99981603789'; 
    } catch (error) {
      console.error('Error triggering the emergency call:', error);
    }
    setIsModalVisible(true);
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Emergency" 
        subtitle="Immediate assistance is just a click away."
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="relative p-12 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-brand-orange/[0.03] animate-pulse" />
          
          <div className="relative z-10 w-20 h-20 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-8">
            <Siren className="w-10 h-10 text-brand-orange animate-bounce" />
          </div>

          <h3 className="relative z-10 text-3xl font-bold tracking-tight mb-4 uppercase text-mistral-black">SOS Emergency</h3>
          <p className="relative z-10 text-sm text-mistral-black/80 mb-10 max-w-sm font-medium leading-relaxed">
            By pressing the button below, you will immediately initiate a call to society security and notify management.
          </p>

          <Button 
            variant="brand" 
            className="relative z-10 w-full md:w-auto h-16 px-12 text-sm font-bold tracking-[0.2em] gap-3 rounded-2xl shadow-xl shadow-brand-orange/20"
            onClick={handleEmergencyClick}
          >
            <Phone className="w-5 h-5" />
            TRIGGER EMERGENCY
          </Button>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="group flex items-center gap-5 border-border hover:border-mistral-black/20 transition-all">
            <div className="p-3.5 rounded-xl bg-mistral-black/10 text-mistral-black group-hover:bg-mistral-black group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-mistral-black/60 uppercase">Security Gate</p>
              <p className="text-sm font-bold text-foreground">+91 99981 60378</p>
            </div>
          </Card>
          <Card className="group flex items-center gap-5 border-border hover:border-mistral-black/20 transition-all">
            <div className="p-3.5 rounded-xl bg-mistral-black/10 text-mistral-black group-hover:bg-mistral-black group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold tracking-widest text-mistral-black/60 uppercase">Police / Ambulance</p>
              <p className="text-sm font-bold text-foreground">100 / 108</p>
            </div>
          </Card>
        </div>
      </div>

      {isModalVisible && (
        <div 
          className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={closeModal}
        >
          <Card 
            className="max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-5 right-5 p-2 hover:bg-mistral-black/5 rounded-lg transition-colors">
              <X className="w-4 h-4 text-mistral-black" />
            </button>

            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-brand-orange/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-mistral-black">Alert Triggered</h3>
              <p className="text-sm text-mistral-black/80 mb-8 px-4 font-medium leading-relaxed">
                An emergency protocol has been initiated. Authorities have been notified.
              </p>
              <Button variant="primary" className="w-full h-11 uppercase tracking-widest text-xs font-bold" onClick={closeModal}>Close Overlay</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmergencyPage;