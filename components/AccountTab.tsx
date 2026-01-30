
import React, { useState, useEffect } from 'react';
import { User, Bank } from '../types';

interface AccountTabProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  onLogout: () => void;
  autoOpenSettings?: boolean;
  onSettingsOpened?: () => void;
}

const banks: Bank[] = [
  { id: 'vcb', name: 'Vietcombank', shortName: 'VCB' },
  { id: 'tcb', name: 'Techcombank', shortName: 'TCB' },
  { id: 'mbb', name: 'MB Bank', shortName: 'MB' },
  { id: 'vbi', name: 'Vietinbank', shortName: 'VBI' },
  { id: 'bidv', name: 'BIDV', shortName: 'BIDV' },
  { id: 'acb', name: 'ACB', shortName: 'ACB' },
  { id: 'vpb', name: 'VPBank', shortName: 'VPB' },
  { id: 'tpbank', name: 'TPBank', shortName: 'TPB' },
  { id: 'hdbank', name: 'HDBank', shortName: 'HDB' },
  { id: 'scb', name: 'SCB', shortName: 'SCB' },
  { id: 'stb', name: 'Sacombank', shortName: 'STB' },
  { id: 'shb', name: 'SHB', shortName: 'SHB' },
  { id: 'vab', name: 'VietA Bank', shortName: 'VAB' },
  { id: 'msb', name: 'MSB', shortName: 'MSB' },
  { id: 'ocb', name: 'OCB', shortName: 'OCB' },
  { id: 'sea', name: 'SeABank', shortName: 'SEA' },
  { id: 'abb', name: 'ABBank', shortName: 'ABB' },
  { id: 'pgb', name: 'PGBank', shortName: 'PGB' },
  { id: 'vib', name: 'VIB', shortName: 'VIB' },
  { id: 'agri', name: 'Agribank', shortName: 'AGRI' },
];

