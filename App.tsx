import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsView } from './components/ResultsView';
import { AppView, GiftIdea, UserInput } from './types';
import { generateGiftIdeas } from "./services/grokService";
import { AlertCircle, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.INPUT);
  const [input, setInput] = useState<UserInput>({ description: '', budget: '' });
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setView(AppView.LOADING);
    setError(null);
    try {
      const response = await generateGiftIdeas(input.description, input.budget);
      setGiftIdeas(response.giftIdeas);
      setView(AppView.RESULTS);
    } catch (err) {
      console.error(err);
      setError("Не удалось сгенерировать идеи. Проверьте соединение.");
      setView(AppView.ERROR);
    }
  };

  const resetApp = () => {
    setView(AppView.INPUT);
    setGiftIdeas([]);
    setError(null);
  };

  return (
    <div className="app-container">
      
      {/* Dynamic Animated Background */}
      <div className="app-bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Noise Pattern Overlay */}
      <div className="noise-overlay"></div>

      {/* Main Content */}
      <div className="content-wrapper">
        
        {view === AppView.INPUT && (
          <div style={{height: '100%'}} className="animate-scale-in">
            <InputForm 
              input={input} 
              setInput={setInput} 
              onGenerate={handleGenerate} 
            />
          </div>
        )}

        {view === AppView.LOADING && (
          <div style={{height: '100%'}} className="animate-scale-in">
            <LoadingScreen />
          </div>
        )}

        {view === AppView.RESULTS && (
          <div style={{height: '100%'}} className="animate-scale-in">
            <ResultsView 
              giftIdeas={giftIdeas} 
              onBack={resetApp} 
            />
          </div>
        )}

        {view === AppView.ERROR && (
          <div className="error-view animate-scale-in glass-panel" style={{margin: '1rem', borderRadius: '1.5rem'}}>
            <div className="error-icon-box">
               <AlertCircle size={48} />
            </div>
            <div>
              <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Ошибка</h3>
              <p style={{color: '#9CA3AF'}}>{error}</p>
            </div>
            <button 
              onClick={resetApp}
              className="submit-btn"
              style={{marginTop: '1.5rem', width: 'auto', padding: '0.75rem 2rem', background: '#1C1C21'}}
            >
              <Sparkles size={18} style={{color: 'var(--color-primary)'}}/>
              <span style={{fontSize: '1rem', fontWeight: '500', color: 'white'}}>Попробовать снова</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
