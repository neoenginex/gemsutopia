'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IconStar, IconStarFilled, IconShoppingBag, IconShoppingBagCheck } from '@tabler/icons-react';
import { useGemPouch } from '../contexts/GemPouchContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function Products() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();
  const { addItem, removeItem, isInPouch } = useGemPouch();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const productData = {
      id: productId,
      name: `Product ${productId}`,
      price: 299,
      image: images[productId - 1]
    };
    
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productData);
    }
  };
  
  const toggleGemPouch = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const productData = {
      id: productId,
      name: `Product ${productId}`,
      price: 299,
      image: images[productId - 1]
    };
    
    if (isInPouch(productId)) {
      removeItem(productId);
    } else {
      addItem(productData);
    }
  };
  
  // Add swipe detection
  useEffect(() => {
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diffY = Math.abs(currentY - startY);
      
      // If significant vertical movement detected, clear hover
      if (diffY > 10) {
        setHoveredCard(null);
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  const images = [
    '/images/Review1.jpg',
    '/images/Review2.jpg', 
    '/images/Review3.jpg',
    '/images/Review4.jpg',
    '/images/Review5.jpg',
    '/images/Review6.jpg',
    '/images/Review7.jpg',
    '/images/Review8.jpg',
    '/images/Review9.jpg',
    '/images/Review10.jpg',
    '/images/Review12.jpg',
    '/images/Review13.jpg',
    '/images/Review14.jpg',
    '/images/8680a65c-0c82-4529-a8f2-a051344e565a.webp',
    '/images/c07009ff-cd86-45d0-858e-441993683280.webp',
    '/images/Review-5.jpg'
  ];
  return (
    <section className="bg-neutral-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Products</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our curated collection of premium gemstones and jewelry pieces
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 16 }, (_, i) => (
              <div 
                key={i} 
                className="bg-black rounded-2xl p-6 shadow-2xl shadow-black/60 translate-x-1 translate-y-1 transition-transform duration-200 ease-out cursor-pointer product-card select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to product page and scroll to top
                  router.push(`/product/${i + 1}`);
                  window.scrollTo(0, 0);
                }}
              >
                {/* Content */}
                <div className="aspect-square bg-neutral-100 rounded-lg mb-4 overflow-hidden relative">
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    25% OFF
                  </div>
                  <Image 
                    src={images[i]} 
                    alt={`Product ${i + 1}`}
                    fill
                    className="object-cover select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute bottom-2 right-2 z-10">
                    <img 
                      src="/logos/gems-logo.png" 
                      alt="Gemsutopia"
                      className="h-8 opacity-70 object-contain"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-white">Product {i + 1}</h3>
                  <button
                    onClick={(e) => toggleWishlist(i + 1, e)}
                    className="text-white hover:text-yellow-400 transition-colors p-1"
                  >
                    {isInWishlist(i + 1) ? (
                      <IconStarFilled className="h-6 w-6 text-yellow-400" />
                    ) : (
                      <IconStar className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed min-h-[3rem]">Beautiful gemstone piece with exceptional clarity and color. This premium quality stone features natural patterns and excellent craftsmanship.</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-400 line-through">$399</span>
                    <span className="text-lg font-bold text-white">$299</span>
                  </div>
                  <button
                    onClick={(e) => toggleGemPouch(i + 1, e)}
                    className="text-white hover:text-neutral-300 transition-colors p-1"
                  >
                    {isInPouch(i + 1) ? (
                      <IconShoppingBagCheck className="h-6 w-6" strokeWidth={2} />
                    ) : (
                      <IconShoppingBag className="h-6 w-6" strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (hover: hover) and (pointer: fine) {
          .product-card:hover {
            transform: translateY(-8px) !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6) !important;
          }
        }
        .product-card {
          will-change: transform;
        }
        .product-card {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        .product-card img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }
      `}</style>
    </section>
  );
}