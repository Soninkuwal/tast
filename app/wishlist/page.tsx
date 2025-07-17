'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    if (loginStatus) {
      // Mock wishlist data
      const mockWishlist = [
        {
          id: '1',
          name: 'Samsung Galaxy M34 5G (Midnight Blue, 128GB)',
          price: 16999,
          originalPrice: 20999,
          discount: 19,
          image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=300&height=300&seq=wish1&orientation=squarish',
          rating: 4.3,
          inStock: true
        },
        {
          id: '2',
          name: 'Apple iPhone 14 (Blue, 128GB)',
          price: 69999,
          originalPrice: 79999,
          discount: 12,
          image: 'https://readdy.ai/api/search-image?query=Apple%20iPhone%2014%20in%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=300&height=300&seq=wish2&orientation=squarish',
          rating: 4.7,
          inStock: true
        },
        {
          id: '3',
          name: 'Sony WH-1000XM4 Wireless Headphones',
          price: 24999,
          originalPrice: 29999,
          discount: 17,
          image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM4%20wireless%20headphones%20in%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=300&height=300&seq=wish3&orientation=squarish',
          rating: 4.5,
          inStock: false
        }
      ];
      setWishlistItems(mockWishlist);
    }
  }, []);

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
    setWishlistItems(updatedWishlist);
  };

  const addToCart = (product: any) => {
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
        inStock: product.inStock
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-6xl text-red-500"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-8 text-lg">Please login to view your wishlist.</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
          >
            Go to Homepage
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Added to Cart Success Message */}
      {addedToCart && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-check-line"></i>
            </div>
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist ({wishlistItems.length} items)</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center">
              <i className="ri-heart-line text-6xl text-red-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Add items you like to your wishlist to save them for later.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 group relative">
                
                {/* Added to Cart Success Message for specific item */}
                {addedToCart === item.id && (
                  <div className="absolute top-2 left-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md z-10 animate-slideIn flex items-center space-x-1">
                    <div className="w-3 h-3 flex items-center justify-center">
                      <i className="ri-check-line"></i>
                    </div>
                    <span>Added to cart!</span>
                  </div>
                )}

                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 hover:scale-110 transition-all duration-200 cursor-pointer z-10"
                >
                  <i className="ri-heart-fill text-red-500 hover:text-red-600"></i>
                </button>
                
                <Link href={`/product/${item.id}`} className="block cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                    {item.discount && (
                      <div className="absolute top-2 left-2 bg-[#fdd835] text-[#2874f0] px-2 py-1 rounded-md text-xs font-bold">
                        {item.discount}% OFF
                      </div>
                    )}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-bold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                </Link>
                
                <div className="p-4">
                  <Link href={`/product/${item.id}`} className="cursor-pointer">
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-[#2874f0] transition-colors duration-200">
                      {item.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-[#fdd835]">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 flex items-center justify-center">
                          <i className={`ri-star-${i < Math.floor(item.rating) ? 'fill' : 'line'} text-sm`}></i>
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({item.rating})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                          <span className="text-sm text-green-600 font-medium">
                            {item.discount}% off
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className="w-full bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer hover:shadow-lg text-sm flex items-center justify-center space-x-2"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-shopping-cart-line"></i>
                      </div>
                      <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    </button>
                    
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full border border-red-300 text-red-600 py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-all duration-200 cursor-pointer text-sm flex items-center justify-center space-x-2"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-heart-line"></i>
                      </div>
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}