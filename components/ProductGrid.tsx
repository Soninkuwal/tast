
'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
  brand?: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  const [showLoginRequired, setShowLoginRequired] = useState<string | null>(null);

  const checkLoginStatus = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const addToCart = (product: Product) => {
    // Check login status first
    if (!checkLoginStatus()) {
      setShowLoginRequired(product.id);
      setTimeout(() => setShowLoginRequired(null), 3000);
      return;
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item to cart
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity: 1,
        inStock: true
      };
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show confirmation
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
    
    // Update cart count in header
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group relative">
          
          {/* Added to Cart Success Message */}
          {addedToCart === product.id && (
            <div className="absolute top-2 left-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10 animate-slideIn flex items-center space-x-1">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-check-line"></i>
              </div>
              <span>Added to cart!</span>
            </div>
          )}

          {/* Login Required Message */}
          {showLoginRequired === product.id && (
            <div className="absolute top-2 left-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md z-10 animate-slideIn flex items-center space-x-1">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-error-warning-line"></i>
              </div>
              <span>Please login first!</span>
            </div>
          )}
          
          <Link href={`/product/${product.id}`} className="block cursor-pointer">
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-300"
              />
              {product.discount && (
                <div className="absolute top-2 left-2 bg-[#fdd835] text-[#2874f0] px-2 py-1 rounded-md text-xs font-bold">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </Link>
          
          <div className="p-4">
            <Link href={`/product/${product.id}`} className="cursor-pointer">
              <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-[#2874f0] transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center mb-3">
              <div className="flex text-[#fdd835]">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 flex items-center justify-center">
                    <i className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-sm`}></i>
                  </div>
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-sm text-green-600 font-medium">
                      {product.discount}% off
                    </span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-shopping-cart-line"></i>
              </div>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}