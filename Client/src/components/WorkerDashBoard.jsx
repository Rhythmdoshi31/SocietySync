import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageHeader from './ui/PageHeader';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { CheckCircle2, Clock, ListTodo, ClipboardList } from 'lucide-react';

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
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Worker Dashboard" 
        subtitle={`Welcome back, ${workerData.name} • Task Overview for Today`}
      >
        <div className="hidden md:block text-right px-2">
          <p className="text-[10px] font-bold tracking-[0.2em] text-mistral-black/60 uppercase">{formattedDate}</p>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col h-32 border-l-4 border-l-mistral-black">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-mistral-black/10"><ListTodo className="w-4 h-4 text-mistral-black/60" /></div>
            <Badge variant="outline" className="text-[10px] font-bold">TOTAL</Badge>
          </div>
          <div className="mt-auto">
            <p className="text-3xl font-bold tracking-tight">{tasks.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mistral-black/60">Assigned Tasks</p>
          </div>
        </Card>

        <Card className="flex flex-col h-32 border-l-4 border-l-brand-orange">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-brand-orange/10 text-brand-orange"><Clock className="w-4 h-4" /></div>
            <Badge variant="brand" className="text-[10px]">PENDING</Badge>
          </div>
          <div className="mt-auto">
            <p className="text-3xl font-bold tracking-tight text-brand-orange">{pendingTasks.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mistral-black/60">Requires Attention</p>
          </div>
        </Card>

        <Card className="flex flex-col h-32 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
            <Badge className="bg-emerald-500 text-white text-[10px]">COMPLETED</Badge>
          </div>
          <div className="mt-auto">
            <p className="text-3xl font-bold tracking-tight text-emerald-600">{completedTasks.length}</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-mistral-black/60">Successfully Closed</p>
          </div>
        </Card>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-mistral-black/60" />
            <h3 className="text-sm font-bold tracking-widest uppercase text-mistral-black/80">Task List</h3>
          </div>
          <div className="flex gap-1.5 p-1 bg-mistral-black/5 rounded-xl w-fit">
            {['All', 'Pending', 'Completed'].map((f) => (
              <button 
                key={f}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  filter === f 
                  ? 'bg-white text-mistral-black shadow-sm' 
                  : 'text-mistral-black/60 hover:text-mistral-black'
                }`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Card key={task._id || task.id} className="group border-border hover:border-mistral-black/20 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="brand" className="text-[10px] font-bold tracking-wider">{task.category.toUpperCase()}</Badge>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-mistral-black/60 tracking-widest uppercase">
                        HOUSE: {task.houseNo}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-foreground leading-relaxed max-w-2xl">
                      {task.detail}
                    </p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                    <span className={`text-[10px] tracking-[0.2em] font-bold uppercase ${task.status === 'open' ? 'text-brand-orange' : 'text-emerald-600'}`}>
                      {task.status === 'open' ? 'Pending' : 'Closed'}
                    </span>
                    {task.status === 'open' && (
                      <Button 
                        variant="primary" 
                        className="h-9 px-4 text-[10px]"
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
            <div className="py-20 text-center border-2 border-dashed border-border rounded-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-mistral-black/40">No tasks found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashBoard;
