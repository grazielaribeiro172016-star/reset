import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, ResetResponseData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateResetPlan = async (input: UserInput): Promise<ResetResponseData> => {
  const model = "gemini-2.5-flash";

  const systemPrompt = `
    Atue como o Sistema RESET (Mentora Adaptativa).
    Sua estética é minimalista, direta e extremamente inteligente.
    
    INPUT DO USUÁRIO: "${input.context}"

    TAREFA DE TRIAGE & GERAÇÃO:

    1. ANÁLISE DE COMPLEXIDADE (Flag VIP):
       Analise se o input demonstra sinais de crise clínica severa (pânico agudo, burnout total, ideação, risco) ou se é uma crise funcional (procrastinação, dúvida, caos).
       - Se for Severo/Complexo: Defina "isVIPContext" como true.
       - Se for Funcional: Defina "isVIPContext" como false.

    2. ESTRUTURAÇÃO DO PLANO:
       Gere 3 abordagens curtas baseadas em lógica e comportamento.
       
    3. AÇÃO FINAL (Condicional):
       - Se isVIPContext = FALSE: A "immediateAction" deve ser um micro-passo prático de 2 minutos.
       - Se isVIPContext = TRUE: A "immediateAction" deve ser EXATAMENTE: "Sua dedicação é notável, mas este dilema exige estratégia humana. Conheça nossos especialistas na Área VIP."

    4. IDENTIDADE:
       Se isVIPContext = TRUE, a validação deve ser: "A coragem de pedir suporte estratégico é o RESET mais poderoso de todos."
       Caso contrário, valide a capacidade de execução do usuário.

    Gere APENAS JSON:
    {
      "crisisType": "Classificação curta (ex: Caos Mental)",
      "isVIPContext": boolean,
      "approaches": [
        { "title": "Título Curto", "description": "Descrição direta.", "type": "logic" },
        { "title": "Título Curto", "description": "Descrição direta.", "type": "action" },
        { "title": "Título Curto", "description": "Descrição direta.", "type": "mind" }
      ],
      "immediateAction": "A ação final.",
      "identityValidation": "Frase de validação."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            crisisType: { type: Type.STRING },
            isVIPContext: { type: Type.BOOLEAN },
            approaches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  type: { type: Type.STRING, enum: ["mind", "action", "logic"] },
                },
              },
            },
            immediateAction: { type: Type.STRING },
            identityValidation: { type: Type.STRING },
          },
          required: ["crisisType", "isVIPContext", "approaches", "immediateAction", "identityValidation"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response text received.");
    }

    return JSON.parse(response.text) as ResetResponseData;

  } catch (error) {
    console.error("Error generating reset plan:", error);
    throw new Error("Sistema recalibrando. Tente novamente.");
  }
};