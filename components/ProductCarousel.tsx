
'use client';

import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductCarousel({ title, products, viewAllLink }: ProductCarouselProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mx-2 md:mx-4 mb-4 md:mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">{title}</h2>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-sm md:text-base text-[#2874f0] hover:text-blue-700 font-medium hover:underline transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            View All →
          </Link>
        )}
      </div>
      
      <div className="flex overflow-x-auto space-x-3 md:space-x-4 pb-4 scrollbar-hide">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="flex-shrink-0 w-40 md:w-48 cursor-pointer group"
          >
            <div className="bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 md:h-32 object-cover object-top rounded-md mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-1 left-1 bg-[#fdd835] text-[#2874f0] px-1 py-0.5 rounded text-xs font-bold">
                    {product.discount}%
                  </div>
                )}
              </div>
              
              <h3 className="text-xs md:text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-[#2874f0] transition-colors duration-200">
                {product.name}
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="flex text-[#fdd835]">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 flex items-center justify-center">
                      <i className={`ri-star-${i < Math.floor(product.rating) ? 'fill' : 'line'} text-xs`}></i>
                    </div>
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
              </div>
              
              <div className="flex flex-col space-y-1">
                <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span className="text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-xs md:text-sm text-green-600 font-medium">
                      {product.discount}% off
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
