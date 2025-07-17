'use client';

import { useState } from 'react';

interface FilterSidebarProps {
  onFiltersChange?: (filters: any) => void;
}

export default function FilterSidebar({ onFiltersChange }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [availability, setAvailability] = useState('all');

  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'ASUS', 'LG', 'Bose', 'HP', 'Lenovo', 'Xiaomi'];

  const toggleBrand = (brand: string) => {
    const newSelectedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    
    setSelectedBrands(newSelectedBrands);
    applyFilters({ brands: newSelectedBrands });
  };

  const handlePriceChange = (newMaxPrice: number) => {
    const newPriceRange = [priceRange[0], newMaxPrice];
    setPriceRange(newPriceRange);
    applyFilters({ priceRange: newPriceRange });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    applyFilters({ rating });
  };

  const handleAvailabilityChange = (newAvailability: string) => {
    setAvailability(newAvailability);
    applyFilters({ availability: newAvailability });
  };

  const applyFilters = (changedFilter: any = {}) => {
    const filters = {
      priceRange,
      brands: selectedBrands,
      rating: selectedRating,
      availability,
      ...changedFilter
    };

    if (onFiltersChange) {
      onFiltersChange(filters);
    }

    // Show apply confirmation
    const applyBtn = document.getElementById('apply-filters-btn');
    if (applyBtn) {
      applyBtn.textContent = 'Filters Applied!';
      applyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
      applyBtn.classList.remove('bg-[#2874f0]', 'hover:bg-blue-700');
      
      setTimeout(() => {
        applyBtn.textContent = 'Apply Filters';
        applyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
        applyBtn.classList.add('bg-[#2874f0]', 'hover:bg-blue-700');
      }, 2000);
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedBrands([]);
    setSelectedRating(0);
    setAvailability('all');
    
    if (onFiltersChange) {
      onFiltersChange({
        priceRange: [0, 200000],
        brands: [],
        rating: 0,
        availability: 'all'
      });
    }
  };

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer hover:underline transition-colors duration-200"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="200000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors duration-200">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2 cursor-pointer w-4 h-4 text-[#2874f0] focus:ring-[#2874f0] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors duration-200">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="mr-2 cursor-pointer w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]"
              />
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-1">
                  {[...Array(rating)].map((_, i) => (
                    <div key={i} className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-star-fill text-sm"></i>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-700">& above</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors duration-200">
            <input
              type="radio"
              name="availability"
              value="all"
              checked={availability === 'all'}
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="mr-2 cursor-pointer w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]"
            />
            <span className="text-sm text-gray-700">All Products</span>
          </label>
          <label className="flex items-center cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors duration-200">
            <input
              type="radio"
              name="availability"
              value="in-stock"
              checked={availability === 'in-stock'}
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="mr-2 cursor-pointer w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]"
            />
            <span className="text-sm text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center cursor-pointer hover:bg-gray-50 rounded p-1 transition-colors duration-200">
            <input
              type="radio"
              name="availability"
              value="sale"
              checked={availability === 'sale'}
              onChange={(e) => handleAvailabilityChange(e.target.value)}
              className="mr-2 cursor-pointer w-4 h-4 text-[#2874f0] focus:ring-[#2874f0]"
            />
            <span className="text-sm text-gray-700">On Sale</span>
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        id="apply-filters-btn"
        onClick={() => applyFilters()}
        className="w-full bg-[#2874f0] hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 whitespace-nowrap cursor-pointer shadow-lg"
      >
        Apply Filters
      </button>
    </div>
  );
}