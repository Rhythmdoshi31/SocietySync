import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/public-ethereal.css';

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-md border border-[var(--ethereal-border)] bg-[rgba(255,255,255,0.02)] px-3 py-2 text-sm text-[var(--ethereal-fg)] outline-none placeholder:text-[var(--ethereal-fg-muted)] transition focus:border-[var(--ethereal-fg)] focus:bg-[rgba(255,255,255,0.04)]"
  />
);

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login/worker', form, {
        withCredentials: true,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('worker', JSON.stringify(res.data.user));

      window.location.href = "/dashboard/worker";
    } catch (err) {
      localStorage.removeItem('token');
      setErrorMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(false);
        return;
      }

      try {
        const res = await axios.get(`http://${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        if (res.data) {
          setUser(res.data);
          navigate('/dashboard/worker');
        } else {
          setUser(false);
          localStorage.removeItem('token');
        }
      } catch {
        setUser(false);
        localStorage.removeItem('token');
      }
    };

    checkAuth();
  }, [navigate]);

  if (user === null) {
    return (
      <div className="public-ethereal flex items-center justify-center min-h-screen">
        <div className="text-sm text-[var(--ethereal-fg-muted)]">
          Checking access...
        </div>
      </div>
    );
  }

  return (
    <div className="public-ethereal relative min-h-screen">
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24">

        {/* Divider */}
        <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-[var(--ethereal-border)] to-transparent" />

        {/* Heading */}
        <div className="max-w-lg">
          <h1 className="font-display text-4xl tracking-[0.02em]">
            Worker Access
          </h1>
          <p className="mt-3 text-sm text-[var(--ethereal-fg-muted)]">
            Access your assigned tasks, update status, and manage work efficiently.
          </p>
        </div>

        {/* Layout */}
        <div className="mt-16 grid gap-12 md:grid-cols-2">

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Worker Email"
              required
            />

            <Input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              required
            />

            {errorMessage && (
              <div className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md border border-[var(--ethereal-border)] bg-[rgba(255,255,255,0.04)] py-2 text-sm font-medium transition hover:bg-[rgba(255,255,255,0.08)]"
            >
              Login as Worker
            </button>

          </form>

          {/* SIDE PANEL */}
          <div className="space-y-6 text-sm text-[var(--ethereal-fg-muted)]">

            <div>
              <p className="text-xs uppercase tracking-wider">Navigation</p>

              <div className="mt-3 flex flex-col gap-2 text-xs">
                <Link to="/login" className="hover:text-[var(--ethereal-fg)]">
                  User Login
                </Link>
                <Link to="/login/admin" className="hover:text-[var(--ethereal-fg)]">
                  Admin Login
                </Link>
              </div>
            </div>

            <div className="h-px w-full bg-[var(--ethereal-border)]" />

            <div>
              <p className="text-xs uppercase tracking-wider">Note</p>
              <p className="mt-2 text-xs">
                Workers can view assigned tasks, update progress, and manage service requests efficiently.
              </p>
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