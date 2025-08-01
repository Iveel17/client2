import React from 'react';

const ModalA = ({ isOpen, onClose, itemData, config = {} }) => {
  if (!isOpen || !itemData) return null;

  // Default configuration for different modal types
  const defaultConfig = {
    title: itemData.title,
    subtitle: null, // e.g., "Course #2" or "Product ID: P001"
    showImage: true,
    showDescription: true,
    showPrice: true,
    pricePrefix: '$',
    actionButtonText: 'Buy',
    actionButtonColor: 'blue',
    onActionClick: null,
    imageHeight: 'h-48',
    details: [], // Array of detail objects: [{ icon: '📊', label: 'Level', value: 'Advanced' }]
    ...config
  };

  // Extract common properties
  const { 
    id,
    title, 
    image, 
    description, 
    price, 
    level,
    instructor,
    category,
    brand,
    rating,
    duration,
    stock,
    students,
    capacity,
  } = itemData;

  // Generate subtitle
  const getSubtitle = () => {
    if (defaultConfig.subtitle) return defaultConfig.subtitle;
    if (id) return `#${id} ${title}`;
    return title;
  };

  // Generate default details based on available data
  const generateDetails = () => {
    if (defaultConfig.details.length > 0) {
      return defaultConfig.details;
    }

    const details = [];

    // Add level (for courses/lessons)
    if (level) {
      details.push({
        icon: '📊',
        label: 'Level',
        value: level,
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-600'
      });
    }

    // Add category
    if (category) {
      details.push({
        icon: '🏷️',
        label: 'Category',
        value: category,
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-600'
      });
    }

    // Add price
    if (price !== undefined) {
      details.push({
        icon: '💰',
        label: 'Price',
        value: `${defaultConfig.pricePrefix}${price}`,
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-600'
      });
    }

    // Add instructor (for courses/lessons)
    if (instructor) {
      details.push({
        icon: '👨‍🏫',
        label: 'Instructor',
        value: instructor,
        bgColor: 'bg-green-100',
        textColor: 'text-green-600'
      });
    }

    // Add brand (for products)
    if (brand) {
      details.push({
        icon: '🏢',
        label: 'Brand',
        value: brand,
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600'
      });
    }

    // Add rating
    if (rating) {
      details.push({
        icon: '⭐',
        label: 'Rating',
        value: rating,
        bgColor: 'bg-yellow-100',
        textColor: 'text-yellow-600'
      });
    }

    // Add duration (for courses/lessons)
    if (duration) {
      details.push({
        icon: '⏱️',
        label: 'Duration',
        value: duration,
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-600'
      });
    }

    // Add stock (for products)
    if (stock !== undefined) {
      details.push({
        icon: '📦',
        label: 'Stock',
        value: stock,
        bgColor: 'bg-teal-100',
        textColor: 'text-teal-600'
      });
    }

    // Add enrollment info (for courses/lessons)
    if (students !== undefined && capacity !== undefined) {
      details.push({
        icon: '👥',
        label: 'Enrolled',
        value: `${students}/${capacity}`,
        bgColor: 'bg-emerald-100',
        textColor: 'text-emerald-600'
      });
    }

    return details;
  };

  const handleActionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (defaultConfig.onActionClick) {
      defaultConfig.onActionClick(itemData);
    } else {
      console.log(`${defaultConfig.actionButtonText} clicked for:`, itemData.id);
    }
  };

  const details = generateDetails();

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal Content */}
        <div 
          className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all"
          >
            ×
          </button>

          {/* Image */}
          {defaultConfig.showImage && (
            <div className={`relative ${defaultConfig.imageHeight} bg-gradient-to-br from-gray-800 to-gray-900`}>
              {image ? (
                <img 
                  src={image} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-6xl">
                    {category === 'Programming' ? '⚛️' : 
                     category === 'Design' ? '🎨' : 
                     category === 'Marketing' ? '📈' : 
                     category === 'Data Science' ? '📊' : '📚'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
              {getSubtitle()}
            </h2>

            {/* Description */}
            {defaultConfig.showDescription && description && (
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Details */}
            {details.length > 0 && (
              <div className="space-y-4 mb-6">
                {details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 ${detail.bgColor} rounded flex items-center justify-center`}>
                      <span className={`${detail.textColor} text-xs`}>{detail.icon}</span>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">
                      {detail.label}: {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Button */}
            <button 
              type="button"
              onClick={handleActionClick}
              className={`w-full bg-${defaultConfig.actionButtonColor}-600 hover:bg-${defaultConfig.actionButtonColor}-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm`}
            >
              {defaultConfig.actionButtonText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalA;