import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';
import ModalA from '@/components/common/modals/ModalA';
import FilterModal from '@/components/common/modals/FilterModal';
import ButtonA from '@/components/common/buttons/ButtonA';

import live_lessonsData from '@/data/liveLessons.json'; // Adjust path as needed

const LiveLessonsPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedLiveLesson, setSelectedLiveLesson] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
    level: [],
  });
  const [displayedLiveLessons, setDisplayedLiveLessons] = useState(live_lessonsData);

  // Card configuration for live_lessons - Made more flexible
  const live_lessonCardConfig = {
    showId: true,
    showTitle: true,
    showImage: true,
    showPrice: true,
    showStatus: true,
    pricePrefix: '$',
    imageHeight: 'h-48',
    // Ensure cards have consistent height
    cardHeight: 'min-h-[400px]',
    // Add some responsive classes
    className: 'flex flex-col h-full'
  };

  // Enhanced modal configuration for live_lessons
  const enrollModalConfig = {
    title: 'LiveLesson Details',
    actionButtonText: 'Enroll Now',
    actionButtonColor: 'green',
    showImage: true,
    showDescription: true,
    showPrice: true,
    pricePrefix: '$',
    imageHeight: 'h-56'
  };

  // Filter modal configuration for live_lessons
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
    showSort: true,
    showCategory: true,
    showLevel: true,
    showBrands: false,
    showPriceRange: false,
    showRating: false,
    buttonText: 'VIEW {count} LIVE LESSONS',
    sortLabel: 'SORT BY:',
    categoryLabel: 'CATEGORY',
    levelLabel: 'LEVEL'
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleEnrollClick = (live_lesson) => {
    setSelectedLiveLesson(live_lesson);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedLiveLesson(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...live_lessonsData];

    // Apply category filter
    if (currentFilters.category && currentFilters.category.length > 0) {
      filtered = filtered.filter((live_lesson) =>
        currentFilters.category.includes(live_lesson.category)
      );
    }

    // Apply level filter
    if (currentFilters.level && currentFilters.level.length > 0) {
      filtered = filtered.filter((live_lesson) =>
        currentFilters.level.includes(live_lesson.level)
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
    
    setDisplayedLiveLessons(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    toggleFilterModal();
  };

  const handleCardClick = (live_lessonId) => {
    console.log(`Navigating to live_lesson details for ID: ${live_lessonId}`);
    // In a real app, you'd use React Router:
    // navigate(`/live_lessons/${live_lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Main content - Remove blur effect from here since modal handles backdrop */}
      <main className="flex-grow">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold text-gray-800 my-6 md:my-10 uppercase px-4">
          ALL LIVE LESSONS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          {/* Header with responsive text */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="text-xl md:text-2xl font-bold text-gray-700">
              {displayedLiveLessons.length} LIVE LESSONS
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" />
          </div>

          {/* Responsive grid with better breakpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {displayedLiveLessons.map((live_lesson) => (
              <div key={live_lesson.id} className="h-full">
                <Card 
                  data={live_lesson} 
                  config={live_lessonCardConfig}
                  onClick={() => handleCardClick(live_lesson.id)}
                  className="h-full flex flex-col"
                >
                  {/* Always show enroll button - positioned at bottom */}
                  <div className="mt-auto pt-4">
                    <ButtonA 
                      text='Enroll' 
                      className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors'
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEnrollClick(live_lesson);
                      }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* No results message */}
          {displayedLiveLessons.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No live_lessons found</div>
              <div className="text-gray-400">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </main>

      {/* Enroll Modal with custom config */}
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