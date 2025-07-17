'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileBottomNav() {
  const [cartCount] = useState(3);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        <Link href="/" className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer group">
          <div className="w-6 h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-200">
            <i className="ri-home-line text-xl text-[#2874f0] group-hover:text-blue-700"></i>
          </div>
          <span className="text-xs text-gray-600 group-hover:text-[#2874f0] font-medium">Home</span>
        </Link>
        
        <Link href="/categories" className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer group">
          <div className="w-6 h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-200">
            <i className="ri-grid-line text-xl text-gray-500 group-hover:text-[#2874f0]"></i>
          </div>
          <span className="text-xs text-gray-600 group-hover:text-[#2874f0] font-medium">Categories</span>
        </Link>
        
        <Link href="/cart" className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer relative group">
          <div className="w-6 h-6 flex items-center justify-center mb-1 relative group-hover:scale-110 transition-transform duration-200">
            <i className="ri-shopping-cart-line text-xl text-gray-500 group-hover:text-[#2874f0]"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#fdd835] text-[#2874f0] text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600 group-hover:text-[#2874f0] font-medium">Cart</span>
        </Link>
        
        <button className="flex flex-col items-center p-2 hover:bg-blue-50 rounded-lg transition-all duration-200 cursor-pointer group">
          <div className="w-6 h-6 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform duration-200">
            <i className="ri-user-line text-xl text-gray-500 group-hover:text-[#2874f0]"></i>
          </div>
          <span className="text-xs text-gray-600 group-hover:text-[#2874f0] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}