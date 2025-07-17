
'use client';

import Link from 'next/link';

export default function CategoryGrid() {
  const categories = [
    {
      name: 'Electronics',
      icon: 'ri-smartphone-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20electronic%20devices%20tech%20gadgets%20smartphone%20laptop%20tablet%20on%20clean%20white%20background%20with%20soft%20shadows%20minimalist%20product%20photography%20style%20professional%20lighting&width=200&height=200&seq=cat1&orientation=squarish',
      link: '/electronics',
      description: 'Smartphones, Laptops, Tablets & More',
      itemCount: '50K+ items'
    },
    {
      name: 'Fashion',
      icon: 'ri-shirt-line',
      image: 'https://readdy.ai/api/search-image?query=stylish%20fashion%20clothing%20accessories%20shoes%20bags%20on%20clean%20white%20background%20elegant%20product%20display%20with%20soft%20lighting%20minimalist%20commercial%20photography%20style&width=200&height=200&seq=cat2&orientation=squarish',
      link: '/fashion',
      description: 'Clothing, Shoes, Bags & Accessories',
      itemCount: '100K+ items'
    },
    {
      name: 'Home & Kitchen',
      icon: 'ri-home-line',
      image: 'https://readdy.ai/api/search-image?query=modern%20home%20kitchen%20appliances%20cookware%20utensils%20on%20clean%20white%20background%20with%20soft%20shadows%20professional%20product%20photography%20minimalist%20style%20elegant%20display&width=200&height=200&seq=cat3&orientation=squarish',
      link: '/home',
      description: 'Furniture, Appliances, Decor & More',
      itemCount: '75K+ items'
    },
    {
      name: 'Beauty & Health',
      icon: 'ri-heart-pulse-line',
      image: 'https://readdy.ai/api/search-image?query=beauty%20cosmetics%20skincare%20products%20health%20supplements%20on%20clean%20white%20background%20with%20soft%20pastel%20lighting%20elegant%20product%20display%20minimalist%20commercial%20photography&width=200&height=200&seq=cat4&orientation=squarish',
      link: '/beauty',
      description: 'Skincare, Makeup, Health Supplements',
      itemCount: '40K+ items'
    },
    {
      name: 'Sports & Fitness',
      icon: 'ri-football-line',
      image: 'https://readdy.ai/api/search-image?query=sports%20fitness%20equipment%20workout%20gear%20athletic%20accessories%20on%20clean%20white%20background%20with%20dynamic%20lighting%20professional%20product%20photography%20minimalist%20style&width=200&height=200&seq=cat5&orientation=squarish',
      link: '/sports',
      description: 'Exercise Equipment, Sportswear, Outdoor',
      itemCount: '30K+ items'
    },
    {
      name: 'Books & Media',
      icon: 'ri-book-line',
      image: 'https://readdy.ai/api/search-image?query=books%20media%20entertainment%20products%20stacked%20books%20movies%20music%20on%20clean%20white%20background%20with%20soft%20shadows%20elegant%20product%20display%20minimalist%20photography&width=200&height=200&seq=cat6&orientation=squarish',
      link: '/books',
      description: 'Books, Movies, Music & E-books',
      itemCount: '25K+ items'
    },
    {
      name: 'Toys & Games',
      icon: 'ri-gamepad-line',
      image: 'https://readdy.ai/api/search-image?query=colorful%20toys%20games%20entertainment%20products%20for%20kids%20and%20adults%20on%20clean%20white%20background%20with%20playful%20lighting%20professional%20product%20photography%20minimalist%20style&width=200&height=200&seq=cat7&orientation=squarish',
      link: '/toys',
      description: 'Kids Toys, Board Games, Gaming',
      itemCount: '20K+ items'
    },
    {
      name: 'Automotive',
      icon: 'ri-car-line',
      image: 'https://readdy.ai/api/search-image?query=automotive%20car%20accessories%20parts%20tools%20on%20clean%20white%20background%20with%20professional%20lighting%20sleek%20product%20display%20minimalist%20commercial%20photography%20style&width=200&height=200&seq=cat8&orientation=squarish',
      link: '/automotive',
      description: 'Car Accessories, Parts & Tools',
      itemCount: '15K+ items'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mx-2 md:mx-4 mb-4 md:mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">Shop by Category</h2>
        <Link
          href="/categories"
          className="text-sm md:text-base text-[#2874f0] hover:text-blue-700 font-medium hover:underline transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          View All →
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="text-center group cursor-pointer p-2 md:p-3 rounded-lg hover:bg-gray-50 transition-all duration-300"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 md:mb-3 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#2874f0] group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm md:text-base font-medium text-gray-700 group-hover:text-[#2874f0] transition-colors duration-200 mb-1">
              {category.name}
            </h3>
            <p className="text-xs text-gray-500 hidden md:block mb-1">
              {category.description}
            </p>
            <span className="text-xs text-green-600 font-medium">
              {category.itemCount}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
