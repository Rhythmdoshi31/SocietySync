import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Wrench, Calendar, Home, Tag, Pencil, Trash2, Plus, X, AlertCircle } from 'lucide-react';

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
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/api/services`, {
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

    try {
      if (modalMode === 'create') {
        await axios.post(`http://${import.meta.env.VITE_BACKEND_URL}/api/services/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(
          `http://${import.meta.env.VITE_BACKEND_URL}/api/services/${selectedServiceId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error submitting service request:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://${import.meta.env.VITE_BACKEND_URL}/api/services/${selectedServiceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service request:', error);
    }
  };

  return (
    <div className="pb-20">
      <Section
        eyebrow="MAINTENANCE & CARE"
        title={<>SERVICE<br /><span className="text-brand-orange">DASHBOARD</span></>}
        subtitle="Request specialized maintenance services or report infrastructure issues in your block."
      >
        <div className="flex justify-end mb-12">
          {!isAdmin && (
            <Button variant="brand" className="gap-2 px-8 py-4" onClick={() => openModal('create')}>
              <Plus size={16} />
              LODGE SERVICE REQUEST
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service._id} variant="white" className="border border-mistral-black/5 shadow-none hover:border-brand-orange/30 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <Badge variant={service.status === 'open' ? 'outline' : 'brand'}>
                  {service.status === 'open' ? 'IN QUEUE' : 'COMPLETED'}
                </Badge>
                <div className="p-3 bg-warm-ivory text-mistral-black/20">
                  <Wrench size={16} />
                </div>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                <div className="flex items-center gap-3">
                  <Tag size={12} className="text-mistral-black/40" />
                  <p className="text-[10px] tracking-widest text-mistral-black/40 uppercase">{service.category}</p>
                </div>
                <p className="text-lg font-normal tracking-tight leading-relaxed line-clamp-3">
                  {service.detail}
                </p>
              </div>

              <div className="pt-6 border-t border-mistral-black/5 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-mistral-black/30">
                  <div className="flex items-center gap-1">
                    <Home size={10} />
                    <span className="text-[10px] uppercase tracking-widest">{service.houseNo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={10} />
                    <span className="text-[10px] uppercase tracking-widest">
                      {new Date(service.request).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" className="p-2 h-auto text-mistral-black/40 hover:text-mistral-black" onClick={() => openModal('edit', service)}>
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" className="p-2 h-auto text-mistral-black/40 hover:text-brand-orange" onClick={() => openModal('delete', service)}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <div className="py-40 text-center border-2 border-dashed border-mistral-black/5">
            <p className="text-xs uppercase tracking-[0.3em] text-mistral-black/20">NO SERVICE REQUESTS FOUND</p>
          </div>
        )}
      </Section>

      {isModalVisible && (
        <div className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <Card variant="white" className="max-w-md w-full relative border-t-4 border-mistral-black shadow-none">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-mistral-black/5 transition-colors">
              <X className="w-5 h-5 text-mistral-black" />
            </button>

            {modalMode === 'delete' ? (
              <div className="py-8 text-center">
                <div className="w-20 h-20 bg-brand-orange/10 flex items-center justify-center mx-auto mb-8">
                  <AlertCircle className="w-10 h-10 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-normal tracking-tight mb-4 uppercase">CONFIRM DELETION</h3>
                <p className="text-sm text-mistral-black/50 mb-10 leading-relaxed uppercase tracking-widest">
                  ARE YOU SURE YOU WANT TO REMOVE THIS SERVICE REQUEST? THIS ACTION CANNOT BE UNDONE.
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>CANCEL</Button>
                  <Button variant="brand" className="flex-1" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <h3 className="text-2xl font-normal tracking-tight mb-8 uppercase text-center">
                  {modalMode === 'create' ? 'NEW REQUEST' : 'EDIT REQUEST'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">CATEGORY</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleFormChange}
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      required
                    >
                      <option value="">SELECT CATEGORY</option>
                      {['Plumbing', 'Carpentary', 'Electrical', 'Masonry', 'Cleaning', 'Other'].map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] tracking-widest text-mistral-black/40 uppercase">DETAILS</label>
                    <textarea
                      name="detail"
                      value={formData.detail}
                      onChange={handleFormChange}
                      rows="4"
                      required
                      placeholder="DESCRIBE THE ISSUE..."
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="brand" className="w-full py-4 uppercase">
                    {modalMode === 'create' ? 'SUBMIT REQUEST' : 'UPDATE REQUEST'}
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
