
export enum AppStep {
  WELCOME = 0,
  WIZARD = 1, // Substitui INPUT_CONTEXT e PROCESSING
  RESULT = 3, // Ação final
  VIP_DIRECTORY = 4,
  VIP_REGISTER = 5,
}

export interface WizardOption {
  id: string;
  label: string;
  value: string; // O que é enviado para a IA
}

export interface WizardState {
  stepLevel: number; // 0 = Iniciante, 1 = Intermediário, 2 = Avançado
  history: string[]; // Histórico de escolhas (ex: ["Travado", "Medo", "Fisiologia"])
  currentTitle: string;
  currentDescription: string;
  options: WizardOption[];
  isFinalAction: boolean; // Se true, mostra o resultado final
  finalActionDetail?: string; // O exercício prático final
  isInputStep?: boolean;
  inputPrompt?: string;
  analysisFeedback?: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  isOnline: boolean;
  location: string;
  available: boolean;
  imageUrl?: string;
}

export interface ApiError {
  message: string;
}
