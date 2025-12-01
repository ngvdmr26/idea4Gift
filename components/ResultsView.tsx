import React from 'react';
import { GiftIdea } from '../types';
import { ArrowLeft, Sparkles, BrainCircuit } from 'lucide-react';

interface ResultsViewProps {
  giftIdeas: GiftIdea[];
  onBack: () => void;
}

// Logo Components
const OzonLogo = () => (
  <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%', padding: '20%'}} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#005BFF"/>
    <path d="M50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20ZM50 70C38.9543 70 30 61.0457 30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70Z" fill="white"/>
    <path d="M72 25L82 15" stroke="white" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

const WBLogo = () => (
  <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%', padding: '20%'}} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="wb_grad" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#CB11AB" />
        <stop offset="100%" stopColor="#880E4F" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="url(#wb_grad)"/>
    <path d="M20 30L35 80L50 30L65 80L80 30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const YandexLogo = () => (
  <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%', padding: '20%'}} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#FC3F1D"/>
    <path d="M40 80V20L70 20L55 50L75 80" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ResultsView: React.FC<ResultsViewProps> = ({ giftIdeas, onBack }) => {
  return (
    <div className="results-container">
      {/* Header */}
      <div className="results-header pt-safe">
        <button 
          onClick={onBack}
          className="back-btn"
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <span style={{fontSize: '0.625rem', color: 'var(--color-accent-pink)', fontWeight: 'bold', letterSpacing: '0.2em', textTransform: 'uppercase'}}>Подобрано для вас</span>
        </div>
        <div style={{width: '2.5rem'}}></div> 
      </div>

      {/* Scrollable List */}
      <div className="results-list pb-safe">
        {giftIdeas.map((gift, index) => (
          <div 
            key={index} 
            className="gift-card animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Top Highlight Bar */}
            <div className="card-top-bar"></div>

            <div className="card-content">
              {/* Header: Title & Price */}
              <div className="card-title-row">
                <h3 className="card-title">
                  {gift.title}
                </h3>
                <div className="price-badge">
                  {gift.estimatedPrice}
                </div>
              </div>
              
              {/* Description */}
              <p className="card-desc">
                {gift.description}
              </p>

              {/* Reasoning Block */}
              <div className="reasoning-box">
                <BrainCircuit className="text-accent-cyan" size={16} style={{marginTop: '0.125rem', flexShrink: 0, color: 'var(--color-accent-cyan)'}} />
                <p className="reasoning-text">
                  {gift.reasoning}
                </p>
              </div>

              {/* Marketplace Logos */}
              <div className="market-section">
                <span className="market-label">Найти на маркетплейсах</span>
                <div className="market-buttons">
                  <a 
                    href={`https://www.ozon.ru/search/?text=${encodeURIComponent(gift.searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                    title="Ozon"
                  >
                    <OzonLogo />
                  </a>
                  <a 
                    href={`https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(gift.searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                    title="Wildberries"
                  >
                    <WBLogo />
                  </a>
                  <a 
                    href={`https://market.yandex.ru/search?text=${encodeURIComponent(gift.searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="market-link"
                    title="Yandex Market"
                  >
                    <YandexLogo />
                  </a>
                </div>
              </div>
            </div>

            {/* Decorative Background Glow */}
            <div style={{position: 'absolute', bottom: '-2.5rem', right: '-2.5rem', width: '8rem', height: '8rem', background: 'rgba(127,125,243,0.1)', filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none'}}></div>
          </div>
        ))}
        
        {/* End of list decoration */}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', paddingTop: '1rem', opacity: 0.4}}>
           <Sparkles size={16} color="white" />
           <span style={{fontSize: '0.75rem', color: 'white'}}>Больше идей не найдено</span>
        </div>
      </div>
    </div>
  );
};