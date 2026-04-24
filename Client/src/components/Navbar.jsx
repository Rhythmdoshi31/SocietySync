import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user') || localStorage.getItem('admin') || localStorage.getItem('worker');
    
    if (token && storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj);
      
      const fetchProfilePic = async () => {
        try {
          const response = await fetch(`https://${import.meta.env.VITE_BACKEND_URL}/api/me/profile-picture/${userObj.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const blob = await response.blob();
            setProfilePicture(URL.createObjectURL(blob));
          }
        } catch (error) {
          console.error('Error fetching profile picture:', error);
        }
      };
      fetchProfilePic();
    }
  }, []);

  return (
    <nav className="h-20 bg-warm-ivory border-b border-mistral-black/20 flex items-center justify-between px-6 md:px-12 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 hover:bg-mistral-black/5 transition-colors">
          <Menu className="w-6 h-6 text-mistral-black" />
        </button>
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mistral-black/60" />
          <input 
            type="text" 
            placeholder="SEARCH..." 
            className="bg-white border border-mistral-black/30 px-10 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-brand-orange w-64 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-mistral-black/5 transition-colors relative">
          <Bell className="w-5 h-5 text-mistral-black/60" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand-orange rounded-full"></span>
        </button>
        
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/dashboard/me")}
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-normal text-mistral-black leading-none uppercase tracking-tighter">
              {user?.name || 'User'}
            </p>
            <p className="text-[10px] text-mistral-black/60 font-bold uppercase tracking-widest mt-1">
              {user?.houseNo || 'Member'}
            </p>
          </div>
          <div className="w-10 h-10 border border-mistral-black/30 overflow-hidden shadow-sm">
            <img 
              src={profilePicture || "https://placehold.co/100"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;