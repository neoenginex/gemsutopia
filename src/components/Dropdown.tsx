'use client';
import { IconShoppingBag, IconStar, IconX } from '@tabler/icons-react';

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Dropdown({ isOpen, onClose }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dropdown */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 md:hidden transform transition-all duration-300 ease-in-out"
        onClick={onClose}
      >
        <div className="p-6 pt-12" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white text-xl font-bold">Menu</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300"
            >
              <IconX className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-6">
            <a
              href="/about"
              className="block text-white hover:text-gray-300 text-lg font-semibold"
              onClick={onClose}
            >
              About
            </a>
            <a
              href="/contact-us"
              className="block text-white hover:text-gray-300 text-lg font-semibold"
              onClick={onClose}
            >
              Contact
            </a>
            <a
              href="/support"
              className="block text-white hover:text-gray-300 text-lg font-semibold"
              onClick={onClose}
            >
              Support
            </a>
            
            <hr className="border-gray-600" />
            
            <a
              href="/gem-pouch"
              className="flex items-center gap-3 text-white hover:text-gray-300 text-lg font-semibold"
              onClick={onClose}
            >
              <IconShoppingBag className="h-5 w-5" />
              Gem Pouch
            </a>
            
            <a
              href="/wishlist"
              className="flex items-center gap-3 text-white hover:text-gray-300 text-lg font-semibold"
              onClick={onClose}
            >
              <IconStar className="h-5 w-5" />
              Wishlist
            </a>
            
            <div className="space-y-4 pt-4">
              <a
                href="/sign-in"
                className="block w-full text-center bg-transparent border border-white text-white py-3 px-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all"
                onClick={onClose}
              >
                Sign In
              </a>
              <a
                href="/sign-up"
                className="block w-full text-center bg-white text-black py-3 px-4 rounded-full font-semibold hover:bg-gray-200 transition-all"
                onClick={onClose}
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}