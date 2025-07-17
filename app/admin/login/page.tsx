'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetSuccess, setShowResetSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const ADMIN_CREDENTIALS = {
    email: 'sonickuwal@gmail.com',
    password: 'kuwal@1234'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (credentials.email === ADMIN_CREDENTIALS.email && credentials.password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminData', JSON.stringify({
        email: ADMIN_CREDENTIALS.email,
        loginTime: new Date().toISOString()
      }));
      window.location.href = '/admin/dashboard';
    } else {
      setLoginError('Invalid email or password');
      setTimeout(() => setLoginError(''), 3000);
    }
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resetEmail === 'sonickuwal@gmail.com') {
      setShowResetSuccess(true);
      setTimeout(() => {
        setShowResetSuccess(false);
        setIsResetMode(false);
        setResetEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2874f0] to-blue-800 flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="text-white hover:text-[#fdd835] transition-colors duration-200 flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-arrow-left-line"></i>
          </div>
          <span>Back to Store</span>
        </Link>
      </div>

      {/* Login Error Message */}
      {loginError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-error-warning-line"></i>
            </div>
            <span>{loginError}</span>
          </div>
        </div>
      )}

      {/* Reset Success Message */}
      {showResetSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-check-line"></i>
            </div>
            <span>Password reset link sent to your email!</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2874f0] to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-admin-line text-3xl text-white"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          <p className="text-gray-600">{isResetMode ? 'Reset your password' : 'Sign in to access dashboard'}</p>
        </div>

        {!isResetMode ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] transition-all duration-200"
                placeholder="Enter admin email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] transition-all duration-200"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Sign In to Dashboard
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsResetMode(true)}
                className="text-[#2874f0] hover:text-blue-700 text-sm cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] transition-all duration-200"
                placeholder="sonickuwal@gmail.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Send Reset Link
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsResetMode(false)}
                className="text-gray-600 hover:text-gray-800 text-sm cursor-pointer hover:underline"
              >
                Back to login
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Admin ID: <br />
            Secure admin access only
          </p>
        </div>
      </div>
    </div>
  );
}