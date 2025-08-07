'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { useState } from 'react';

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

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const productImage = images[productId - 1] || images[0];
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };
  
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-neutral-100 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Product Image */}
            <div className="w-full aspect-square bg-black rounded-2xl p-4 md:p-6 relative">
              <div className="w-full h-full bg-neutral-100 rounded-lg overflow-hidden relative">
                <Image 
                  src={productImage}
                  alt={`Product ${productId}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">Product {productId}</h1>
                <button
                  onClick={toggleWishlist}
                  className="text-black hover:text-neutral-600 transition-colors p-2"
                >
                  {isInWishlist ? (
                    <IconStarFilled className="h-8 w-8 text-yellow-400" />
                  ) : (
                    <IconStar className="h-8 w-8" strokeWidth={2} />
                  )}
                </button>
              </div>
              <p className="text-base md:text-lg text-neutral-600 mb-6 md:mb-8 leading-relaxed">
                Beautiful gemstone piece crafted with precision and care. This stunning piece represents the finest quality in our collection, sourced authentically and designed to last a lifetime.
              </p>
              
              <div className="mb-6 md:mb-8">
                <span className="text-2xl md:text-3xl font-bold text-black">$299</span>
                <span className="text-sm md:text-lg text-neutral-500 ml-2">Free shipping</span>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <button className="w-full bg-black text-white py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold text-base md:text-lg hover:bg-neutral-800 transition-colors">
                  Add to Cart
                </button>
                <button className="w-full border-2 border-black text-black py-3 md:py-4 px-6 md:px-8 rounded-full font-semibold text-base md:text-lg hover:bg-black hover:text-white transition-colors">
                  Buy Now
                </button>
              </div>
              
              <div className="mt-8 md:mt-12 space-y-4 md:space-y-6">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-black mb-2">Details</h3>
                  <ul className="text-sm md:text-base text-neutral-600 space-y-1">
                    <li>• Premium quality gemstone</li>
                    <li>• Authentically sourced</li>
                    <li>• Lifetime guarantee</li>
                    <li>• Certificate of authenticity included</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-black mb-2">Shipping</h3>
                  <p className="text-sm md:text-base text-neutral-600">Free worldwide shipping. Delivery in 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}