
'use client';

import { useState } from 'react';
import PaymentModal from './PaymentModal';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  quantity: number;
}

export default function OrderConfirmModal({ isOpen, onClose, product, quantity }: OrderConfirmModalProps) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isOpen) return null;

  const totalAmount = product.price * quantity;
  const deliveryCharge = 0;
  const finalAmount = totalAmount + deliveryCharge;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim() && phone.trim()) {
      // Prepare order data for payment
      const orderData = {
        orderId: 'FK' + Date.now().toString().slice(-6),
        productId: product.id,
        productName: product.name,
        quantity: quantity,
        total: finalAmount,
        address: address,
        phone: phone,
        timestamp: new Date().toISOString()
      };

      setOrderData(orderData);
      setIsPaymentModalOpen(true);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
        <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4 text-center shadow-2xl transform animate-bounceIn">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <i className="ri-check-line text-4xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation message shortly.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Order ID:</strong> #FK{Date.now().toString().slice(-6)}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Delivery Address:</strong> {address}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Total Amount:</strong> ₹{finalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Confirm Your Order</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 hover:scale-110 transition-all duration-200 cursor-pointer rounded-full p-1"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-close-line text-xl"></i>
            </div>
          </button>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          {/* Product Summary */}
          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-[#2874f0] transition-colors duration-200 bg-gradient-to-r from-blue-50 to-white">
            <h3 className="font-semibold mb-3 text-gray-800">Order Summary</h3>
            <div className="flex items-center space-x-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover object-top rounded-md shadow-sm"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{product.name}</h4>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="text-lg font-bold text-[#2874f0]">₹{product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              placeholder="Enter your complete delivery address"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm transition-all duration-200 hover:border-[#2874f0]"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2874f0] focus:border-[#2874f0] text-sm transition-all duration-200 hover:border-[#2874f0]"
              required
            />
          </div>

          {/* Price Breakdown */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-white hover:border-[#fdd835] transition-colors duration-200">
            <h3 className="font-semibold mb-3 text-gray-800">Price Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price ({quantity} item{quantity > 1 ? 's' : ''})</span>
                <span>₹{totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg text-[#2874f0]">
                <span>Total Amount</span>
                <span>₹{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg hover:shadow-xl"
          >
            Place Order
          </button>
        </form>

        {/* Payment Modal */}
        {orderData && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setOrderData(null);
              setIsOrderPlaced(true);
              setTimeout(() => {
                setIsOrderPlaced(false);
                onClose();
                setAddress('');
                setPhone('');
              }, 3000);
            }}
            amount={orderData.total}
            orderData={orderData}
          />
        )}
      </div>
    </div>
  );
}
