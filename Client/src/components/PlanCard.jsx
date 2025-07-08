import React from 'react';

export default function PlanCard({ title, price, description, features = [], comingSoon = false, dark = false }) {
  return (
    <div
      className={
        `w-full h-full rounded-2xl p-8 flex flex-col justify-between border transition-transform duration-200
        ${dark
          ? 'bg-neutral-900 border-neutral-800 shadow-xl hover:shadow-2xl hover:scale-[1.025]'
          : 'bg-white border-gray-100 shadow-lg hover:shadow-2xl hover:scale-[1.025]'}
        `
      }
    >
      <div>
        <h1 className={`text-2xl font-bold mb-2 text-center ${dark ? 'text-blue-300' : 'text-blue-700'}`}>{title}</h1>
        <div className={`text-xl font-semibold text-center mb-4 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>{price}</div>
        <p className={`text-base text-center mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
        {features.length > 0 && (
          <ul className={`list-disc list-inside text-left space-y-2 text-base pl-2 ${dark ? 'text-gray-200' : 'text-gray-700'}`}>
            {features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}
      </div>
      {comingSoon && (
        <div className="mt-8 text-center text-blue-400 font-semibold text-lg underline">Coming Soon <span role="img" aria-label="wink">😉</span></div>
      )}
    </div>
  );
} 