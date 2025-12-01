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
    <div className="input-view-container pb-safe">
      <div className="form-content">
        
        {/* Top Content Container */}
        <div>
          
          {/* Header Section */}
          <div className="header-section animate-slide-up">
            <div style={{position: 'relative', display: 'inline-block'}}>
              <div className="icon-wrapper">
                <Gift className="text-primary" size={28} style={{color: 'var(--color-primary)'}} />
              </div>
            </div>
            
            <div style={{marginTop: '1rem'}}>
              <h1 className="main-title gradient-text">
                Дари <br /> Эмоции
              </h1>
              <p className="subtitle">
                Умный помощник для поиска идеального подарка за секунды.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Description Input */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label className="input-label" style={{color: 'rgba(127,125,243,0.8)'}}>
                <Heart size={14} />
                Кому и какой повод?
              </label>
              <div style={{position: 'relative'}}>
                <textarea
                  className="glass-input textarea-styled"
                  placeholder="Например: Девушка, 25 лет. Любит йогу, минимализм и матча латте..."
                  value={input.description}
                  onChange={(e) => setInput({ ...input, description: e.target.value })}
                />
              </div>
            </div>

            {/* Budget Input */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <label className="input-label" style={{color: 'rgba(34,211,238,0.8)'}}>
                <Wallet size={14} />
                Бюджет
              </label>
              <div style={{position: 'relative'}}>
                <input
                  type="text"
                  className="glass-input input-styled"
                  placeholder="Например: 5000 руб"
                  value={input.budget}
                  onChange={(e) => setInput({ ...input, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onGenerate}
            disabled={!isFormValid}
            className="submit-btn"
          >
            {/* Animated Background for Button */}
            <div className="btn-bg-gradient"></div>
            
            {/* Shine Effect */}
            {isFormValid && (
              <div className="shine-effect" />
            )}

            <span style={{position: 'relative', zIndex: 10, fontWeight: 'bold', color: 'white', letterSpacing: '0.025em'}}>
              Придумать Подарок
            </span>
            <Sparkles size={20} className={isFormValid ? "animate-pulse" : ""} style={{position: 'relative', zIndex: 10, color: 'white'}} />
          </button>
        </div>
      </div>
    </div>
  );
};