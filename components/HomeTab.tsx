
import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface AnalyzedProduct {
  name: string;
  image: string;
  platform: string;
  cashbackPercent: number;
  cashbackAmount: number;
  price: number;
  isDeveloping?: boolean;
  link: string;
}

interface HomeTabProps {
  onSwitchTab: (tab: TabType) => void;
}

const flashDeals = [
  {
    id: 1,
    name: 'Tai nghe Bluetooth Sony WH-1000XM5',
    price: 6490000,
    oldPrice: 8490000,
    discount: '-24%',
    platform: 'Shopee',
    // Ảnh tai nghe Sony XM5 đen
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    link: 'https://shopee.vn/Tai-nghe-bluetooth-Sony-WH-1000XM5-m%C3%A0ng-loa-30mm-chu%E1%BA%A9n-Hi-Res-c%C3%B4ng-ngh%E1%BB%87-Auto-NC-Optimizer-ch%E1%BB%91ng-%E1%BB%93n-th%C3%B4ng-minh-pin-30h-i.1152330179.25364859955?extraParams=%7B%22display_model_id%22%3A127849238156%2C%22model_selection_logic%22%3A3%7D&sp_atk=34e69c55-fcd2-4290-90f8-f0081da9670d&xptdk=34e69c55-fcd2-4290-90f8-f0081da9670d'
  },
  {
    id: 2,
    name: 'Đồng hồ Apple Watch Series 10',
    price: 9990000,
    oldPrice: 11990000,
    discount: '-17%',
    platform: 'Shopee',
    // Ảnh Apple Watch
    img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    link: 'https://shopee.vn/Apple-Watch-Series-10-GPS-46mm-D%C3%A2y-V%E1%BA%A3i-Ch%C3%ADnh-h%C3%A3ng-i.308461157.27862957548?extraParams=%7B%22display_model_id%22%3A256707063132%2C%22model_selection_logic%22%3A3%7D&sp_atk=bbc7519f-c6b7-4578-87d3-524ded8a3310&xptdk=bbc7519f-c6b7-4578-87d3-524ded8a3310'
  },
  {
    id: 3,
    name: 'Bàn phím cơ không dây NuPhy Air75',
    price: 2500000,
    oldPrice: 3200000,
    discount: '-22%',
    platform: 'Shopee',
    // Ảnh bàn phím cơ
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&w=800&q=80',
    link: 'https://shopee.vn/-CH%C3%8DNH-H%C3%83NG-B%C3%A0n-ph%C3%ADm-c%C6%A1-kh%C3%B4ng-d%C3%A2y-Nuphy-Air75-V3-B%C3%A0n-ph%C3%ADm-bluetooth-Low-profile-si%C3%AAu-m%E1%BB%8Fng-3-mode-k%E1%BA%BFt-n%E1%BB%91i-N%C3%BAm-xo-i.987184142.41311166331'
  },
  {
    id: 4,
    name: 'Chuột Logitech MX Master 3S',
    price: 1850000,
    oldPrice: 2450000,
    discount: '-24%',
    platform: 'Shopee',
    // Ảnh chuột MX Master
    img: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    link: 'https://shopee.vn/Chu%E1%BB%99t-kh%C3%B4ng-d%C3%A2y-Bluetooth-Logitech-MX-Master-3s-%E2%80%93-Y%C3%AAn-t%C4%A9nh-8K-DPI-Cu%E1%BB%99n-si%C3%AAu-nhanh-s%E1%BA%A1c-USB-C-i.52679373.21616681122'
  }
];

