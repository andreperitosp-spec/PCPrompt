
export enum View {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  DETAIL = 'DETAIL',
  EDITOR = 'EDITOR',
  SETTINGS = 'SETTINGS',
  LIBRARY = 'LIBRARY',
  FAVORITES = 'FAVORITES'
}

export type Category = 'Administração' | 'RH' | 'Investigação' | 'Inquérito' | 'Boletim de Ocorrência';

export type Model = 'GPT' | 'Claude' | 'Gemini' | 'Copilot' | 'Perplexity' | 'DeepSeek' | 'Outros';

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: Category;
  model: Model;
  tokens: number;
  createdAt: string;
  isPublic: boolean;
  isFavorite: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}
