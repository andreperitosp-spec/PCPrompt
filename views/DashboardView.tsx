
import React, { useState, useMemo } from 'react';
import { Prompt, User, View } from '../types';
import BottomNav from '../components/BottomNav';

interface DashboardViewProps {
  user: User;
  prompts: Prompt[];
  onOpen: (prompt: Prompt) => void;
  onEdit: (prompt: Prompt) => void;
  onCreate: () => void;
  onLogout: () => void;
  onToggleFavorite: (prompt: Prompt) => void;
  onChangeView: (view: View) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ user, prompts, onOpen, onEdit, onCreate, onLogout, onToggleFavorite, onChangeView }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(prompts.map(p => p.category)));
    return ['Todos', ...cats];
  }, [prompts]);

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || p.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 flex flex-col h-screen relative bg-background-light dark:bg-background-dark">
      <header className="pt-10 pb-4 px-6 flex justify-between items-center bg-white/80 dark:bg-background-dark/80 glass-panel sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-icons-round text-xl">terminal</span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">PC Prompt</h1>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Premium Suite</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
            title="Sair"
          >
            <span className="material-icons-round">logout</span>
          </button>
          <button className="relative transition-transform active:scale-90">
            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 shadow-sm" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-background-dark rounded-full"></div>
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 pb-28 overflow-y-auto custom-scrollbar">
        {/* Search & Filters */}
        <section className="mt-4 mb-6">
          <div className="relative group mb-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors text-xl">search</span>
            </div>
            <input
              className="block w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary/40 transition-all shadow-sm"
              placeholder="Pesquisar prompts..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeFilter === cat
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Empty State */}
        {filteredPrompts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-slide-up">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-300">
              <span className="material-icons-round text-4xl">inventory_2</span>
            </div>
            <h3 className="text-slate-600 dark:text-slate-400 font-semibold">Nenhum prompt encontrado</h3>
            <p className="text-sm text-slate-400 mt-1 px-10 mb-6">Tente ajustar seus filtros ou crie um novo prompt.</p>
            <button
              onClick={onCreate}
              className="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <span className="material-icons-round">add</span>
              Criar meu primeiro prompt
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredPrompts.map((prompt, idx) => (
              <div
                key={prompt.id}
                onClick={() => onOpen(prompt)}
                className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 transition-all group cursor-pointer animate-slide-up relative overflow-hidden active:scale-[0.98]"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded">
                    {prompt.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {prompt.tokens} tokens
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-1 mb-1">
                  {prompt.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {prompt.content}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-icons-round text-[14px] text-slate-300">smart_toy</span>
                    <span className="text-[10px] font-semibold text-slate-400">{prompt.model}</span>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleFavorite(prompt); }}
                      className={`p-1.5 rounded-lg transition-colors ${prompt.isFavorite ? 'text-amber-500 bg-amber-500/10' : 'bg-slate-50 dark:bg-slate-700/50 text-slate-400 hover:text-amber-500'}`}
                    >
                      <span className="material-icons-round text-sm">{prompt.isFavorite ? 'star' : 'star_border'}</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onEdit(prompt); }}
                      className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-400 hover:text-primary transition-colors"
                    >
                      <span className="material-icons-round text-sm">edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav currentView={View.DASHBOARD} onChange={onChangeView} onCreate={onCreate} />
    </div>
  );
};

export default DashboardView;
