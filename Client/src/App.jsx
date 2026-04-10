import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardContent from './components/DashboardContent';
import WorkerDashBoard from './components/WorkerDashBoard';
import AdminLogin from './routes/AdminLogin';
import Complaints from './routes/Complaints';
import Emergency from './routes/Emergency';
import Events from './routes/Events';
import Login from './routes/Login_New';
import Me from './routes/Me';
import Ordering from './routes/Ordering';
import RentMaintenance from './routes/RentMaintenance';
import SecurityCams from './routes/Security-cams';
import Services from './routes/Services';
import VisitorAndDelivery from './routes/VisitorAndDelivery';
import WorkerLogin from './routes/WorkerLogin';
import PublicLayout from './components/public/PublicLayout';
import AboutPage from './routes/public/AboutPage';
import DemoPage from './routes/public/DemoPage';
import FeaturesPage from './routes/public/FeaturesPage';
import LandingPage from './routes/public/LandingPage';
import PricingPage from './routes/public/PricingPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
    const storedWorker = localStorage.getItem('worker');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token && storedAdmin) {
      setUser(JSON.parse(storedAdmin));
    } else if (token && storedWorker) {
      setUser(JSON.parse(storedWorker));
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Route>

      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/worker" element={<WorkerLogin />} />

      <Route path="/dashboard" element={<Layout user={user} />}>
        <Route index element={<DashboardContent />} />
        <Route path="worker" element={<WorkerDashBoard />} />
        <Route path="events" element={<Events />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="ordering" element={<Ordering />} />
        <Route path="emergency" element={<Emergency />} />
        <Route path="services" element={<Services />} />
        <Route path="rent-maintenance" element={<RentMaintenance />} />
        <Route path="me" element={<Me />} />
        <Route path="security-cams" element={<SecurityCams />} />
        <Route path="visitor-delivery" element={<VisitorAndDelivery />} />
      </Route>

      <Route path="/discover" element={<Navigate to="/" replace />} />
      <Route path="/events" element={<Navigate to="/dashboard/events" replace />} />
      <Route path="/complaints" element={<Navigate to="/dashboard/complaints" replace />} />
      <Route path="/ordering" element={<Navigate to="/dashboard/ordering" replace />} />
      <Route path="/emergency" element={<Navigate to="/dashboard/emergency" replace />} />
      <Route path="/services" element={<Navigate to="/dashboard/services" replace />} />
      <Route path="/rent-maintenance" element={<Navigate to="/dashboard/rent-maintenance" replace />} />
      <Route path="/me" element={<Navigate to="/dashboard/me" replace />} />
      <Route path="/security-cams" element={<Navigate to="/dashboard/security-cams" replace />} />
      <Route path="/visitor-delivery" element={<Navigate to="/dashboard/visitor-delivery" replace />} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default App;
