'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import LoginModal from './LoginModal';

export default function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check login status on component mount
    checkLoginStatus();
    updateCartCount();

    // Listen for login/logout events
    const handleUserLogin = (e: any) => {
      setIsLoggedIn(true);
      setUserData(e.detail);
    };

    const handleUserLogout = () => {
      setIsLoggedIn(false);
      setUserData(null);
      setShowProfileMenu(false);
    };

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('userLoggedIn', handleUserLogin);
    window.addEventListener('userLoggedOut', handleUserLogout);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
      window.removeEventListener('userLoggedOut', handleUserLogout);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const storedUserData = localStorage.getItem('userData');

    if (loginStatus === 'true' && storedUserData) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  };

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(totalItems);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.dispatchEvent(new CustomEvent('userLoggedOut'));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, redirect to electronics page with search query
      window.location.href = `/electronics?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-[#2874f0] text-white sticky top-0 z-50 hidden md:block">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-200" style={{ fontFamily: 'Pacifico, serif' }}>
              Flipkart
            </Link>

            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2.5 rounded-sm text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdd835] transition-all duration-200 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 cursor-pointer"
                >
                  <i className="ri-search-line text-gray-500"></i>
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-6">
              {!isLoggedIn ? (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm font-medium hover:text-[#fdd835] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-1 rounded-md"
                >
                  Login / Sign Up
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 hover:text-[#fdd835] transition-colors duration-200 cursor-pointer"
                  >
                    <img
                      src={userData?.profilePicture}
                      alt={userData?.name}
                      className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform duration-200"
                    />
                    <span className="text-sm font-medium">{userData?.name}</span>
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={`ri-arrow-${showProfileMenu ? 'up' : 'down'}-s-line`}></i>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-slideIn">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{userData?.name}</p>
                        <p className="text-sm text-gray-600">{userData?.email}</p>
                      </div>
                      <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Profile
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
                        Wishlist
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Link href="/cart" className="relative cursor-pointer hover:scale-110 transition-transform duration-200">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-xl"></i>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#fdd835] text-[#2874f0] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        <nav className="bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-2">
            <div className="flex items-center justify-center space-x-8">
              <Link href="/electronics" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-smartphone-line"></i>
                </div>
                <span>Electronics</span>
              </Link>
              <Link href="/fashion" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shirt-line"></i>
                </div>
                <span>Fashion</span>
              </Link>
              <Link href="/home" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-home-line"></i>
                </div>
                <span>Home & Living</span>
              </Link>
              <Link href="/appliances" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-fridge-line"></i>
                </div>
                <span>Appliances</span>
              </Link>
              <Link href="/mobiles" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line"></i>
                </div>
                <span>Mobiles</span>
              </Link>
              <Link href="/books" className="text-sm text-gray-700 hover:text-[#2874f0] hover:scale-105 transition-all duration-200 whitespace-nowrap cursor-pointer px-3 py-2 rounded-md flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-book-line"></i>
                </div>
                <span>Books</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="bg-[#2874f0] text-white sticky top-0 z-50 md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold" style={{ fontFamily: 'Pacifico, serif' }}>
              Flipkart
            </Link>

            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 rounded-sm text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#fdd835] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-search-line text-gray-500"></i>
                </button>
              </form>
            </div>

            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-sm font-medium hover:text-[#fdd835] transition-colors whitespace-nowrap cursor-pointer"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="cursor-pointer"
              >
                <img
                  src={userData?.profilePicture}
                  alt={userData?.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-home-line text-xl text-[#2874f0]"></i>
            </div>
            <span className="text-xs text-gray-600">Home</span>
          </Link>

          <Link href="/categories" className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <i className="ri-grid-line text-xl text-gray-500"></i>
            </div>
            <span className="text-xs text-gray-600">Categories</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer relative">
            <div className="w-6 h-6 flex items-center justify-center mb-1 relative">
              <i className="ri-shopping-cart-line text-xl text-gray-500"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#fdd835] text-[#2874f0] text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-600">Cart</span>
          </Link>

          {!isLoggedIn ? (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className="ri-user-line text-xl text-gray-500"></i>
              </div>
              <span className="text-xs text-gray-600">Profile</span>
            </button>
          ) : (
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer relative"
            >
              <img
                src={userData?.profilePicture}
                alt={userData?.name}
                className="w-6 h-6 rounded-full mb-1"
              />
              <span className="text-xs text-gray-600">Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Profile Menu */}
      {showProfileMenu && isLoggedIn && (
        <div className="fixed bottom-16 right-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 md:hidden animate-slideIn">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="font-medium text-gray-800">{userData?.name}</p>
            <p className="text-sm text-gray-600">{userData?.email}</p>
          </div>
          <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
            My Profile
          </Link>
          <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
            My Orders
          </Link>
          <Link href="/wishlist" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
            Wishlist
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}

      {/* Add padding to body for mobile bottom nav */}
      <div className="md:hidden h-16"></div>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
