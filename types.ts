export enum AppStep {
  WELCOME = 0,
  INPUT_CONTEXT = 1,
  PROCESSING = 2,
  RESULT = 3,
  VIP_DIRECTORY = 4,
  VIP_REGISTER = 5,
}

export interface UserInput {
  context: string;
}

export interface Approach {
  title: string;
  description: string;
  type: 'mind' | 'action' | 'logic'; // Simplificado para Minimalismo
}

export interface ResetResponseData {
  crisisType: string;
  isVIPContext: boolean; // Flag de Triage
  approaches: Approach[];
  immediateAction: string;
  identityValidation: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string; // e.g. Psiquiatra, Psicólogo
  specialties: string[];
  isOnline: boolean;
  location: string;
  available: boolean;
  imageUrl?: string;
}

export interface ApiError {
  message: string;
}