const AccountTab: React.FC<AccountTabProps> = ({ 
  user, 
  setUser, 
  isDarkMode, 
  setIsDarkMode, 
  language, 
  setLanguage,
  onLogout,
  autoOpenSettings,
  onSettingsOpened
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'info' | 'password' | 'display'>('info');
  const [bankSearch, setBankSearch] = useState('');
  const [showBankList, setShowBankList] = useState(false);

  const [editName, setEditName] = useState(user.name);
  const [editBirth, setEditBirth] = useState(user.birthYear);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editBankName, setEditBankName] = useState(user.bankName);
  const [editBankAcc, setEditBankAcc] = useState(user.bankAccount);
  const [editBankOwner, setEditBankOwner] = useState(user.bankOwnerName);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  useEffect(() => {
    if (autoOpenSettings) {
      setShowSettings(true);
      setActiveSettingsTab('info');
      onSettingsOpened?.();
    }
  }, [autoOpenSettings, onSettingsOpened]);

  const filteredBanks = banks.filter(b => 
    b.name.toLowerCase().includes(bankSearch.toLowerCase()) || 
    b.shortName.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const handleUpdateInfo = () => {
    setUser({
      ...user,
      name: editName,
      birthYear: Number(editBirth),
      phone: editPhone,
      bankName: editBankName,
      bankAccount: editBankAcc,
      bankOwnerName: editBankOwner,
      avatar: editAvatar
    });
    alert(language === 'vi' ? 'Cập nhật thông tin thành công!' : 'Update successful!');
    setShowSettings(false);
  };

  const randomizeAvatar = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setEditAvatar(`https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-10">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-cardDark rounded-[3rem] p-10 shadow-2xl border border-slate-50 dark:border-slate-800 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-primary/10 to-blue-500/10"></div>
        
        <div className="relative z-10">
          <div className="relative w-40 h-40 mx-auto mb-8 group">
            <img src={user.avatar} alt="avatar" className="w-full h-full object-cover rounded-[2.5rem] border-8 border-white dark:border-cardDark shadow-2xl transition-transform group-hover:scale-105" />
            <button 
              onClick={() => { setShowSettings(true); setActiveSettingsTab('info'); }}
              className="absolute bottom-2 right-2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              <i className="fas fa-camera"></i>
            </button>
          </div>
          
          <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tighter italic">{user.name}</h2>
          <div className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg mb-8">
            <i className="fas fa-crown mr-3"></i> {user.rank}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto">
            {[
                { label: language === 'vi' ? 'Năm sinh' : 'Birth year', val: user.birthYear || (language === 'vi' ? 'Chưa cập nhật' : 'Not updated'), icon: 'fa-calendar-alt' },
                { label: language === 'vi' ? 'Số điện thoại' : 'Phone', val: user.phone || (language === 'vi' ? 'Chưa cập nhật' : 'Not updated'), icon: 'fa-phone' },
                { label: 'Email', val: user.email, icon: 'fa-envelope' },
                { label: language === 'vi' ? 'Ngân hàng' : 'Bank', val: user.bankName ? `${user.bankName} (${user.bankAccount})` : (language === 'vi' ? 'Chưa cập nhật' : 'Not updated'), icon: 'fa-university' }
            ].map(item => (
                <div key={item.label} className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm text-xl"><i className={`fas ${item.icon}`}></i></div>
                    <div>
                        <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">{item.label}</p>
                        <p className="font-bold text-sm truncate max-w-[150px]">{item.val}</p>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button 
          onClick={() => { setShowSettings(true); setActiveSettingsTab('info'); }}
          className="p-8 bg-white dark:bg-cardDark rounded-[2rem] shadow-xl border border-slate-50 dark:border-slate-800 flex items-center justify-between group hover:border-primary transition-all"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform shadow-inner">
              <i className="fas fa-cog"></i>
            </div>
            <div className="text-left">
              <h4 className="font-black uppercase tracking-tight italic">{language === 'vi' ? 'Cài đặt bảo mật' : 'Security Settings'}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{language === 'vi' ? 'Thông tin cá nhân, Ngân hàng' : 'Personal Info, Banking'}</p>
            </div>
          </div>
          <i className="fas fa-chevron-right text-slate-200 group-hover:text-primary transition-colors"></i>
        </button>

        <button 
          onClick={onLogout}
          className="p-8 bg-white dark:bg-cardDark rounded-[2rem] shadow-xl border border-slate-50 dark:border-slate-800 flex items-center justify-between group hover:border-red-500 transition-all"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.5rem] bg-red-50 text-red-500 flex items-center justify-center text-3xl group-hover:-rotate-12 transition-transform shadow-inner">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="text-left">
              <h4 className="font-black uppercase tracking-tight text-red-600 italic">{language === 'vi' ? 'Đăng xuất' : 'Logout'}</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{language === 'vi' ? 'Hẹn sớm gặp lại!' : 'See you soon!'}</p>
            </div>
          </div>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" onClick={() => setShowSettings(false)}></div>
          <div className="bg-white dark:bg-cardDark w-full max-w-2xl rounded-[3rem] p-10 relative z-10 shadow-2xl animate-scaleUp flex flex-col max-h-[90vh]">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-primary" onClick={() => setShowSettings(false)}>
              <i className="fas fa-times text-2xl"></i>
            </button>
            <h3 className="text-3xl font-black mb-8 text-primary uppercase tracking-tighter italic border-b dark:border-slate-800 pb-6">
              {language === 'vi' ? 'Cài đặt tài khoản' : 'Account Settings'}
            </h3>
            
            <div className="flex gap-4 mb-8">
              <button onClick={() => setActiveSettingsTab('info')} className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeSettingsTab === 'info' ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                {language === 'vi' ? 'Cập nhật thông tin' : 'Update Info'}
              </button>
              <button onClick={() => setActiveSettingsTab('display')} className={`flex-1 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeSettingsTab === 'display' ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                {language === 'vi' ? 'Giao diện & Ngôn ngữ' : 'Display & Language'}
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {activeSettingsTab === 'info' && (
                <div className="space-y-6">
                  {/* Avatar Edit Section */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <img src={editAvatar} className="w-24 h-24 rounded-3xl border-4 border-white dark:border-slate-700 shadow-md" alt="editing avatar" />
                    <div className="flex-grow space-y-3 w-full">
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'URL Ảnh đại diện' : 'Avatar URL'}</label>
                       <div className="flex gap-2">
                          <input 
                            value={editAvatar} 
                            onChange={e => setEditAvatar(e.target.value)} 
                            className="flex-grow bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2 text-xs outline-none focus:border-primary"
                            placeholder="https://example.com/image.jpg"
                          />
                          <button 
                            onClick={randomizeAvatar}
                            className="px-4 bg-primary text-white rounded-xl text-xs font-black shadow-md active:scale-95 transition-all"
                            title="Tạo ngẫu nhiên"
                          >
                            <i className="fas fa-dice"></i>
                          </button>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Họ và tên' : 'Full Name'}</label>
                        <input value={editName} onChange={e => setEditName(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Năm sinh' : 'Birth Year'}</label>
                        <input type="number" value={editBirth} onChange={e => setEditBirth(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
                        <input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                    </div>
                  </div>

                  {/* Bank Update Section */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] space-y-6 border border-slate-100 dark:border-slate-800">
                    <h4 className="font-black text-sm uppercase tracking-widest text-primary italic">{language === 'vi' ? 'Thông tin ngân hàng' : 'Bank Info'}</h4>
                    
                    <div className="space-y-2 relative">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Tìm kiếm Ngân hàng' : 'Search Bank'}</label>
                        <div className="relative">
                           <input 
                              placeholder={language === 'vi' ? "Nhập tên hoặc mã ngân hàng..." : "Enter bank name or code..."}
                              value={bankSearch} 
                              onChange={e => {
                                setBankSearch(e.target.value);
                                setShowBankList(true);
                              }}
                              onFocus={() => setShowBankList(true)}
                              className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-12 py-4 outline-none focus:border-primary" 
                           />
                           <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-300"></i>
                           {editBankName && !bankSearch && (
                             <div className="absolute right-5 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-lg">
                                {editBankName}
                             </div>
                           )}
                        </div>

                        {showBankList && (
                          <div className="absolute z-[300] top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 custom-scrollbar animate-slideIn">
                             {filteredBanks.length > 0 ? filteredBanks.map(b => (
                               <button 
                                  key={b.id} 
                                  onClick={() => { 
                                    setEditBankName(b.name); 
                                    setBankSearch(''); 
                                    setShowBankList(false); 
                                  }} 
                                  className="w-full text-left px-6 py-4 hover:bg-primary/5 transition-colors border-b last:border-0 border-slate-50 dark:border-slate-700 flex items-center justify-between group"
                               >
                                 <div className="flex flex-col">
                                    <span className="text-sm font-black group-hover:text-primary transition-colors">{b.name}</span>
                                    <span className="text-[9px] uppercase font-bold text-slate-400">{b.shortName}</span>
                                 </div>
                                 <i className={`fas fa-check text-primary opacity-0 ${editBankName === b.name ? 'opacity-100' : ''}`}></i>
                               </button>
                             )) : (
                               <div className="p-6 text-center text-slate-400 text-xs italic">
                                  {language === 'vi' ? 'Không tìm thấy ngân hàng nào.' : 'No bank found.'}
                               </div>
                             )}
                          </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Số tài khoản' : 'Account Number'}</label>
                            <input value={editBankAcc} onChange={e => setEditBankAcc(e.target.value)} className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{language === 'vi' ? 'Tên chủ tài khoản' : 'Owner Name'}</label>
                            <input value={editBankOwner} onChange={e => setEditBankOwner(e.target.value.toUpperCase())} className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:border-primary outline-none" />
                        </div>
                    </div>
                  </div>
                  <button onClick={handleUpdateInfo} className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">
                    {language === 'vi' ? 'Lưu cập nhật' : 'Save Changes'}
                  </button>
                </div>
              )}

              {activeSettingsTab === 'display' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                         <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-xl`}></i>
                      </div>
                      <span className="font-black text-sm uppercase tracking-tight">{language === 'vi' ? 'Chế độ tối' : 'Dark Mode'}</span>
                    </div>
                    <button 
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className={`w-16 h-9 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-primary shadow-[0_0_15px_rgba(30,136,229,0.5)]' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-1 w-7 h-7 bg-white rounded-full transition-all duration-300 ${isDarkMode ? 'left-8' : 'left-1 shadow-md'}`}></div>
                    </button>
                  </div>

                  {/* Language Selector */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">{language === 'vi' ? 'Chọn Ngôn ngữ' : 'Select Language'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setLanguage('vi')}
                        className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all ${language === 'vi' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-cardDark'}`}
                      >
                         <img src="https://flagcdn.com/w40/vn.png" className="w-8 h-6 rounded shadow-sm" alt="VN" />
                         <span className={`font-black uppercase tracking-widest text-xs ${language === 'vi' ? 'text-primary' : 'text-slate-500'}`}>Tiếng Việt</span>
                      </button>
                      <button 
                        onClick={() => setLanguage('en')}
                        className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all ${language === 'en' ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-cardDark'}`}
                      >
                         <img src="https://flagcdn.com/w40/us.png" className="w-8 h-6 rounded shadow-sm" alt="US" />
                         <span className={`font-black uppercase tracking-widest text-xs ${language === 'en' ? 'text-primary' : 'text-slate-500'}`}>English</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountTab;
