import React, { useState } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Siren, Phone, X, AlertTriangle } from 'lucide-react';

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
    <div className="pb-20">
      <Section
        eyebrow="CRITICAL ASSISTANCE"
        title={<>EMERGENCY<br /><span className="text-brand-orange">SERVICES</span></>}
        subtitle="Immediate assistance is just a click away. Connect with society security and medical services instantly."
      >
        <div className="max-w-3xl mx-auto text-center py-20">
          <Card variant="ivory" className="relative p-12 md:p-20 flex flex-col items-center border border-brand-orange/20 overflow-hidden shadow-none">
            {/* Ambient pulse effect behind the button */}
            <div className="absolute inset-0 bg-brand-orange/5 animate-pulse"></div>
            
            <div className="relative z-10 w-24 h-24 bg-brand-orange/10 flex items-center justify-center mb-12">
              <Siren className="w-12 h-12 text-brand-orange animate-bounce" />
            </div>

            <h3 className="relative z-10 text-4xl font-normal tracking-tight mb-6 uppercase">SOS EMERGENCY</h3>
            <p className="relative z-10 text-sm text-mistral-black/50 mb-12 max-w-md uppercase tracking-widest leading-loose">
              BY PRESSING THE BUTTON BELOW, YOU WILL IMMEDIATELY INITIATE A CALL TO SOCIETY SECURITY AND NOTIFY MANAGEMENT.
            </p>

            <Button 
              variant="brand" 
              className="relative z-10 w-full md:w-auto px-12 py-6 text-lg gap-3"
              onClick={handleEmergencyClick}
            >
              <Phone className="w-5 h-5" />
              TRIGGER EMERGENCY
            </Button>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="white" className="p-6 flex items-center gap-4 border border-mistral-black/5 text-left shadow-none">
              <div className="p-3 bg-mistral-black/5"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] tracking-widest text-mistral-black/40 uppercase">SECURITY GATE</p>
                <p className="text-sm font-normal">+91 99981 60378</p>
              </div>
            </Card>
            <Card variant="white" className="p-6 flex items-center gap-4 border border-mistral-black/5 text-left shadow-none">
              <div className="p-3 bg-mistral-black/5"><Phone className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] tracking-widest text-mistral-black/40 uppercase">POLICE / AMBULANCE</p>
                <p className="text-sm font-normal">100 / 108</p>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {isModalVisible && (
        <div className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <Card variant="white" className="max-w-md w-full relative border-t-4 border-brand-orange shadow-none">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-mistral-black/5 transition-colors">
              <X className="w-5 h-5 text-mistral-black" />
            </button>

            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-brand-orange/10 flex items-center justify-center mx-auto mb-8">
                <AlertTriangle className="w-10 h-10 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-normal tracking-tight mb-4 uppercase">ALERT TRIGGERED</h3>
              <p className="text-sm text-mistral-black/50 mb-10 leading-relaxed uppercase tracking-widest">
                An emergency protocol has been initiated. <br />Authorities have been notified.
              </p>
              <Button variant="primary" className="w-full py-4" onClick={closeModal}>CLOSE OVERLAY</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EmergencyPage;