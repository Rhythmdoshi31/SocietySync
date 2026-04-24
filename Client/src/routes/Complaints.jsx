import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { AlertCircle, Plus, Pencil, Trash2, X } from 'lucide-react';

const Complaints = () => {
  const isAdmin = localStorage.getItem('admin') && localStorage.getItem('token');
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    detail: '',
    category: '',
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/api/complaints`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 10 },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };
    fetchComplaints();
  }, []);

  const openModal = (mode, complaint = null) => {
    setModalMode(mode);
    if (mode === 'edit' && complaint) {
      setSelectedComplaintId(complaint._id);
      setFormData({
        detail: complaint.detail,
        category: complaint.category,
      });
    } else if (mode === 'delete' && complaint) {
      setSelectedComplaintId(complaint._id);
    } else {
      setFormData({ detail: '', category: '' });
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFormData({ detail: '', category: '' });
    setSelectedComplaintId(null);
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
        await axios.post(`http://${import.meta.env.VITE_BACKEND_URL}/api/complaints/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(
          `http://${import.meta.env.VITE_BACKEND_URL}/api/complaints/${selectedComplaintId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://${import.meta.env.VITE_BACKEND_URL}/api/complaints/${selectedComplaintId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <div className="pb-20">
      <Section
        eyebrow="COMMUNITY SUPPORT"
        title={<>SOCIETY<br /><span className="text-brand-orange">COMPLAINTS</span></>}
        subtitle="Monitor and address community complaints efficiently with our streamlined tracking system."
      >
        <div className="flex justify-end mb-12">
          {!isAdmin && (
            <Button variant="brand" className="gap-2" onClick={() => openModal('create')}>
              <Plus className="w-4 h-4" />
              LODGE COMPLAINT
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complaints.map((complaint) => (
            <Card key={complaint._id} variant="white" className="flex flex-col h-full border border-mistral-black/5 shadow-none">
              <div className="flex justify-between items-start mb-6">
                <Badge variant="outline">{complaint.category.toUpperCase()}</Badge>
                <span className="text-[10px] tracking-widest text-mistral-black/30">
                  {new Date(complaint.date).toLocaleDateString('en-GB').toUpperCase()}
                </span>
              </div>
              
              <h3 className="text-xl font-normal tracking-tight mb-4">HOUSE {complaint.houseNo}</h3>
              <p className="text-sm text-mistral-black/60 leading-relaxed mb-8 flex-1">
                {complaint.detail}
              </p>

              {!isAdmin && (
                <div className="flex gap-2 pt-6 border-t border-mistral-black/5">
                  <Button variant="outline" className="flex-1 py-2 text-[10px]" onClick={() => openModal('edit', complaint)}>
                    <Pencil className="w-3 h-3 mr-2" />
                    EDIT
                  </Button>
                  <Button variant="ghost" className="flex-1 py-2 text-[10px] text-brand-orange" onClick={() => openModal('delete', complaint)}>
                    <Trash2 className="w-3 h-3 mr-2" />
                    DELETE
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {isModalVisible && (
        <div className="fixed inset-0 bg-mistral-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <Card variant="white" className="max-w-md w-full relative">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 hover:bg-mistral-black/5 transition-colors">
              <X className="w-5 h-5 text-mistral-black" />
            </button>

            {modalMode === 'delete' ? (
              <div className="py-4 text-center">
                <div className="w-16 h-16 bg-brand-orange/10 flex items-center justify-center mx-auto mb-6">
                  <Trash2 className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="text-2xl font-normal tracking-tight mb-2 uppercase">CONFIRM DELETE</h3>
                <p className="text-sm text-mistral-black/50 mb-10">Are you sure you want to remove this complaint record?</p>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>CANCEL</Button>
                  <Button variant="brand" className="flex-1" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <h3 className="text-2xl font-normal tracking-tight mb-8 uppercase">
                  {modalMode === 'create' ? 'LODGE COMPLAINT' : 'EDIT COMPLAINT'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">CATEGORY</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleFormChange}
                      required
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    >
                      <option value="">SELECT CATEGORY</option>
                      {["Water", "Electricity", "Security", "Garbage", "Billing", "Noise", "Maintenance"].map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">DETAIL</label>
                    <textarea
                      name="detail"
                      value={formData.detail}
                      onChange={handleFormChange}
                      rows="4"
                      required
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="brand" className="w-full py-4 mt-4">
                    {modalMode === 'create' ? 'SUBMIT COMPLAINT' : 'UPDATE COMPLAINT'}
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

export default Complaints;
