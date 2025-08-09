import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';
import ModalB from '@/components/common/modals/ModalB';
import FilterModal from '@/components/common/modals/FilterModal';
import ButtonA from '@/components/common/buttons/ButtonA';

import productsData from '@/data/products.json'; // Adjust path as needed

const ProductsPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
    level: [],
  });
  const [displayedProducts, setDisplayedProducts] = useState(productsData);

  // Card configuration for products
  const productCardConfig = {
    showId: true,
    showTitle: true,
    showImage: true,
    showPrice: true,
    showStatus: true,
    pricePrefix: '$',
    imageHeight: 'h-48'
  };

  // Modal configuration for products
  const productModalConfig = {
    actionButtonText: 'Add to Cart',
    actionButtonColor: 'blue',
    pricePrefix: '$',
  };

  // Filter modal configuration for products
  const filterModalConfig = {
    title: 'PRODUCT FILTERS',
    sortOptions: [
      { value: 'bestSelling', label: 'Best Selling' },
      { value: 'priceLowest', label: 'Price (Lowest First)' },
      { value: 'priceHighest', label: 'Price (Highest First)' },
      { value: 'newArrivals', label: 'New Arrivals' },
      { value: 'highestRated', label: 'Highest Rated' }
    ],
    categories: ['Programming', 'Marketing', 'Data Science', 'Design'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    showSort: true,
    showCategory: true,
    showLevel: true,
    showBrands: false,
    showPriceRange: false,
    showRating: false,
    buttonText: 'VIEW {count} PRODUCTS',
    sortLabel: 'SORT BY:',
    categoryLabel: 'CATEGORY',
    levelLabel: 'LEVEL'
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleEnrollClick = (product) => {
    setSelectedProduct(product);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...productsData];

    // Apply category filter
    if (currentFilters.category && currentFilters.category.length > 0) {
      filtered = filtered.filter((product) =>
        currentFilters.category.includes(product.category)
      );
    }

    // Apply level filter
    if (currentFilters.level && currentFilters.level.length > 0) {
      filtered = filtered.filter((product) =>
        currentFilters.level.includes(product.level)
      );
    }

    // Apply sorting
    switch (currentFilters.sortBy) {
      case 'priceLowest':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighest':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newArrivals':
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'highestRated':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'bestSelling':
      default:
        filtered.sort((a, b) => b.students - a.students);
        break;
    }
    
    setDisplayedProducts(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    toggleFilterModal();
  };

  const handleCardClick = (productId) => {
    console.log(`Navigating to product details for ID: ${productId}`);
    // In a real app, you'd use React Router:
    // navigate(`/products/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Main content with conditional blur */}
      <main className={`flex-grow ${isFilterModalOpen ? 'blur-sm' : ''}`}>
        <h1 className="text-center text-4xl font-extrabold text-gray-800 my-10 uppercase">
          ALL PRODUCTS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-gray-700">
              {displayedProducts.length} PRODUCTS
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <Card 
                key={product.id} 
                data={product} 
                config={productCardConfig}
                onClick={() => handleCardClick(product.id)}
              >
                <ButtonA 
                  text='Buy' 
                  className='w-full'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEnrollClick(product);
                  }}
                />
              </Card>
            ))}
          </div>

          {/* No results message */}
          {displayedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No products found</div>
              <div className="text-gray-400">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </main>

      {/* Enroll Modal */}
      <ModalB 
        isOpen={isEnrollModalOpen}
        onClose={closeEnrollModal}
        itemData={selectedProduct}
        config={productModalConfig}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={toggleFilterModal}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        resultCount={displayedProducts.length}
        config={filterModalConfig}
      />
    </div>
  );
};

export default ProductsPage;