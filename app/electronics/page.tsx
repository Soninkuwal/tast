
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FilterSidebar from '../../components/FilterSidebar';
import ProductGrid from '../../components/ProductGrid';

function ElectronicsContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: [0, 100000],
    rating: 0,
    availability: 'all'
  });
  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    // Enhanced mock data with more products across different categories
    const mockProducts = [
      // Smartphones
      {
        id: '1',
        name: 'Samsung Galaxy M34 5G (Midnight Blue, 128GB)',
        category: 'smartphones',
        subcategory: 'android',
        price: 16999,
        originalPrice: 20999,
        discount: 19,
        image: 'https://readdy.ai/api/search-image?query=Samsung%20Galaxy%20smartphone%20in%20midnight%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=300&height=300&seq=elec1&orientation=squarish',
        rating: 4.3,
        brand: 'Samsung'
      },
      {
        id: '2',
        name: 'Apple iPhone 14 (Blue, 128GB)',
        category: 'smartphones',
        subcategory: 'ios',
        price: 69999,
        originalPrice: 79999,
        discount: 12,
        image: 'https://readdy.ai/api/search-image?query=Apple%20iPhone%2014%20in%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20modern%20design&width=300&height=300&seq=elec2&orientation=squarish',
        rating: 4.7,
        brand: 'Apple'
      },
      {
        id: '3',
        name: 'OnePlus Nord 3 5G (Misty Green, 256GB)',
        category: 'smartphones',
        subcategory: 'android',
        price: 33999,
        originalPrice: 37999,
        discount: 10,
        image: 'https://readdy.ai/api/search-image?query=OnePlus%20smartphone%20in%20misty%20green%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20modern%20elegant%20design&width=300&height=300&seq=elec3&orientation=squarish',
        rating: 4.4,
        brand: 'OnePlus'
      },
      {
        id: '4',
        name: 'Xiaomi Redmi Note 12 Pro (Glacier Blue, 128GB)',
        category: 'smartphones',
        subcategory: 'android',
        price: 23999,
        originalPrice: 26999,
        discount: 11,
        image: 'https://readdy.ai/api/search-image?query=Xiaomi%20smartphone%20in%20glacier%20blue%20color%20front%20view%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20design&width=300&height=300&seq=elec4&orientation=squarish',
        rating: 4.2,
        brand: 'Xiaomi'
      },

      // Audio & Headphones
      {
        id: '5',
        name: 'Sony WH-1000XM4 Wireless Headphones',
        category: 'audio',
        subcategory: 'headphones',
        price: 24999,
        originalPrice: 29999,
        discount: 17,
        image: 'https://readdy.ai/api/search-image?query=Sony%20WH-1000XM4%20wireless%20headphones%20in%20black%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=300&height=300&seq=elec5&orientation=squarish',
        rating: 4.5,
        brand: 'Sony'
      },
      {
        id: '6',
        name: 'JBL Tune 760NC Wireless Over-Ear Headphones',
        category: 'audio',
        subcategory: 'headphones',
        price: 7999,
        originalPrice: 9999,
        discount: 20,
        image: 'https://readdy.ai/api/search-image?query=JBL%20wireless%20headphones%20in%20blue%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20modern%20design&width=300&height=300&seq=elec6&orientation=squarish',
        rating: 4.1,
        brand: 'JBL'
      },
      {
        id: '7',
        name: 'Apple AirPods Pro (2nd Generation)',
        category: 'audio',
        subcategory: 'earbuds',
        price: 26900,
        originalPrice: 29900,
        discount: 10,
        image: 'https://readdy.ai/api/search-image?query=Apple%20AirPods%20Pro%20wireless%20earbuds%20in%20white%20color%20with%20charging%20case%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style&width=300&height=300&seq=elec7&orientation=squarish',
        rating: 4.6,
        brand: 'Apple'
      },
      {
        id: '8',
        name: 'boAt Airdopes 141 Bluetooth Truly Wireless Earbuds',
        category: 'audio',
        subcategory: 'earbuds',
        price: 1999,
        originalPrice: 2999,
        discount: 33,
        image: 'https://readdy.ai/api/search-image?query=boAt%20wireless%20earbuds%20in%20black%20color%20with%20charging%20case%20on%20clean%20white%20background%20with%20professional%20lighting%20product%20photography%20style%20affordable%20design&width=300&height=300&seq=elec8&orientation=squarish',
        rating: 4.0,
        brand: 'boAt'
      },

      // Laptops & Computers
      {
        id: '9',
        name: 'MacBook Air M2 (13-inch, 256GB, Midnight)',
        category: 'laptops',
        subcategory: 'ultrabooks',
        price: 114900,
        originalPrice: 119900,
        discount: 4,
        image: 'https://readdy.ai/api/search-image?query=Apple%20MacBook%20Air%20M2%20in%20midnight%20color%20closed%20laptop%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20sleek%20aluminum%20design&width=300&height=300&seq=elec9&orientation=squarish',
        rating: 4.8,
        brand: 'Apple'
      },
      {
        id: '10',
        name: 'HP Pavilion Gaming Laptop (Intel i5, 8GB RAM, 512GB SSD)',
        category: 'laptops',
        subcategory: 'gaming',
        price: 54999,
        originalPrice: 64999,
        discount: 15,
        image: 'https://readdy.ai/api/search-image?query=HP%20gaming%20laptop%20in%20black%20color%20with%20RGB%20keyboard%20on%20clean%20white%20background%20with%20professional%20lighting%20product%20photography%20style%20modern%20gaming%20design&width=300&height=300&seq=elec10&orientation=squarish',
        rating: 4.3,
        brand: 'HP'
      },
      {
        id: '11',
        name: 'Dell XPS 13 (Intel i7, 16GB RAM, 512GB SSD)',
        category: 'laptops',
        subcategory: 'ultrabooks',
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        image: 'https://readdy.ai/api/search-image?query=Dell%20XPS%20laptop%20in%20silver%20color%20with%20premium%20aluminum%20body%20on%20clean%20white%20background%20with%20professional%20lighting%20premium%20product%20photography%20style%20elegant%20design&width=300&height=300&seq=elec11&orientation=squarish',
        rating: 4.5,
        brand: 'Dell'
      },
      {
        id: '12',
        name: 'Lenovo IdeaPad 3 (AMD Ryzen 5, 8GB RAM, 256GB SSD)',
        category: 'laptops',
        subcategory: 'budget',
        price: 39999,
        originalPrice: 45999,
        discount: 13,
        image: 'https://readdy.ai/api/search-image?query=Lenovo%20laptop%20in%20arctic%20grey%20color%20on%20clean%20white%20background%20with%20professional%20lighting%20product%20photography%20style%20affordable%20sleek%20design&width=300&height=300&seq=elec12&orientation=squarish',
        rating: 4.1,
        brand: 'Lenovo'
      }
    ];

    let filtered = mockProducts;

    // Apply search filter if search query exists
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setProducts(mockProducts);
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const applyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setFiltersApplied(true);
    
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (newFilters.brands.length > 0) {
      filtered = filtered.filter(product => 
        newFilters.brands.includes(product.brand)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= newFilters.priceRange[0] && 
      product.price <= newFilters.priceRange[1]
    );

    // Apply rating filter
    if (newFilters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= newFilters.rating);
    }

    // Apply availability filter
    if (newFilters.availability === 'in-stock') {
      filtered = filtered.filter(product => product.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-search-line text-blue-600"></i>
              </div>
              <span className="text-blue-800">
                Search results for: <strong>"{searchQuery}"</strong> ({filteredProducts.length} products found)
              </span>
            </div>
          </div>
        )}

        {/* Filters Applied Indicator */}
        {filtersApplied && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg animate-slideIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-filter-line text-green-600"></i>
                </div>
                <span className="text-green-800 text-sm">Filters applied successfully! Showing {filteredProducts.length} products.</span>
              </div>
              <button 
                onClick={() => {
                  setFiltersApplied(false);
                  setFilteredProducts(products);
                  setFilters({
                    brands: [],
                    priceRange: [0, 100000],
                    rating: 0,
                    availability: 'all'
                  });
                }}
                className="text-green-600 hover:text-green-800 text-sm cursor-pointer hover:underline"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar onApplyFilters={applyFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {searchQuery ? `Search: "${searchQuery}"` : 'Electronics'}
              </h1>
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Category Sections */}
            {!searchQuery && (
              <div className="mb-8 space-y-8">
                {/* Smartphones Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-smartphone-line text-[#2874f0]"></i>
                    </div>
                    <span>Smartphones</span>
                  </h2>
                  <ProductGrid products={filteredProducts.filter(p => p.category === 'smartphones').slice(0, 4)} />
                </div>

                {/* Audio Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-headphone-line text-[#2874f0]"></i>
                    </div>
                    <span>Audio & Headphones</span>
                  </h2>
                  <ProductGrid products={filteredProducts.filter(p => p.category === 'audio').slice(0, 4)} />
                </div>

                {/* Laptops Section */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-computer-line text-[#2874f0]"></i>
                    </div>
                    <span>Laptops & Computers</span>
                  </h2>
                  <ProductGrid products={filteredProducts.filter(p => p.category === 'laptops').slice(0, 4)} />
                </div>
              </div>
            )}

            {/* All Products Grid (for search results or when filters applied) */}
            {(searchQuery || filtersApplied) && (
              <ProductGrid products={filteredProducts} />
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-search-line text-6xl text-gray-400"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No products found</h2>
                <p className="text-gray-600 mb-8">
                  {searchQuery 
                    ? `No products match your search for "${searchQuery}"`
                    : "No products match your current filters"
                  }
                </p>
                <button 
                  onClick={() => {
                    setFiltersApplied(false);
                    setFilteredProducts(products);
                    window.history.pushState({}, '', '/electronics');
                  }}
                  className="bg-[#2874f0] text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function ElectronicsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0]"></div>
      </div>
    }>
      <ElectronicsContent />
    </Suspense>
  );
}
