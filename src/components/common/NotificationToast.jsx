import React, { useEffect } from 'react';

const NotificationToast = ({ message, isVisible, onClose, type = 'success', duration = 3000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    const baseStyles = "fixed bottom-4 right-4 z-[9999] max-w-sm p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out";
    const visibilityStyles = isVisible 
      ? "translate-y-0 opacity-100 scale-100" 
      : "translate-y-2 opacity-0 scale-95";
    
    switch (type) {
      case 'success':
        return `${baseStyles} ${visibilityStyles} bg-green-500 text-white`;
      case 'error':
        return `${baseStyles} ${visibilityStyles} bg-red-500 text-white`;
      case 'warning':
        return `${baseStyles} ${visibilityStyles} bg-yellow-500 text-white`;
      case 'info':
        return `${baseStyles} ${visibilityStyles} bg-blue-500 text-white`;
      default:
        return `${baseStyles} ${visibilityStyles} bg-gray-800 text-white`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-lg">{getIcon()}</span>
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Close notification"
        >
          <span className="text-xl">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationToast;