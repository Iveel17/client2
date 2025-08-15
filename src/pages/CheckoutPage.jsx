import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart'; // Adjusted path to use alias
import Header from '@/components/layout/Header/Header'; // Adjusted path to use alias
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { totalPrice, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    firstName: '',
    lastName: '',
    country: 'Mongolia', // Default country
    postalCode: '',
  });
  const navigate = useNavigate();

  const paymentMethods = [
    { 
      id: 'credit_debit_card', 
      name: 'Credit/Debit Card', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mb-3 text-gray-700">
          <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3H4.5zM1.5 9.75a.75.75 0 00.75.75h19.5a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75H2.25a.75.75 0 00-.75.75v1.5z" />
          <path fillRule="evenodd" d="M7.5 6a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H7.5zm2.25 0a.75.75 0 000 1.5H9.758a.75.75 0 000-1.5H9.75z" clipRule="evenodd" />
        </svg>
      ) 
    },
    { 
      id: 'bank_transfer', 
      name: 'Bank Transfer', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 mb-3 text-gray-700">
          <path fillRule="evenodd" d="M8.25 6.75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V7.5a.75.75 0 01.75-.75zM15.75 6.75a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V7.5a.75.75 0 01.75-.75zM12 6a.75.75 0 00-.75.75v3.75a.75.75 0 001.5 0V6.75A.75.75 0 0012 6z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M12 2.25c-5.325 0-9.75 3.659-9.75 8.25 0 1.334.621 2.601 1.608 3.624-.008.3-.024.599-.04.898H3.984C4.731 15.532 5.562 16 6.45 16h11.1c.889 0 1.72-.468 2.466-1.102h-.056c-.017-.299-.033-.598-.041-.898 1.0-.99 1.638-2.257 1.638-3.624 0-4.591-4.425-8.25-9.75-8.25zM12 20.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
      ) 
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      console.error('Please select a payment method.');
      return;
    }

    if (selectedPaymentMethod === 'credit_debit_card') {
      // Basic validation for credit card fields
      const { cardNumber, expirationDate, cvv, firstName, lastName, country, postalCode } = cardDetails;
      if (!cardNumber || !expirationDate || !cvv || !firstName || !lastName || !country || !postalCode) {
        console.error('Please fill in all credit card details.');
        return;
      }
    }

    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    setIsProcessing(false);

    console.log(`Processing payment of $${totalPrice.toFixed(2)} with ${selectedPaymentMethod}`);
    if (selectedPaymentMethod === 'credit_debit_card') {
      console.log('Card Details:', cardDetails);
    }
    
    clearCart();
    navigate('/order-confirmation', { state: { total: totalPrice, paymentMethod: selectedPaymentMethod } });
  };

  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "Japan", "Mongolia", // Added Mongolia
    // Add more countries as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Order Summary */}
          <div className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex justify-between items-center text-2xl font-bold text-gray-900">
              <span>Total to Pay:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Payment Method</h2>
            <div className="flex flex-wrap justify-center gap-4"> {/* Changed to flex for better layout */}
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-lg shadow-md transition-all duration-200 w-full sm:w-auto flex-grow
                    ${selectedPaymentMethod === method.id 
                      ? 'border-blue-600 bg-blue-50 text-blue-800 ring-2 ring-blue-500' 
                      : 'border-gray-300 bg-white hover:border-blue-400 hover:shadow-lg'
                    }
                  `}
                >
                  {method.icon}
                  <span className="text-lg font-semibold">{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Credit/Debit Card Details Section */}
          {selectedPaymentMethod === 'credit_debit_card' && (
            <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Card Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card number*
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                  <div className="mt-2 flex space-x-2">
                    {/* Placeholder for card logos - replace with actual images or SVGs */}
                    <img src="https://placehold.co/40x25/ffffff/000?text=VISA" alt="Visa" className="h-6 w-auto border rounded" />
                    <img src="https://placehold.co/40x25/ffffff/000?text=MC" alt="Mastercard" className="h-6 w-auto border rounded" />
                    <img src="https://placehold.co/40x25/ffffff/000?text=AMEX" alt="American Express" className="h-6 w-auto border rounded" />
                  </div>
                </div>

                <div>
                  <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiration date*
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={cardDetails.expirationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="MM/YY"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV*
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="XXX"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={cardDetails.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={cardDetails.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={cardDetails.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal code*
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={cardDetails.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || totalPrice <= 0 || !selectedPaymentMethod || (selectedPaymentMethod === 'credit_debit_card' && (!cardDetails.cardNumber || !cardDetails.expirationDate || !cardDetails.cvv || !cardDetails.firstName || !cardDetails.lastName || !cardDetails.country || !cardDetails.postalCode))}
            className={`w-full px-8 py-4 rounded-lg shadow-xl text-white text-xl font-bold transition-colors duration-300
              ${isProcessing || totalPrice <= 0 || !selectedPaymentMethod || (selectedPaymentMethod === 'credit_debit_card' && (!cardDetails.cardNumber || !cardDetails.expirationDate || !cardDetails.cvv || !cardDetails.firstName || !cardDetails.lastName || !cardDetails.country || !cardDetails.postalCode))
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300'
              }
            `}
          >
            {isProcessing ? 'Processing Payment...' : 'Place Order'}
          </button>

          {totalPrice <= 0 && (
            <p className="text-center text-red-500 mt-4 text-lg">Your cart is empty. Please add items to proceed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;