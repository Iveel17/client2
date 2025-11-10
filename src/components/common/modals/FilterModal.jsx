import React from 'react';
import ButtonB from '@/components/common/buttons/ButtonB';

const FilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onApplyFilters,
  resultCount,
  config = {}
}) => {
  if (!isOpen) return null;

  // Default configuration for different filter types
  const defaultConfig = {
    title: 'FILTERS',
    sortOptions: [
      { value: 'bestSelling', label: 'Best Selling' },
      { value: 'priceLowest', label: 'Price (Lowest First)' },
      { value: 'priceHighest', label: 'Price (Highest First)' },
      { value: 'newArrivals', label: 'New Arrivals' },
      { value: 'highestRated', label: 'Highest Rated' }
    ],
    categories: ['Mathematics', 'English'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    showSort: true,
    showCategory: true,
    showLevel: true,
    showBrands: false,
    showPriceRange: false,
    showRating: false,
    brands: [],
    priceRange: { min: 0, max: 1000 },
    buttonText: 'VIEW {count} PRODUCTS',
    sortLabel: 'SORT BY:',
    categoryLabel: 'CATEGORY',
    levelLabel: 'LEVEL',
    brandLabel: 'BRAND',
    priceLabel: 'PRICE RANGE',
    ratingLabel: 'RATING',
    ...config
  };

  const handleSortChange = (e) => {
    const newFilters = { ...filters, sortBy: e.target.value };
    onFiltersChange(newFilters);
  };

  const handleCheckboxChange = (filterType, value, checked) => {
    const currentArray = filters[filterType] || [];
    const updatedArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    
    const newFilters = { ...filters, [filterType]: updatedArray };
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (field, value) => {
    const newPriceRange = { ...filters.priceRange, [field]: value };
    const newFilters = { ...filters, priceRange: newPriceRange };
    onFiltersChange(newFilters);
  };

  const renderSortSection = () => {
    if (!defaultConfig.showSort) return null;

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.sortLabel}
        </h4>
        <div className="space-y-2">
          {defaultConfig.sortOptions.map((option) => (
            <label key={option.value} className="block text-gray-700 text-sm cursor-pointer">
              <input
                type="radio"
                name="sortBy"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={handleSortChange}
                className="mr-2 accent-blue-600"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderCategorySection = () => {
    if (!defaultConfig.showCategory || !defaultConfig.categories.length) return null;

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.categoryLabel}
        </h4>
        <div className="space-y-2">
          {defaultConfig.categories.map((category) => (
            <label key={category} className="block text-gray-700 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={category}
                checked={(filters.category || []).includes(category)}
                onChange={(e) => handleCheckboxChange('category', category, e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              {category}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderLevelSection = () => {
    if (!defaultConfig.showLevel || !defaultConfig.levels.length) return null;

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.levelLabel}
        </h4>
        <div className="space-y-2">
          {defaultConfig.levels.map((level) => (
            <label key={level} className="block text-gray-700 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={level}
                checked={(filters.level || []).includes(level)}
                onChange={(e) => handleCheckboxChange('level', level, e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              {level}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderBrandSection = () => {
    if (!defaultConfig.showBrands || !defaultConfig.brands.length) return null;

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.brandLabel}
        </h4>
        <div className="space-y-2">
          {defaultConfig.brands.map((brand) => (
            <label key={brand} className="block text-gray-700 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={brand}
                checked={(filters.brand || []).includes(brand)}
                onChange={(e) => handleCheckboxChange('brand', brand, e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderPriceRangeSection = () => {
    if (!defaultConfig.showPriceRange) return null;

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.priceLabel}
        </h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange?.min || ''}
              onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange?.max || ''}
              onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value) || 1000)}
              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRatingSection = () => {
    if (!defaultConfig.showRating) return null;

    const ratings = [5, 4, 3, 2, 1];

    return (
      <div className="mb-6">
        <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
          {defaultConfig.ratingLabel}
        </h4>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="block text-gray-700 text-sm cursor-pointer">
              <input
                type="checkbox"
                value={rating}
                checked={(filters.rating || []).includes(rating)}
                onChange={(e) => handleCheckboxChange('rating', rating, e.target.checked)}
                className="mr-2 accent-blue-600"
              />
              {'⭐'.repeat(rating)} & up
            </label>
          ))}
        </div>
      </div>
    );
  };

  const getButtonText = () => {
    return defaultConfig.buttonText.replace('{count}', resultCount || 0);
  };

  return (
    <>
      {/* Invisible overlay for closing modal when clicking outside */}
      <div
        className="fixed inset-0 z-30"
        onClick={onClose}
      ></div>

      {/* Filter Modal Content - This is the sidebar itself */}
      <div
        className="fixed right-0 top-0 w-72 h-screen bg-white p-6 shadow-lg flex flex-col overflow-y-auto z-40 animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800">{defaultConfig.title}</h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* Render all sections */}
        {renderSortSection()}
        {renderCategorySection()}
        {renderLevelSection()}
        {renderBrandSection()}
        {renderPriceRangeSection()}
        {renderRatingSection()}

        {/* Apply Filters Button */}
        <ButtonB
          onClick={onApplyFilters}
          text={getButtonText()}
        />
      </div>
    </>
  );
};

export default FilterModal;