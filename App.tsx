
import React, { useState, useEffect } from 'react';
import { TabType, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeTab from './components/HomeTab';
import DealsTab from './components/DealsTab';
import CommunityTab from './components/CommunityTab';
import WalletTab from './components/WalletTab';
import AccountTab from './components/AccountTab';
import AuthModal from './components/AuthModal';
import RedeemTab from './components/RedeemTab';
import MobileNav from './components/MobileNav';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [openSettingsOnLoad, setOpenSettingsOnLoad] = useState<boolean>(false);
  
  // Định nghĩa thông tin người dùng mặc định
  const defaultUser: User = {
    name: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    rank: 'Thành viên Mới',
    birthYear: 0,
    phone: '',
    bankAccount: '',
    bankName: '',
    bankOwnerName: '',
    email: '',
    balance: 0
  };

  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (email: string) => {
    const generatedName = email.split('@')[0];
    
    // Quan trọng: Sử dụng defaultUser làm gốc thay vì prev state
    // để đảm bảo xóa sạch các thông tin cũ (như demo phone, bank account...)
    setUser({
      ...defaultUser,
      name: generatedName.charAt(0).toUpperCase() + generatedName.slice(1),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generatedName}`,
      // Số dư mặc định là 0 theo defaultUser
    });
    
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleDemoAccess = () => {
    setUser({
      name: 'Khách Trải Nghiệm',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DemoUser',
      rank: 'Hạng Thử Nghiệm',
      birthYear: 2000,
      phone: '0901234567',
      bankAccount: '000011112222',
      bankName: 'Savyo Bank',
      bankOwnerName: 'KHACH TRAI NGHIEM',
      email: 'demo.guest@savyo.vn',
      balance: 5000000
    });
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab(TabType.HOME);
    setUser(defaultUser);
  };

  const goToSettings = () => {
    setActiveTab(TabType.ACCOUNT);
    setOpenSettingsOnLoad(true);
  };

  const renderProtectedTab = (content: React.ReactNode) => {
    if (!isLoggedIn) {
      return (
        <div className="relative min-h-[60vh]">
          <div className="blur-xl pointer-events-none select-none opacity-50">
            {content}
          </div>
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6">
            <div className="bg-white/90 dark:bg-cardDark/90 backdrop-blur-2xl p-8 md:p-10 rounded-[3rem] shadow-2xl border border-white/20 text-center max-w-md animate-scaleUp w-full">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Khu vực hạn chế</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold mb-8 leading-relaxed">
                Vui lòng đăng nhập hoặc đăng ký tài khoản Savyo để truy cập tính năng này.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Đăng nhập ngay
                </button>
                <button 
                  onClick={handleDemoAccess}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
                >
                  <i className="fas fa-flask mr-2"></i> Trải nghiệm Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return content;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.HOME: return <HomeTab onSwitchTab={setActiveTab} />;
      case TabType.DEALS: return <DealsTab />;
      case TabType.REDEEM: return renderProtectedTab(<RedeemTab user={user} setUser={setUser} />);
      case TabType.COMMUNITY: return renderProtectedTab(<CommunityTab user={user} />);
      case TabType.WALLET: return renderProtectedTab(<WalletTab user={user} />);
      case TabType.ACCOUNT: return renderProtectedTab(
        <AccountTab 
          user={user} 
          setUser={setUser} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          language={language}
          setLanguage={setLanguage}
          onLogout={handleLogout}
          autoOpenSettings={openSettingsOnLoad}
          onSettingsOpened={() => setOpenSettingsOnLoad(false)}
        />
      );
      default: return <HomeTab onSwitchTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-20 md:pb-0">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userBalance={user.balance} 
        isLoggedIn={isLoggedIn}
        onAuthClick={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onGoToSettings={goToSettings}
      />
      
      <main className="flex-grow pt-20 md:pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {renderTabContent()}
        </div>
      </main>

      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <Footer />

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)} 
          onLoginSuccess={handleLoginSuccess}
          onDemoClick={handleDemoAccess}
        />
      )}
    </div>
  );
};

export default App;
