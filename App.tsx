
import React, { useState, useEffect } from 'react';
import { AppStep, WizardState } from './types';
import { generateNextStep } from './services/geminiService';
import { Button } from './components/Button';
import { ProfessionalDirectory, ProfessionalRegister } from './components/ProfessionalSystem';
import { ArrowRight, RotateCcw } from 'lucide-react';

// Estado Inicial do Wizard (Nível 0 - Hardcoded para carregamento instantâneo)
const INITIAL_WIZARD_STATE: WizardState = {
  stepLevel: 0,
  history: [],
  currentTitle: "Como você está agora?",
  currentDescription: "O primeiro passo para a mudança é reconhecer o estado atual.",
  options: [
    { id: '1', label: "Travado / Medo", value: "Sinto medo e paralisia" },
    { id: '2', label: "Caos / Sobrecarga", value: "Minha mente está um caos e não consigo priorizar" },
    { id: '3', label: "Sem Energia / Desânimo", value: "Sinto falta de motivação e energia" }
  ],
  isFinalAction: false
};

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [wizardState, setWizardState] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, wizardState]);

  const handleStart = () => {
    setWizardState(INITIAL_WIZARD_STATE);
    setStep(AppStep.WIZARD);
  };

  const handleOptionClick = async (optionValue: string) => {
    setLoading(true);
    
    // Constrói o novo histórico
    const newHistory = [...wizardState.history, optionValue];

    try {
      // Chama a IA com o histórico atualizado para pegar o próximo passo
      const nextState = await generateNextStep(newHistory);
      setWizardState(nextState);

      if (nextState.isFinalAction) {
        setStep(AppStep.RESULT);
      }
    } catch (error) {
      console.error("Erro no fluxo", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setStep(AppStep.WELCOME);
    setWizardState(INITIAL_WIZARD_STATE);
  };

  // --- RENDER FUNCTIONS ---

  const renderWelcome = () => (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden bg-black selection:bg-white selection:text-black">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <div className="mb-8 animate-fade-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-gray-400 backdrop-blur-md">
              Protocolo de Reinicialização Mental
            </span>
        </div>

        <h1 className="text-[5.5rem] md:text-[9rem] font-black text-white tracking-tighter leading-[0.85] mb-8 select-none animate-slide-up">
          RESET.
        </h1>

        <div className="flex flex-col gap-2 mb-12 animate-slide-up [animation-delay:400ms] [animation-fill-mode:forwards] opacity-0">
          <p className="text-xl md:text-2xl font-semibold text-gray-600 tracking-tight">
            Você não desiste.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            VOCÊ REINICIA.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 animate-slide-up [animation-delay:600ms] [animation-fill-mode:forwards] opacity-0 w-full max-w-md">
          <Button 
            onClick={handleStart}
            className="w-full md:w-auto min-w-[200px] text-base py-5"
          >
            INICIAR JORNADA
          </Button>

          <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-600 uppercase tracking-widest font-medium">
             <span>Iniciante</span>
             <span className="w-1 h-1 rounded-full bg-gray-800" />
             <span>Intermediário</span>
             <span className="w-1 h-1 rounded-full bg-gray-800" />
             <span>Avançado</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 animate-fade-in [animation-delay:1200ms] opacity-0 [animation-fill-mode:forwards]">
         <span className="text-[9px] md:text-[10px] font-black text-[#1a1a1a] tracking-[0.3em] uppercase hover:text-[#333] transition-colors cursor-default">
            PLANO B®
         </span>
      </div>
    </div>
  );

  const renderWizard = () => (
    <div className="flex flex-col justify-center min-h-screen max-w-4xl mx-auto px-6 animate-slide-up bg-black">
      {/* Header Navigation */}
      <div className="w-full flex justify-between items-center mb-12">
        <button 
          onClick={handleRestart} 
          className="text-gray-600 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase flex items-center gap-2"
        >
          <RotateCcw className="w-3 h-3" /> Reiniciar
        </button>
        <div className="flex gap-2">
          {[0, 1, 2].map(lvl => (
            <div key={lvl} className={`h-1 w-8 rounded-full transition-all duration-500 ${wizardState.stepLevel >= lvl ? 'bg-white' : 'bg-gray-800'}`} />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-white rounded-full animate-spin mb-8"></div>
          <p className="text-gray-500 tracking-widest text-xs uppercase font-bold animate-pulse">
            Analisando Padrões...
          </p>
        </div>
      ) : (
        <div className="w-full">
          {/* Question Section */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
              {wizardState.currentTitle}
            </h2>
            <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl">
              {wizardState.currentDescription}
            </p>
          </div>

          {/* Options Grid - Always 3 Buttons */}
          <div className="flex flex-col gap-4">
            {wizardState.options.map((option) => (
              <Button 
                key={option.id} 
                variant="option" 
                fullWidth 
                onClick={() => handleOptionClick(option.value)}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">{option.label}</span>
                <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderResult = () => (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      <div className="max-w-3xl w-full animate-slide-up border border-gray-800 bg-[#050505] p-8 md:p-12 rounded-3xl relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 block text-gray-500">
          Protocolo Final de Desbloqueio
        </span>

        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
          {wizardState.currentTitle}
        </h2>

        <div className="prose prose-invert prose-lg mb-12 text-gray-300 leading-relaxed whitespace-pre-line">
          {wizardState.finalActionDetail}
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-center border-t border-gray-900 pt-8">
          <Button onClick={handleRestart} className="w-full md:w-auto">
            <RotateCcw className="w-4 h-4 mr-2 inline" /> Finalizar & Reiniciar
          </Button>
          
          <button 
            onClick={() => setStep(AppStep.VIP_DIRECTORY)}
            className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors"
          >
            Preciso de suporte humano profissional
          </button>
        </div>

      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen font-sans selection:bg-white selection:text-black">
      {step === AppStep.WELCOME && renderWelcome()}
      {step === AppStep.WIZARD && renderWizard()}
      {step === AppStep.RESULT && renderResult()}
      {step === AppStep.VIP_DIRECTORY && <ProfessionalDirectory onBack={() => setStep(AppStep.RESULT)} />}
      {step === AppStep.VIP_REGISTER && <ProfessionalRegister onBack={() => setStep(AppStep.WELCOME)} />}
    </div>
  );
};

export default App;
