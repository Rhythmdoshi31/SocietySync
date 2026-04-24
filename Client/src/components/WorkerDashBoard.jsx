import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Section from './ui/Section';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

const WorkerDashBoard = () => {
  const [workerData, setWorkerData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fn = async () => {
      const userData = localStorage.getItem('worker');
      const token = localStorage.getItem('token');

      if (!userData || !token) {
        navigate('/login'); 
      } else {
        try {
          const parsedUser = JSON.parse(userData);
          setWorkerData(parsedUser);

          const response = await axios.get(`https://${import.meta.env.VITE_BACKEND_URL}/api/services`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { page: 1, limit: 10 },
          });

          setTasks(response.data);
        } catch (e) {
          console.error('Error fetching complaints:', e);
          navigate('/login');
        }
      }
    };

    fn();
  }, [navigate]);

  const pendingTasks = tasks.filter(t => t.status === 'open');
  const completedTasks = tasks.filter(t => t.status === 'closed');

  const filteredTasks =
    filter === 'Pending'
      ? pendingTasks
      : filter === 'Completed'
      ? completedTasks
      : tasks;

  const handleCompletion = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`https://${import.meta.env.VITE_BACKEND_URL}/api/services/${id}`, {}, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", 
        },
      });
      // Refresh tasks
      const response = await axios.get(`https://${import.meta.env.VITE_BACKEND_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, limit: 10 },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error updating service:', error);
    }
  }    

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  if (!workerData) return null;

  return (
    <div className="pb-20">
      <Section
        eyebrow={formattedDate}
        title={<>WORKER<br /><span className="text-brand-orange">DASHBOARD</span></>}
        subtitle={`Welcome back, ${workerData.name.toUpperCase()}. Here is your task overview for today.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="ivory" className="flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-mistral-black/5"><ListTodo className="w-5 h-5" /></div>
              <Badge variant="outline">TOTAL</Badge>
            </div>
            <div className="mt-auto">
              <p className="text-5xl font-normal tracking-tighter">{tasks.length}</p>
              <p className="text-xs uppercase tracking-widest text-mistral-black/40 mt-2">ASSIGNED TASKS</p>
            </div>
          </Card>

          <Card variant="white" className="flex flex-col justify-between h-48 border-l-4 border-brand-orange shadow-none">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-brand-orange/10 text-brand-orange"><Clock className="w-5 h-5" /></div>
              <Badge variant="brand">PENDING</Badge>
            </div>
            <div className="mt-auto">
              <p className="text-5xl font-normal tracking-tighter text-brand-orange">{pendingTasks.length}</p>
              <p className="text-xs uppercase tracking-widest text-mistral-black/40 mt-2">REQUIRES ATTENTION</p>
            </div>
          </Card>

          <Card variant="ivory" className="flex flex-col justify-between h-48">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="w-5 h-5" /></div>
              <Badge className="bg-emerald-500 text-white">COMPLETED</Badge>
            </div>
            <div className="mt-auto">
              <p className="text-5xl font-normal tracking-tighter text-emerald-600">{completedTasks.length}</p>
              <p className="text-xs uppercase tracking-widest text-mistral-black/40 mt-2">SUCCESSFULLY CLOSED</p>
            </div>
          </Card>
        </div>

        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-mistral-black/5 pb-8">
          <h3 className="text-3xl font-normal tracking-tight uppercase">TASK LIST</h3>
          <div className="flex flex-wrap gap-2">
            {['All', 'Pending', 'Completed'].map((f) => (
              <Button 
                key={f}
                variant={filter === f ? 'primary' : 'outline'}
                className="py-1 px-4 text-[10px]"
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Card key={task._id || task.id} variant="white" className="shadow-none border border-mistral-black/5 hover:border-brand-orange/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline">{task.category}</Badge>
                      <span className="text-xs text-mistral-black/30 tracking-widest">HOUSE: {task.houseNo}</span>
                    </div>
                    <p className="text-lg font-normal text-mistral-black leading-relaxed">
                      {task.detail}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-4">
                    <span className={`text-[10px] tracking-[0.2em] font-normal uppercase ${task.status === 'open' ? 'text-brand-orange' : 'text-emerald-600'}`}>
                      {task.status === 'open' ? '• STATUS: PENDING' : '• STATUS: CLOSED'}
                    </span>
                    {task.status === 'open' && (
                      <Button 
                        variant="primary" 
                        className="py-2 text-[10px]"
                        onClick={() => handleCompletion(task._id)}
                      >
                        MARK COMPLETED
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-mistral-black/5">
              <p className="text-xs uppercase tracking-[0.3em] text-mistral-black/20">NO TASKS FOUND IN THIS CATEGORY</p>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

export default WorkerDashBoard;
