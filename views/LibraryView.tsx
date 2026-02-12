
import React from 'react';
import { Prompt, View } from '../types';
import BottomNav from '../components/BottomNav';

interface LibraryViewProps {
    prompts: Prompt[];
    onOpen: (prompt: Prompt) => void;
    onChangeView: (view: View) => void;
    onCreate: () => void;
}

const LibraryView: React.FC<LibraryViewProps> = ({ prompts, onOpen, onChangeView, onCreate }) => {
    // Mock public prompts
    const publicPrompts = prompts.filter(p => p.isPublic);

    return (
        <div className="flex-1 flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-6 pt-12 pb-4 border-b border-slate-200 dark:border-slate-800 glass-panel">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Biblioteca</h2>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 custom-scrollbar">
                <div className="mb-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-1">Explorar Prompts Públicos</h3>
                    <div className="grid gap-4">
                        {publicPrompts.length === 0 ? (
                            <div className="p-10 text-center bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-sm text-slate-400">Nenhum prompt público disponível no momento.</p>
                            </div>
                        ) : (
                            publicPrompts.map(prompt => (
                                <div
                                    key={prompt.id}
                                    onClick={() => onOpen(prompt)}
                                    className="p-5 bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800/50 hover:border-primary/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                                            {prompt.category}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{prompt.title}</h4>
                                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{prompt.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>

            <BottomNav currentView={View.LIBRARY} onChange={onChangeView} onCreate={onCreate} />
        </div>
    );
};

export default LibraryView;
