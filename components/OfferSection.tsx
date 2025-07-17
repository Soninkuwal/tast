
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OfferSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 45, seconds: 30 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 1,
      title: 'Flash Sale',
      discount: 'Up to 80% OFF',
      description: 'Limited time offer on electronics',
      image: 'https://readdy.ai/api/search-image?query=flash%20sale%20lightning%20bolt%20with%20electronic%20gadgets%20smartphones%20laptops%20on%20vibrant%20red%20gradient%20background%20with%20professional%20lighting%20dynamic%20product%20photography%20style%20modern%20design&width=300&height=200&seq=offer1&orientation=landscape',
      link: '/flash-sale',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 2,
      title: 'Daily Deals',
      discount: 'Best Prices',
      description: 'New deals every day',
      image: 'https://readdy.ai/api/search-image?query=daily%20deals%20calendar%20with%20various%20products%20gift%20boxes%20on%20bright%20yellow%20gradient%20background%20with%20professional%20lighting%20cheerful%20product%20photography%20style%20modern%20design&width=300&height=200&seq=offer2&orientation=landscape',
      link: '/daily-deals',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 3,
      title: 'Member Exclusive',
      discount: 'Extra 20% OFF',
      description: 'Special prices for members',
      image: 'https://readdy.ai/api/search-image?query=vip%20member%20exclusive%20crown%20with%20premium%20products%20on%20elegant%20purple%20gradient%20background%20with%20professional%20lighting%20luxury%20product%20photography%20style%20sophisticated%20design&width=300&height=200&seq=offer3&orientation=landscape',
      link: '/member-deals',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mx-2 md:mx-4 mb-4 md:mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-0">⚡ Limited Time Offers</h2>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-sm md:text-base text-gray-600">Ends in:</span>
          <div className="flex items-center space-x-1 md:space-x-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 md:px-4 py-2 rounded-full">
            <div className="text-center">
              <div className="text-sm md:text-lg font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">hr</div>
            </div>
            <span className="text-sm md:text-lg font-bold">:</span>
            <div className="text-center">
              <div className="text-sm md:text-lg font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">min</div>
            </div>
            <span className="text-sm md:text-lg font-bold">:</span>
            <div className="text-center">
              <div className="text-sm md:text-lg font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-xs opacity-80">sec</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {offers.map((offer) => (
          <Link
            key={offer.id}
            href={offer.link}
            className="group cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div 
              className={`relative h-32 md:h-40 bg-gradient-to-r ${offer.color} overflow-hidden`}
              style={{
                backgroundImage: `url(${offer.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
              
              <div className="relative h-full flex flex-col justify-center p-4 text-white">
                <h3 className="text-sm md:text-lg font-bold mb-1 group-hover:scale-105 transition-transform duration-300">
                  {offer.title}
                </h3>
                <p className="text-lg md:text-2xl font-bold mb-1 text-[#fdd835]">
                  {offer.discount}
                </p>
                <p className="text-xs md:text-sm opacity-90">
                  {offer.description}
                </p>
                
                <div className="absolute bottom-2 right-2 bg-white/20 p-1 md:p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-sm md:text-lg group-hover:scale-110 transition-transform duration-200"></i>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
