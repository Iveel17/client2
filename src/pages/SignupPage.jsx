import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header/Header'; // Assuming Header component is available

// Reusable InputGroup Component (copied from LoginPage.jsx for self-containment)
const InputGroup = ({ label, type, placeholder, id }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
      />
    </div>
  );
};

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header /> {/* Header component for full-width top navigation */}
      
      {/* Content area with blue gradient background, stretching horizontally */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-6 lg:p-8 w-full min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Join Our Community</h1>
            <p className="text-gray-600 text-lg">Create your account</p>
          </div>

          <form className="space-y-6">
            {/* Name Row - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup 
                label="First Name" 
                type="text" 
                placeholder="John" 
                id="firstName" 
              />
              <InputGroup 
                label="Last Name" 
                type="text" 
                placeholder="Doe" 
                id="lastName" 
              />
            </div>
            
            <InputGroup 
              label="Email Address" 
              type="email" 
              placeholder="john@example.com" 
              id="email" 
            />
            
            <InputGroup 
              label="Password" 
              type="password" 
              placeholder="Create a strong password" 
              id="password" 
            />
            
            <InputGroup 
              label="Confirm Password" 
              type="password" 
              placeholder="Confirm your password" 
              id="confirmPassword" 
            />
            
            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2 text-sm">
              <input 
                type="checkbox" 
                id="terms" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1" 
              />
              <label htmlFor="terms" className="text-gray-700 leading-snug">
                I agree to the{' '}
                <button type="button" className="font-medium text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="font-medium text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                  Privacy Policy
                </button>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link to='/login' className="font-semibold text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;