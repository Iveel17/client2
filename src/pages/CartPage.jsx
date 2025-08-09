import React from 'react';
import { useCart } from '@/hooks/useCart'; // Adjust path as needed
import Header from '@/components/layout/Header/Header'

const CartPage = () => {
  // Destructure cart state and functions from the useCart hook
  const {
    cartItems,
    totalItems,
    totalPrice,
    loading,
    error,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
  } = useCart();

  // Display loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading cart...</div>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  // Display empty cart message
  if (cartItems.length === 0) {
    return (
        <div>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-2xl font-bold text-gray-800 p-8 bg-white rounded-lg shadow-md">
                Your cart is empty. Start adding some amazing courses!
            </div>
      </div>
            
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Items in Cart</h2>
          {cartItems.map((item) => (
            <div
              key={item.id} // Using id instead of courseId
              className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
            >
              {/* Item Image and Details */}
              <div className="flex items-center flex-grow mb-4 sm:mb-0">
                {/* Placeholder Image - replace with actual item image if available */}
                <img
                  src={item.image || `https://placehold.co/80x80/E0F2F7/000?text=Item`}
                  alt={item.title || "Cart Item"}
                  className="w-20 h-20 object-cover rounded-lg mr-4 shadow-sm"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/E0F2F7/000?text=Item`; }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title || item.name || 'Unknown Item'}</h3>
                  <p className="text-sm text-gray-600">Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
                  <p className="text-xs text-gray-500">ID: {item.id}</p>
                  {/* Debug: Show item type and more details */}
                  <p className="text-xs text-blue-500">Type: "{item.type || 'undefined'}"</p>
                  <p className="text-xs text-green-500">Raw item: {JSON.stringify({type: item.type, id: item.id})}</p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center space-x-4">
                {/* Debug logging */}
                {console.log(`Item ${item.id}: type="${item.type}", comparison result:`, item.type === "product")}
                {item.type === "product" ? (
                  // For products: Show editable quantity with increment/decrement
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                      <input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          updateItemQuantity(item.id, Math.max(1, newQuantity));
                        }}
                        className="w-16 p-2 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                      aria-label={`Remove ${item.title || 'item'} from cart`}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  // For non-products (courses, live-lessons): Fixed quantity of 1
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Qty:</span>
                      <input
                        type="number"
                        value="1"
                        readOnly
                        className="w-16 p-2 border border-gray-300 rounded-md text-center bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
                      aria-label={`Remove ${item.title || 'item'} from cart`}
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-lg text-gray-700">
              <span>Total Items:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="w-full px-6 py-3 mb-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 text-lg font-semibold"
          >
            Clear Cart
          </button>
          <button
            // In a real app, this would navigate to a checkout page
            onClick={() => console.log("Proceed to Checkout")}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200 text-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;