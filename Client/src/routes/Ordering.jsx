import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ShoppingBag, Sparkles } from 'lucide-react';

const Ordering = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Marketplace" 
        subtitle="Order essentials and groceries directly to your doorstep."
      />

      <div className="max-w-4xl mx-auto pt-10 text-center">
        <Card className="py-20 flex flex-col items-center border-border">
          <div className="w-16 h-16 bg-mistral-black/10 rounded-2xl flex items-center justify-center mb-8">
            <ShoppingBag className="w-8 h-8 text-mistral-black/40" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-3 uppercase text-mistral-black">Marketplace Coming Soon</h3>
          <p className="text-sm text-mistral-black/70 mb-10 max-w-xs font-bold leading-relaxed">
            We are currently onboarding local vendors to provide you with the best shopping experience.
          </p>
          <Button variant="outline" className="gap-2 h-11 px-8 text-[10px] font-bold tracking-widest cursor-not-allowed">
            <Sparkles size={14} />
            NOTIFY ME ON LAUNCH
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Ordering;