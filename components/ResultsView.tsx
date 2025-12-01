import React from 'react';
import { GiftIdea } from '../types';
import { ArrowLeft, Sparkles, BrainCircuit } from 'lucide-react';

interface ResultsViewProps {
  giftIdeas: GiftIdea[];
  onBack: () => void;
}

// Logo Components for visual polish
const OzonLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#005BFF"/>
    <path d="M50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20ZM50 70C38.9543 70 30 61.0457 30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70Z" fill="white"/>
    <path d="M72 25L82 15" stroke="white" strokeWidth="5" strokeLinecap="round"/>
  </svg>
);

const WBLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg viewBox="0 0 100 100" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="#FC3F1D"/>
    <path d="M40 80V20L70 20L55 50L75 80" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ResultsView: React.FC<ResultsViewProps> = ({ giftIdeas, onBack }) => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-dark-950/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between shadow-2xl pt-safe">
        <button 
          onClick={onBack}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white border border-white/10 touch-manipulation"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-accent-pink font-bold tracking-[0.2em] uppercase">Подобрано для вас</span>
        </div>
        <div className="w-10"></div> 
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5 space-y-6 pb-24 sm:pb-safe">
        {giftIdeas.map((gift, index) => (
          <div 
            key={index} 
            className="group relative bg-dark-900/60 backdrop-blur-md rounded-[1.5rem] border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/30 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Top Highlight Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent-pink to-primary opacity-50"></div>

            <div className="p-5 sm:p-6">
              {/* Header: Title & Price */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight flex-1 drop-shadow-md">
                  {gift.title}
                </h3>
                <div className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary/20 to-accent-pink/20 border border-white/10 text-white text-xs font-bold whitespace-nowrap shadow-inner">
                  {gift.estimatedPrice}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-4">
                {gift.description}
              </p>

              {/* Reasoning Block */}
              <div className="flex gap-3 items-start p-3 rounded-xl bg-dark-950/50 border border-white/5 mb-5">
                <BrainCircuit className="text-accent-cyan w-4 h-4 mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed italic">
                  {gift.reasoning}
                </p>
              </div>

              {/* Marketplace Logos */}
              <div className="pt-3 border-t border-white/5">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Найти на маркетплейсах</span>
                  <div className="flex gap-4 sm:gap-3 w-full sm:w-auto justify-end">
                    <a 
                      href={`https://www.ozon.ru/search/?text=${encodeURIComponent(gift.searchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl hover:scale-110 transition-transform shadow-lg shadow-ozon/20"
                      title="Ozon"
                    >
                      <OzonLogo />
                    </a>
                    <a 
                      href={`https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(gift.searchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl hover:scale-110 transition-transform shadow-lg shadow-wb/20"
                      title="Wildberries"
                    >
                      <WBLogo />
                    </a>
                    <a 
                      href={`https://market.yandex.ru/search?text=${encodeURIComponent(gift.searchQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-xl hover:scale-110 transition-transform shadow-lg shadow-yandex/20"
                      title="Yandex Market"
                    >
                      <YandexLogo />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors duration-500"></div>
          </div>
        ))}
        
        {/* End of list decoration */}
        <div className="flex justify-center items-center gap-2 pt-4 opacity-40">
           <Sparkles className="w-4 h-4 text-white" />
           <span className="text-xs text-white">Больше идей не найдено</span>
        </div>
      </div>
    </div>
  );
};