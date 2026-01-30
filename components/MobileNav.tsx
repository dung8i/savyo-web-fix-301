
import React from 'react';
import { TabType } from '../types';

interface MobileNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { type: TabType.HOME, label: 'Home', icon: 'fa-home' },
    { type: TabType.DEALS, label: 'Deal', icon: 'fa-fire' },
    { type: TabType.REDEEM, label: 'Quà', icon: 'fa-gift' },
    { type: TabType.COMMUNITY, label: 'C.Đồng', icon: 'fa-users' },
    { type: TabType.WALLET, label: 'Ví', icon: 'fa-wallet' },
    { type: TabType.ACCOUNT, label: 'Tôi', icon: 'fa-user' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-cardDark/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-[500] md:hidden px-2 pb-safe-area">
      <div className="flex justify-between items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveTab(item.type)}
            className={`flex flex-col items-center justify-center flex-1 transition-all duration-300 relative ${
              activeTab === item.type 
                ? 'text-primary' 
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            <div className={`text-lg mb-1 transition-transform duration-300 ${activeTab === item.type ? 'scale-110 -translate-y-1' : ''}`}>
              <i className={`fas ${item.icon}`}></i>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter transition-all duration-300 ${activeTab === item.type ? 'opacity-100' : 'opacity-70'}`}>
              {item.label}
            </span>
            {activeTab === item.type && (
              <div className="absolute -top-1 w-1 h-1 bg-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
