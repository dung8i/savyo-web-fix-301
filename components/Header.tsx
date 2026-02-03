
import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  userBalance: number;
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
  onGoToSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  setActiveTab, 
  userBalance, 
  isLoggedIn, 
  onAuthClick,
  onLogout,
  onGoToSettings
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const navItems = [
    { type: TabType.HOME, label: 'Trang chủ', icon: 'fa-home' },
    { type: TabType.DEALS, label: 'Săn Deal', icon: 'fa-fire' },
    { type: TabType.REDEEM, label: 'Đổi quà', icon: 'fa-gift' },
    { type: TabType.COMMUNITY, label: 'Cộng đồng', icon: 'fa-users' },
    { type: TabType.WALLET, label: 'Ví', icon: 'fa-wallet' },
    { type: TabType.ACCOUNT, label: 'Tài khoản', icon: 'fa-user' },
  ];

  const notifications = [
    { type: 'order', title: 'Đơn hàng mới', desc: 'Đơn hàng #1234 Shopee đã giao thành công.', time: '5 phút trước', icon: 'fa-shopping-bag', color: 'bg-blue-100 text-blue-600' },
    { type: 'cashback', title: 'Hoàn tiền', desc: 'Bạn vừa nhận +15,000đ hoàn tiền từ Lazada.', time: '1 giờ trước', icon: 'fa-coins', color: 'bg-emerald-100 text-emerald-600' },
    { type: 'alert', title: 'Chi tiêu', desc: 'Cảnh báo: Bạn đã dùng 90% ngân sách tháng này.', time: '3 giờ trước', icon: 'fa-exclamation-triangle', color: 'bg-red-100 text-red-600' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 bg-white/90 dark:bg-cardDark/90 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800 z-[500] flex items-center justify-between px-4 lg:px-10 transition-all duration-300">
      <div className="flex items-center gap-2 text-xl md:text-2xl font-black text-primary cursor-pointer hover:scale-105 transition-transform" onClick={() => setActiveTab(TabType.HOME)}>
        <i className="fas fa-wallet"></i>
        <span className="hidden sm:inline tracking-tighter">SAVYO</span>
      </div>

      <nav className="hidden md:flex gap-1 lg:gap-4 h-full items-center">
        {navItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveTab(item.type)}
            className={`h-full px-4 flex flex-col items-center justify-center border-b-4 transition-all duration-200 ${
              activeTab === item.type 
                ? 'border-primary text-primary font-black' 
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-primary'
            }`}
          >
            <i className={`fas ${item.icon} text-sm lg:text-base mb-1`}></i>
            <span className="text-[9px] lg:text-[11px] uppercase font-black tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 md:gap-4">
        {isLoggedIn ? (
          <>
            <div className="bg-orange-50 dark:bg-orange-900/20 px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-orange-200 dark:border-orange-800">
              <i className="fas fa-coins text-secondary text-xs"></i>
              <span className="font-black text-secondary text-[11px] md:text-sm">{userBalance.toLocaleString('vi-VN')}đ</span>
            </div>
            
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                className={`w-9 h-9 md:w-11 md:h-11 rounded-2xl flex items-center justify-center transition-all ${showNotifications ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
              >
                <i className="fas fa-bell text-lg"></i>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-cardDark font-bold animate-pulse">{unreadCount}</span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute top-full right-0 mt-4 w-72 md:w-80 bg-white dark:bg-cardDark rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-slideIn">
                  <div className="p-4 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h4 className="font-black text-[10px] uppercase tracking-widest italic">Thông báo</h4>
                    <button 
                      onClick={() => setUnreadCount(0)}
                      className="text-[9px] text-primary font-black uppercase hover:underline"
                    >
                      Đã đọc hết
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((n, i) => (
                      <div key={i} className="p-4 border-b dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer flex gap-3">
                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${n.color}`}>
                          <i className={`fas ${n.icon} text-sm`}></i>
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-black">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{n.desc}</p>
                          <p className="text-[9px] text-slate-400 uppercase font-bold mt-1 tracking-tighter">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <div 
                className={`w-9 h-9 md:w-11 md:h-11 rounded-2xl border-2 overflow-hidden cursor-pointer transition-all p-0.5 ${showProfileMenu ? 'border-primary shadow-lg scale-105' : 'border-primary/20 hover:border-primary'}`}
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" className="w-full h-full object-cover rounded-xl" />
              </div>

              {showProfileMenu && (
                <div className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-cardDark rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-slideIn p-2">
                  <button 
                    onClick={() => { onGoToSettings(); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-primary hover:text-white transition-all group"
                  >
                    <i className="fas fa-cog text-slate-400 group-hover:text-white"></i>
                    <span className="font-bold text-xs uppercase tracking-widest">Cài đặt</span>
                  </button>
                  <button 
                    onClick={() => { onLogout(); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all group"
                  >
                    <i className="fas fa-sign-out-alt text-slate-400 group-hover:text-white"></i>
                    <span className="font-bold text-xs uppercase tracking-widest">Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <button 
            onClick={onAuthClick}
            className="px-5 py-2.5 bg-primary text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2"
          >
            <i className="fas fa-right-to-bracket"></i>
            <span className="hidden xs:inline">Đăng nhập / Đăng ký</span>
            <span className="xs:hidden">Login</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
