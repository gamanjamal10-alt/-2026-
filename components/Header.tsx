import React from 'react';
import { View } from '../types';
import { DashboardIcon, MoneyIcon, ShepherdIcon, WorkerIcon, LightbulbIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const NavItem: React.FC<{
  view: View;
  currentView: View;
  onNavigate: (view: View) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ view, currentView, onNavigate, icon, label }) => {
  const isActive = view === currentView;
  return (
    <button
      onClick={() => onNavigate(view)}
      className={`flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-brand-yellow text-brand-brown-dark shadow-inner'
          : 'text-white hover:bg-brand-green'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-brand-green-dark text-white p-4 shadow-md sticky top-0 z-40">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold">الراعي الذكي</h1>
            <p className="text-xs text-brand-yellow hidden md:block">إدارة مزرعتك بكفاءة وذكاء</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
          <NavItem view="dashboard" currentView={currentView} onNavigate={onNavigate} icon={<DashboardIcon />} label="لوحة التحكم" />
          <NavItem view="expenses" currentView={currentView} onNavigate={onNavigate} icon={<MoneyIcon />} label="المصاريف" />
          <NavItem view="shepherds" currentView={currentView} onNavigate={onNavigate} icon={<ShepherdIcon />} label="الرعاة" />
          <NavItem view="farmWorkers" currentView={currentView} onNavigate={onNavigate} icon={<WorkerIcon />} label="العمال" />
          <NavItem view="recommendations" currentView={currentView} onNavigate={onNavigate} icon={<LightbulbIcon />} label="التوصيات" />
        </nav>
      </div>
    </header>
  );
};

export default Header;