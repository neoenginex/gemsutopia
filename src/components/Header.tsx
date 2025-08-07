'use client';
import { IconMenu2, IconShoppingBag, IconStar } from '@tabler/icons-react';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { useGemPouch } from '../contexts/GemPouchContext';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { itemCount } = useGemPouch();

  return (
    <header className="bg-black text-white relative m-0 border-b border-white/20">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-1 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
          <p className="text-sm font-medium px-8">🎉 Grand Opening Sale - Up to 25% Off All Items! 🎉</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex items-center">
            <a href="/" className="cursor-pointer">
              <img 
                src="/logos/gem.png" 
                alt="Gem"
                className="h-6"
              />
            </a>
          </div>
          <div className="flex-1 flex justify-start pl-8">
            <div className="hidden md:flex items-center gap-6">
              <a href="/about" className="text-white hover:text-gray-300 text-sm font-bold">About</a>
              <a href="/contact-us" className="text-white hover:text-gray-300 text-sm font-bold">Contact</a>
              <a href="/support" className="text-white hover:text-gray-300 text-sm font-bold">Support</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              className="text-white hover:text-gray-300 md:hidden"
              onClick={() => setIsDropdownOpen(true)}
            >
              <IconMenu2 className="h-8 w-8" />
            </button>
            <div className="hidden md:flex items-center gap-4">
              <a href="/wishlist" className="text-white hover:text-gray-300 flex items-center gap-2 relative">
                <IconStar className="h-5 w-5" strokeWidth={2} />
              </a>
              <a href="/gem-pouch" className="text-white hover:text-gray-300 flex items-center gap-2 relative">
                <IconShoppingBag className="h-6 w-6" strokeWidth={2} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </a>
              <a href="/sign-up" className="border border-white text-white hover:bg-white hover:text-black active:bg-white active:text-black text-sm font-bold px-10 py-2 rounded-full transition-all">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Dropdown 
        isOpen={isDropdownOpen} 
        onClose={() => setIsDropdownOpen(false)} 
      />
    </header>
  );
}