import React, { useState, useEffect } from 'react';
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
import NotificationToast from '../NotificationToast'; // Adjust path based on your project structure
import { useCart } from '@/hooks/useCart'; // Adjust path based on your project structure

const ModalB = ({ isOpen, onClose, itemData, config = {} }) => {
  // Destructure addItemToCart from the useCart hook
  const { addItemToCart } = useCart();
  
  // State for controlling NotificationToast visibility
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });
  
  // State for quantity control
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setQuantity(1); // Reset to 1 when modal opens
    }
  }, [isOpen]);

  // If modal is not open or no data, render nothing
  if (!isOpen || !itemData) return null;

  // Default configuration
  const defaultConfig = {
    title: itemData.title || itemData.name,
    showImage: true,
    actionButtonText: 'Add to Cart',
    actionButtonColor: 'purple',
    onActionClick: null,
    imageHeight: 'h-48',
    minQuantity: 1,
    maxQuantity: itemData.stock,
    imagePath: 'product-cards/covers', // 👈 ADD THIS
    ...config
  };

  const {
    id,
    title,
    name,
    image,
    description,
    price,
    review,
    reviews,
    rating,
    stock
  } = itemData;

  const displayTitle = title || name;
  const displayReview = review || reviews || rating;

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || defaultConfig.minQuantity;
    if (value >= defaultConfig.minQuantity && value <= defaultConfig.maxQuantity) {
      setQuantity(value);
    }
  };

  // Enhanced close handler to reset quantity
  const handleClose = () => {
    setQuantity(1); // Reset quantity to 1
    onClose();
  };

  const handleActionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("[ModalB] Action button clicked.");

    if (defaultConfig.onActionClick) {
      console.log("[ModalB] Using custom onActionClick.");
      defaultConfig.onActionClick({ ...itemData, quantity });
    } else {
      console.log("[ModalB] Defaulting to addItemToCart.");
      const itemToAdd = {
        stock: itemData.stock,
        type: itemData.type,
        id: itemData.id,
        title: displayTitle,
        name: displayTitle,
        price: itemData.price,
        image: itemData.image,
        quantity: quantity,
      };
      console.log("[ModalB] Attempting to add item:", itemToAdd);
      addItemToCart(itemToAdd);
      
      // Show toast notification IMMEDIATELY
      setToast({
        isVisible: true,
        message: `${quantity} ${displayTitle}${quantity > 1 ? 's' : ''} added to cart!`,
        type: 'success'
      });
      
      console.log("[ModalB] Toast should be visible now");
    }

    // Close modal after a short delay to let user see the toast
    setTimeout(() => {
      handleClose(); // Use the enhanced close handler
    }, 500);
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        {/* Modal Content */}
        <div
          className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all shadow-lg text-xl font-bold"
          >
            ×
          </button>

          {/* Image */}
          {defaultConfig.showImage && (
            <div className={`relative ${defaultConfig.imageHeight} bg-gradient-to-br from-purple-800 to-blue-900 rounded-t-xl overflow-hidden`}>
              {image ? (
                <img
                  src={`${API_BASE}/${defaultConfig.imagePath}/${image}`}  // 👈 CHANGE THIS
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-6xl">🛍️</div>
                </div>
              )}
            </div>
          )}

          {/* Modal Body */}
          <div className="p-6">
            {/* Product ID */}
            {id && (
              <div className="text-xs text-gray-500 font-medium mb-2">
                ID: #{id}
              </div>
            )}

            {/* Product Name */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 leading-tight pr-8">
              {displayTitle}
            </h2>

            {/* Price */}
            {price !== undefined && (
              <div className="text-2xl font-bold text-purple-600 mb-4">
                ${price}
              </div>
            )}

            {/* Review/Rating */}
            {displayReview && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(displayReview) ? 'text-yellow-400' : 'text-gray-300'}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {displayReview} {typeof displayReview === 'number' ? `(${displayReview}/5)` : ''}
                </span>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Quantity Controls */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">

                {/* Quantity Input */}
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={defaultConfig.minQuantity}
                  max={defaultConfig.maxQuantity}
                  className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg font-semibold text-gray-800 focus:border-purple-400 focus:outline-none"
                />

                {/* Stock indicator */}
                {stock && (
                  <span className="text-xs text-gray-500 ml-2">
                    {stock} in stock
                  </span>
                )}
              </div>
            </div>

            {/* Total Price Display */}
            {price !== undefined && (
              <div className="flex justify-between items-center mb-6 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Total:</span>
                <span className="text-lg font-bold text-purple-600">
                  ${(price * quantity).toFixed(2)}
                </span>
              </div>
            )}

            {/* Action Button */}
            <button
              type="button"
              onClick={handleActionClick}
              className={`w-full ${
                defaultConfig.actionButtonColor === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                defaultConfig.actionButtonColor === 'green' ? 'bg-green-600 hover:bg-green-700' :
                defaultConfig.actionButtonColor === 'red' ? 'bg-red-600 hover:bg-red-700' :
                defaultConfig.actionButtonColor === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                'bg-purple-600 hover:bg-purple-700'
              } text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-sm md:text-base shadow-lg hover:shadow-xl transform hover:scale-[1.02]`}
            >
              {defaultConfig.actionButtonText}
            </button>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      <NotificationToast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
        type={toast.type}
        duration={3000}
      />
    </>
  );
};

export default ModalB;