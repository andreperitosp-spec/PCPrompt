
import React, { useState } from 'react';
import { Prompt, Category, Model } from '../types';

interface EditorViewProps {
  prompt: Prompt | null;
  onCancel: () => void;
  onSave: (prompt: Prompt) => void;
}

const CATEGORIES: Category[] = ['Administração', 'RH', 'Investigação', 'Inquérito', 'Boletim de Ocorrência', 'Modelos'];
const MODELS: Model[] = ['GPT', 'Claude', 'Gemini', 'Copilot', 'Perplexity', 'DeepSeek', 'Outros'];

const EditorView: React.FC<EditorViewProps> = ({ prompt, onCancel, onSave }) => {
  const [title, setTitle] = useState(prompt?.title || '');
  const [content, setContent] = useState(prompt?.content || '');
  const [category, setCategory] = useState<Category>(prompt?.category || 'Administração');
  const [model, setModel] = useState<Model>(prompt?.model || 'GPT');
  const [isPublic, setIsPublic] = useState(prompt?.isPublic ?? false);

  const handleSave = () => {
    if (!title || !content) {
      alert('Título e conteúdo são obrigatórios.');
      return;
    }
    onSave({
      id: prompt?.id || Math.random().toString(36).substr(2, 9),
      title,
      content,
      category,
      model,
      tokens: Math.floor(content.length / 4.5),
      createdAt: prompt?.createdAt || new Date().toISOString(),
      isPublic: isPublic
    });
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 glass-panel">
        <button onClick={onCancel} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-icons-round text-slate-600 dark:text-slate-400">close</span>
        </button>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {prompt ? 'Editar' : 'Criar Prompt'}
        </h2>
        <button
          onClick={handleSave}
          className="text-primary font-bold text-sm px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors"
        >
          Salvar
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-32 custom-scrollbar">
        <div className="space-y-6">
          <div className="animate-slide-up">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Título do Projeto</label>
            <input
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              placeholder="Ex: Refatorador de Código Java"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-end mb-2 px-1">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Conteúdo do Prompt</label>
            </div>
            <div className="relative">
              <textarea
                className="w-full h-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary transition-all shadow-sm resize-none"
                placeholder="Insira as instruções detalhadas..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                {content.length} caracteres
              </div>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Categoria & Classificação</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${category === cat
                    ? 'bg-primary border-primary text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">Modelo de IA</label>
            <div className="flex flex-wrap gap-2">
              {MODELS.map(mod => (
                <button
                  key={mod}
                  onClick={() => setModel(mod)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${model === mod
                    ? 'bg-indigo-500 border-indigo-500 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Privacidade & Visibilidade</label>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800/50 rounded-2xl shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isPublic ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                <span className="material-icons-round">{isPublic ? 'public' : 'lock'}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Prompt Público</h4>
                <p className="text-[10px] text-slate-500">Se ativado, outros usuários poderão visualizar este prompt na biblioteca.</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isPublic ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-50">
        <button
          onClick={handleSave}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-extrabold shadow-xl shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-tight"
        >
          <span className="material-icons-round">check_circle</span>
          {prompt ? 'Salvar Alterações' : 'Criar Prompt'}
        </button>
      </div>
    </div>
  );
};

export default EditorView;
