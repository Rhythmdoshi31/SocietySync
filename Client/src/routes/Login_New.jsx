import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ name: '', houseNo: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    try {
      const res = await axios.post(`https://societysync-production.up.railway.app/api/auth${endpoint}`, form, {
        withCredentials: true,
      });

      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Delay navigation slightly to ensure storage is complete
      // setTimeout(() => {
      //   navigate("/dashboard");
      // }, 3000);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative min-h-[100svh] min-w-[100svw] flex flex-col justify-center items-center overflow-x-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
      <div className="flex items-center justify-center min-h-[90svh] w-full overflow-hidden px-2">
        <div className="border-2 border-neutral-800 p-1 rounded-2xl animate-slideIn w-full max-w-md mx-auto shadow-xl bg-neutral-900/90">
          <div className="p-6 sm:p-8 rounded-2xl w-full">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 text-center animate-pulseText">
              {isLogin ? 'Login to SocietySync' : 'Register for SocietySync'}
            </h2>
            <form onSubmit={handleSubmit} className="min-h-[30svh] w-full space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="houseNo" className="block text-sm font-medium text-gray-700">
                      House Number
                    </label>
                    <input
                      type="text"
                      id="houseNo"
                      name="houseNo"
                      onChange={handleChange}
                      className="mt-1 block w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                      placeholder="e.g., A-101"
                    />
                  </div>
                </>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-lg hover:scale-105 hover:ring-2 hover:ring-cyan-300 transition-all duration-200"
              >
                {isLogin ? 'Login' : 'Register'}
              </button>
              <p
                onClick={() => setIsLogin(prev => !prev)}
                className="text-center text-blue-500 hover:underline cursor-pointer mt-4"
              >
                {isLogin ? 'Need to register?' : 'Already have an account?'}
              </p>
            </form>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center mt-4'>
              <h1 onClick={() => navigate("/login/admin")} className='text-blue-400 cursor-pointer hover:text-blue-500 underline'>Are you an Admin?</h1>
              <h1 onClick={() => navigate("/login/worker")} className='text-blue-400 hover:text-blue-500 underline'>Are you a Worker?</h1>
            </div>
          </div>
        </div>
      </div>
      {isLogin && (
        <div className='absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center w-full px-2'>
          <h1 className='text-lg sm:text-xl text-gray-200 mb-2'>First time here?</h1>
          <button onClick={() => navigate('/discover')} className='bg-neutral-800 text-blue-200 whitespace-nowrap hover:bg-neutral-700 transition-colors rounded-xl px-4 py-2 text-lg sm:text-[22px] md:text-[18px] font-semibold shadow-md hover:bg-gray-800 shadow-lg shadow-black'>
            Discover SocietySync
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
