
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import OrderConfirmModal from '../../components/OrderConfirmModal';
import PaymentModal from '../../components/PaymentModal';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginRequired, setShowLoginRequired] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckoutSection, setShowCheckoutSection] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    // Check login status first
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      setIsLoading(false);
      setShowLoginRequired(true);
      return;
    }

    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
    setIsLoading(false);
  }, []);

  const checkLoginStatus = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item: any) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item: any) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleBuyNow = (item: any) => {
    if (!checkLoginStatus()) {
      setShowLoginRequired(true);
      setTimeout(() => setShowLoginRequired(false), 3000);
      return;
    }

    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      images: [item.image]
    };

    setSelectedProduct(product);
    setIsOrderModalOpen(true);
  };

  const handleCheckout = () => {
    if (!checkLoginStatus()) {
      setShowLoginRequired(true);
      setTimeout(() => setShowLoginRequired(false), 3000);
      return;
    }

    // Prepare checkout data
    const orderData = {
      orderId: 'FK' + Date.now().toString().slice(-6),
      items: cartItems,
      total: cartItems.reduce((sum, item: any) => sum + item.price * item.quantity, 0),
      timestamp: new Date().toISOString()
    };

    setCheckoutData(orderData);
    setIsPaymentModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!checkLoginStatus()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center">
              <i className="ri-lock-line text-6xl text-red-500"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
            <p className="text-gray-600 mb-8 text-lg">Please login to view your cart and continue shopping.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Go to Homepage
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full flex items-center justify-center">
              <i className="ri-shopping-cart-line text-6xl text-[#2874f0]"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 text-lg">Looks like you haven't added anything to your cart yet.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item: any) => sum + item.price * item.quantity, 0);
  const savings = cartItems.reduce(
    (sum, item: any) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const deliveryCharges = 0; // Free delivery
  const total = subtotal + deliveryCharges;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Login Required Message */}
      {showLoginRequired && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-error-warning-line text-lg"></i>
            </div>
            <span className="font-medium">Please login to continue!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart ({cartItems.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {cartItems.map((item: any, index) => (
                <div key={item.id} className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <Link href={`/product/${item.id}`} className="cursor-pointer">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover object-top rounded-md hover:scale-105 transition-transform duration-200 shadow-sm"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`} className="cursor-pointer">
                        <h3 className="text-lg font-medium text-gray-800 hover:text-[#2874f0] mb-2 transition-colors duration-200">
                          {item.name}
                        </h3>
                      </Link>

                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-xl font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                        <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
                          {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                        </span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-700 font-medium">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x border-gray-300 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 font-medium cursor-pointer hover:scale-105 transition-all duration-200 flex items-center space-x-1"
                        >
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-delete-bin-line"></i>
                          </div>
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 flex items-center space-x-1">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-check-line"></i>
                          </div>
                          <span>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </span>

                        <button
                          onClick={() => handleBuyNow(item)}
                          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-sm text-sm"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.reduce((sum, item: any) => sum + item.quantity, 0)} items)</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm text-green-600">
                  <span>Your Savings</span>
                  <span className="font-medium">-₹{savings.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span>Delivery Charges</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>

                <hr className="my-3" />

                <div className="flex justify-between text-xl font-bold text-[#2874f0]">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-md font-medium transition-all duration-200 mb-3 whitespace-nowrap cursor-pointer transform hover:scale-105 shadow-lg"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="block w-full text-center bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-md font-medium hover:bg-gray-50 hover:border-[#2874f0] transition-all duration-200 cursor-pointer hover:scale-105"
              >
                Continue Shopping
              </Link>

              {/* Checkout Section */}
              {showCheckoutSection && (
                <div className="mt-6 p-4 border-2 border-[#2874f0] rounded-lg bg-blue-50 animate-slideIn">
                  <h3 className="font-bold text-[#2874f0] mb-3">Checkout Details</h3>
                  <div className="text-sm space-y-2">
                    {cartItems.map((item: any) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-700">Product ID: {item.id}</span>
                        <span className="font-medium">Qty: {item.quantity}</span>
                      </div>
                    ))}
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-[#2874f0]">
                      <span>Total Items:</span>
                      <span>{cartItems.reduce((sum, item: any) => sum + item.quantity, 0)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-shield-check-line text-green-600"></i>
                  </div>
                  <span>Safe and Secure payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-truck-line text-green-600"></i>
                  </div>
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-arrow-go-back-line text-green-600"></i>
                  </div>
                  <span>Easy returns & refunds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Payment Modal */}
      {checkoutData && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setCheckoutData(null);
          }}
          amount={checkoutData.total}
          orderData={checkoutData}
        />
      )}

      {/* Order Confirmation Modal */}
      {selectedProduct && (
        <OrderConfirmModal
          isOpen={isOrderModalOpen}
          onClose={() => {
            setIsOrderModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          quantity={1}
        />
      )}
    </div>
  );
}
