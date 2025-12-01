import React, { useEffect, useState } from 'react';
import { Gift } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Анализируем интересы...",
    "Ищем что-то особенное...",
    "Проверяем цены...",
    "Упаковываем идеи..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse"></div>
      
      {/* Main Visual: Floating Gift Orb */}
      <div className="relative mb-16 animate-float">
        {/* Core Sphere */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-dark-800 to-dark-950 border border-white/10 flex items-center justify-center relative z-10 shadow-[0_0_60px_rgba(93,95,239,0.3)] backdrop-blur-md">
          {/* Inner Gift Icon */}
          <Gift className="w-14 h-14 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-[pulse_3s_ease-in-out_infinite]" strokeWidth={1.5} />
          
          {/* Orbiting Particles */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-pink rounded-full blur-[1px] shadow-[0_0_10px_#F472B6]"></div>
          </div>
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse]">
             <div className="absolute bottom-2 right-4 w-1.5 h-1.5 bg-accent-cyan rounded-full blur-[1px] shadow-[0_0_10px_#22D3EE]"></div>
          </div>
        </div>

        {/* Ripples */}
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
      </div>
      
      {/* Text Section */}
      <div className="relative z-10 space-y-4">
        <h2 className="text-2xl font-light text-white tracking-wide min-h-[2rem] transition-all duration-500 animate-slide-up">
          {loadingTexts[textIndex]}
        </h2>
        
        {/* Custom Loader Line */}
        <div className="w-48 h-1 bg-dark-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent w-full animate-shine"></div>
        </div>
      </div>

    </div>
  );
};