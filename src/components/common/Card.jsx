import React from 'react';

// This interface defines the expected structure of data that the Card component can display.
// You can adjust these properties to be as generic or specific as needed.
// For example, 'id', 'title', 'price', 'image' are common across many types of cards.
// 'details' can be a flexible array or object to hold varying information.
const Card = ({ data, children, onClick }) => {
  // Destructure common properties from the `data` prop
  const { id, title, image, price, students, capacity } = data;

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:-translate-y-1 cursor-pointer"
      onClick={onClick} // Allow clicking the whole card if needed
    >
      {image && (
        <img
          src={image}
          alt={title || "Item Image"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        {id && (
          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md mb-2 inline-block">
            {id}
          </span>
        )}
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 my-2">
            {title}
          </h3>
        )}
        {price !== undefined && ( // Check for undefined to allow 0 or null if applicable
          <p className="text-xl font-bold text-blue-600 mb-3">${price}</p>
        )}

        {/* Example of conditional rendering for specific data types */}
        {students !== undefined && capacity !== undefined && (
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <span className="text-green-600 mr-1">&#9650;</span> {students}/{capacity}
          </p>
        )}

        {/*
          The `children` prop is a powerful way to make components more flexible.
          Whatever JSX you pass between the opening and closing tags of <Card>
          will be rendered here. This is great for custom buttons, additional text,
          or unique elements for each card type.
        */}
        {children}

        {/* You might keep a generic button or let `children` handle it */}
        {/* <button className="bg-green-600 text-white py-2 px-4 rounded-md font-bold w-full transition-colors duration-300 hover:bg-green-700">
          View Details
        </button> */}
      </div>
    </div>
  );
};

export default Card;