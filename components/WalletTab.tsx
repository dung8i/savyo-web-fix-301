
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { User } from '../types';

interface WalletTabProps {
  user: User;
}

const WalletTab: React.FC<WalletTabProps> = ({ user }) => {
  const isDemo = user.email === 'demo.guest@savyo.vn';

  const spendingData = isDemo ? [
    { name: 'Shopee', value: 45 },
    { name: 'Lazada', value: 25 },
    { name: 'Tiktok', value: 20 },
    { name: 'Ăn uống', value: 10 },
  ] : [
    { name: 'Chưa có', value: 100 }
  ];

  const COLORS = isDemo 
    ? ['#1e88e5', '#ff9800', '#d32f2f', '#4caf50']
    : ['#e2e8f0']; // Grey for empty state

  const history = isDemo ? [
    { id: 1, item: 'iPhone 15 Case', platform: 'Shopee', amount: -25000, date: 'Hôm nay' },
    { id: 2, item: 'Hoàn tiền đơn giày', platform: 'Lazada', amount: 45000, date: 'Hôm qua' },
    { id: 3, item: 'Mua Voucher KFC', platform: 'Savyo', amount: -50000, date: '21/10' },
  ] : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spending Analytics */}
        <div className="bg-white dark:bg-cardDark rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
            <i className="fas fa-chart-pie text-primary"></i> Biểu đồ chi tiêu
          </h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                {isDemo && <Tooltip />}
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
            {!isDemo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chưa có dữ liệu</span>
              </div>
            )}
          </div>
          
          {isDemo ? (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-4">
               <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center text-red-600">
                 <i className="fas fa-exclamation-triangle"></i>
               </div>
               <div>
                 <p className="text-sm font-bold text-red-600">Cảnh báo chi tiêu!</p>
                 <p className="text-xs text-red-500">Bạn đã dùng 85% ngân sách dự kiến tháng này.</p>
               </div>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-4">
               <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400">
                 <i className="fas fa-info-circle"></i>
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Quản lý tài chính</p>
                 <p className="text-xs text-slate-400">Dữ liệu chi tiêu sẽ xuất hiện khi bạn bắt đầu mua sắm.</p>
               </div>
            </div>
          )}
        </div>

        {/* Purchase History */}
        <div className="bg-white dark:bg-cardDark rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
            <span><i className="fas fa-history text-primary"></i> Lịch sử giao dịch</span>
            {isDemo && <button className="text-xs text-primary font-bold hover:underline">Xem tất cả</button>}
          </h3>
          <div className="space-y-4">
            {history.length > 0 ? history.map(h => (
              <div key={h.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-primary/20 transition-all">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${h.amount > 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-600'}`}>
                  <i className={`fas ${h.amount > 0 ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                </div>
                <div className="flex-grow">
                  <div className="font-bold text-sm text-slate-800 dark:text-white">{h.item}</div>
                  <div className="text-[10px] text-slate-400">{h.platform} • {h.date}</div>
                </div>
                <div className={`font-black ${h.amount > 0 ? 'text-emerald-500' : 'text-slate-800 dark:text-white'}`}>
                  {h.amount > 0 ? '+' : ''}{h.amount.toLocaleString()}đ
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
                  <i className="fas fa-receipt"></i>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest">Chưa có giao dịch</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Financial Education Video */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="w-full lg:w-2/5 aspect-video bg-black rounded-2xl shadow-2xl relative overflow-hidden ring-4 ring-white/10 group-hover:ring-primary/40 transition-all">
             <img src="https://picsum.photos/seed/edu/800/450" className="w-full h-full object-cover opacity-60" alt="fin-edu" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-2xl hover:scale-110 transition-all cursor-pointer">
                  <i className="fas fa-play ml-1"></i>
                </div>
             </div>
          </div>
          <div className="flex-grow space-y-4 text-center lg:text-left">
            <h3 className="text-3xl font-black italic tracking-tight">Kỹ Năng Quản Lý Tài Chính 101</h3>
            <p className="text-slate-400 max-w-xl">Học cách tích lũy và đầu tư thông minh từ số tiền hoàn nhỏ nhất mỗi ngày cùng chuyên gia tài chính Savyo.</p>
            <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm shadow-xl hover:bg-primary hover:text-white transition-all active:scale-95 uppercase tracking-widest">
              XEM VIDEO NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTab;
