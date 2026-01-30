
import React, { useState } from 'react';
import { User } from '../types';

interface CommunityTabProps {
  user: User;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ user }) => {
  const [activeSubTab, setActiveSubTab] = useState<'blog' | 'guide'>('blog');

  const blogPosts = [
    {
      id: 1,
      author: 'Nguyễn Văn A',
      avatar: 'https://picsum.photos/seed/a1/50/50',
      time: '1 giờ trước',
      title: 'Săn cái gì hời mời anh em?',
      content: 'Áo thun KERO chỉ còn 299k so với giá gốc 549k. Mọi người vào đặt nhanh kẻo hết nhé!',
      stats: { comments: 62, likes: 17, shares: 5 }
    },
    {
      id: 2,
      author: 'Trần B',
      avatar: 'https://picsum.photos/seed/a2/50/50',
      time: '3 giờ trước',
      title: 'Cảnh báo lừa đảo khi mua hàng online!',
      content: 'Mọi người chú ý shop ABC nhé, treo đầu dê bán thịt chó. Mình vừa bị mất 500k, may mà được Savyo hỗ trợ...',
      stats: { comments: 16, likes: 5, shares: 2 }
    }
  ];

  const guideItems = [
    { title: 'Cách đăng ký tài khoản', icon: 'fa-user-plus', color: 'bg-blue-100 text-blue-600' },
    { title: 'Hướng dẫn rút tiền', icon: 'fa-wallet', color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Cách nhận hoàn tiền Shopee', icon: 'fa-shopping-cart', color: 'bg-orange-100 text-orange-600' },
    { title: 'Mẹo săn mã giảm giá 0đ', icon: 'fa-percentage', color: 'bg-purple-100 text-purple-600' },
  ];

  const handleCreatePost = () => {
    const allowedRanks = ['Thành viên Bạc', 'Thành viên Vàng', 'Thành viên Kim Cương'];
    if (!allowedRanks.includes(user.rank)) {
      alert(`Xin lỗi! Hạng hiện tại (${user.rank}) chưa đủ điều kiện. Bạn cần nâng cấp lên hạng Bạc (Silver) để đăng bài.`);
      return;
    }
    alert('Khởi tạo trình soạn thảo bài viết mới...');
  };

  return (
    <div className="animate-fadeIn space-y-6 relative pb-20">
      {/* Sub-tab Navigation */}
      <div className="flex items-center justify-center p-1 bg-white dark:bg-cardDark rounded-2xl shadow-md border border-slate-100 dark:border-slate-800 w-full max-w-md mx-auto">
        <button 
          onClick={() => setActiveSubTab('blog')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${activeSubTab === 'blog' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <i className="fas fa-rss mr-2"></i> Blog
        </button>
        <button 
          onClick={() => setActiveSubTab('guide')}
          className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all ${activeSubTab === 'guide' ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <i className="fas fa-graduation-cap mr-2"></i> Hướng dẫn
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {activeSubTab === 'blog' ? (
          <>
            <div className="lg:col-span-2 space-y-6">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-cardDark rounded-[2.5rem] p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <img src={post.avatar} className="w-12 h-12 rounded-full border-2 border-primary/20" alt="avatar" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white">{post.author}</h4>
                      <p className="text-[10px] text-slate-400">{post.time}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">{post.content}</p>
                  <div className="flex gap-6 text-slate-400 text-xs border-t dark:border-slate-800 pt-6">
                    <span className="flex items-center gap-2 hover:text-primary transition-colors"><i className="fas fa-comment"></i> {post.stats.comments}</span>
                    <span className="flex items-center gap-2 hover:text-red-500 transition-colors"><i className="fas fa-heart"></i> {post.stats.likes}</span>
                    <span className="flex items-center gap-2 hover:text-primary transition-colors"><i className="fas fa-share"></i> {post.stats.shares}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-cardDark rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold mb-4">Top chủ đề hot</h3>
                <div className="flex flex-wrap gap-2">
                  {['#SavyoSale', '#FlashSaleShopee', '#ReviewDoCongNghe'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold rounded-lg hover:bg-primary/10 hover:text-primary cursor-pointer transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guideItems.map(item => (
              <div key={item.title} className="bg-white dark:bg-cardDark rounded-3xl p-8 shadow-lg border border-slate-100 dark:border-slate-800 hover:scale-105 transition-all cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:rotate-12 transition-transform`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                <div className="flex items-center justify-between text-slate-400 group-hover:text-primary transition-all">
                  <span className="text-xs font-bold uppercase tracking-widest">Khám phá</span>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FIXED FLOATING ACTION BUTTON */}
      {activeSubTab === 'blog' && (
        <button 
          onClick={handleCreatePost}
          className="fixed bottom-10 right-10 w-16 h-16 bg-emerald-500 text-white rounded-[2rem] shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-12 active:scale-95 transition-all group z-[180]"
          title="Đăng bài mới"
        >
          <i className="fas fa-plus text-3xl"></i>
          <span className="absolute -top-1 -right-1 bg-white dark:bg-slate-800 text-emerald-500 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-emerald-500">NEW</span>
        </button>
      )}
    </div>
  );
};

export default CommunityTab;
