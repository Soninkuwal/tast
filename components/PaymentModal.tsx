'use client';

import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderData: any;
}

export default function PaymentModal({ isOpen, onClose, amount, orderData }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!isOpen) return null;

  const adminUpiId = 'sonickuwal@paytm';
  const adminBankAccount = {
    accountNumber: '1234567890',
    ifsc: 'HDFC0001234',
    name: 'Flipkart Pvt Ltd'
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Store payment record
      const paymentRecord = {
        id: 'PAY' + Date.now(),
        orderId: orderData.orderId,
        amount: amount,
        method: paymentMethod,
        status: 'Success',
        timestamp: new Date().toISOString(),
        adminUpiId: paymentMethod === 'upi' ? adminUpiId : null,
        bankDetails: paymentMethod === 'bank' ? adminBankAccount : null
      };
      
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      existingPayments.push(paymentRecord);
      localStorage.setItem('payments', JSON.stringify(existingPayments));
      
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center shadow-2xl transform animate-bounceIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">Your payment of ₹{amount.toLocaleString()} has been processed successfully.</p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Transaction ID:</strong> TXN{Date.now().toString().slice(-8)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200 cursor-pointer rounded-full p-1"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-close-line text-xl"></i>
            </div>
          </button>
        </div>

        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-2">Order Summary</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="text-2xl font-bold text-[#2874f0]">₹{amount.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Choose Payment Method</h3>
          
          {/* UPI Payment */}
          <div
            onClick={() => setPaymentMethod('upi')}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'upi' ? 'border-[#2874f0] bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-smartphone-line text-[#2874f0] text-xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">UPI Payment</h4>
                <p className="text-sm text-gray-600">Pay using UPI ID</p>
                {paymentMethod === 'upi' && (
                  <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">Admin UPI ID:</p>
                    <p className="text-[#2874f0] font-bold">{adminUpiId}</p>
                    <p className="text-xs text-gray-500 mt-1">Send ₹{amount.toLocaleString()} to this UPI ID</p>
                  </div>
                )}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'upi' ? 'border-[#2874f0] bg-[#2874f0]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'upi' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </div>
          </div>

          {/* Bank Transfer */}
          <div
            onClick={() => setPaymentMethod('bank')}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              paymentMethod === 'bank' ? 'border-[#2874f0] bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-bank-line text-green-600 text-xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">Bank Transfer</h4>
                <p className="text-sm text-gray-600">Direct bank account transfer</p>
                {paymentMethod === 'bank' && (
                  <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium text-gray-700">Account Number:</span> {adminBankAccount.accountNumber}</p>
                      <p><span className="font-medium text-gray-700">IFSC Code:</span> {adminBankAccount.ifsc}</p>
                      <p><span className="font-medium text-gray-700">Account Name:</span> {adminBankAccount.name}</p>
                      <p className="text-xs text-gray-500 mt-2">Transfer ₹{amount.toLocaleString()} to this account</p>
                    </div>
                  </div>
                )}
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === 'bank' ? 'border-[#2874f0] bg-[#2874f0]' : 'border-gray-300'
              }`}>
                {paymentMethod === 'bank' && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:bg-gray-300 text-white py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-secure-payment-line"></i>
              </div>
              <span>Complete Payment</span>
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Your payment is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  );
}