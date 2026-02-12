
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginViewProps {
  onLogin: (user: any) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          alert('Conta criada com sucesso! Verifique seu email para confirmação (se habilitado) ou faça login.');
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          onLogin(data.user);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao processar autenticação');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'Erro ao iniciar login com Google');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8 bg-background-light dark:bg-background-dark">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-12 text-center animate-slide-up">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 flex items-center justify-center transition-transform hover:scale-105 duration-500">
              <img src="/logo.png" alt="PC Prompt Logo" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg">
              <span className="material-icons-round text-primary text-sm">bolt</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">PC Prompt</h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">A suíte definitiva para mestres de IA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
              </div>
              <input
                className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
                placeholder="Seu melhor e-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-icons-round text-slate-400 group-focus-within:text-primary transition-colors">lock_open</span>
            </div>
            <input
              className="block w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
              placeholder="Sua senha secreta"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-6 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-extrabold shadow-xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {isLoading && <span className="material-icons-round animate-spin text-sm">sync</span>}
            {isSignUp ? 'Criar minha conta' : 'Acessar Plataforma'}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center text-xs font-bold text-slate-400 hover:text-primary transition-colors mt-2"
          >
            {isSignUp ? 'Já tenho uma conta? Entrar' : 'Não tem conta? Cadastre-se'}
          </button>
        </form>

        <div className="mt-10 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-6">Ou continue com</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:border-primary/50 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.146-1.748 4.076-1.048 1.042-2.684 2.1-5.636 2.1-4.812 0-8.624-3.896-8.624-8.71s3.812-8.71 8.624-8.71c2.6 0 4.412 1.012 5.804 2.336l2.308-2.308c-2.028-1.944-4.664-3.148-8.112-3.148-6.628 0-12 5.372-12 12s5.372 12 12 12c3.54 0 6.228-1.172 8.324-3.348 2.136-2.136 2.812-5.144 2.812-7.512 0-.712-.064-1.392-.184-2.028h-11.016z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="py-6 text-center opacity-40">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secured by PC Engine & Supabase</span>
      </div>
    </div>
  );
};

export default LoginView;

