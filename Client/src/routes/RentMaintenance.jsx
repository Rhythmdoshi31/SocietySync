import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { CreditCard, Wallet, Banknote, Building2, CheckCircle2, Clock, X, Plus, Receipt } from 'lucide-react';

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
    Cash: <Banknote className="w-4 h-4" />,
    Online: <Wallet className="w-4 h-4" />,
    Card: <CreditCard className="w-4 h-4" />,
    Bank: <Building2 className="w-4 h-4" />
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPayments([
      {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('en-GB').toUpperCase()
      },
      ...payments
    ]);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Rent & Maintenance" 
        subtitle="Manage and track your society dues securely."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Payment Form */}
        <div className="lg:col-span-4">
          <Card className="sticky top-6">
            <h3 className="text-sm font-bold tracking-widest mb-6 uppercase text-mistral-black/60">New Payment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-mistral-black/40 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                  placeholder="E.g. John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-mistral-black/40 uppercase ml-1">Apartment</label>
                <input
                  type="text"
                  name="apartmentNumber"
                  value={formData.apartmentNumber}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                  placeholder="E.g. A-101"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-mistral-black/40 uppercase ml-1">Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                  placeholder="0.00"
                  required
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest text-mistral-black/40 uppercase ml-1">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                >
                  {['Cash', 'Online', 'Card', 'Bank'].map(method => (
                    <option key={method} value={method}>{method.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <Button type="submit" variant="brand" className="w-full h-12 mt-4 gap-2 font-bold tracking-widest text-xs uppercase">
                <Plus size={16} />
                Log Payment
              </Button>
            </form>
          </Card>
        </div>

        {/* Payment History */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4 px-1">
            <div className="flex items-center gap-2">
              <Receipt className="w-4 h-4 text-mistral-black/60" />
              <h3 className="text-sm font-bold tracking-widest uppercase text-mistral-black/80">Payment History</h3>
            </div>
            <Badge variant="outline" className="text-[10px] font-bold">{payments.length} RECORDS</Badge>
          </div>

          {payments.length > 0 ? (
            <div className="grid gap-3">
              {payments.map((payment) => (
                <Card key={payment.id} className="group border-border hover:border-mistral-black/20 transition-all p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-mistral-black/10 text-mistral-black/60 group-hover:bg-mistral-black group-hover:text-white transition-colors">
                        {paymentIcons[payment.paymentMethod]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground tracking-tight">{payment.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="brand" className="text-[9px] h-4 font-bold tracking-wider">{payment.apartmentNumber}</Badge>
                          <span className="text-[10px] font-bold tracking-widest text-mistral-black/60 uppercase">
                            {payment.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold tracking-tight text-foreground">${payment.amount}</p>
                      <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase flex items-center justify-end gap-1 mt-1">
                        <CheckCircle2 size={10} /> Paid
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border-2 border-dashed border-border rounded-2xl">
              <Receipt className="w-10 h-10 text-mistral-black/20 mx-auto mb-4" />
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-mistral-black/40">No recent transactions</p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={() => setIsModalOpen(false)}
        >
          <Card 
            className="max-w-sm w-full relative shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 p-2 hover:bg-mistral-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-mistral-black" />
            </button>

            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-emerald-500/10 flex items-center justify-center mx-auto mb-6 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 uppercase tracking-tight text-mistral-black">Payment Logged</h3>
              <p className="text-sm text-mistral-black/70 mb-8 px-4 font-medium leading-relaxed">
                The payment of <span className="text-foreground font-bold">${formData.amount}</span> has been recorded in the society ledger.
              </p>
              <Button 
                variant="primary" 
                className="w-full h-11 uppercase tracking-widest text-xs font-bold" 
                onClick={() => {
                  setIsModalOpen(false);
                  setFormData({ name: '', apartmentNumber: '', amount: '', paymentMethod: 'Cash' });
                }}
              >
                Dismiss
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RentMaintenance;