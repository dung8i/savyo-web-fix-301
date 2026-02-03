
import React, { useState, useMemo } from 'react';

const DealsTab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Điện tử');

  // Thêm link trang chủ cho các sàn
  const platforms = [
    { id: 'shopee', name: 'Shopee', icon: 'fa-shopping-cart', color: '#f53d2d', bg: 'bg-[#f53d2d]/10', borderColor: 'border-[#f53d2d]', url: 'https://shopee.vn' },
    { id: 'lazada', name: 'Lazada', icon: 'fa-heart', color: '#0f146d', bg: 'bg-[#0f146d]/10', borderColor: 'border-[#0f146d]', url: 'https://www.lazada.vn' },
    { id: 'tiktok', name: 'TikTok', icon: 'fa-tiktok', color: '#000', bg: 'bg-black/10', borderColor: 'border-black dark:border-white', url: 'https://shop.tiktok.com' },
    { id: 'tiki', name: 'Tiki', icon: 'fa-store', color: '#1a94ff', bg: 'bg-[#1a94ff]/10', borderColor: 'border-[#1a94ff]', url: 'https://tiki.vn' },
  ];

  const hotDiscountCodes = useMemo(() => [
    { id: 1, platform: 'Shopee', code: 'SAVYO50', desc: 'Giảm 50k cho đơn từ 0đ', type: 'Freeship', expiry: '31/12/2026', remaining: Math.floor(Math.random() * 45) + 5 },
    { id: 2, platform: 'Lazada', code: 'LZDNEW20', desc: 'Giảm 20% cho khách hàng mới', type: 'Voucher', expiry: '30/11/2026', remaining: Math.floor(Math.random() * 80) + 10 },
    { id: 3, platform: 'TikTok', code: 'TTSSAVY', desc: 'Hoàn tiền 15% tối đa 100k', type: 'Cashback', expiry: '31/10/2026', remaining: Math.floor(Math.random() * 25) + 2 },
    { id: 4, platform: 'Tiki', code: 'TIKIFREE', desc: 'Miễn phí vận chuyển toàn quốc', type: 'Freeship', expiry: '01/01/2027', remaining: Math.floor(Math.random() * 150) + 20 },
    { id: 5, platform: 'Grab', code: 'GRABSAVYO', desc: 'Giảm 30k mọi đơn GrabFood', type: 'Ăn uống', expiry: '15/12/2026', remaining: Math.floor(Math.random() * 12) + 1 },
  ], []);

  const categories = ['Điện tử', 'Thời trang', 'Mỹ phẩm', 'Gia dụng', 'Thực phẩm'];

  // Dữ liệu sản phẩm tĩnh với link thực tế từ các sàn
  const productsDatabase: Record<string, any[]> = {
    'Điện tử': [
      {
        id: 101,
        name: 'Tai nghe Sony WH-1000XM5 Hi-Res Noise Canceling',
        price: 6490000,
        oldPrice: 8490000,
        discount: '-24%',
        platform: 'Shopee',
        img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80',
        link: 'https://shopee.vn/Tai-nghe-bluetooth-Sony-WH-1000XM5-m%C3%A0ng-loa-30mm-chu%E1%BA%A9n-Hi-Res-c%C3%B4ng-ngh%E1%BB%87-Auto-NC-Optimizer-ch%E1%BB%91ng-%E1%BB%93n-th%C3%B4ng-minh-pin-30h-i.1152330179.25364859955'
      },
      {
        id: 102,
        name: 'Apple Watch Series 10 GPS 46mm Chính Hãng',
        price: 9990000,
        oldPrice: 11990000,
        discount: '-17%',
        platform: 'Shopee',
        img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=400&q=80',
        link: 'https://shopee.vn/Apple-Watch-Series-10-GPS-46mm-D%C3%A2y-V%E1%BA%A3i-Ch%C3%ADnh-h%C3%A3ng-i.308461157.27862957548'
      },
      {
        id: 103,
        name: 'Bàn phím cơ không dây Nuphy Air75 V3',
        price: 2500000,
        oldPrice: 3200000,
        discount: '-22%',
        platform: 'Lazada',
        img: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=400&q=80',
        link: 'https://www.lazada.vn/products/ban-phim-co-nuphy-air75-v2'
      },
      {
        id: 104,
        name: 'Chuột không dây Logitech MX Master 3S',
        price: 1850000,
        oldPrice: 2450000,
        discount: '-24%',
        platform: 'Tiki',
        img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80',
        link: 'https://tiki.vn/chuot-khong-day-logitech-mx-master-3s-p196602352.html'
      }
    ],
    'Thời trang': [
      { id: 201, name: 'Áo Hoodie Essentials', price: 350000, oldPrice: 500000, discount: '-30%', platform: 'TikTok', img: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?auto=format&fit=crop&w=400&q=80', link: 'https://shop.tiktok.com/view/product/1729384' },
      { id: 202, name: 'Giày Nike Air Jordan 1', price: 3200000, oldPrice: 4500000, discount: '-28%', platform: 'Lazada', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', link: 'https://www.lazada.vn/catalog/?q=nike+jordan' },
      { id: 203, name: 'Túi xách Local Brand', price: 450000, oldPrice: 600000, discount: '-25%', platform: 'Shopee', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80', link: 'https://shopee.vn/search?keyword=tui+xach' },
      { id: 204, name: 'Kính mát Gentle Monster', price: 5500000, oldPrice: 6000000, discount: '-8%', platform: 'Shopee', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80', link: 'https://shopee.vn/search?keyword=gentle+monster' }
    ],
    'Mỹ phẩm': [
        { id: 301, name: 'Son MAC Chili', price: 450000, oldPrice: 600000, discount: '-25%', platform: 'Lazada', img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=400&q=80', link: 'https://www.lazada.vn/catalog/?q=son+mac' },
        { id: 302, name: 'Nước tẩy trang L\'Oreal', price: 120000, oldPrice: 180000, discount: '-33%', platform: 'Shopee', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80', link: 'https://shopee.vn/search?keyword=nuoc+tay+trang' },
    ],
    'Gia dụng': [
        { id: 401, name: 'Nồi chiên không dầu Philips', price: 1800000, oldPrice: 2500000, discount: '-28%', platform: 'Tiki', img: 'https://images.unsplash.com/photo-1593584255549-13d896913511?auto=format&fit=crop&w=400&q=80', link: 'https://tiki.vn/search?q=noi+chien+khong+dau' },
    ],
    'Thực phẩm': [
        { id: 501, name: 'Ngũ cốc Granola 500g', price: 110000, oldPrice: 150000, discount: '-26%', platform: 'TikTok', img: 'https://images.unsplash.com/photo-1517093729904-8b01c37b7501?auto=format&fit=crop&w=400&q=80', link: 'https://vt.tiktok.com/search?q=granola' },
    ]
  };

  const getProducts = (category: string) => {
    return productsDatabase[category] || productsDatabase['Điện tử'];
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  // Hàm mở link mới, quan trọng để fix lỗi mất điều hướng
  const openInNewTab = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn pb-24">
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
                  <span>HSD: {item.expiry}</span>
                  <span className="text-red-500">Còn {item.remaining} lượt</span>
               </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {platforms.map(p => (
          <button 
            key={p.id} 
            onClick={() => openInNewTab(p.url)} 
            className="flex-grow md:flex-1 p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 border border-transparent bg-white dark:bg-cardDark shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
          >
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
        <div>
           <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-tighter italic mb-2 flex items-center gap-2 animate-pulse">
             <i className="fas fa-bolt text-red-500"></i> FLASH DEAL
           </h3>
           <h4 className="text-lg font-bold flex items-center gap-3 uppercase tracking-tighter text-slate-600 dark:text-slate-300">
             <i className="fas fa-shopping-bag text-primary"></i> Đề cử cho bạn: {activeCategory}
           </h4>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {getProducts(activeCategory).map(prod => (
            <div 
              key={prod.id} 
              onClick={() => openInNewTab(prod.link)}
              className="bg-white dark:bg-cardDark rounded-[2rem] overflow-hidden shadow-xl border border-slate-50 dark:border-slate-800 group hover:shadow-2xl transition-all cursor-pointer"
            >
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Tránh kích hoạt click của parent div 2 lần
                    openInNewTab(prod.link);
                  }}
                  className="w-full bg-primary text-white py-3 rounded-2xl text-[10px] font-black shadow-lg active:scale-95 transition-all uppercase tracking-widest hover:bg-primary/90"
                >
                  Săn ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsTab;
