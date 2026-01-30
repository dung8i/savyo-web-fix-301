
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-cardDark border-t border-slate-100 dark:border-slate-800 pt-10 pb-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-black text-primary">
              <i className="fas fa-wallet"></i>
              <span>SAVYO</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Hoàn tiền thông minh, săn deal cực đỉnh. Tiết kiệm tối đa mỗi ngày cùng Savyo.
            </p>
            <div className="flex gap-3">
              {['facebook-f', 'youtube', 'tiktok'].map(icon => (
                <a key={icon} href="#" className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 transition-all">
                  <i className={`fab fa-${icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-white mb-4">Khám phá</h4>
            <ul className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
              <li className="hover:text-primary transition-colors cursor-pointer">Về chúng tôi</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Cẩm nang mua sắm</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Cộng đồng</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-white mb-4">Chính sách</h4>
            <ul className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
              <li className="hover:text-primary transition-colors cursor-pointer">Bảo mật</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Điều khoản</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Hoàn tiền</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-800 dark:text-white mb-4">Tải ứng dụng</h4>
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-black transition-all">
                <i className="fab fa-apple text-xl"></i>
                <div className="text-left"><p className="text-[8px] opacity-70">Download</p><p className="text-[10px] font-black">App Store</p></div>
              </button>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-black transition-all">
                <i className="fab fa-google-play text-xl"></i>
                <div className="text-left"><p className="text-[8px] opacity-70">Get it on</p><p className="text-[10px] font-black">Google Play</p></div>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t dark:border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <p>© 2024 SAVYO VIETNAM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">Trợ giúp</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Báo lỗi</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Liên hệ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
