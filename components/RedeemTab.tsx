
import React, { useState } from 'react';
import { User, Voucher, WithdrawalRecord } from '../types';

interface RedeemTabProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const RedeemTab: React.FC<RedeemTabProps> = ({ user, setUser }) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyTab, setHistoryTab] = useState<'withdraw' | 'voucher'>('withdraw');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [showVoucherDetail, setShowVoucherDetail] = useState<Voucher | null>(null);

  const brands = [
    { name: 'KFC', icon: 'fa-drumstick-bite', color: '#e4002b' },
    { name: 'Highland', icon: 'fa-coffee', color: '#8b0000' },
    { name: 'Phúc Long', icon: 'fa-leaf', color: '#005a31' },
    { name: 'Grab', icon: 'fa-car', color: '#00b14f' },
    { name: 'XanhSM', icon: 'fa-taxi', color: '#00a99d' },
    { name: 'Shopee', icon: 'fa-shopping-cart', color: '#ee4d2d' },
  ];

  const incomingDonations = [
    { id: 'd1', label: 'Hoàn tiền Shopee', amount: 45000, time: 'Vừa xong' },
    { id: 'd2', label: 'Hoàn tiền Lazada', amount: 12000, time: '10 phút trước' },
    { id: 'd3', label: 'Thưởng mời bạn', amount: 100000, time: 'Hôm nay' },
  ];

  const withdrawalHistory: WithdrawalRecord[] = [
    { id: '1', amount: 200000, time: '14:20 22/10/2024', status: 'completed' },
    { id: '2', amount: 50000, time: '09:15 15/10/2024', status: 'completed' },
  ];

  const voucherHistory: Voucher[] = [
    { id: 'v1', brand: 'Phúc Long', value: '50k', price: 45000, expiry: '31/12/2024', code: 'PL50SAVYO', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PL50SAVYO' },
    { id: 'v2', brand: 'Grab', value: '100k', price: 90000, expiry: '15/11/2024', code: 'GR100SAVYO', qr: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GR100SAVYO' },
  ];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val === '') {
      setWithdrawAmount('');
      return;
    }
    const num = parseInt(val);
    setWithdrawAmount(num.toLocaleString('vi-VN'));
  };

  const handleWithdraw = () => {
    const amountNum = parseInt(withdrawAmount.replace(/\D/g, ''));
    if (!amountNum || amountNum < 50000) {
      alert('Số tiền rút tối thiểu là 50.000đ');
      return;
    }
    if (amountNum > user.balance) {
      alert('Số dư không đủ để thực hiện giao dịch!');
      return;
    }
    alert(`Yêu cầu rút ${amountNum.toLocaleString()}đ đang được xử lý!`);
    setWithdrawAmount('');
  };

  const denominations = ['50k', '100k', '200k', '500k'];

  return (
    <div className="space-y-8 animate-fadeIn relative pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Withdrawal Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-primary via-blue-700 to-indigo-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden group border-4 border-white/10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
            <h3 className="text-xs font-black mb-2 uppercase tracking-[0.2em] opacity-80">Số dư SAVYO</h3>
            <div className="text-4xl font-black mb-6 drop-shadow-lg">{user.balance.toLocaleString('vi-VN')}đ</div>
            
            <div className="space-y-4 mb-6">
               <label className="text-[10px] font-black uppercase tracking-widest opacity-70">Nhập số tiền muốn rút</label>
               <div className="relative">
                  <input 
                    type="text" 
                    value={withdrawAmount}
                    onChange={handleAmountChange}
                    placeholder="Tối thiểu 50.000"
                    className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 text-xl font-black focus:outline-none focus:ring-2 focus:ring-white/40 placeholder:text-white/30"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-sm text-white/50 italic">VNĐ</span>
               </div>
            </div>

            <button 
              onClick={handleWithdraw}
              className="w-full py-4 bg-white text-primary font-black rounded-2xl shadow-xl hover:bg-orange-50 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-tighter text-sm"
            >
              <i className="fas fa-rocket"></i> RÚT TIỀN NGAY
            </button>
          </div>

          {/* Recent Income List */}
          <div className="bg-white dark:bg-cardDark rounded-[2rem] p-6 shadow-xl border border-slate-50 dark:border-slate-800">
             <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
               <i className="fas fa-plus-circle"></i> Vừa được cộng tiền
             </h4>
             <div className="space-y-3">
                {incomingDonations.map(d => (
                   <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-emerald-500/20 transition-all">
                      <div className="text-xs font-bold">{d.label}</div>
                      <div className="text-right">
                         <div className="text-emerald-500 font-black text-sm">+{d.amount.toLocaleString()}đ</div>
                         <div className="text-[9px] text-slate-400 font-bold uppercase">{d.time}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>

        {/* Voucher Selection Section */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter italic">
            <i className="fas fa-gift text-primary"></i> Đổi thưởng ngay
          </h3>
          <div className="bg-white dark:bg-cardDark rounded-[2.5rem] p-10 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[5rem]"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <button
                  key={brand.name}
                  onClick={() => setSelectedBrand(brand.name)}
                  className="flex flex-col items-center gap-3 group p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <div 
                    className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ backgroundColor: brand.color + '10', color: brand.color, border: `2px solid ${brand.color}20` }}
                  >
                    <i className={`fas ${brand.icon} text-3xl`}></i>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center truncate w-full">{brand.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-primary/5 dark:bg-primary/10 rounded-[2rem] p-6 border border-dashed border-primary/30 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center text-xl shadow-lg animate-pulse"><i className="fas fa-magic"></i></div>
                <div>
                   <h4 className="font-black text-xs uppercase tracking-tight">Voucher linh hoạt</h4>
                   <p className="text-[10px] text-slate-500 font-bold">Mọi mệnh giá, thanh toán 1 chạm</p>
                </div>
             </div>
             <button className="px-5 py-2.5 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Săn deal</button>
          </div>
        </div>
      </div>

      {/* Floating Single History Button */}
      <button 
        onClick={() => { setHistoryTab('withdraw'); setShowHistoryModal(true); }}
        className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-[1.5rem] shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-all group z-[180]"
        title="Lịch sử giao dịch"
      >
        <i className="fas fa-history text-2xl"></i>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-white dark:border-cardDark shadow-lg">9+</span>
      </button>

      {/* Brand Voucher Selection Modal */}
      {selectedBrand && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setSelectedBrand(null)}></div>
          <div className="bg-white dark:bg-cardDark w-full max-w-lg rounded-[2.5rem] p-10 relative z-10 shadow-2xl animate-scaleUp">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-primary" onClick={() => setSelectedBrand(null)}>
              <i className="fas fa-times text-2xl"></i>
            </button>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-black text-primary uppercase tracking-tighter italic">Voucher {selectedBrand}</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Săn quà thả ga - Không lo về giá</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {denominations.map(val => (
                <div key={val} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-primary/40 transition-all text-center group">
                  <div className="text-3xl font-black text-slate-800 dark:text-white mb-2 italic tracking-tighter">{val}</div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6">Mã giảm trực tiếp</p>
                  <button 
                    className="w-full py-3 bg-primary text-white rounded-2xl font-black text-[10px] shadow-lg group-hover:scale-105 active:scale-95 transition-all uppercase tracking-widest"
                    onClick={() => {
                        alert(`Chúc mừng! Bạn đã đổi thành công voucher ${selectedBrand} ${val}`);
                        setSelectedBrand(null);
                    }}
                  >
                    Đổi thưởng
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Unified History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-fadeIn" onClick={() => setShowHistoryModal(false)}></div>
          <div className="bg-white dark:bg-cardDark w-full max-w-2xl rounded-[3rem] p-10 relative z-10 shadow-2xl animate-slideIn flex flex-col max-h-[85vh] overflow-hidden border border-white/20">
            <button className="absolute top-8 right-8 text-slate-400 hover:text-primary transition-colors" onClick={() => setShowHistoryModal(false)}>
              <i className="fas fa-times text-2xl"></i>
            </button>
            <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter italic text-primary">Nhật ký giao dịch</h3>
            
            <div className="flex gap-4 mb-8 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl">
              <button 
                onClick={() => setHistoryTab('withdraw')}
                className={`flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${historyTab === 'withdraw' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                Rút tiền ({withdrawalHistory.length})
              </button>
              <button 
                onClick={() => setHistoryTab('voucher')}
                className={`flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${historyTab === 'voucher' ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
              >
                Voucher ({voucherHistory.length})
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {historyTab === 'withdraw' ? (
                withdrawalHistory.map(item => (
                  <div key={item.id} className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-800/40 border-2 border-transparent hover:border-primary/20 flex justify-between items-center group transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform"><i className="fas fa-hand-holding-usd"></i></div>
                      <div>
                        <div className="font-black text-xl italic text-slate-800 dark:text-white">-{item.amount.toLocaleString()}đ</div>
                        <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{item.time}</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full font-black uppercase tracking-widest shadow-sm">Hoàn tất</span>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  {voucherHistory.map(v => (
                    <div key={v.id} className="p-6 rounded-[2rem] bg-white dark:bg-slate-800/40 border-4 border-dashed border-slate-100 dark:border-slate-700 relative group overflow-hidden hover:border-primary/40 transition-all">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl shadow-inner">
                          <i className="fas fa-ticket-alt"></i>
                        </div>
                        <div>
                          <div className="font-black text-sm uppercase tracking-tight text-slate-800 dark:text-white">{v.brand} - {v.value}</div>
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">HSD: {v.expiry}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowVoucherDetail(v)}
                        className="w-full py-3 bg-primary text-white rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                      >
                        Xem voucher
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Voucher Detail Modal (Nested/Separate Overlay) */}
      {showVoucherDetail && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowVoucherDetail(null)}></div>
          <div className="bg-white dark:bg-cardDark w-full max-w-sm rounded-[3rem] p-10 relative z-10 shadow-2xl animate-scaleUp text-center">
            <button className="absolute top-6 right-6 text-slate-400 hover:text-primary" onClick={() => setShowVoucherDetail(null)}>
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
              <i className="fas fa-qrcode"></i>
            </div>
            <h4 className="text-2xl font-black uppercase tracking-tighter mb-2 italic">{showVoucherDetail.brand} {showVoucherDetail.value}</h4>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Đưa mã cho nhân viên quét</p>
            
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 mb-8">
               <img src={showVoucherDetail.qr} className="w-48 h-48 mx-auto rounded-xl border-4 border-white shadow-lg mb-6" alt="qr" />
               <div className="font-mono text-xl font-black tracking-[0.3em] text-primary uppercase select-all">{showVoucherDetail.code}</div>
            </div>
            
            <button 
              className="w-full py-4 bg-slate-900 text-white dark:bg-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all"
              onClick={() => {
                 navigator.clipboard.writeText(showVoucherDetail.code || '');
                 alert('Đã sao chép mã voucher!');
              }}
            >
              Sao chép mã
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedeemTab;
