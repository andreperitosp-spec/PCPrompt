
import React from 'react';
import { Prompt } from '../types';

interface DetailViewProps {
  prompt: Prompt;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: (prompt: Prompt) => void;
}

const DetailView: React.FC<DetailViewProps> = ({ prompt, onBack, onEdit, onDelete, onToggleFavorite }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    alert('Prompt copiado para a área de transferência!');
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      <header className="px-6 pt-12 pb-4 flex items-center justify-between glass-panel sticky top-0 z-30">
        <button onClick={onBack} className="p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <span className="material-icons-round text-slate-600 dark:text-slate-400">arrow_back</span>
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleFavorite(prompt)}
            className={`p-2 rounded-xl transition-colors ${prompt.isFavorite ? 'bg-amber-500/10 text-amber-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            <span className="material-icons-round text-xl">{prompt.isFavorite ? 'star' : 'star_border'}</span>
          </button>
          <button onClick={onEdit} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
            <span className="material-icons-round text-xl">edit</span>
          </button>
          <button
            onClick={() => { if (confirm('Excluir este prompt permanentemente?')) onDelete(); }}
            className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-500"
          >
            <span className="material-icons-round text-xl">delete</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 custom-scrollbar">
        <div className="animate-slide-up">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
              {prompt.category}
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              {new Date(prompt.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
            {prompt.title}
          </h1>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Modelo</p>
              <p className="text-sm font-bold text-slate-700 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary text-base">psychology</span>
                {prompt.model}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Tamanho</p>
              <p className="text-sm font-bold text-slate-700 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-accent text-base">data_usage</span>
                {prompt.tokens} tokens
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-slate-900 dark:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg active:scale-95 transition-all"
              >
                <span className="material-icons-round text-[14px]">content_copy</span>
                <span>Copiar</span>
              </button>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 pt-12 border border-slate-200 dark:border-slate-800 shadow-inner">
              <div className="font-mono text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap break-words selection:bg-primary/20">
                {prompt.content}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Visualização de Saída (Mock)</h4>
            <div className="p-4 bg-white dark:bg-slate-800/30 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center py-12">
              <span className="material-icons-round text-slate-300 text-4xl mb-2">play_circle_outline</span>
              <p className="text-xs text-slate-400 font-medium">Execute este prompt em um ambiente de IA para ver os resultados.</p>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent z-40">
        <button
          onClick={copyToClipboard}
          className="w-full py-4 rounded-2xl bg-primary text-white font-extrabold shadow-xl shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-icons-round">content_copy</span>
          Copiar Conteúdo
        </button>
      </div>
    </div>
  );
};

export default DetailView;
