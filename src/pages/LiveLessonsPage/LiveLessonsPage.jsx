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

  // Card configuration for live_lessons
  const live_lessonCardConfig = {
    showId: true,
    showTitle: true,
    showImage: true,
    showPrice: true,
    showStatus: true,
    pricePrefix: '$',
    imageHeight: 'h-48'
  };

  // Modal configuration for live_lessons
  const live_lessonModalConfig = {
    actionButtonText: 'Enroll Now',
    actionButtonColor: 'blue',
    pricePrefix: '$',
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

      {/* Main content with conditional blur */}
      <main className={`flex-grow ${isFilterModalOpen ? 'blur-sm' : ''}`}>
        <h1 className="text-center text-4xl font-extrabold text-gray-800 my-10 uppercase">
          ALL LIVE LESSONS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-gray-700">
              {displayedLiveLessons.length} LIVE LESSONS
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedLiveLessons.map((live_lesson) => (
              <Card 
                key={live_lesson.id} 
                data={live_lesson} 
                config={live_lessonCardConfig}
                onClick={() => handleCardClick(live_lesson.id)}
              >
                <ButtonA 
                  text='Enroll' 
                  className='w-full'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEnrollClick(live_lesson);
                  }}
                />
              </Card>
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

      {/* Enroll Modal */}
      <ModalA 
        isOpen={isEnrollModalOpen}
        onClose={closeEnrollModal}
        itemData={selectedLiveLesson}
        config={live_lessonModalConfig}
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