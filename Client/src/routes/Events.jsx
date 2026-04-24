import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Calendar as CalendarIcon, MapPin, Plus, Pencil, Trash2, X, Clock } from 'lucide-react';

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
        const response = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/api/events`, {
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
        await axios.post(`http://${import.meta.env.VITE_BACKEND_URL}/api/events/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit') {
        await axios.put(`http://${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEvent._id}`, formData, {
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
      await axios.delete(`http://${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <div className="pb-20">
      <Section
        eyebrow="COMMUNITY GATHERINGS"
        title={<>SOCIETY<br /><span className="text-brand-orange">EVENTS</span></>}
        subtitle="Stay updated with the latest happenings in our community. From festivals to meetings, find it all here."
      >
        <div className="flex justify-end mb-12">
          {isAdmin && (
            <Button variant="brand" className="gap-2" onClick={() => openModal('create')}>
              <Plus className="w-4 h-4" />
              CREATE EVENT
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Card 
              key={event._id} 
              variant="white" 
              className="group cursor-pointer hover:bg-mistral-black hover:text-white transition-all duration-500 border border-mistral-black/5 shadow-none flex flex-col h-full"
              onClick={() => openModal('view', event)}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-mistral-black/5 group-hover:bg-white/10 transition-colors">
                  <CalendarIcon className="w-5 h-5 text-mistral-black group-hover:text-white" />
                </div>
                <Badge variant="outline" className="group-hover:border-white/20 group-hover:text-white">UPCOMING</Badge>
              </div>

              <h3 className="text-2xl font-normal tracking-tight mb-4 uppercase leading-tight">{event.title}</h3>
              
              <div className="space-y-2 mb-8 flex-1">
                <div className="flex items-center gap-2 text-xs tracking-widest text-mistral-black/40 group-hover:text-white/40">
                  <Clock className="w-3 h-3" />
                  {event.date.toUpperCase()}
                </div>
                <div className="flex items-center gap-2 text-xs tracking-widest text-mistral-black/40 group-hover:text-white/40">
                  <MapPin className="w-3 h-3" />
                  {event.venue.toUpperCase()}
                </div>
              </div>

              {isAdmin && (
                <div className="flex gap-2 pt-6 border-t border-mistral-black/5 group-hover:border-white/10" onClick={(e) => e.stopPropagation()}>
                  <Button variant="outline" className="flex-1 py-2 text-[10px] group-hover:bg-white/10 group-hover:text-white group-hover:border-transparent" onClick={() => openModal('edit', event)}>
                    <Pencil className="w-3 h-3 mr-2" />
                    EDIT
                  </Button>
                  <Button variant="ghost" className="flex-1 py-2 text-[10px] text-brand-orange group-hover:bg-brand-orange/20" onClick={() => openModal('delete', event)}>
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
                <h3 className="text-2xl font-normal tracking-tight mb-2 uppercase">CANCEL EVENT</h3>
                <p className="text-sm text-mistral-black/50 mb-10">Are you sure you want to cancel and remove this event?</p>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={closeModal}>BACK</Button>
                  <Button variant="brand" className="flex-1" onClick={handleDelete}>DELETE</Button>
                </div>
              </div>
            ) : modalMode === 'view' ? (
              <div className="py-4">
                <Badge variant="brand" className="mb-4">EVENT DETAILS</Badge>
                <h3 className="text-3xl font-normal tracking-tight mb-6 uppercase leading-tight">{selectedEvent.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-warm-ivory border border-mistral-black/5">
                    <p className="text-[10px] tracking-widest text-mistral-black/40 mb-1 uppercase">DATE</p>
                    <p className="text-xs font-normal uppercase tracking-tight">{selectedEvent.date}</p>
                  </div>
                  <div className="p-4 bg-warm-ivory border border-mistral-black/5">
                    <p className="text-[10px] tracking-widest text-mistral-black/40 mb-1 uppercase">VENUE</p>
                    <p className="text-xs font-normal uppercase tracking-tight">{selectedEvent.venue}</p>
                  </div>
                </div>
                <div className="mb-10">
                  <p className="text-[10px] tracking-widest text-mistral-black/40 mb-3 uppercase">ABOUT THE EVENT</p>
                  <p className="text-sm text-mistral-black/70 leading-relaxed whitespace-pre-line">
                    {selectedEvent.description}
                  </p>
                </div>
                <Button variant="primary" className="w-full py-4" onClick={closeModal}>CLOSE</Button>
              </div>
            ) : (
              <div className="py-4">
                <h3 className="text-2xl font-normal tracking-tight mb-8 uppercase">
                  {modalMode === 'create' ? 'CREATE EVENT' : 'EDIT EVENT'}
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">TITLE</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      required
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">DESCRIPTION</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleFormChange}
                      rows="3"
                      required
                      className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">DATE</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleFormChange}
                        required
                        className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-normal uppercase tracking-wider text-mistral-black/50">VENUE</label>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleFormChange}
                        required
                        className="bg-warm-ivory border border-mistral-black/10 px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors"
                      />
                    </div>
                  </div>
                  <Button type="submit" variant="brand" className="w-full py-4 mt-4">
                    {modalMode === 'create' ? 'POST EVENT' : 'SAVE CHANGES'}
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