const HomeTab: React.FC<HomeTabProps> = ({ onSwitchTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [inputLink, setInputLink] = useState('');
  const [analyzedProduct, setAnalyzedProduct] = useState<AnalyzedProduct | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const analysisCache = useRef<Record<string, AnalyzedProduct>>({});

  const banners = [
    'https://sf-static.upanhlaylink.com/img/image_2026013031eb498752a1e5b377d3236e3d7deb44.jpg',
    'https://sf-static.upanhlaylink.com/img/image_202601309e3dbf087d17b15ab64fccf94d1b789a.jpg',
    'https://sf-static.upanhlaylink.com/img/image_202601303338f7752522de35c68a7e40393a6cbe.jpg',
    'https://sf-static.upanhlaylink.com/img/image_202601306e632c37ad06e31e1e2abb72c839de54.jpg',
    'https://sf-static.upanhlaylink.com/img/image_202601309af60d55e16ebea225a5456609d475fb.jpg',
    'https://sf-static.upanhlaylink.com/img/image_20260130a66a36279a216635ec7a3694a5c825d9.jpg',
    'https://sf-static.upanhlaylink.com/img/image_2026013013469a26f4eee09c774d32599e4d3505.jpg',
    'https://sf-static.upanhlaylink.com/img/image_202601308d49fb70d0f4e1233b2dda71e5646bde.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  // Tự động xóa widget khi input trống
  useEffect(() => {
    if (!inputLink.trim()) {
      setAnalyzedProduct(null);
    }
  }, [inputLink]);

  const isValidUrl = (url: string) => {
    try {
      const lowUrl = url.toLowerCase();
      if (lowUrl.includes('shopee.vn') || lowUrl.includes('shope.ee') || 
          lowUrl.includes('lazada.vn') || lowUrl.includes('tiktok.com') ||
          lowUrl.includes('tiki.vn')) {
        return true;
      }
      const pattern = new RegExp('^(https?:\\/\\/)?'+
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
        '((\\d{1,3}\\.){3}\\d{1,3}))'+
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i');
      return !!pattern.test(url);
    } catch (e) {
      return false;
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API not available');
      
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputLink(text);
        await analyzeLink(text);
      } else {
        alert('Bộ nhớ tạm đang trống!');
      }
    } catch (err) {
      console.warn('Clipboard API blocked:', err);
      inputRef.current?.focus();
      alert('⚠️ Không thể tự động đọc bộ nhớ tạm. Vui lòng dán link (Ctrl+V) vào ô tìm kiếm.');
    }
  };

  const analyzeLink = async (linkToAnalyze: string) => {
    const trimmedLink = linkToAnalyze.trim();
    if (!trimmedLink) {
      alert('Vui lòng nhập đường dẫn sản phẩm!');
      setAnalyzedProduct(null);
      return;
    }

    if (!isValidUrl(trimmedLink)) {
      alert('❌ Đường dẫn không đúng định dạng. Vui lòng nhập link sản phẩm Shopee, Lazada hoặc TikTok!');
      return;
    }

    if (analysisCache.current[trimmedLink]) {
      setAnalyzedProduct(analysisCache.current[trimmedLink]);
      return;
    }

    setIsAnalyzing(true);
    setAnalyzedProduct(null);

    try {
      const url = trimmedLink.toLowerCase();
      let platform = 'Shopee';
      let cashbackRate = 0.05; 
      let isDeveloping = false;

      if (url.includes('shopee') || url.includes('shope.ee')) {
        platform = 'Shopee';
        cashbackRate = 0.05;
      } else if (url.includes('tiktok.com')) {
        platform = 'TikTok Shop';
        cashbackRate = 0.03;
      } else if (url.includes('lazada.vn')) {
        platform = 'Lazada';
        cashbackRate = 0.07;
      } else if (url.includes('tiki.vn')) {
        platform = 'Tiki';
        isDeveloping = true;
      } else {
        alert('Hiện tại Savyo chỉ hỗ trợ hoàn tiền cho Shopee, Lazada và TikTok Shop!');
        setIsAnalyzing(false);
        return;
      }

      if (isDeveloping) {
        const devResult: AnalyzedProduct = {
          name: '',
          image: '',
          platform,
          cashbackPercent: 0,
          cashbackAmount: 0,
          price: 0,
          isDeveloping: true,
          link: trimmedLink
        };
        setAnalyzedProduct(devResult);
        analysisCache.current[trimmedLink] = devResult;
        setIsAnalyzing(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this shopping link from ${platform}: "${trimmedLink}".
        Return ONLY a JSON object with:
        {
          "productName": "Name of the product",
          "priceVND": 1000000,
          "imageUrl": "https://source.unsplash.com/featured/?product_keyword"
        }`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              priceVND: { type: Type.NUMBER },
              imageUrl: { type: Type.STRING }
            },
            required: ["productName", "priceVND", "imageUrl"]
          }
        }
      });

      let responseText = response.text || '{}';
      if (responseText.includes('```')) {
        responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      }
      
      const data = JSON.parse(responseText);
      const price = data.priceVND || 500000;
      const cashbackAmount = Math.round(price * cashbackRate);
      
      const finalResult: AnalyzedProduct = {
        name: data.productName || 'Sản phẩm mua sắm',
        image: data.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        platform,
        cashbackPercent: cashbackRate * 100,
        cashbackAmount,
        price,
        link: trimmedLink
      };

      setAnalyzedProduct(finalResult);
      analysisCache.current[trimmedLink] = finalResult;

    } catch (error) {
      console.error("Analysis error:", error);
      alert('Không thể nhận diện sản phẩm tự động. Vui lòng thử lại với đường dẫn chính xác hơn!');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBuyNow = () => {
    if (analyzedProduct) {
      alert(`Đã kích hoạt hoàn tiền +${analyzedProduct.cashbackAmount.toLocaleString()}đ! Đang chuyển hướng bạn tới trang sản phẩm...`);
      window.open(analyzedProduct.link.startsWith('http') ? analyzedProduct.link : `https://${analyzedProduct.link}`, '_blank');
    }
  };

  const handleShare = () => {
    if (analyzedProduct) {
      const shareText = `Bạn yêu quý oi, hãy mua sản phẩm này với giá ưu đãi nek: ${analyzedProduct.link}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Đã sao chép nội dung: ' + shareText);
      }).catch(err => {
        console.error('Lỗi khi sao chép: ', err);
      });
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-10">
      {/* Banner Slider */}
      <div className="relative w-full h-56 sm:h-72 lg:h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white dark:border-slate-800">
        <div 
          className="flex h-full transition-transform duration-700 ease-in-out" 
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((src, i) => (
            <img key={i} src={src} alt={`Banner ${i}`} className="w-full flex-shrink-0 object-cover" />
          ))}
        </div>
        
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)} 
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 flex items-center justify-center z-10"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)} 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/40 flex items-center justify-center z-10"
        >
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10 z-10">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`}></button>
          ))}
        </div>
      </div>

      {/* Smart Search Section */}
      <div className="space-y-6">
        <div className="relative flex items-center bg-white dark:bg-cardDark rounded-[2rem] p-3 shadow-2xl border border-primary/5 group transition-all hover:border-primary/20">
          <button 
            onClick={handlePasteFromClipboard}
            title="Dán link từ bộ nhớ tạm"
            className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-primary bg-primary/5 rounded-2xl mr-2 hover:bg-primary hover:text-white transition-all active:scale-90"
          >
            <i className="fas fa-clipboard text-xl md:text-2xl"></i>
          </button>
          <input 
            ref={inputRef}
            type="text" 
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && analyzeLink(inputLink)}
            placeholder="Dán link sản phẩm Shopee, TikTok, Lazada..."
            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-200 px-4 placeholder:text-slate-400 font-bold text-sm md:text-base outline-none"
          />
          <button 
            onClick={() => analyzeLink(inputLink)}
            disabled={isAnalyzing}
            className="bg-primary hover:bg-primary/90 text-white px-6 md:px-10 py-3.5 rounded-2xl font-black shadow-lg transition-all active:scale-95 uppercase tracking-widest text-[10px] md:text-xs disabled:opacity-50 flex items-center gap-2"
          >
            {isAnalyzing ? (
              <><i className="fas fa-circle-notch animate-spin"></i> Đang xử lý</>
            ) : (
              'Nhận hoàn tiền'
            )}
          </button>
        </div>

        {/* Smart Analyzer Result Widget */}
        {analyzedProduct && (
          <div className="bg-white dark:bg-cardDark rounded-[3rem] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.15)] border-2 border-primary/10 animate-scaleUp relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[150px] pointer-events-none"></div>
            
            {analyzedProduct.isDeveloping ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 mx-auto text-3xl">
                  <i className="fas fa-tools"></i>
                </div>
                <h4 className="text-2xl font-black uppercase italic tracking-tighter text-slate-600 dark:text-slate-400">Tiki - Sắp ra mắt</h4>
                <p className="text-sm font-bold text-slate-400 max-w-sm mx-auto leading-relaxed">Hệ thống đang được nâng cấp để sớm hỗ trợ hoàn tiền cho sàn Tiki. Hãy kiên nhẫn nhé!</p>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-full md:w-56 lg:w-80 aspect-square rounded-[3rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl flex-shrink-0 bg-slate-100 relative group/img">
                  <img 
                    src={analyzedProduct.image} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" 
                    alt="product preview" 
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' }} 
                  />
                </div>
                
                <div className="flex-grow space-y-6 w-full relative z-10 text-left">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg">{analyzedProduct.platform}</span>
                    <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                      <i className="fas fa-check-circle"></i> Sẵn sàng hoàn tiền
                    </span>
                  </div>
                  
                  <h4 className="text-xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight italic tracking-tight">{analyzedProduct.name}</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Giá dự kiến</p>
                      <p className="text-2xl font-black text-slate-800 dark:text-white">{analyzedProduct.price.toLocaleString()}đ</p>
                    </div>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-800/40">
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Hoàn tiền Savyo</p>
                      <p className="text-3xl font-black text-emerald-500">+{analyzedProduct.cashbackAmount.toLocaleString()}đ</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button 
                      onClick={handleBuyNow}
                      className="flex-grow py-5 bg-primary text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-[0_15px_30px_rgba(30,136,229,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <i className="fas fa-external-link-alt"></i> Mua ngay & nhận hoàn tiền
                    </button>
                    <button 
                      onClick={handleShare}
                      className="px-8 py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      <i className="fas fa-share-alt"></i> Chia sẻ
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Platform Sàn Widgets */}
      <div className="space-y-6">
        <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
          <i className="fas fa-store text-primary"></i> Ưu đãi từ các sàn
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { name: 'Shopee', icon: 'fa-shopping-cart', color: 'text-orange-600', desc: 'Mã giảm 50%', bg: 'bg-orange-50' },
             { name: 'Lazada', icon: 'fa-heart', color: 'text-blue-700', desc: 'Hoàn xu 20k', bg: 'bg-blue-50' },
             { name: 'TikTok Shop', icon: 'fa-tiktok', color: 'text-black dark:text-white', desc: 'Freeship 0đ', bg: 'bg-slate-50' },
             { name: 'Tiki', icon: 'fa-store', color: 'text-blue-500', desc: 'Giao nhanh 2h', bg: 'bg-cyan-50' },
           ].map(p => (
             <button 
                key={p.name}
                onClick={() => onSwitchTab(TabType.DEALS)}
                className={`p-6 rounded-[2.5rem] bg-white dark:bg-cardDark border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-primary transition-all group flex flex-col items-center gap-2`}
             >
                <div className={`w-14 h-14 rounded-2xl ${p.bg} dark:bg-slate-800 flex items-center justify-center text-2xl ${p.color} transition-transform group-hover:scale-110`}>
                  <i className={`${p.name.includes('TikTok') ? 'fab' : 'fas'} ${p.icon}`}></i>
                </div>
                <div className="text-center">
                   <p className="font-black text-xs uppercase tracking-widest">{p.name}</p>
                   <p className="text-[9px] font-bold text-primary uppercase mt-1">{p.desc}</p>
                </div>
             </button>
           ))}
        </div>
      </div>

      {/* Flash Deals Widget */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
           <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 italic">
             <i className="fas fa-bolt text-red-500 animate-pulse"></i> Flash Deals 24h
           </h3>
           <button onClick={() => onSwitchTab(TabType.DEALS)} className="text-[10px] font-black text-primary uppercase border-b-2 border-primary/20 hover:border-primary transition-all">Xem tất cả</button>
        </div>
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
          {flashDeals.map(deal => (
            <div key={deal.id} className="min-w-[200px] md:min-w-[240px] bg-white dark:bg-cardDark rounded-3xl p-4 shadow-xl border border-slate-100 dark:border-slate-800 group hover:shadow-2xl transition-all">
               <div className="h-40 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 mb-4 relative">
                  <img src={deal.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="deal" />
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg">{deal.discount}</div>
                  <div className="absolute bottom-2 right-2 bg-white/90 dark:bg-black/70 px-2 py-0.5 rounded-lg backdrop-blur-sm text-[8px] font-black text-primary uppercase border border-primary/20">{deal.platform}</div>
               </div>
               <h4 className="font-bold text-sm line-clamp-1 mb-2 group-hover:text-primary transition-colors">{deal.name}</h4>
               <div className="flex items-center gap-2 mb-4">
                  <span className="text-base font-black text-red-500">{deal.price.toLocaleString()}đ</span>
                  <span className="text-[10px] text-slate-400 line-through mb-1">{deal.oldPrice.toLocaleString()}đ</span>
               </div>
               <button 
                onClick={() => window.open(deal.link, '_blank')}
                className="w-full py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
               >
                 Mua ngay
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeTab;
