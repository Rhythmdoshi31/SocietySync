import React from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ShoppingBag, Sparkles } from 'lucide-react';

const Ordering = () => {
  return (
    <div className="pb-20">
      <Section
        eyebrow="CONVENIENCE AT YOUR DOOR"
        title={<>GROCERY<br /><span className="text-brand-orange">& SERVICES</span></>}
        subtitle="Order essentials and groceries from local partners directly to your doorstep."
      >
        <div className="max-w-4xl mx-auto py-20 text-center">
          <Card variant="white" className="p-16 border border-mistral-black/5 shadow-none flex flex-col items-center">
            <div className="w-20 h-20 bg-warm-ivory flex items-center justify-center mb-8">
              <ShoppingBag className="w-10 h-10 text-mistral-black/20" />
            </div>
            <h3 className="text-3xl font-normal tracking-tight mb-4 uppercase">MARKETPLACE COMING SOON</h3>
            <p className="text-sm text-mistral-black/40 mb-10 max-w-sm uppercase tracking-widest leading-loose">
              We are currently onboarding local vendors to provide you with the best shopping experience.
            </p>
            <Button variant="outline" className="gap-2 opacity-50 cursor-not-allowed">
              <Sparkles size={14} />
              NOTIFY ME ON LAUNCH
            </Button>
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default Ordering;