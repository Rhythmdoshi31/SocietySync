import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Plus, Pencil, Trash2, X, MessageSquare, Calendar as CalendarIcon, Home } from 'lucide-react';

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
        const response = await axios.get(`https://${import.meta.env.VITE_BACKEND_URL}/api/complaints`, {
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

    if (!formData.category || !formData.detail) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      if (modalMode === 'create') {
        await axios.post(`https://${import.meta.env.VITE_BACKEND_URL}/api/complaints/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(
          `https://${import.meta.env.VITE_BACKEND_URL}/api/complaints/${selectedComplaintId}`,
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
      console.error('Error submitting complaint:', error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://${import.meta.env.VITE_BACKEND_URL}/api/complaints/${selectedComplaintId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Complaints" 
        subtitle="Manage and track society-wide complaints and issues."
      >
        {!isAdmin && (
          <Button variant="outline" className="gap-2 h-10 px-4 text-xs" onClick={() => openModal('create')}>
            <Plus className="w-3.5 h-3.5" />
            LODGE COMPLAINT
          </Button>
        )}
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {complaints.map((complaint) => (
          <Card key={complaint._id} className="flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4">
              <Badge variant="outline" className="text-[10px] font-medium tracking-wider">
                {complaint.category.toUpperCase()}
              </Badge>
              <div className="flex items-center gap-1.5 text-mistral-black/60">
                <CalendarIcon className="w-3 h-3" />
                <span className="text-[10px] font-medium">
                  {new Date(complaint.date).toLocaleDateString('en-GB')}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-3 text-mistral-black/70">
              <Home className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold tracking-tight">HOUSE {complaint.houseNo}</span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed mb-6 flex-1 line-clamp-4">
              {complaint.detail}
            </p>

            {!isAdmin && (
              <div className="flex gap-2 pt-4 border-t border-border mt-auto transition-colors">
                <Button variant="outline" className="flex-1 h-9 py-0 text-[10px]" onClick={() => openModal('edit', complaint)}>
                  <Pencil className="w-3 h-3 mr-2" />
                  EDIT
                </Button>
                <Button variant="ghost" className="flex-1 h-9 py-0 text-[10px] text-brand-orange opacity-100" onClick={() => openModal('delete', complaint)}>
                  <Trash2 className="w-3 h-3 mr-2" />
                  DELETE
                </Button>
              </div>
            )}
          </Card>
        ))}

        {complaints.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl">
            <MessageSquare className="w-10 h-10 text-mistral-black/20 mx-auto mb-4" />
            <p className="text-sm text-mistral-black/60 font-medium uppercase tracking-widest">No complaints found</p>
          </div>
        )}
      </div>

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
                  <Trash2 className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Confirm Delete</h3>
                <p className="text-sm text-mistral-black/70 mb-8 font-medium leading-relaxed">Are you sure you want to remove this complaint? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-11" onClick={closeModal}>CANCEL</Button>
                  <Button variant="brand" className="flex-1 h-11" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <h3 className="text-xl font-semibold mb-6">
                  {modalMode === 'create' ? 'Lodge Complaint' : 'Edit Complaint'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Category</label>
                    <select 
                      name="category" 
                      value={formData.category} 
                      onChange={handleFormChange}
                      required
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                    >
                      <option value="">Select Category</option>
                      {["Water", "Electricity", "Security", "Garbage", "Billing", "Noise", "Maintenance"].map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/70 ml-1">Detail</label>
                    <textarea
                      name="detail"
                      value={formData.detail}
                      onChange={handleFormChange}
                      rows="4"
                      required
                      placeholder="Describe your issue in detail..."
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none font-medium text-foreground"
                    ></textarea>
                  </div>
                  <Button type="submit" variant="outline" className="w-full h-12 mt-2">
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
