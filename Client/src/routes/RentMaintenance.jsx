import React, { useState } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CreditCard, Wallet, Banknote, Building2, CheckCircle2, Clock, X, Plus } from 'lucide-react';

const RentMaintenance = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    apartmentNumber: '',
    amount: '',
    paymentMethod: 'Cash'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paymentIcons = {
    Cash: <Banknote className="w-5 h-5" />,
    Online: <Wallet className="w-5 h-5" />,
    Card: <CreditCard className="w-5 h-5" />,
    Bank: <Building2 className="w-5 h-5" />
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayments([
      ...payments,
      {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('en-GB').toUpperCase()
      }
    ]);
    setIsModalOpen(true);
  };

  return (
    <div className="pb-20">
      <Section
        eyebrow="FINANCIAL MANAGEMENT"
        title={<>RENT &<br /><span className="text-brand-orange">MAINTENANCE</span></>}
        subtitle="Submit and track your society dues, rent, and maintenance payments securely."
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Payment Form */}
          <div className="lg:col-span-1">
            <Card variant="white" className="border border-mistral-black/5 shadow-none sticky top-8">
              <h3 className="text-2xl font-normal tracking-tight mb-8 uppercase">NEW PAYMENT</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">FULL NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="E.G. JOHN DOE"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">APARTMENT</label>
                  <input
                    type="text"
                    name="apartmentNumber"
                    value={formData.apartmentNumber}
                    onChange={handleInputChange}
                    className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="E.G. A-101"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">AMOUNT ($)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    placeholder="0.00"
                    required
                    min="1"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">METHOD</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                  >
                    {['Cash', 'Online', 'Card', 'Bank'].map(method => (
                      <option key={method} value={method}>{method.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" variant="brand" className="w-full py-4 mt-4 gap-2">
                  <Plus size={16} />
                  SUBMIT PAYMENT
                </Button>
              </form>
            </Card>
          </div>

          {/* Payment History */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8 border-b border-mistral-black/5 pb-4">
              <h3 className="text-2xl font-normal tracking-tight uppercase">PAYMENT HISTORY</h3>
              <Badge variant="outline">{payments.length} RECORDS</Badge>
            </div>

            {payments.length > 0 ? (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <Card key={payment.id} variant="white" className="border border-mistral-black/5 shadow-none hover:border-brand-orange/30 transition-all">
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-warm-ivory text-mistral-black/40">
                          {paymentIcons[payment.paymentMethod]}
                        </div>
                        <div>
                          <p className="text-sm font-normal uppercase tracking-tight">{payment.name}</p>
                          <p className="text-[10px] tracking-widest text-mistral-black/30 uppercase mt-1">
                            {payment.apartmentNumber} • {payment.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-normal tracking-tighter text-mistral-black">${payment.amount}</p>
                        <span className="text-[10px] tracking-widest text-emerald-600 uppercase flex items-center justify-end gap-1 mt-1">
                          <CheckCircle2 size={10} /> PAID
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center border-2 border-dashed border-mistral-black/5">
                <p className="text-xs uppercase tracking-[0.3em] text-mistral-black/20">NO RECENT TRANSACTIONS</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <Card variant="white" className="max-w-md w-full relative border-t-4 border-emerald-500 shadow-none">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 hover:bg-mistral-black/5 transition-colors"
            >
              <X className="w-5 h-5 text-mistral-black" />
            </button>

            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-emerald-500/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-normal tracking-tight mb-4 uppercase">PAYMENT LOGGED</h3>
              <p className="text-sm text-mistral-black/50 mb-10 leading-relaxed uppercase tracking-widest">
                YOUR PAYMENT OF ${formData.amount} HAS BEEN RECORDED SUCCESSFULLY.
              </p>
              <Button 
                variant="primary" 
                className="w-full py-4" 
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ name: '', apartmentNumber: '', amount: '', paymentMethod: 'Cash' });
                }}
              >
                DISMISS
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RentMaintenance;