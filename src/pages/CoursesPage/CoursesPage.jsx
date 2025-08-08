import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';
import ModalA from '@/components/common/modals/ModalA';
import FilterModal from '@/components/common/modals/FilterModal';
import ButtonA from '@/components/common/buttons/ButtonA';

import coursesData from '@/data/courses.json'; // Adjust path as needed

const CoursesPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
    level: [],
  });
  const [displayedCourses, setDisplayedCourses] = useState(coursesData);

  // Card configuration for courses - Made more flexible
  const courseCardConfig = {
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

  // Enhanced modal configuration for courses
  const enrollModalConfig = {
    title: 'Course Details',
    actionButtonText: 'Enroll Now',
    actionButtonColor: 'green',
    showImage: true,
    showDescription: true,
    showPrice: true,
    pricePrefix: '$',
    imageHeight: 'h-56'
  };

  // Filter modal configuration for courses
  const filterModalConfig = {
    title: 'COURSE FILTERS',
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
    buttonText: 'VIEW {count} COURSES',
    sortLabel: 'SORT BY:',
    categoryLabel: 'CATEGORY',
    levelLabel: 'LEVEL'
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setIsEnrollModalOpen(true);
  };

  const closeEnrollModal = () => {
    setIsEnrollModalOpen(false);
    setSelectedCourse(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...coursesData];

    // Apply category filter
    if (currentFilters.category && currentFilters.category.length > 0) {
      filtered = filtered.filter((course) =>
        currentFilters.category.includes(course.category)
      );
    }

    // Apply level filter
    if (currentFilters.level && currentFilters.level.length > 0) {
      filtered = filtered.filter((course) =>
        currentFilters.level.includes(course.level)
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
    
    setDisplayedCourses(filtered);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    toggleFilterModal();
  };

  const handleCardClick = (courseId) => {
    console.log(`Navigating to course details for ID: ${courseId}`);
    // In a real app, you'd use React Router:
    // navigate(`/courses/${courseId}`);
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
              {displayedCourses.length} LIVE LESSONS
            </div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" />
          </div>

          {/* Responsive grid with better breakpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {displayedCourses.map((course) => (
              <div key={course.id} className="h-full">
                <Card 
                  data={course} 
                  config={courseCardConfig}
                  onClick={() => handleCardClick(course.id)}
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
                        handleEnrollClick(course);
                      }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* No results message */}
          {displayedCourses.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-500 text-xl mb-4">No courses found</div>
              <div className="text-gray-400">Try adjusting your filters</div>
            </div>
          )}
        </div>
      </main>

      {/* Enroll Modal with custom config */}
      <ModalA 
        isOpen={isEnrollModalOpen}
        onClose={closeEnrollModal}
        itemData={selectedCourse}
        config={enrollModalConfig}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={toggleFilterModal}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
        resultCount={displayedCourses.length}
        config={filterModalConfig}
      />
    </div>
  );
};

export default CoursesPage;