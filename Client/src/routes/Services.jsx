import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Wrench, Calendar, Home, Tag, Pencil, Trash2, Plus, X, AlertCircle, History, Clock } from 'lucide-react';

const Services = () => {
  const isAdmin = localStorage.getItem('admin') && localStorage.getItem('token');
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('create'); 
  const [formData, setFormData] = useState({
    detail: '',
    category: '',
  });

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://${import.meta.env.VITE_BACKEND_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 10 },
        });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching service requests:', error);
      }
    };
    fetchServices();
  }, []);

  const openModal = (mode, service = null) => {
    setModalMode(mode);
    if (mode === 'edit' && service) {
      setSelectedServiceId(service._id);
      setFormData({
        detail: service.detail,
        category: service.category,
      });
    } else if (mode === 'delete' && service) {
      setSelectedServiceId(service._id);
    } else {
      setFormData({ detail: '', category: '' });
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFormData({ detail: '', category: '' });
    setSelectedServiceId(null);
    setModalMode('create');
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!formData.category || !formData.detail) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (modalMode === 'create') {
        await axios.post(`https://${import.meta.env.VITE_BACKEND_URL}/api/services/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(
          `https://${import.meta.env.VITE_BACKEND_URL}/api/services/${selectedServiceId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      closeModal();
      // Use window.location.reload() as requested to preserve existing logic flow
      window.location.reload();
    } catch (error) {
      console.error('Error submitting service request:', error);
      alert("Failed to submit service request. Please try again.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://${import.meta.env.VITE_BACKEND_URL}/api/services/${selectedServiceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service request:', error);
    }
  };

  const activeServices = services.filter(s => s.status === 'open');
  const completedServices = services.filter(s => s.status !== 'open');

  const ServiceCard = ({ service }) => (
    <Card key={service._id} className="flex flex-col h-full group">
      <div className="flex justify-between items-start mb-4">
        <Badge variant={service.status === 'open' ? 'outline' : 'brand'} className="text-[10px] font-semibold tracking-wider">
          {service.status === 'open' ? 'IN QUEUE' : 'COMPLETED'}
        </Badge>
        <div className="p-2.5 rounded-xl bg-mistral-black/10 text-mistral-black/50 group-hover:bg-mistral-black group-hover:text-white transition-colors">
          <Wrench size={16} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <Tag size={12} className="text-brand-orange" />
        <p className="text-[10px] font-bold tracking-widest text-mistral-black/60 uppercase">{service.category}</p>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-1 line-clamp-3">
        {service.detail}
      </p>

      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4 text-mistral-black/60">
          <div className="flex items-center gap-1">
            <Home size={10} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{service.houseNo}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={10} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {new Date(service.request).toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" className="p-2 h-8 text-mistral-black/60 hover:text-mistral-black opacity-100" onClick={() => openModal('edit', service)}>
            <Pencil size={14} />
          </Button>
          <Button variant="ghost" className="p-2 h-8 text-mistral-black/60 hover:text-brand-orange opacity-100" onClick={() => openModal('delete', service)}>
            <Trash2 size={14} />
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-10">
      <PageHeader 
        title="Service Dashboard" 
        subtitle="Request specialized maintenance services for your apartment."
      >
        {!isAdmin && (
          <Button variant="outline" className="gap-2 h-10 px-4 text-xs" onClick={() => openModal('create')}>
            <Plus size={16} />
            LODGE REQUEST
          </Button>
        )}
      </PageHeader>

      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <Clock className="w-4 h-4 text-brand-orange" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-mistral-black/60">Active Requests</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeServices.map(service => <ServiceCard key={service._id} service={service} />)}
          {activeServices.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-2xl">
              <p className="text-xs font-bold text-mistral-black/40 uppercase tracking-widest">No active requests</p>
            </div>
          )}
        </div>
      </div>

      {completedServices.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-1">
          <History className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-700">Service History</h2>
        </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completedServices.map(service => <ServiceCard key={service._id} service={service} />)}
          </div>
        </div>
      )}

      {isModalVisible && (
        <div 
          className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6"
          onClick={closeModal}
        >
          <Card 
            className="max-w-md w-full relative shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeModal} className="absolute top-5 right-5 p-2 hover:bg-mistral-black/5 rounded-lg transition-colors">
              <X className="w-4 h-4 text-mistral-black" />
            </button>

            {modalMode === 'delete' ? (
              <div className="py-4 text-center">
                <div className="w-12 h-12 bg-brand-orange/20 flex items-center justify-center mx-auto mb-5 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2 uppercase tracking-tight">Confirm Deletion</h3>
                <p className="text-sm text-mistral-black/70 mb-8 leading-relaxed px-4 font-medium">
                  Are you sure you want to remove this service request? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-11" onClick={closeModal}>CANCEL</Button>
                  <Button variant="brand" className="flex-1 h-11" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <h3 className="text-xl font-semibold mb-6 uppercase tracking-tight">
                  {modalMode === 'create' ? 'New Request' : 'Edit Request'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Category</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleFormChange}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                      required
                    >
                      <option value="">SELECT CATEGORY</option>
                      {['Plumbing', 'Carpentary', 'Electrical', 'Masonry', 'Cleaning', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Details</label>
                    <textarea
                      name="detail"
                      value={formData.detail}
                      onChange={handleFormChange}
                      rows="4"
                      required
                      placeholder="Describe the maintenance issue..."
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none font-medium text-foreground"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="outline" className="w-full h-12 mt-2 uppercase tracking-widest text-xs">
                    {modalMode === 'create' ? 'Submit Request' : 'Update Request'}
                  </Button>
                </form>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Services;
