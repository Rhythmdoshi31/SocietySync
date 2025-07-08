import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';
import PlanCard from '../components/PlanCard';

export default function Discover() {
  let navigate = useNavigate();
  return (
    <div className="min-h-[100svh] flex flex-col items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative">
      {/* Elegant Header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-24 text-blue-400 text-4xl font-extrabold tracking-tight select-none drop-shadow-lg">SocietySync</div>
      {/* Subtle Back Button */}
      <button
        onClick={() => navigate('/login')}
        className="absolute left-8 top-6 text-blue-300 hover:text-blue-500 text-lg font-medium px-3 py-1 rounded-lg transition-colors bg-neutral-900/80 shadow border border-blue-900"
        aria-label="Back to Login"
      >
        ← Back
      </button>
      {/* Contact */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 text-gray-400 text-base text-center select-none">
        Contact us: <a href="mailto:contact@SocietySync.com" className="text-blue-400 hover:underline">contact@SocietySync.com</a>
      </div>
      {/* Swiper with PlanCards */}
      <div className="w-full flex justify-center items-center mt-32 mb-20 min-h-[60svh]">
        <Swiper
          modules={[Navigation]}
          spaceBetween={32}
          slidesPerView={1.1}
          centeredSlides={true}
          navigation
          initialSlide={1}
          speed={600}
          className="w-[95vw] md:w-[50vw] min-h-[55svh]"
        >
          <SwiperSlide>
            <PlanCard
              title="Basic Plan"
              price="₹899/month"
              description="Ideal for small or budget-conscious societies."
              features={[
                'Up to 50 flats',
                'Complaint Management',
                'Service Management',
                'Events & Notice Board',
                'Resident Directory',
                'Worker Dashboard',
              ]}
              dark
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlanCard
              title="Standard Plan"
              price="₹1499/month"
              description="Best for medium-sized societies needing extra features."
              features={[
                'Up to 150 flats',
                'Event Announcements',
                'Service Management',
                'Visitor & Delivery Logs',
                'Security Cams',
                'Worker Dashboard',
              ]}
              dark
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlanCard
              title="Premium Plan"
              price="₹2499/month"
              description="Tailored for gated communities with full access to features."
              features={[
                '150+ flats',
                'Facility Booking System',
                'Polls & Surveys',
                'Visitor & Delivery Logs',
                'Security Cams',
                'AI chatbots for residents',
                '24x7 Support',
              ]}
              dark
            />
          </SwiperSlide>
          <SwiperSlide>
            <PlanCard
              title="Custom Plan"
              price="Flexible Pricing"
              description="Pay only for what you need!"
              comingSoon
              dark
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
