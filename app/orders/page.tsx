'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    if (loginStatus) {
      // Mock orders data
      const mockOrders = [
        {
          id: 'FK123456',
          date: '2024-01-15',
          items: [
            {
              name: 'Samsung Galaxy M34 5G (Midnight Blue, 128GB)',
              price: 16999,
              quantity: 1,
              image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=200&height=200&seq=order1&orientation=squarish'
            }
          ],
          total: 16999,
          status: 'Delivered',
          deliveryDate: '2024-01-18',
          address: '123 Main Street, New Delhi, 110001'
        },
        {
          id: 'FK789012',
          date: '2024-01-20',
          items: [
            {
              name: 'Apple iPhone 14 (Blue, 128GB)',
              price: 69999,
              quantity: 1,
              image: 'https://readdy.ai/api/search-image?query=Apple%20iPhone%2014%20in%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=200&height=200&seq=order2&orientation=squarish'
            }
          ],
          total: 69999,
          status: 'Shipped',
          trackingId: 'TRK123456789',
          address: '456 Park Avenue, Mumbai, 400001'
        },
        {
          id: 'FK345678',
          date: '2024-01-25',
          items: [
            {
              name: 'Sony WH-1000XM4 Wireless Headphones',
              price: 24999,
              quantity: 1,
              image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM4%20wireless%20headphones%20in%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=200&height=200&seq=order3&orientation=squarish'
            }
          ],
          total: 24999,
          status: 'Processing',
          address: '789 Garden Road, Bangalore, 560001'
        }
      ];
      setOrders(mockOrders);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'text-green-600 bg-green-50';
      case 'Shipped': return 'text-blue-600 bg-blue-50';
      case 'Processing': return 'text-orange-600 bg-orange-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const trackOrder = (orderId: string) => {
    setTrackingOrder(orderId);
    setTimeout(() => setTrackingOrder(null), 3000);
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
          <p className="text-gray-600 mb-8 text-lg">Please login to view your orders.</p>
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
      
      {/* Tracking Message */}
      {trackingOrder && (
        <div className="fixed top-20 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-truck-line"></i>
            </div>
            <span>Tracking order {trackingOrder}...</span>
          </div>
        </div>
      )}
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-yellow-100 rounded-full flex items-center justify-center">
              <i className="ri-shopping-bag-line text-6xl text-[#2874f0]"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here.</p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => trackOrder(order.id)}
                      className="text-[#2874f0] hover:text-blue-700 text-sm font-medium cursor-pointer hover:underline flex items-center space-x-1"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-truck-line"></i>
                      </div>
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover object-top rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                          <span className="text-lg font-bold text-[#2874f0]">₹{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm text-gray-600">Delivery Address:</p>
                      <p className="text-gray-800">{order.address}</p>
                      {order.deliveryDate && (
                        <p className="text-sm text-green-600 mt-1">Delivered on {new Date(order.deliveryDate).toLocaleDateString()}</p>
                      )}
                      {order.trackingId && (
                        <p className="text-sm text-gray-600 mt-1">Tracking ID: {order.trackingId}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-[#2874f0]">₹{order.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-[#2874f0] text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer text-sm">
                    Download Invoice
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer text-sm">
                    Need Help?
                  </button>
                  {order.status === 'Delivered' && (
                    <button className="px-4 py-2 border border-orange-300 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200 cursor-pointer text-sm">
                      Return Item
                    </button>
                  )}
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