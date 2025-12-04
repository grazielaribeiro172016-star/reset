import React, { useState, useEffect } from 'react';
import { AppStep, UserInput, ResetResponseData } from './types';
import { generateResetPlan } from './services/geminiService';
import { Button } from './components/Button';
import { ProfessionalDirectory, ProfessionalRegister } from './components/ProfessionalSystem';
import { ArrowRight, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userInput, setUserInput] = useState<UserInput>({ context: '' });
  const [result, setResult] = useState<ResetResponseData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleSubmit = async () => {
    if (!userInput.context.trim()) return;
    
    setStep(AppStep.PROCESSING);
    setLoading(true);

    try {
      const data = await generateResetPlan(userInput);
      setResult(data);
      setStep(AppStep.RESULT);
    } catch (err) {
      setStep(AppStep.INPUT_CONTEXT);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setUserInput({ context: '' });
    setResult(null);
    setStep(AppStep.WELCOME);
  };

  const handleVIPConnect = () => {
    setStep(AppStep.VIP_DIRECTORY);
  };

  // --- RENDER FUNCTIONS ---

  const renderWelcome = () => (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden bg-black selection:bg-white selection:text-black">
      
      {/* Ambient Spotlight Effect - Tech Vibe */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        
        {/* Badge Tech */}
        <div className="mb-8 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-400 backdrop-blur-md">
              Protocolo de Reinicialização Mental
            </span>
        </div>

        {/* Título Massivo */}
        <h1 className="text-[5.5rem] md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-8 select-none animate-slide-up">
          RESET.
        </h1>

        {/* Frase Quebrada - Hierarquia Visual */}
        <div className="flex flex-col gap-2 mb-12 animate-slide-up [animation-delay:400ms] [animation-fill-mode:forwards] opacity-0">
          <p className="text-xl md:text-2xl font-semibold text-gray-600 tracking-tight">
            Você não desiste.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Você reinicia.
          </p>
        </div>

        {/* Action Block */}
        <div className="flex flex-col items-center gap-6 animate-slide-up [animation-delay:600ms] [animation-fill-mode:forwards] opacity-0 w-full max-w-md">
          <Button 
            onClick={() => setStep(AppStep.INPUT_CONTEXT)} 
            className="w-full md:w-auto min-w-[200px] text-base py-5"
          >
            Iniciar Desbloqueio
          </Button>

          {/* Micro-copy técnica (substituindo a frase longa) */}
          <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-medium">
             <span>Foco</span>
             <span className="w-1 h-1 rounded-full bg-gray-800" />
             <span>Força</span>
             <span className="w-1 h-1 rounded-full bg-gray-800" />
             <span>Ação Imediata</span>
          </div>
        </div>

      </div>

      {/* Footer Discreet Link */}
      <div className="absolute bottom-8 animate-fade-in [animation-delay:1000ms] opacity-0 [animation-fill-mode:forwards]">
        <button 
          onClick={() => setStep(AppStep.VIP_REGISTER)}
          className="text-xs text-gray-800 hover:text-gray-500 transition-colors tracking-wide"
        >
          Acesso Profissional
        </button>
      </div>

      {/* PLANO B Branding Corner */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 animate-fade-in [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
         <span className="text-[9px] md:text-[10px] font-black text-[#1a1a1a] tracking-[0.3em] uppercase hover:text-[#333] transition-colors cursor-default">
            PLANO B®
         </span>
      </div>
    </div>
  );

  const renderInput = () => (
    <div className="flex flex-col justify-center min-h-screen max-w-3xl mx-auto px-6 animate-slide-up">
      <button 
        onClick={() => setStep(AppStep.WELCOME)} 
        className="text-gray-600 hover:text-white mb-12 w-fit transition-colors text-xs font-bold tracking-widest uppercase"
      >
        ← Cancelar
      </button>

      <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
        O que está ocupando<br />sua mente agora?
      </h2>
      
      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity blur-xl"></div>
        <textarea
          autoFocus
          value={userInput.context}
          onChange={(e) => setUserInput({ context: e.target.value })}
          placeholder="Descreva o bloqueio..."
          className="w-full bg-transparent text-xl md:text-2xl text-white placeholder-gray-800 outline-none resize-none min-h-[200px] leading-relaxed font-normal border-l-4 border-gray-900 pl-6 focus:border-white transition-all duration-500"
        />
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={!userInput.context.trim()}
          className="px-10"
        >
          Analisar <ArrowRight className="inline ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="w-24 h-0.5 bg-gray-900 rounded-full overflow-hidden mb-8">
        <div className="w-full h-full bg-white animate-[slideUp_1.5s_ease-in-out_infinite] origin-left scale-x-50"></div>
      </div>
      <p className="text-gray-500 tracking-[0.2em] text-[10px] uppercase font-bold animate-pulse">
        Processando Padrões
      </p>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="min-h-screen bg-black text-white pt-20 pb-20 px-6">
        <div className="max-w-4xl mx-auto animate-slide-up">
          
          {/* Header */}
          <div className="mb-16 border-b border-gray-900 pb-10">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 block">
              Relatório de Triage
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-4">
              {result.crisisType}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl">
              Caminhos de desbloqueio identificados.
            </p>
          </div>

          {/* 3 Columns */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {result.approaches.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="border-l border-gray-900 pl-6 group-hover:border-white transition-colors duration-300">
                    <span className="text-[10px] font-mono text-gray-600 mb-2 block uppercase tracking-wider">
                        0{idx + 1} // {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm group-hover:text-gray-400 transition-colors">
                    {item.description}
                    </p>
                </div>
              </div>
            ))}
          </div>

          {/* Immediate Action / VIP Trigger */}
          <div className={`p-8 md:p-12 rounded-none md:rounded-3xl mb-16 border transition-colors duration-500 ${result.isVIPContext ? 'border-transparent bg-white text-black' : 'border-gray-800 bg-[#050505]'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block ${result.isVIPContext ? 'text-black/40' : 'text-gray-500'}`}>
              Protocolo de Ação Imediata
            </span>
            <h3 className={`text-2xl md:text-4xl font-bold mb-8 leading-tight ${result.isVIPContext ? 'text-black' : 'text-white'}`}>
              {result.immediateAction}
            </h3>
            
            {result.isVIPContext && (
              <Button onClick={handleVIPConnect} className="bg-black text-white border-black hover:bg-gray-800 hover:text-white shadow-none w-full md:w-auto justify-center flex">
                Acessar Área VIP <ChevronRight className="ml-2 w-4 h-4 inline" />
              </Button>
            )}
          </div>

          {/* Identity Footer */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-500 italic mb-12 text-base md:text-lg font-serif">"{result.identityValidation}"</p>
            
            {!result.isVIPContext && (
               <button onClick={handleRestart} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors border border-white/10 px-6 py-3 rounded-full hover:bg-white/5">
                 Novo Reset
               </button>
            )}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      {step === AppStep.WELCOME && renderWelcome()}
      {step === AppStep.INPUT_CONTEXT && renderInput()}
      {step === AppStep.PROCESSING && renderProcessing()}
      {step === AppStep.RESULT && renderResult()}
      {step === AppStep.VIP_DIRECTORY && <ProfessionalDirectory onBack={() => setStep(AppStep.RESULT)} />}
      {step === AppStep.VIP_REGISTER && <ProfessionalRegister onBack={() => setStep(AppStep.WELCOME)} />}
    </div>
  );
};

export default App;