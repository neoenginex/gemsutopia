'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IconShoppingBag, IconTrash } from '@tabler/icons-react';
import { useGemPouch } from '@/contexts/GemPouchContext';
import Image from 'next/image';

export default function GemPouch() {
  const { items, removeItem } = useGemPouch();
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow bg-neutral-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Gem Pouch</h1>
            <p className="text-lg text-neutral-600">Review your selected items</p>
          </div>
          
          {items.length === 0 ? (
            /* Empty cart state */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <IconShoppingBag className="h-10 w-10 text-neutral-500" strokeWidth={2} />
              </div>
              <h2 className="text-2xl font-semibold text-black mb-4">Your gem pouch is empty</h2>
              <p className="text-neutral-600 mb-8">Looks like you haven't added any gems to your pouch yet.</p>
              
              <a
                href="/"
                className="inline-block bg-black text-white py-3 px-8 rounded-full font-semibold hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            /* Items in cart */
            <div>
              <div className="grid gap-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-lg p-6 flex items-center gap-6">
                    <div className="w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden relative">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-black mb-2">{item.name}</h3>
                      <p className="text-lg font-bold text-black">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <IconTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Total and Checkout */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-black">Total:</span>
                  <span className="text-2xl font-bold text-black">${totalPrice}</span>
                </div>
                <button className="w-full bg-black text-white py-3 px-8 rounded-full font-semibold hover:bg-neutral-800 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}