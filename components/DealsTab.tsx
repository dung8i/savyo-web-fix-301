
import React, { useState } from 'react';

const DealsTab: React.FC = () => {
  const [selectedPlatformModal, setSelectedPlatformModal] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('Điện tử');

  const platforms = [
    { id: 'shopee', name: 'Shopee', icon: 'fa-shopping-cart', color: '#f53d2d', bg: 'bg-[#f53d2d]/10' },
    { id: 'lazada', name: 'Lazada', icon: 'fa-heart', color: '#0f146d', bg: 'bg-[#0f146d]/10' },
    { id: 'tiktok', name: 'TikTok', icon: 'fa-tiktok', color: '#000', bg: 'bg-black/10' },
    { id: 'tiki', name: 'Tiki', icon: 'fa-store', color: '#1a94ff', bg: 'bg-[#1a94ff]/10' },
  ];

  const hotDiscountCodes = [
    { id: 1, platform: 'Shopee', code: 'SAVYO50', desc: 'Giảm 50k cho đơn từ 0đ', type: 'Freeship' },
    { id: 2, platform: 'Lazada', code: 'LZDNEW20', desc: 'Giảm 20% cho khách hàng mới', type: 'Voucher' },
    { id: 3, platform: 'TikTok', code: 'TTSSAVY', desc: 'Hoàn tiền 15% tối đa 100k', type: 'Cashback' },
    { id: 4, platform: 'Tiki', code: 'TIKIFREE', desc: 'Miễn phí vận chuyển toàn quốc', type: 'Freeship' },
    { id: 5, platform: 'Grab', code: 'GRABSAVYO', desc: 'Giảm 30k mọi đơn GrabFood', type: 'Ăn uống' },
  ];

  const categories = ['Điện tử', 'Thời trang', 'Mỹ phẩm', 'Gia dụng', 'Thực phẩm'];

  const getProducts = (category: string) => {
    const images: Record<string, string[]> = {
      'Điện tử': [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80'
      ],
      'Thời trang': [
        'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80'
      ],
      'Gia dụng': [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80'
      ]
    };
    
    const categoryImages = images[category] || images['Điện tử'];

    return [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
      id: i,
      name: `${category} nhập khẩu chính hãng Ver.${i}`,
      price: (Math.floor(Math.random() * 900) + 100) * 1000,
      oldPrice: (Math.floor(Math.random() * 500) + 1000) * 1000,
      discount: '-45%',
      platform: platforms[i % 4].name,
      img: categoryImages[i % categoryImages.length]
    }));
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-10">
      <div className="space-y-6">
        <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
          <i className="fas fa-fire text-orange-500 animate-bounce"></i> Mã Giảm Giá Đang Hot
        </h3>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {hotDiscountCodes.map(item => (
            <div key={item.id} className="min-w-[320px] bg-white dark:bg-cardDark rounded-[2.5rem] p-8 shadow-xl border border-primary/10 flex flex-col justify-between group hover:border-primary transition-all relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4"></div>
               <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest bg-primary text-white px-4 py-1.5 rounded-full shadow-lg">{item.platform}</span>
                  <span className="text-[10px] font-black uppercase text-slate-400 italic">{item.type}</span>
               </div>
               <div className="mb-6 relative z-10">
                  <p className="font-bold text-base text-slate-800 dark:text-white leading-tight mb-4">{item.desc}</p>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-4 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between group-hover:border-primary transition-colors">
                     <span className="font-mono text-xl font-black tracking-[0.2em] text-primary">{item.code}</span>
                     <button 
                        onClick={() => handleCopyCode(item.code)}
                        className="w-10 h-10 bg-primary text-white rounded-xl shadow-lg hover:scale-110 active:scale-90 transition-all flex items-center justify-center"
                     >
                        <i className="fas fa-copy"></i>
                     </button>
                  </div>
               </div>
               <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest relative z-10">
                  <span>HSD: 24/10/2024</span>
                  <span className="text-red-500">Còn 12 lượt</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {platforms.map(p => (
          <button key={p.id} onClick={() => setSelectedPlatformModal(p.id)} className="flex-grow md:flex-1 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border border-transparent bg-white dark:bg-cardDark shadow-lg hover:shadow-2xl transition-all group">
            <div className={`w-14 h-14 rounded-2xl ${p.bg} flex items-center justify-center text-2xl transition-transform group-hover:scale-110`} style={{ color: p.color }}>
              <i className={`${p.id === 'tiktok' ? 'fab' : 'fas'} ${p.icon}`}></i>
            </div>
            <span className="font-black text-[10px] uppercase tracking-widest text-slate-700 dark:text-slate-300">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-6 py-3 rounded-2xl whitespace-nowrap font-black text-[11px] uppercase tracking-wider transition-all shadow-md ${activeCategory === cat ? 'bg-primary text-white scale-105' : 'bg-white dark:bg-cardDark text-slate-500'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tighter italic">
          <i className="fas fa-shopping-bag text-primary"></i> Đề cử cho bạn: {activeCategory}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {getProducts(activeCategory).map(prod => (
            <div key={prod.id} className="bg-white dark:bg-cardDark rounded-[2rem] overflow-hidden shadow-xl border border-slate-50 dark:border-slate-800 group hover:shadow-2xl transition-all">
              <div className="h-44 md:h-52 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img src={prod.img} alt="deal" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-xl shadow-lg">{prod.discount}</div>
                <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-black/80 px-2 py-1 rounded-xl shadow-lg backdrop-blur-sm">
                  <span className="text-[9px] font-black text-primary uppercase">{prod.platform}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h4 className="font-bold text-sm line-clamp-2 h-10 group-hover:text-primary transition-colors leading-tight">{prod.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-red-500">{prod.price.toLocaleString()}đ</span>
                  <span className="text-[10px] text-slate-400 line-through mb-1">{prod.oldPrice.toLocaleString()}đ</span>
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-2xl text-[10px] font-black shadow-lg active:scale-95 transition-all uppercase tracking-widest">Săn ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsTab;
