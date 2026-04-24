import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/public-ethereal.css';

const demoDefaults = {
  email: 'demo@societysync.com',
  password: 'demo123',
};

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full rounded-md border border-[var(--ethereal-border)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-[var(--ethereal-fg)] outline-none placeholder:text-[var(--ethereal-fg-muted)] transition focus:border-[var(--ethereal-fg)] focus:bg-[rgba(255,255,255,0.04)]"
  />
);

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ name: '', houseNo: '', email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stateDemo = location.state?.demoCredentials;
    if (stateDemo) {
      setForm((prev) => ({ ...prev, ...stateDemo }));
      setIsLogin(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/register';

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await axios.post(`http://${import.meta.env.VITE_BACKEND_URL}/api/auth${endpoint}`, form, {
        withCredentials: true,
      });

      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (setUser) setUser(user);

      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setIsLogin(true);
    setForm((prev) => ({ ...prev, ...demoDefaults }));
    setErrorMessage('');
  };

  return (
    <div className="public-ethereal relative min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">
  
        {/* Top divider */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[var(--ethereal-border)] to-transparent" />
  
        {/* Heading */}
        <div className="max-w-lg">
          <h1 className="font-display text-4xl tracking-[0.02em]">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="mt-3 text-sm text-[var(--ethereal-fg-muted)]">
            Access your society dashboard and manage everything seamlessly.
          </p>
        </div>
  
        {/* Main Grid */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">
  
          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
  
            {!isLogin && (
              <>
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
                <Input name="houseNo" value={form.houseNo} onChange={handleChange} placeholder="House Number" />
              </>
            )}
  
            <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
            <Input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
  
            {errorMessage && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMessage}
              </div>
            )}
  
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-md border border-[var(--ethereal-border)] bg-[rgba(255,255,255,0.04)] py-2 text-sm font-medium transition hover:bg-[rgba(255,255,255,0.08)] disabled:opacity-50"
            >
              {isSubmitting ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
  
            <div className="text-xs text-[var(--ethereal-fg-muted)]">
              {isLogin ? 'New here?' : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={() => setIsLogin(prev => !prev)}
                className="hover:text-[var(--ethereal-fg)]"
              >
                {isLogin ? 'Create account' : 'Login'}
              </button>
            </div>
          </form>
  
          {/* SIDE PANEL */}
          <div className="space-y-6 text-sm text-[var(--ethereal-fg-muted)]">
  
            <div>
              <p className="text-xs uppercase tracking-wider">Demo Access</p>
              <p className="mt-2 text-[var(--ethereal-fg)]">demo@societysync.com</p>
              <p className="text-[var(--ethereal-fg)]">demo123</p>
  
              <button
                onClick={fillDemoCredentials}
                className="mt-3 text-xs hover:text-[var(--ethereal-fg)]"
              >
                Autofill demo →
              </button>
            </div>
  
            <div className="h-px w-full bg-[var(--ethereal-border)]" />
  
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wider">Quick Access</p>
              <div className="flex gap-4 text-xs">
                <Link to="/demo" className="hover:text-[var(--ethereal-fg)]">Demo</Link>
                <button onClick={() => navigate('/login/admin')} className="hover:text-[var(--ethereal-fg)]">Admin</button>
                <button onClick={() => navigate('/login/worker')} className="hover:text-[var(--ethereal-fg)]">Worker</button>
              </div>
            </div>
  
          </div>
        </div>
  
        {/* Bottom divider */}
        <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-[var(--ethereal-border)] to-transparent" />
  
      </div>
    </div>
  );
};

export default Login;