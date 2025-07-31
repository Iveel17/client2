import React, { useState } from 'react';
import Card from '@/components/common/Card';
import Header from '@/components/layout/Header/Header';

import ButtonA from '@/components/common/buttons/ButtonA'; // Assuming you have a ButtonA component
import ButtonB from '@/components/common/buttons/ButtonB'; // Assuming you have a ButtonB component
import './CoursesPage.css'; // Keep this for custom styles (like the animation)

const coursesData = [
  {
    id: 1,
    title: 'Complete JavaScript Mastery',
    price: 89,
    students: 12,
    capacity: 27,
    image: 'https://via.placeholder.com/300x200?text=JavaScript+Course',
    category: 'Programming',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'Advanced React Development',
    price: 129,
    students: 21,
    capacity: 34,
    image: 'https://via.placeholder.com/300x200?text=React+Course',
    category: 'Programming',
    level: 'Advanced',
  },
  {
    id: 3,
    title: 'Digital Marketing Fundamentals',
    price: 69,
    students: 15,
    capacity: 18,
    image: 'https://via.placeholder.com/300x200?text=Digital+Marketing',
    category: 'Marketing',
    level: 'Beginner',
  },
  {
    id: 4,
    title: 'Data Science with Python',
    price: 150,
    students: 10,
    capacity: 25,
    image: 'https://via.placeholder.com/300x200?text=Data+Science',
    category: 'Data Science',
    level: 'Intermediate',
  },
  {
    id: 5,
    title: 'UI/UX Design Principles',
    price: 99,
    students: 8,
    capacity: 20,
    image: 'https://via.placeholder.com/300x200?text=UI/UX+Design',
    category: 'Design',
    level: 'Intermediate',
  },
];

const CoursesPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: 'bestSelling',
    category: [],
    level: [],
  });
  const [displayedCourses, setDisplayedCourses] = useState(coursesData);

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setFilters({ ...filters, sortBy: newSortBy });
    applyFilters({ ...filters, sortBy: newSortBy });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const updatedCategories = e.target.checked
      ? [...filters.category, category]
      : filters.category.filter((cat) => cat !== category);
    setFilters({ ...filters, category: updatedCategories });
    applyFilters({ ...filters, category: updatedCategories });
  };

  const handleLevelChange = (e) => {
    const level = e.target.value;
    const updatedLevels = e.target.checked
      ? [...filters.level, level]
      : filters.level.filter((lvl) => lvl !== level);
    setFilters({ ...filters, level: updatedLevels });
    applyFilters({ ...filters, level: updatedLevels });
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...coursesData];

    // Apply category filter
    if (currentFilters.category.length > 0) {
      filtered = filtered.filter((course) =>
        currentFilters.category.includes(course.category)
      );
    }

    // Apply level filter
    if (currentFilters.level.length > 0) {
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
        filtered.sort(() => Math.random() - 0.5);
        break;
      case 'bestSelling':
      default:
        filtered.sort((a, b) => b.students - a.students);
        break;
    }
    setDisplayedCourses(filtered);
  };

  const handleCardClick = (courseId) => {
    console.log(`Navigating to course details for ID: ${courseId}`);
    // In a real app, you'd use React Router:
    // navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Custom Header component - Blur it when modal is open */}
      <div className={isFilterModalOpen ? 'blur-sm' : ''}>
        <Header />
      </div>

      {/* Main content - Blur it when modal is open */}
      <div className={isFilterModalOpen ? 'blur-sm' : ''}>
        <h1 className="text-center text-4xl font-extrabold text-gray-800 my-10 uppercase">
          ALL LIVE LESSONS
        </h1>

        <div className="container mx-auto px-4 pb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="text-2xl font-bold text-gray-700">ALL LIVE LESSONS</div>
            <ButtonA onClick={toggleFilterModal} text="FILTER/SORT+" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedCourses.map((course) => (
              <Card key={course.id} data={course} onClick={() => handleCardClick(course.id)}>
                <ButtonA text='Enroll' className='w-2xl'/>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {isFilterModalOpen && (
        <>
          {/* Invisible overlay for closing modal when clicking outside */}
          <div
            className="fixed inset-0 z-30"
            onClick={toggleFilterModal}
          ></div>

          {/* Filter Modal Content - This is the sidebar itself */}
          <div
            className="fixed right-0 top-0 w-72 h-screen bg-white p-6 shadow-lg flex flex-col overflow-y-auto z-40 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5 border-b pb-3">
              <h3 className="text-2xl font-bold text-gray-800">FILTERS</h3>
              <button
                className="text-gray-500 hover:text-gray-700 text-3xl leading-none"
                onClick={toggleFilterModal}
              >
                &times;
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
                SORT BY:
              </h4>
              <div className="space-y-2">
                <label className="block text-gray-700 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value="bestSelling"
                    checked={filters.sortBy === 'bestSelling'}
                    onChange={handleSortChange}
                    className="mr-2 accent-blue-600"
                  />{' '}
                  Best Selling
                </label>
                <label className="block text-gray-700 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value="priceLowest"
                    checked={filters.sortBy === 'priceLowest'}
                    onChange={handleSortChange}
                    className="mr-2 accent-blue-600"
                  />{' '}
                  Price (Lowest First)
                </label>
                <label className="block text-gray-700 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value="priceHighest"
                    checked={filters.sortBy === 'priceHighest'}
                    onChange={handleSortChange}
                    className="mr-2 accent-blue-600"
                  />{' '}
                  Price (Highest First)
                </label>
                <label className="block text-gray-700 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value="newArrivals"
                    checked={filters.sortBy === 'newArrivals'}
                    onChange={handleSortChange}
                    className="mr-2 accent-blue-600"
                  />{' '}
                  New Arrivals
                </label>
                <label className="block text-gray-700 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value="highestRated"
                    checked={filters.sortBy === 'highestRated'}
                    onChange={handleSortChange}
                    className="mr-2 accent-blue-600"
                  />{' '}
                  Highest Rated
                </label>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
                CATEGORY
              </h4>
              <div className="space-y-2">
                {['Programming', 'Marketing', 'Data Science', 'Design'].map((cat) => (
                  <label key={cat} className="block text-gray-700 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={cat}
                      checked={filters.category.includes(cat)}
                      onChange={handleCategoryChange}
                      className="mr-2 accent-blue-600"
                    />{' '}
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-gray-600 text-sm uppercase font-semibold mb-3 border-b pb-2">
                LEVEL
              </h4>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <label key={lvl} className="block text-gray-700 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={lvl}
                      checked={filters.level.includes(lvl)}
                      onChange={handleLevelChange}
                      className="mr-2 accent-blue-600"
                    />{' '}
                    {lvl}
                  </label>
                ))}
              </div>
            </div>

            <ButtonB
              onClick={() => {
                applyFilters(filters);
                toggleFilterModal(); // Close modal after applying
              }}
              text={`VIEW ${displayedCourses.length} PRODUCTS`}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesPage;