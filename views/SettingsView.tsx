
import React from 'react';
import { User, View } from '../types';
import BottomNav from '../components/BottomNav';

interface SettingsViewProps {
    user: User;
    onLogout: () => void;
    onChangeView: (view: View) => void;
    onCreate: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onLogout, onChangeView, onCreate }) => {
    return (
        <div className="flex-1 flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
            <header className="px-6 pt-12 pb-4 border-b border-slate-200 dark:border-slate-800 glass-panel">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ajustes</h2>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-6 pb-32 custom-scrollbar">
                <div className="space-y-6">
                    <section className="bg-white dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/50 shadow-sm animate-slide-up">
                        <div className="flex items-center gap-4 mb-6">
                            <img src={user.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl border-2 border-primary/20" />
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user.name}</h3>
                                <p className="text-xs text-slate-500 font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-icons-round text-primary">person_outline</span>
                                    <span className="text-sm font-bold">Editar Perfil</span>
                                </div>
                                <span className="material-icons-round text-slate-400 group-hover:translate-x-1 transition-transform">chevron_right</span>
                            </button>

                            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors group">
                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <span className="material-icons-round text-accent">dark_mode</span>
                                    <span className="text-sm font-bold">Modo Escuro</span>
                                </div>
                                <div className="w-10 h-6 bg-primary rounded-full relative">
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </button>
                        </div>
                    </section>

                    <section className="space-y-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm">
                            <span className="material-icons-round text-slate-400">security</span>
                            <span>Segurança & Privacidade</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm">
                            <span className="material-icons-round text-slate-400">help_outline</span>
                            <span>Suporte & Ajuda</span>
                        </button>
                    </section>

                    <button
                        onClick={onLogout}
                        className="w-full py-4 rounded-2xl bg-red-500/10 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all animate-slide-up"
                        style={{ animationDelay: '0.2s' }}
                    >
                        Sair da Conta
                    </button>
                </div>
            </main>

            <BottomNav currentView={View.SETTINGS} onChange={onChangeView} onCreate={onCreate} />
        </div>
    );
};

export default SettingsView;
