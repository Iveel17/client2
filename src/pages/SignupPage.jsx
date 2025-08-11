import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';
import { useAuth } from '@/hooks/useAuth'; // Updated import

// Reusable InputGroup Component with error display
const InputGroup = ({ label, type, placeholder, id, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Client-side validation
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must agree to the terms and conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Prepare data for backend (convert termsAgreed to string as expected)
      const signupData = {
        ...formData,
        termsAgreed: formData.termsAgreed ? 'true' : 'false'
      };

      const result = await signup(signupData);
      
      if (result.success) {
        navigate('/'); // Redirect to homepage as requested
      } else {
        setErrors(result.errors || { general: 'Signup failed' });
      }
    } catch {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-6 lg:p-8 w-full min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Join Our Community</h1>
            <p className="text-gray-600 text-lg">Create your account</p>
          </div>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {errors.general}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Row - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup 
                label="First Name" 
                type="text" 
                placeholder="John" 
                id="firstName"
                value={formData.firstName}
                onChange={(value) => handleInputChange('firstName', value)}
                error={errors.firstName}
              />
              <InputGroup 
                label="Last Name" 
                type="text" 
                placeholder="Doe" 
                id="lastName"
                value={formData.lastName}
                onChange={(value) => handleInputChange('lastName', value)}
                error={errors.lastName}
              />
            </div>
            
            <InputGroup 
              label="Email Address" 
              type="email" 
              placeholder="john@example.com" 
              id="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              error={errors.email}
            />
            
            <InputGroup 
              label="Password" 
              type="password" 
              placeholder="Create a strong password" 
              id="password"
              value={formData.password}
              onChange={(value) => handleInputChange('password', value)}
              error={errors.password}
            />
            
            <InputGroup 
              label="Confirm Password" 
              type="password" 
              placeholder="Confirm your password" 
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(value) => handleInputChange('confirmPassword', value)}
              error={errors.confirmPassword}
            />
            
            {/* Terms and Conditions Checkbox */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-sm">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={formData.termsAgreed}
                  onChange={(e) => handleInputChange('termsAgreed', e.target.checked)}
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
              {errors.termsAgreed && <div className="text-red-500 text-sm">{errors.termsAgreed}</div>}
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform shadow-lg ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
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