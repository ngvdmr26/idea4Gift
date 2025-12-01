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
    <div className="loading-container">
      
      {/* Background Glows */}
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '16rem', height: '16rem', background: 'rgba(127,125,243,0.2)', borderRadius: '50%', filter: 'blur(80px)'}}></div>
      
      {/* Main Visual: Floating Gift Orb */}
      <div className="animate-float">
        <div className="gift-orb">
          {/* Inner Gift Icon */}
          <Gift size={56} color="white" strokeWidth={1.5} className="animate-pulse" style={{filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.5))'}} />
          
          {/* Orbiting Particles */}
          <div className="orbit-particle">
            <div style={{position: 'absolute', top: 0, left: '50%', width: '0.5rem', height: '0.5rem', background: 'var(--color-accent-pink)', borderRadius: '50%', filter: 'blur(1px)', boxShadow: '0 0 10px #F472B6'}}></div>
          </div>
          <div className="orbit-particle" style={{animationDirection: 'reverse', animationDuration: '12s'}}>
             <div style={{position: 'absolute', bottom: '0.5rem', right: '1rem', width: '0.375rem', height: '0.375rem', background: 'var(--color-accent-cyan)', borderRadius: '50%', filter: 'blur(1px)', boxShadow: '0 0 10px #22D3EE'}}></div>
          </div>
        </div>
      </div>
      
      {/* Text Section */}
      <div style={{position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <h2 className="animate-slide-up" style={{fontSize: '1.5rem', fontWeight: '300', letterSpacing: '0.05em', minHeight: '2rem'}}>
          {loadingTexts[textIndex]}
        </h2>
        
        {/* Custom Loader Line */}
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>

    </div>
  );
};