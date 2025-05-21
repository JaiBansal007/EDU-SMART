export interface GPTPrompt {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface GPTResponse {
  content: string;
  timestamp: Date;
}

export const defaultSystemPrompt: GPTPrompt = {
  role: 'system',
  content: 'You are an educational assistant helping students learn and understand concepts.'
};

export const createPrompt = (content: string): GPTPrompt => ({
  role: 'user',
  content
});

export const createResponse = (content: string): GPTResponse => ({
  content,
  timestamp: new Date()
}); 