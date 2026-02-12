
import { Prompt } from './types';

export const INITIAL_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'Relatório de Atividades Diárias',
    content: 'Atue como um assistente administrativo. Gere um relatório detalhado das atividades diárias...',
    category: 'Administração',
    model: 'GPT',
    tokens: 450,
    createdAt: '2023-10-25T14:30:00Z',
    isPublic: true
  },
  {
    id: '2',
    title: 'Descrição de Cargo - Dev Senior',
    content: 'Crie uma descrição de cargo detalhada para uma vaga de Desenvolvedor Senior Python...',
    category: 'RH',
    model: 'GPT',
    tokens: 320,
    createdAt: '2023-10-24T10:15:00Z',
    isPublic: false
  },
  {
    id: '3',
    title: 'Planejamento de Investigação',
    content: 'Elabore um plano de ação para investigar uma fraude corporativa...',
    category: 'Investigação',
    model: 'Claude',
    tokens: 580,
    createdAt: '2023-10-23T16:45:00Z',
    isPublic: true
  },
  {
    id: '4',
    title: 'Roteiro de Inquérito',
    content: 'Crie um roteiro de perguntas para um inquérito policial sobre furto...',
    category: 'Inquérito',
    model: 'GPT',
    tokens: 410,
    createdAt: '2023-10-22T09:00:00Z',
    isPublic: true
  }
];
