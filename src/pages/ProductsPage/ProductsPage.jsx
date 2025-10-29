import React, { useState, useEffect, useCallback } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';
import ModalB from '@/components/common/modals/ModalB';
import FilterModal from '@/components/common/modals/FilterModal';
import ButtonA from '@/components/common/buttons/ButtonA';

// Removed: import productsData from '@/data/products.json'; 
const API_URL = 'http://localhost:5000/api/products';

const ProductsPage = () => {
  // State for raw data fetched from the API
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // State for UI and filtering
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
  });
  const [displayedProducts, setDisplayedProducts] = useState([]); 

  // =========================================================================
  // 1. STABLE FILTER FUNCTION (useCallback)
  // =========================================================================
  // Function to apply filters/sorting, made stable with useCallback
  const applyFilters = useCallback((currentFilters) => {
    // Use the raw fetched data as the source of truth
    let filtered = [...products]; 

    // Apply category filter
    if (currentFilters.category && currentFilters.category.length > 0) {
      filtered = filtered.filter((product) =>
        currentFilters.category.includes(product.category)
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
        // Sort by uploadedAt field from MongoDB
        filtered.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        break;
      case 'highestDiscount':
        // Sort by discount percentage
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'inStock':
        // Sort by stock availability
        filtered.sort((a, b) => (b.stock || 0) - (a.stock || 0));
        break;
      case 'bestSelling':
      default:
        // For products, we can sort by stock sold (if tracked) or just by default
        // Since the model doesn't have a 'sales' field, we'll keep original order
        // or you can add custom logic here
        break;
    }
    
    setDisplayedProducts(filtered);
  }, [products]); // Dependency: Recreate this function only when the raw 'products' data changes

  // =========================================================================
  // 2. EFFECT HOOK TO FETCH DATA (Runs once on mount)
  // =========================================================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store raw data and initialize displayed data
        setProducts(data); 
        // setDisplayedProducts(data); // Initial filtering is now handled by the next useEffect
        setError(null);

      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please check the server connection.");
        setProducts([]); 
        setDisplayedProducts([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []); // Runs once on mount

  // =========================================================================
  // 3. EFFECT HOOK TO APPLY FILTERS (Runs on data or filter change)
  // =========================================================================
  useEffect(() => {
    if (!loading && !error && products.length > 0) {
      applyFilters(filters);
    }
  // Dependencies included: applyFilters (stable function), and filters (state object)
  }, [applyFilters, filters, loading, error, products]);
  
  // =========================================================================
  // 4. HANDLERS AND CONFIGS (Rest of the component logic)
  // =========================================================================

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
  };

  const handleApplyFilters = () => {
    // applyFilters is already run by the useEffect above
    toggleFilterModal();
  };

  const handleCardClick = (productId) => {
    console.log(`Navigating to product details for ID: ${productId}`);
    // navigate(`/products/${productId}`);
  };
  
  // Card configuration 
  const productCardConfig = {
    showId: true, 
    showTitle: true, 
    showImage: true, 
    showPrice: true, 
    showStatus: true, 
    pricePrefix: '$', 
    imageHeight: 'h-48',
    cardHeight: 'min-h-[400px]', 
    className: 'flex flex-col h-full'
  };

  // Modal configuration
  const productModalConfig = {
    title: 'Product Details',
    actionButtonText: 'Add to Cart',
    actionButtonColor: 'blue',
    showImage: true,
    showDescription: true,
    showPrice: true,
    pricePrefix: '$',
    imageHeight: 'h-56'
  };

  // Filter modal configuration
  const filterModalConfig = {
    title: 'PRODUCT FILTERS',
    sortOptions: [
      { value: 'bestSelling', label: 'Best Selling' },
      { value: 'priceLowest', label: 'Price (Lowest First)' },
      { value: 'priceHighest', label: 'Price (Highest First)' },
      { value: 'newArrivals', label: 'New Arrivals' },
      { value: 'highestDiscount', label: 'Highest Discount' },
      { value: 'inStock', label: 'Most in Stock' }
    ],
    categories: ['Data Science', 'Programming', 'Design', 'Business', 'Marketing', 'Development', 'Other'],
    showSort: true,
    showCategory: true,
    showLevel: false, // Products don't have levels
    showBrands: false,
    showPriceRange: false,
    showRating: false,
    buttonText: 'VIEW {count} PRODUCTS',
    sortLabel: 'SORT BY:',
    categoryLabel: 'CATEGORY'
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold text-gray-800 my-6 md:my-10 uppercase px-4">
          ALL PRODUCTS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-700">
              {loading ? 'LOADING...' : `${displayedProducts.length} PRODUCTS`}
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" disabled={loading || error} />
          </div>
          
          {/* RENDER LOADING AND ERROR STATES */}
          {loading && (
            <div className="text-center py-16 text-gray-600 text-lg">
              <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24"></svg>
              Loading products from database...
            </div>
          )}

          {error && (
            <div className="text-center py-16 text-red-600 text-lg">
              ⚠ Error: {error}
            </div>
          )}
          
          {/* RENDER PRODUCTS GRID */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {displayedProducts.map((product) => (
                // Use MongoDB's _id as the unique key
                <div key={product._id} className="h-full"> 
                  <Card 
                    data={product} 
                    config={productCardConfig}
                    onClick={() => handleCardClick(product._id)}
                    className="h-full flex flex-col"
                  >
                    <div className="mt-auto pt-4">
                      <ButtonA 
                        text='Buy' 
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEnrollClick(product);
                        }}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {displayedProducts.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No products found matching your criteria.</div>
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