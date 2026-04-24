import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Calendar as CalendarIcon, MapPin, Plus, Pencil, Trash2, X, Clock, Info } from 'lucide-react';

const Events = () => {
  const isAdmin = localStorage.getItem('admin') && localStorage.getItem('token');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    venue: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://${import.meta.env.VITE_BACKEND_URL}/api/events`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 10 },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const openModal = (mode, event = null) => {
    setModalMode(mode);
    setIsModalVisible(true);
    setSelectedEvent(event);
    if (mode === 'edit' && event) {
      setFormData({
        title: event.title,
        description: event.description,
        date: event.date,
        venue: event.venue,
      });
    } else if (mode === 'create') {
      setFormData({ title: '', description: '', date: '', venue: '' });
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setFormData({ title: '', description: '', date: '', venue: '' });
    setSelectedEvent(null);
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
        await axios.post(`https://${import.meta.env.VITE_BACKEND_URL}/api/events/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(`https://${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEvent._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Events" 
        subtitle="Discover upcoming gatherings and meetings in the society."
      >
        {isAdmin && (
          <Button variant="brand" className="gap-2 h-10 px-4 text-xs" onClick={() => openModal('create')}>
            <Plus className="w-3.5 h-3.5" />
            CREATE EVENT
          </Button>
        )}
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card 
            key={event._id} 
            className="group flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="p-2.5 rounded-xl bg-mistral-black/10 text-mistral-black group-hover:bg-mistral-black group-hover:text-white transition-colors">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <Badge variant="brand" className="text-[10px] tracking-wider font-bold">UPCOMING</Badge>
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">{event.title}</h3>
            
            <div className="space-y-2 mb-6 flex-1">
              <div className="flex items-center gap-2.5 text-xs text-mistral-black/70 font-bold">
                <Clock className="w-3.5 h-3.5" />
                {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2.5 text-xs text-mistral-black/70 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                {event.venue}
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border mt-auto">
              <Button variant="outline" className="flex-1 h-9 py-0 text-[10px]" onClick={() => openModal('view', event)}>
                <Info className="w-3 h-3 mr-2" />
                DETAILS
              </Button>
              {isAdmin && (
                <div className="flex gap-2 w-full">
                  <Button variant="ghost" className="p-2 h-9 text-mistral-black/40 hover:text-mistral-black opacity-100" onClick={() => openModal('edit', event)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" className="p-2 h-9 text-mistral-black/40 hover:text-brand-orange opacity-100" onClick={() => openModal('delete', event)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {events.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-border rounded-2xl">
            <CalendarIcon className="w-10 h-10 text-mistral-black/20 mx-auto mb-4" />
            <p className="text-sm text-mistral-black/60 font-bold uppercase tracking-widest">No upcoming events</p>
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
                <div className="w-12 h-12 bg-brand-orange/10 flex items-center justify-center mx-auto mb-5 rounded-xl">
                  <Trash2 className="w-6 h-6 text-brand-orange" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cancel Event</h3>
                <p className="text-sm text-mistral-black/70 mb-8 font-medium leading-relaxed">Are you sure you want to cancel and remove this event? This cannot be undone.</p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 h-11" onClick={closeModal}>BACK</Button>
                  <Button variant="brand" className="flex-1 h-11" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : modalMode === 'view' ? (
              <div className="py-2">
                <Badge variant="brand" className="mb-4 text-[9px] h-5 px-2">EVENT DETAILS</Badge>
                <h3 className="text-2xl font-bold mb-6 leading-tight">{selectedEvent.title}</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 bg-warm-ivory border border-border rounded-xl">
                    <p className="text-[10px] font-bold text-mistral-black/50 mb-1 uppercase tracking-wider">Date</p>
                    <p className="text-xs font-bold">{new Date(selectedEvent.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="p-3.5 bg-warm-ivory border border-border rounded-xl">
                    <p className="text-[10px] font-bold text-mistral-black/50 mb-1 uppercase tracking-wider">Venue</p>
                    <p className="text-xs font-bold">{selectedEvent.venue}</p>
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-mistral-black/50 mb-2 uppercase tracking-wider">About the Event</p>
                  <p className="text-sm text-mistral-black/80 leading-relaxed whitespace-pre-line font-medium">
                    {selectedEvent.description}
                  </p>
                </div>
                <Button variant="primary" className="w-full h-11" onClick={closeModal}>CLOSE</Button>
              </div>
            ) : (
              <div className="py-2">
                <h3 className="text-xl font-semibold mb-6">
                  {modalMode === 'create' ? 'Create Event' : 'Edit Event'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/40 ml-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      required
                      placeholder="Event name"
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/40 ml-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="3"
                      required
                      placeholder="What is this event about?"
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all resize-none font-medium text-foreground"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/40 ml-1">Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-mistral-black/40 ml-1">Venue</label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleFormChange}
                        required
                        placeholder="Location"
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all font-medium text-foreground"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="brand" className="w-full h-12 mt-4 uppercase">
                    {modalMode === 'create' ? 'Post Event' : 'Save Changes'}
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

export default Events;
