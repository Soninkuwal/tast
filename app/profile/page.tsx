'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, []);

  const handleSave = () => {
    const updatedUserData = { ...userData, ...formData };
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setIsEditing(false);
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: updatedUserData }));
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center">
            <i className="ri-lock-line text-6xl text-red-500"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Required</h1>
          <p className="text-gray-600 mb-8 text-lg">Please login to view your profile.</p>
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
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <img
                  src={userData.profilePicture}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#2874f0]"
                />
                <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                <p className="text-gray-600">{userData.email}</p>
              </div>
              
              <nav className="space-y-2">
                <Link href="/profile" className="flex items-center space-x-3 p-3 bg-[#2874f0] text-white rounded-lg">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>Profile Information</span>
                </Link>
                <Link href="/orders" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-shopping-bag-line"></i>
                  </div>
                  <span>My Orders</span>
                </Link>
                <Link href="/wishlist" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-heart-line"></i>
                  </div>
                  <span>Wishlist</span>
                </Link>
                <Link href="/addresses" className="flex items-center space-x-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-map-pin-line"></i>
                  </div>
                  <span>Addresses</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-[#2874f0] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer flex items-center space-x-2"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`ri-${isEditing ? 'close' : 'edit'}-line`}></i>
                  </div>
                  <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0]"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-lg text-gray-800">{userData.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-lg text-gray-800">{userData.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                      <p className="text-lg text-gray-800">{userData.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                      <p className="text-lg text-gray-800">{new Date(userData.loginTime).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    <p className="text-lg text-gray-800">{userData.address || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}