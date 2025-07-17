'use client';

import { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      name: isLogin ? email.split('@')[0] : name,
      email: email,
      loginTime: new Date().toISOString(),
      profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(isLogin ? email.split('@')[0] : name)}&background=2874f0&color=fff&size=100`
    };

    // Save user data to localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');

    // Trigger login event
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: userData }));

    // Close modal
    onClose();
    
    // Reset form
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    const userData = {
      id: 'google_' + Date.now().toString(),
      name: 'Google User',
      email: 'user@gmail.com',
      loginTime: new Date().toISOString(),
      profilePicture: 'https://ui-avatars.com/api/?name=Google+User&background=2874f0&color=fff&size=100',
      loginMethod: 'google'
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: userData }));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl transform animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200 cursor-pointer rounded-full p-1"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-close-line text-xl"></i>
            </div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm transition-all duration-200 hover:border-[#2874f0]"
                required={!isLogin}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email or Phone
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm transition-all duration-200 hover:border-[#2874f0]"
              required
              placeholder="Enter email or phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm transition-all duration-200 hover:border-[#2874f0]"
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2874f0] text-white py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-200 font-medium whitespace-nowrap cursor-pointer shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <div className="text-center">
            <span className="text-gray-500 text-sm">or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border-2 border-gray-300 py-3 rounded-lg hover:bg-gray-50 hover:border-[#2874f0] hover:scale-105 transform transition-all duration-200 flex items-center justify-center space-x-2 whitespace-nowrap cursor-pointer shadow-sm"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-google-fill text-red-500"></i>
            </div>
            <span className="text-sm font-medium">Continue with Google</span>
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#2874f0] hover:text-blue-700 hover:underline text-sm cursor-pointer transition-colors duration-200"
          >
            {isLogin ? "New to Flipkart? Create an account" : "Existing user? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}