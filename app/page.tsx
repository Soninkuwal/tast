
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProductCarousel from '../components/ProductCarousel';
import CategoryGrid from '../components/CategoryGrid';
import OfferSection from '../components/OfferSection';

export default function Home() {
  const topDeals = [
    {
      id: '1',
      name: 'Samsung Galaxy M34 5G (Midnight Blue, 128GB)',
      price: 16999,
      originalPrice: 20999,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20soft%20shadows&width=300&height=300&seq=product1&orientation=squarish',
      rating: 4.3,
      discount: 19
    },
    {
      id: '2', 
      name: 'Apple iPhone 14 (Blue, 128GB)',
      price: 59999,
      originalPrice: 69900,
      image: 'https://readdy.ai/api/search-image?query=Apple%20iPhone%2014%20in%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20elegant%20shadows%20and%20reflections%20modern%20design&width=300&height=300&seq=product2&orientation=squarish',
      rating: 4.6,
      discount: 14
    },
    {
      id: '3',
      name: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 128GB)',
      price: 19999,
      originalPrice: 24999,
      image: 'https://readdy.ai/api/search-image?query=OnePlus%20Nord%20smartphone%20in%20pastel%20lime%20green%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=300&height=300&seq=product3&orientation=squarish',
      rating: 4.2,
      discount: 20
    },
    {
      id: '4',
      name: 'Xiaomi 13 Pro 5G (Ceramic Black, 256GB)',
      price: 79999,
      originalPrice: 89999,
      image: 'https://readdy.ai/api/search-image?query=Xiaomi%20smartphone%20in%20ceramic%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20elegant%20modern%20design%20with%20reflections&width=300&height=300&seq=product4&orientation=squarish',
      rating: 4.5,
      discount: 11
    },
    {
      id: '5',
      name: 'Google Pixel 7a (Charcoal, 128GB)',
      price: 43999,
      originalPrice: 52999,
      image: 'https://readdy.ai/api/search-image?query=Google%20Pixel%20smartphone%20in%20charcoal%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20soft%20shadows&width=300&height=300&seq=product5&orientation=squarish',
      rating: 4.4,
      discount: 17
    },
    {
      id: '16',
      name: 'Realme GT Neo 5 (Racing Yellow, 256GB)',
      price: 39999,
      originalPrice: 44999,
      image: 'https://readdy.ai/api/search-image?query=Realme%20GT%20smartphone%20in%20racing%20yellow%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sporty%20modern%20design%20with%20racing%20stripes&width=300&height=300&seq=product16&orientation=squarish',
      rating: 4.1,
      discount: 11
    },
    {
      id: '17',
      name: 'Motorola Edge 40 (Lunar Blue, 128GB)',
      price: 25999,
      originalPrice: 29999,
      image: 'https://readdy.ai/api/search-image?query=Motorola%20Edge%20smartphone%20in%20lunar%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20curved%20design%20with%20metallic%20finish&width=300&height=300&seq=product17&orientation=squarish',
      rating: 4.0,
      discount: 13
    },
    {
      id: '18',
      name: 'Vivo V29 5G (Himalayan Blue, 128GB)',
      price: 32999,
      originalPrice: 37999,
      image: 'https://readdy.ai/api/search-image?query=Vivo%20smartphone%20in%20himalayan%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20modern%20design%20with%20gradient%20finish&width=300&height=300&seq=product18&orientation=squarish',
      rating: 4.2,
      discount: 13
    }
  ];

  const electronics = [
    {
      id: '6',
      name: 'MacBook Air M2 (Midnight, 256GB SSD, 8GB)',
      price: 114900,
      originalPrice: 129900,
      image: 'https://readdy.ai/api/search-image?query=MacBook%20Air%20M2%20laptop%20in%20midnight%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20soft%20shadows&width=300&height=300&seq=product6&orientation=squarish',
      rating: 4.7,
      discount: 12
    },
    {
      id: '7',
      name: 'Samsung 32" M7 Smart Monitor with Mobile Connectivity',
      price: 31999,
      originalPrice: 39999,
      image: 'https://readdy.ai/api/search-image?query=Samsung%20smart%20monitor%2032%20inch%20display%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20stand&width=300&height=300&seq=product7&orientation=squarish',
      rating: 4.3,
      discount: 20
    },
    {
      id: '8',
      name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      price: 34990,
      originalPrice: 39990,
      image: 'https://readdy.ai/api/search-image?query=Sony%20premium%20wireless%20headphones%20in%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20luxury%20product%20photography%20style%20elegant%20modern%20design&width=300&height=300&seq=product8&orientation=squarish',
      rating: 4.6,
      discount: 13
    },
    {
      id: '9',
      name: 'Dell XPS 13 Plus Laptop (Intel i7, 16GB RAM, 512GB SSD)',
      price: 159999,
      originalPrice: 179999,
      image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%20laptop%20computer%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20soft%20shadows%20elegant%20silver%20finish&width=300&height=300&seq=product9&orientation=squarish',
      rating: 4.5,
      discount: 11
    },
    {
      id: '10',
      name: 'iPad Pro 11" M2 (Wi-Fi, 128GB) - Space Grey',
      price: 81900,
      originalPrice: 94900,
      image: 'https://readdy.ai/api/search-image?query=iPad%20Pro%20tablet%20in%20space%20grey%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20reflections&width=300&height=300&seq=product10&orientation=squarish',
      rating: 4.8,
      discount: 14
    },
    {
      id: '19',
      name: 'LG 27" UltraGear Gaming Monitor 144Hz',
      price: 22999,
      originalPrice: 27999,
      image: 'https://readdy.ai/api/search-image?query=LG%20UltraGear%20gaming%20monitor%2027%20inch%20with%20RGB%20lighting%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20modern%20gaming%20design&width=300&height=300&seq=product19&orientation=squarish',
      rating: 4.4,
      discount: 18
    },
    {
      id: '20',
      name: 'Bose QuietComfort 45 Wireless Headphones',
      price: 32900,
      originalPrice: 36900,
      image: 'https://readdy.ai/api/search-image?query=Bose%20QuietComfort%20wireless%20headphones%20in%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20elegant%20modern%20design&width=300&height=300&seq=product20&orientation=squarish',
      rating: 4.5,
      discount: 11
    },
    {
      id: '21',
      name: 'ASUS ROG Strix Gaming Laptop (RTX 4060, 16GB RAM)',
      price: 129999,
      originalPrice: 149999,
      image: 'https://readdy.ai/api/search-image?query=ASUS%20ROG%20gaming%20laptop%20with%20RGB%20keyboard%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20aggressive%20gaming%20design%20with%20red%20accents&width=300&height=300&seq=product21&orientation=squarish',
      rating: 4.3,
      discount: 13
    }
  ];

  const mobiles = [
    {
      id: '11',
      name: 'OPPO Reno10 Pro+ 5G (Silvery Grey, 256GB)',
      price: 54999,
      originalPrice: 64999,
      image: 'https://readdy.ai/api/search-image?query=OPPO%20Reno%20smartphone%20in%20silvery%20grey%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design%20with%20elegant%20finish&width=300&height=300&seq=product11&orientation=squarish',
      rating: 4.4,
      discount: 15
    },
    {
      id: '12',
      name: 'Vivo V29 5G (Himalayan Blue, 128GB)',
      price: 32999,
      originalPrice: 37999,
      image: 'https://readdy.ai/api/search-image?query=Vivo%20smartphone%20in%20himalayan%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20modern%20design%20with%20gradient%20finish&width=300&height=300&seq=product12&orientation=squarish',
      rating: 4.2,
      discount: 13
    },
    {
      id: '13',
      name: 'Nothing Phone (2) (White, 256GB)',
      price: 44999,
      originalPrice: 49999,
      image: 'https://readdy.ai/api/search-image?query=Nothing%20Phone%20smartphone%20in%20white%20color%20with%20transparent%20back%20design%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20unique%20modern%20design&width=300&height=300&seq=product13&orientation=squarish',
      rating: 4.3,
      discount: 10
    },
    {
      id: '14',
      name: 'Realme GT Neo 5 (Racing Yellow, 256GB)',
      price: 39999,
      originalPrice: 44999,
      image: 'https://readdy.ai/api/search-image?query=Realme%20GT%20smartphone%20in%20racing%20yellow%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sporty%20modern%20design%20with%20racing%20stripes&width=300&height=300&seq=product14&orientation=squarish',
      rating: 4.1,
      discount: 11
    },
    {
      id: '15',
      name: 'Motorola Edge 40 (Lunar Blue, 128GB)',
      price: 25999,
      originalPrice: 29999,
      image: 'https://readdy.ai/api/search-image?query=Motorola%20Edge%20smartphone%20in%20lunar%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20curved%20design%20with%20metallic%20finish&width=300&height=300&seq=product15&orientation=squarish',
      rating: 4.0,
      discount: 13
    },
    {
      id: '22',
      name: 'Honor 90 5G (Peacock Blue, 256GB)',
      price: 37999,
      originalPrice: 42999,
      image: 'https://readdy.ai/api/search-image?query=Honor%20smartphone%20in%20peacock%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20elegant%20modern%20design%20with%20curved%20edges&width=300&height=300&seq=product22&orientation=squarish',
      rating: 4.2,
      discount: 12
    },
    {
      id: '23',
      name: 'iQOO Neo7 Pro 5G (Fearless Flame, 128GB)',
      price: 34999,
      originalPrice: 39999,
      image: 'https://readdy.ai/api/search-image?query=iQOO%20Neo%20smartphone%20in%20orange%20flame%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20gaming%20design%20with%20aggressive%20styling&width=300&height=300&seq=product23&orientation=squarish',
      rating: 4.3,
      discount: 13
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pb-16 md:pb-0">
        <HeroSection />
        <OfferSection />
        <CategoryGrid />
        <ProductCarousel title="🔥 Top Deals" products={topDeals} viewAllLink="/deals" />
        <ProductCarousel title="📱 Best of Electronics" products={electronics} viewAllLink="/electronics" />
        <ProductCarousel title="📞 Trending Mobiles" products={mobiles} viewAllLink="/mobiles" />
      </main>

      <Footer />
    </div>
  );
}
