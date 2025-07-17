
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'Mega Electronics Sale',
      subtitle: 'Up to 70% Off on Top Brands',
      description: 'iPhone, Samsung, OnePlus & More',
      image: 'https://readdy.ai/api/search-image?query=modern%20electronic%20devices%20smartphones%20laptops%20tablets%20arranged%20elegantly%20on%20vibrant%20blue%20gradient%20background%20with%20professional%20lighting%20minimalist%20product%20photography%20style%20clean%20design%20with%20soft%20shadows%20premium%20tech%20showcase&width=800&height=400&seq=hero1&orientation=landscape',
      link: '/electronics',
      bgColor: 'from-blue-600 to-blue-800'
    },
    {
      id: 2,
      title: 'Fashion Festival',
      subtitle: 'Trending Styles at Best Prices',
      description: 'Clothing, Shoes, Bags & Accessories',
      image: 'https://readdy.ai/api/search-image?query=fashionable%20clothing%20accessories%20shoes%20bags%20displayed%20on%20elegant%20pink%20gradient%20background%20with%20soft%20lighting%20premium%20fashion%20photography%20style%20modern%20minimalist%20design%20with%20sophisticated%20styling&width=800&height=400&seq=hero2&orientation=landscape',
      link: '/fashion',
      bgColor: 'from-pink-500 to-purple-600'
    },
    {
      id: 3,
      title: 'Home Makeover Sale',
      subtitle: 'Transform Your Space',
      description: 'Furniture, Decor & Appliances',
      image: 'https://readdy.ai/api/search-image?query=modern%20home%20furniture%20kitchen%20appliances%20decor%20items%20arranged%20beautifully%20on%20warm%20orange%20gradient%20background%20with%20professional%20lighting%20elegant%20product%20photography%20minimalist%20design%20style&width=800&height=400&seq=hero3&orientation=landscape',
      link: '/home',
      bgColor: 'from-orange-500 to-red-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative h-48 md:h-96 overflow-hidden mx-2 md:mx-4 mt-2 md:mt-4 rounded-lg shadow-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <Link href={banner.link} className="block h-full cursor-pointer">
            <div 
              className={`relative h-full bg-gradient-to-r ${banner.bgColor} overflow-hidden group`}
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
              
              <div className="relative h-full flex items-center">
                <div className="w-full px-4 md:px-8 text-white">
                  <div className="max-w-md md:max-w-lg">
                    <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 group-hover:scale-105 transition-transform duration-300">
                      {banner.title}
                    </h1>
                    <p className="text-sm md:text-xl mb-1 md:mb-2 opacity-90">
                      {banner.subtitle}
                    </p>
                    <p className="text-xs md:text-lg mb-3 md:mb-6 opacity-80">
                      {banner.description}
                    </p>
                    <div className="inline-flex bg-[#fdd835] text-[#2874f0] px-3 md:px-6 py-2 md:py-3 rounded-full font-bold text-sm md:text-base hover:bg-yellow-400 hover:scale-105 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-lg">
                      Shop Now →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1 md:p-2 rounded-full transition-all duration-300 cursor-pointer group"
      >
        <div className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <i className="ri-arrow-left-s-line text-lg md:text-xl"></i>
        </div>
      </button>
      
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-1 md:p-2 rounded-full transition-all duration-300 cursor-pointer group"
      >
        <div className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
          <i className="ri-arrow-right-s-line text-lg md:text-xl"></i>
        </div>
      </button>
    </div>
  );
}
