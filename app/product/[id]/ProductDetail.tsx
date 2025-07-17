'use client';

import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import OrderConfirmModal from '../../../components/OrderConfirmModal';

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSpecs, setShowSpecs] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [showLoginRequired, setShowLoginRequired] = useState(false);

  // Mock product data based on ID
  const product = {
    id: productId,
    name: 'Samsung Galaxy M34 5G (Midnight Blue, 128GB)',
    price: 16999,
    originalPrice: 20999,
    discount: 19,
    rating: 4.3,
    reviews: 2847,
    images: [
      'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=500&height=500&seq=detail1&orientation=squarish',
      'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20back%20view%20showing%20camera%20module%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=500&height=500&seq=detail2&orientation=squarish',
      'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20side%20view%20showing%20ports%20and%20buttons%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=500&height=500&seq=detail3&orientation=squarish',
      'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20with%20accessories%20box%20charger%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=500&height=500&seq=detail4&orientation=squarish'
    ],
    description: 'Experience the power of 5G with Samsung Galaxy M34. Features a stunning 6.5-inch Super AMOLED display, powerful Exynos processor, and a versatile triple camera system for all your photography needs.',
    specifications: {
      'Display': '6.5-inch Super AMOLED, 120Hz',
      'Processor': 'Exynos 1280 Octa-core',
      'RAM': '6GB',
      'Storage': '128GB (Expandable up to 1TB)',
      'Camera': '50MP Triple Camera + 13MP Front',
      'Battery': '6000mAh with 25W Fast Charging',
      'OS': 'Android 13 with One UI 5.1',
      'Connectivity': '5G, 4G VoLTE, Wi-Fi, Bluetooth 5.2'
    },
    inStock: true,
    deliveryInfo: 'Free delivery by tomorrow'
  };

  const reviews = [
    {
      id: 1,
      user: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent phone with great camera quality and battery life. Highly recommended!',
      date: '2 days ago',
      helpful: 24
    },
    {
      id: 2,
      user: 'Priya Sharma',
      rating: 4,
      comment: 'Good value for money. Display quality is amazing and performance is smooth.',
      date: '1 week ago',
      helpful: 18
    },
    {
      id: 3,
      user: 'Amit Singh',
      rating: 4,
      comment: 'Fast delivery and great packaging. Phone works perfectly fine.',
      date: '2 weeks ago',
      helpful: 12
    }
  ];

  const checkLoginStatus = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return isLoggedIn;
  };

  const handleBuyNow = () => {
    if (!checkLoginStatus()) {
      setShowLoginRequired(true);
      setTimeout(() => setShowLoginRequired(false), 3000);
      return;
    }
    setIsOrderModalOpen(true);
  };

  const addToCart = () => {
    if (!checkLoginStatus()) {
      setShowLoginRequired(true);
      setTimeout(() => setShowLoginRequired(false), 3000);
      return;
    }

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === productId);

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const cartItem = {
        id: productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        quantity: quantity,
        inStock: product.inStock
      };
      existingCart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Show confirmation message
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);

    // Update cart count in header (trigger a custom event)
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

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

      {/* Add to Cart Success Message */}
      {showAddedToCart && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-check-line text-lg"></i>
            </div>
            <span className="font-medium">Added to cart successfully!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover object-top rounded-lg"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer hover:scale-105 transition-transform duration-200 ${
                    selectedImage === index ? 'border-[#2874f0]' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 h-fit">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-[#fdd835] mr-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-lg`}></i>
                  </div>
                ))}
              </div>
              <span className="text-lg font-medium mr-2">({product.rating})</span>
              <span className="text-gray-600">{product.reviews.toLocaleString()} reviews</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-lg text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">{product.discount}% off</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-truck-line text-green-600"></i>
                </div>
                <span className="text-green-600 font-medium">{product.deliveryInfo}</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className={`ri-checkbox-circle-${product.inStock ? 'fill text-green-600' : 'line text-red-600'}`}></i>
                </div>
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:bg-gray-300 text-white py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg"
              >
                Buy Now
              </button>

              <button
                onClick={addToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-[#2874f0] to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:bg-gray-300 text-white py-3 rounded-md font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg flex items-center justify-center space-x-2"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shopping-cart-line"></i>
                </div>
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <h2 className="text-xl font-bold text-gray-800">Technical Specifications</h2>
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`ri-arrow-${showSpecs ? 'up' : 'down'}-s-line text-xl transition-transform duration-200`}></i>
            </div>
          </button>

          {showSpecs && (
            <div className="px-6 pb-6 animate-slideIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Customer Reviews</h2>
          </div>

          <div className="p-6 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-800">{review.user}</span>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 flex items-center justify-center">
                          <i className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-sm`}></i>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-thumb-up-line"></i>
                    </div>
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <OrderConfirmModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={product}
        quantity={quantity}
      />
    </div>
  );
}