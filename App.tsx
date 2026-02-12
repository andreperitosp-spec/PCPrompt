import React, { useState, useEffect, useCallback } from 'react';
import { View, Prompt, User } from './types';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import DetailView from './views/DetailView';
import EditorView from './views/EditorView';
import SettingsView from './views/SettingsView';
import LibraryView from './views/LibraryView';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Manage Auth State
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        handleAuthChange(session.user);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        handleAuthChange(session.user);
      } else {
        setUser(null);
        setPrompts([]);
        setCurrentView(View.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthChange = (supabaseUser: any) => {
    setUser({
      name: supabaseUser.email?.split('@')[0] || 'Usuário',
      email: supabaseUser.email || '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`
    });
    setCurrentView(View.DASHBOARD);
    fetchPrompts();
  };

  const fetchPrompts = async () => {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts:', error);
    } else if (data) {
      // Map database snake_case to frontend camelCase
      const mappedPrompts: Prompt[] = data.map((p: any) => ({
        id: p.id,
        title: p.title,
        content: p.content,
        category: p.category,
        model: p.model,
        tokens: p.tokens,
        createdAt: p.created_at,
        isPublic: p.is_public,
        isFavorite: p.is_favorite || false
      }));
      setPrompts(mappedPrompts);
    }
  };

  const savePrompt = async (updatedPrompt: Prompt) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      alert('Sessão expirada. Por favor, faça login novamente.');
      setCurrentView(View.LOGIN);
      return;
    }

    const dbPrompt = {
      title: updatedPrompt.title,
      content: updatedPrompt.content,
      category: updatedPrompt.category,
      model: updatedPrompt.model,
      tokens: updatedPrompt.tokens,
      is_public: updatedPrompt.isPublic,
      is_favorite: updatedPrompt.isFavorite || false,
      user_id: session.user.id
    };

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(updatedPrompt.id || '');

    let result;
    if (isUuid) {
      result = await supabase
        .from('prompts')
        .update(dbPrompt)
        .eq('id', updatedPrompt.id)
        .select();
    } else {
      result = await supabase
        .from('prompts')
        .insert([dbPrompt])
        .select();
    }

    if (result.error) {
      console.error('Error saving prompt:', result.error);
      alert(`Erro ao salvar prompt: ${result.error.message}`);
    } else {
      fetchPrompts();
      setCurrentView(View.DETAIL);
      if (result.data && result.data[0]) {
        const saved = result.data[0];
        setSelectedPrompt({
          id: saved.id,
          title: saved.title,
          content: saved.content,
          category: saved.category,
          model: saved.model,
          tokens: saved.tokens,
          createdAt: saved.created_at,
          isPublic: saved.is_public,
          isFavorite: saved.is_favorite || false
        });
      }
    }
  };

  const toggleFavorite = async (prompt: Prompt) => {
    const newVal = !prompt.isFavorite;
    const { error } = await supabase
      .from('prompts')
      .update({ is_favorite: newVal })
      .eq('id', prompt.id);

    if (error) {
      console.error('Error toggling favorite:', error);
    } else {
      setPrompts(prev => prev.map(p => p.id === prompt.id ? { ...p, isFavorite: newVal } : p));
      if (selectedPrompt?.id === prompt.id) {
        setSelectedPrompt({ ...selectedPrompt, isFavorite: newVal });
      }
    }
  };

  const deletePrompt = async (id: string) => {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prompt:', error);
      alert('Erro ao excluir prompt.');
    } else {
      setPrompts(prev => prev.filter(p => p.id !== id));
      setCurrentView(View.DASHBOARD);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background-light dark:bg-background-dark min-h-screen">
        <span className="material-icons-round animate-spin text-primary text-4xl">sync</span>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.LOGIN:
        return <LoginView onLogin={(u) => handleAuthChange(u)} />;
      case View.DASHBOARD:
        return (
          <DashboardView
            user={user!}
            prompts={prompts}
            onOpen={(p) => { setSelectedPrompt(p); setCurrentView(View.DETAIL); }}
            onCreate={() => { setSelectedPrompt(null); setCurrentView(View.EDITOR); }}
            onEdit={(p) => { setSelectedPrompt(p); setCurrentView(View.EDITOR); }}
            onLogout={handleLogout}
            onToggleFavorite={toggleFavorite}
            onChangeView={setCurrentView}
          />
        );
      case View.FAVORITES:
        return (
          <DashboardView
            user={user!}
            prompts={prompts.filter(p => p.isFavorite)}
            onOpen={(p) => { setSelectedPrompt(p); setCurrentView(View.DETAIL); }}
            onCreate={() => { setSelectedPrompt(null); setCurrentView(View.EDITOR); }}
            onEdit={(p) => { setSelectedPrompt(p); setCurrentView(View.EDITOR); }}
            onLogout={handleLogout}
            onToggleFavorite={toggleFavorite}
            onChangeView={setCurrentView}
          />
        );
      case View.DETAIL:
        return (
          <DetailView
            prompt={selectedPrompt!}
            onBack={() => setCurrentView(View.DASHBOARD)}
            onEdit={() => setCurrentView(View.EDITOR)}
            onDelete={() => deletePrompt(selectedPrompt!.id)}
            onToggleFavorite={toggleFavorite}
          />
        );
      case View.EDITOR:
        return (
          <EditorView
            prompt={selectedPrompt}
            onCancel={() => selectedPrompt ? setCurrentView(View.DETAIL) : setCurrentView(View.DASHBOARD)}
            onSave={savePrompt}
          />
        );
      case View.LIBRARY:
        return (
          <LibraryView
            prompts={prompts}
            onOpen={(p) => { setSelectedPrompt(p); setCurrentView(View.DETAIL); }}
            onChangeView={setCurrentView}
            onCreate={() => { setSelectedPrompt(null); setCurrentView(View.EDITOR); }}
          />
        );
      case View.SETTINGS:
        return (
          <SettingsView
            user={user!}
            onLogout={handleLogout}
            onChangeView={setCurrentView}
            onCreate={() => { setSelectedPrompt(null); setCurrentView(View.EDITOR); }}
          />
        );
      default:
        return <div className="p-10 text-center">View Not Found</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-background-dark min-h-screen flex flex-col relative shadow-2xl overflow-hidden md:border-x border-slate-200 dark:border-slate-800/60">
      {renderView()}
    </div>
  );
};

export default App;
