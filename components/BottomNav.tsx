
import React from 'react';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onChange: (view: View) => void;
  onCreate: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChange, onCreate }) => {
  return (
    <nav className="absolute bottom-0 w-full bg-white/95 dark:bg-[#151f2b]/95 border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex justify-between items-center z-30 pb-6 backdrop-blur-lg">
      <button
        onClick={() => onChange(View.DASHBOARD)}
        className={`flex flex-col items-center gap-1 ${currentView === View.DASHBOARD ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
      >
        <span className="material-icons-round text-2xl">dashboard</span>
        <span className="text-[10px] font-medium">Início</span>
      </button>

      <button
        onClick={() => onChange(View.FAVORITES)}
        className={`flex flex-col items-center gap-1 ${currentView === View.FAVORITES ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'} transition-colors`}
      >
        <span className="material-icons-round text-2xl">{currentView === View.FAVORITES ? 'favorite' : 'favorite_border'}</span>
        <span className="text-[10px] font-medium">Salvos</span>
      </button>

      <button
        onClick={onCreate}
        className="flex flex-col items-center gap-1"
      >
        <div className="w-12 h-12 -mt-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/40 border-4 border-white dark:border-background-dark transition-transform active:scale-90">
          <span className="material-icons-round text-white text-2xl">add</span>
        </div>
      </button>

      <button
        onClick={() => onChange(View.LIBRARY)}
        className={`flex flex-col items-center gap-1 ${currentView === View.LIBRARY ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'} transition-colors`}
      >
        <span className="material-icons-round text-2xl">{currentView === View.LIBRARY ? 'folder' : 'folder_open'}</span>
        <span className="text-[10px] font-medium">Biblioteca</span>
      </button>

      <button
        onClick={() => onChange(View.SETTINGS)}
        className={`flex flex-col items-center gap-1 ${currentView === View.SETTINGS ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'} transition-colors`}
      >
        <span className="material-icons-round text-2xl">settings</span>
        <span className="text-[10px] font-medium">Ajustes</span>
      </button>
    </nav>
  );
};

export default BottomNav;
