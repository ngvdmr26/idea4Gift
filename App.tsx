import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsView } from './components/ResultsView';
import { AppView, GiftIdea, UserInput } from './types';
import { generateGiftIdeas } from './services/geminiService';
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
    <div className="relative w-full h-[100dvh] bg-dark-950 text-white overflow-hidden font-sans">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-primary/30 rounded-full blur-[100px] animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-20%] w-[250px] h-[250px] bg-accent-pink/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[350px] h-[350px] bg-accent-cyan/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 h-full w-full max-w-md mx-auto flex flex-col">
        
        {view === AppView.INPUT && (
          <div className="h-full animate-scale-in">
            <InputForm 
              input={input} 
              setInput={setInput} 
              onGenerate={handleGenerate} 
            />
          </div>
        )}

        {view === AppView.LOADING && (
          <div className="h-full animate-scale-in">
            <LoadingScreen />
          </div>
        )}

        {view === AppView.RESULTS && (
          <div className="h-full animate-scale-in">
            <ResultsView 
              giftIdeas={giftIdeas} 
              onBack={resetApp} 
            />
          </div>
        )}

        {view === AppView.ERROR && (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 animate-scale-in glass-panel m-4 rounded-3xl border-red-500/20">
            <div className="bg-red-500/10 p-6 rounded-full text-red-500 ring-1 ring-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
               <AlertCircle size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">Ошибка</h3>
              <p className="text-gray-400 mt-2">{error}</p>
            </div>
            <button 
              onClick={resetApp}
              className="mt-4 px-8 py-3 bg-dark-800 border border-dark-700 rounded-2xl hover:bg-dark-700 transition-all flex items-center gap-2 group"
            >
              <Sparkles size={18} className="text-primary group-hover:rotate-12 transition-transform"/>
              <span>Попробовать снова</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;