
import React, { useState } from 'react';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<1 | 2>(1); // 1: Email, 2: OTP (For Register)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleAction = () => {
    if (mode === 'login') {
      onLoginSuccess(email || 'savyo_user@gmail.com');
    } else {
      if (step === 1) {
        setStep(2);
        alert('Mã OTP demo: 123456');
      } else {
        onLoginSuccess(email || 'new_member@gmail.com');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-fadeIn" onClick={onClose}></div>
      <div className="bg-white dark:bg-cardDark w-full max-w-md rounded-[3rem] p-10 relative z-10 shadow-2xl animate-scaleUp overflow-hidden border border-white/20">
        <button className="absolute top-8 right-8 text-slate-400 hover:text-primary transition-colors" onClick={onClose}>
          <i className="fas fa-times text-2xl"></i>
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4">
            <i className={`fas ${mode === 'login' ? 'fa-user-lock' : 'fa-user-plus'}`}></i>
          </div>
          <h3 className="text-3xl font-black uppercase tracking-tighter italic">
            {mode === 'login' ? 'Chào mừng trở lại' : 'Gia nhập Savyo'}
          </h3>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            {mode === 'login' ? 'Đăng nhập để tiếp tục' : 'Tiết kiệm thông minh ngay hôm nay'}
          </p>
        </div>

        <div className="space-y-5">
          {mode === 'login' ? (
            <>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Email hoặc Số điện thoại</label>
                <input 
                  type="text" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Mật khẩu</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
                />
              </div>
            </>
          ) : (
            <>
              {step === 1 ? (
                <div className="space-y-2 animate-fadeIn">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Email đăng ký</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com" 
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
                  />
                </div>
              ) : (
                <div className="space-y-5 animate-fadeIn">
                  <div className="space-y-2 text-center">
                    <p className="text-xs font-bold text-slate-500">Chúng tôi đã gửi mã OTP đến {email}</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <input key={i} maxLength={1} className="w-10 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl text-center font-black text-xl border-2 border-transparent focus:border-primary outline-none" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Tạo mật khẩu</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 focus:border-primary outline-none" />
                  </div>
                </div>
              )}
            </>
          )}

          <button 
            onClick={handleAction}
            className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xs shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest mt-4"
          >
            {mode === 'login' ? 'Đăng nhập ngay' : step === 1 ? 'Nhận mã OTP' : 'Hoàn tất đăng ký'}
          </button>

          <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            <span className="px-4 text-[10px] font-black uppercase text-slate-300">Hoặc</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold text-[10px] uppercase hover:bg-slate-100 transition-all">
              <i className="fab fa-google text-red-500 text-lg"></i> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 font-bold text-[10px] uppercase hover:bg-slate-100 transition-all">
              <i className="fab fa-facebook text-blue-600 text-lg"></i> Facebook
            </button>
          </div>

          <p className="text-center text-[11px] font-bold text-slate-500 mt-6">
            {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
            <button 
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setStep(1); }}
              className="text-primary ml-2 hover:underline font-black uppercase"
            >
              {mode === 'login' ? 'Tạo tài khoản' : 'Đăng nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
