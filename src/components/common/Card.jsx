import React from 'react';

const Card = ({ data, children, onClick, config = {} }) => {
  // Default configuration for different card types
  const defaultConfig = {
    showId: true,
    showTitle: true,
    showImage: true,
    showPrice: true,
    showStatus: true,
    idLabel: null, // null means show raw id, or custom label like "Course ID: "
    pricePrefix: '$',
    statusConfig: null, // { field1: 'students', field2: 'capacity', icon: '▲', color: 'green' }
    imageHeight: 'h-48',
    ...config
  };

  // Destructure common properties from the `data` prop
  const { 
    id, 
    title, 
    image, 
    price, 
    students, 
    capacity,
    // Additional flexible fields
    status,
    category,
    level,
    instructor,
    rating,
    duration,
    stock,
    brand,
    discount,
  } = data;

  // Helper function to render status information
  const renderStatus = () => {
    if (!defaultConfig.showStatus) return null;

    // Custom status configuration
    if (defaultConfig.statusConfig) {
      const { field1, field2, icon, color, label } = defaultConfig.statusConfig;
      const value1 = data[field1];
      const value2 = data[field2];
      
      if (value1 !== undefined && value2 !== undefined) {
        return (
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <span className={`text-${color}-600 mr-1`}>{icon}</span> 
            {label && <span className="mr-1">{label}:</span>}
            {value1}/{value2}
          </p>
        );
      }
    }

    // Default behavior for courses/live-lessons (students/capacity)
    if (students !== undefined && capacity !== undefined) {
      return (
        <p className="text-sm text-gray-600 mb-4 flex items-center">
          <span className="text-green-600 mr-1">&#9650;</span> {students}/{capacity}
        </p>
      );
    }

    // For products - show stock or status
    if (stock !== undefined) {
      return (
        <p className="text-sm text-gray-600 mb-4 flex items-center">
          <span className="text-blue-600 mr-1">📦</span> Stock: {stock}
        </p>
      );
    }

    // Generic status field
    if (status) {
      return (
        <p className="text-sm text-gray-600 mb-4">
          Status: {status}
        </p>
      );
    }

    return null;
  };

  // Helper function to render additional info badges
  const renderInfoBadges = () => {
    const badges = [];

    if (category) {
      badges.push(
        <span key="category" className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md mr-2 mb-2 inline-block">
          {category}
        </span>
      );
    }

    if (level) {
      badges.push(
        <span key="level" className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded-md mr-2 mb-2 inline-block">
          {level}
        </span>
      );
    }

    if (brand) {
      badges.push(
        <span key="brand" className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md mr-2 mb-2 inline-block">
          {brand}
        </span>
      );
    }

    return badges.length > 0 ? <div className="mb-2">{badges}</div> : null;
  };

  // Helper function to render rating
  const renderRating = () => {
    if (rating) {
      return (
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="text-sm text-gray-600">{rating}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      {defaultConfig.showImage && image && (
        <div className="relative">
          <img
            src={image}
            alt={title || "Item Image"}
            className={`w-full object-cover ${defaultConfig.imageHeight}`}
          />
          {discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
      )}
      
      <div className="p-5">
        {defaultConfig.showId && id && (
          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md mb-2 inline-block">
            {defaultConfig.idLabel ? `${defaultConfig.idLabel}${id}` : id}
          </span>
        )}

        {renderInfoBadges()}

        {defaultConfig.showTitle && title && (
          <h3 className="text-lg font-semibold text-gray-800 my-2">
            {title}
          </h3>
        )}

        {instructor && (
          <p className="text-sm text-gray-600 mb-2">
            by {instructor}
          </p>
        )}

        {duration && (
          <p className="text-sm text-gray-600 mb-2">
            Duration: {duration}
          </p>
        )}

        {renderRating()}

        {defaultConfig.showPrice && price !== undefined && (
          <p className="text-xl font-bold text-blue-600 mb-3">
            {defaultConfig.pricePrefix}{price}
          </p>
        )}

        {renderStatus()}

        {/* Render children (buttons, etc.) */}
        {children}
      </div>
    </div>
  );
};

export default Card;