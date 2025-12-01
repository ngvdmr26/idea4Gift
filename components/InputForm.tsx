import React from 'react';
import { UserInput } from '../types';
import { Sparkles, Gift, Heart, Wallet } from 'lucide-react';

interface InputFormProps {
  input: UserInput;
  setInput: React.Dispatch<React.SetStateAction<UserInput>>;
  onGenerate: () => void;
}

export const InputForm: React.FC<InputFormProps> = ({ input, setInput, onGenerate }) => {
  const isFormValid = input.description.length > 3 && input.budget.length > 0;

  return (
    <div className="flex flex-col h-full w-full overflow-y-auto pb-safe">
      <div className="flex flex-col min-h-full p-4 sm:p-6 justify-between">
        
        {/* Top Content Container */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Header Section */}
          <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-6 animate-slide-up">
            <div className="relative inline-block">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/40 rounded-full blur-xl animate-pulse"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-dark-800 to-dark-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 relative z-10">
                <Gift className="text-primary w-7 h-7" />
              </div>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] gradient-text drop-shadow-sm">
                Дари <br /> Эмоции
              </h1>
              <p className="text-sm sm:text-base text-gray-400 font-light max-w-[260px]">
                Умный помощник для поиска идеального подарка за секунды.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-4 sm:space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            
            {/* Description Input */}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-primary/80 uppercase tracking-wider pl-1">
                <Heart size={14} />
                Кому и какой повод?
              </label>
              <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                <textarea
                  className="w-full glass-input rounded-3xl p-4 sm:p-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none h-32 sm:h-40 text-base sm:text-lg shadow-inner"
                  placeholder="Например: Девушка, 25 лет. Любит йогу, минимализм и матча латте..."
                  value={input.description}
                  onChange={(e) => setInput({ ...input, description: e.target.value })}
                />
                {/* Inner Glow */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/5 group-hover:border-white/10 transition-colors"></div>
              </div>
            </div>

            {/* Budget Input */}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-accent-cyan/80 uppercase tracking-wider pl-1">
                <Wallet size={14} />
                Бюджет
              </label>
              <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                <input
                  type="text"
                  className="w-full glass-input rounded-2xl p-4 sm:p-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 focus:border-accent-cyan/50 transition-all text-base sm:text-lg font-medium shadow-inner"
                  placeholder="Например: 5000 руб"
                  value={input.budget}
                  onChange={(e) => setInput({ ...input, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - Sticky-ish at bottom if space allows, otherwise flows */}
        <div className="pt-8 sm:pt-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onGenerate}
            disabled={!isFormValid}
            className={`
              group w-full relative overflow-hidden rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-3 transition-all duration-500 touch-manipulation
              ${isFormValid 
                ? 'shadow-[0_0_40px_rgba(127,125,243,0.4)] hover:shadow-[0_0_60px_rgba(127,125,243,0.6)] hover:-translate-y-1 active:scale-95' 
                : 'opacity-50 cursor-not-allowed'}
            `}
          >
            {/* Animated Background for Button */}
            <div className={`absolute inset-0 bg-gradient-to-r from-primary to-accent-pink transition-opacity duration-500 ${isFormValid ? 'opacity-100' : 'opacity-0 bg-dark-700'}`}></div>
            <div className={`absolute inset-0 bg-dark-800 ${isFormValid ? 'opacity-0' : 'opacity-100'}`}></div>
            
            {/* Shine Effect */}
            {isFormValid && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shine" />
            )}

            <span className="relative z-10 font-bold text-base sm:text-lg text-white tracking-wide">
              Придумать Подарок
            </span>
            <Sparkles size={20} className={`relative z-10 text-white ${isFormValid ? "animate-pulse" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};