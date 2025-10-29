import React, { useState, useEffect, useCallback } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';
import ModalA from '@/components/common/modals/ModalA';
import FilterModal from '@/components/common/modals/FilterModal';
import ButtonA from '@/components/common/buttons/ButtonA';

// Removed: import live_lessonsData from '@/data/liveLessons.json'; 
const API_URL = 'http://localhost:5000/api/live-lessons';

const LiveLessonsPage = () => {
  // State for raw data fetched from the API
  const [liveLessons, setLiveLessons] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // State for UI and filtering
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedLiveLesson, setSelectedLiveLesson] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
    level: [],
  });
  const [displayedLiveLessons, setDisplayedLiveLessons] = useState([]); 

  // =========================================================================
  // 1. STABLE FILTER FUNCTION (useCallback)
  // =========================================================================
  // Function to apply filters/sorting, made stable with useCallback
  const applyFilters = useCallback((currentFilters) => {
    // Use the raw fetched data as the source of truth
    let filtered = [...liveLessons]; 

    // Apply category filter
    if (currentFilters.category && currentFilters.category.length > 0) {
      filtered = filtered.filter((liveLesson) =>
        currentFilters.category.includes(liveLesson.category)
      );
    }

    // Apply level filter
    if (currentFilters.level && currentFilters.level.length > 0) {
      filtered = filtered.filter((liveLesson) =>
        currentFilters.level.includes(liveLesson.level)
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
      case 'highestRated':
        // Assuming your live lesson data has a 'rating' field
        filtered.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
        break;
      case 'bestSelling':
      default:
        // Assuming your live lesson data has a 'students' or 'sales' field
        filtered.sort((a, b) => (b.students || 0) - (a.students || 0));
        break;
    }
    
    setDisplayedLiveLessons(filtered);
  }, [liveLessons]); // Dependency: Recreate this function only when the raw 'liveLessons' data changes

  // =========================================================================
  // 2. EFFECT HOOK TO FETCH DATA (Runs once on mount)
  // =========================================================================
  useEffect(() => {
    const fetchLiveLessons = async () => {
      try {
        const response = await fetch(API_URL); 
        
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store raw data and initialize displayed data
        setLiveLessons(data); 
        // setDisplayedLiveLessons(data); // Initial filtering is now handled by the next useEffect
        setError(null);

      } catch (err) {
        console.error("Failed to fetch live lessons:", err);
        setError("Failed to load live lessons. Please check the server connection.");
        setLiveLessons([]); 
        setDisplayedLiveLessons([]);
      } finally {
        setLoading(false); 
      }
    };

    fetchLiveLessons();
  }, []); // Runs once on mount

  // =========================================================================
  // 3. EFFECT HOOK TO APPLY FILTERS (Runs on data or filter change)
  // =========================================================================
  useEffect(() => {
    if (!loading && !error && liveLessons.length > 0) {
      applyFilters(filters);
    }
  // Dependencies included: applyFilters (stable function), and filters (state object)
  }, [applyFilters, filters, loading, error, liveLessons]);
  
  // =========================================================================
  // 4. HANDLERS AND CONFIGS (Rest of the component logic)
  // =========================================================================

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleEnrollClick = (liveLesson) => {
    setSelectedLiveLesson(liveLesson);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedLiveLesson(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // applyFilters is already run by the useEffect above
    toggleFilterModal();
  };

  const handleCardClick = (liveLessonId) => {
    console.log(`Navigating to live lesson details for ID: ${liveLessonId}`);
    // navigate(`/live-lessons/${liveLessonId}`);
  };
  
  // Card configuration 
  const liveLessonCardConfig = {
    showId: true, showTitle: true, showImage: true, showPrice: true, 
    showStatus: true, pricePrefix: '$', imageHeight: 'h-48',
    cardHeight: 'min-h-[400px]', className: 'flex flex-col h-full'
  };

  // Enhanced modal configuration
  const enrollModalConfig = {
    title: 'Live Lesson Details', actionButtonText: 'Add to Cart', actionButtonColor: 'green',
    showImage: true, showDescription: true, showPrice: true, pricePrefix: '$', imageHeight: 'h-56'
  };

  // Filter modal configuration
  const filterModalConfig = {
    title: 'LIVE LESSON FILTERS',
    sortOptions: [
      { value: 'bestSelling', label: 'Best Selling' },
      { value: 'priceLowest', label: 'Price (Lowest First)' },
      { value: 'priceHighest', label: 'Price (Highest First)' },
      { value: 'newArrivals', label: 'New Arrivals' },
      { value: 'highestRated', label: 'Highest Rated' }
    ],
    categories: ['Programming', 'Marketing', 'Data Science', 'Design'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    showSort: true, showCategory: true, showLevel: true, showBrands: false,
    showPriceRange: false, showRating: false, buttonText: 'VIEW {count} LIVE LESSONS',
    sortLabel: 'SORT BY:', categoryLabel: 'CATEGORY', levelLabel: 'LEVEL'
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold text-gray-800 my-6 md:my-10 uppercase px-4">
          ALL LIVE LESSONS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-700">
              {loading ? 'LOADING...' : `${displayedLiveLessons.length} LIVE LESSONS`}
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" disabled={loading || error} />
          </div>
          
          {/* RENDER LOADING AND ERROR STATES */}
          {loading && (
            <div className="text-center py-16 text-gray-600 text-lg">
              <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24"></svg>
              Loading live lessons from database...
            </div>
          )}

          {error && (
            <div className="text-center py-16 text-red-600 text-lg">
              ⚠ Error: {error}
            </div>
          )}
          
          {/* RENDER LIVE LESSONS GRID */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {displayedLiveLessons.map((liveLesson) => (
                // Use MongoDB's _id as the unique key
                <div key={liveLesson._id} className="h-full"> 
                  <Card 
                    data={liveLesson} 
                    config={liveLessonCardConfig}
                    onClick={() => handleCardClick(liveLesson._id)}
                    className="h-full flex flex-col"
                  >
                    <div className="mt-auto pt-4">
                      <ButtonA 
                        text='Enroll' 
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors'
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEnrollClick(liveLesson);
                        }}
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* No results message */}
          {displayedLiveLessons.length === 0 && !loading && !error && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No live lessons found matching your criteria.</div>
              <div className="text-gray-400">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </main>

      {/* Enroll Modal */}
      <ModalA 
        isOpen={isEnrollModalOpen}
        onClose={closeEnrollModal}
        itemData={selectedLiveLesson}
        config={enrollModalConfig}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={toggleFilterModal}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        resultCount={displayedLiveLessons.length}
        config={filterModalConfig}
      />
    </div>
  );
};

export default LiveLessonsPage;