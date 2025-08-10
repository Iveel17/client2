import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header/Header'; 
import { loginUser } from '@/services/authService'; // Step 2 connection

// Reusable InputGroup Component
const InputGroup = ({ label, type, placeholder, id, value, onChange }) => {
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
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
      />
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  
  // Step 1: State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password); // Calls backend
      localStorage.setItem('token', data.token); // Store JWT
      alert('Login successful!');
      navigate('/courses'); // Redirect after login (change path as needed)
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full"> 
      <Header />
      
      <div className="max-w-8xl flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-2 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8 w-full min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 transform transition-all duration-300 hover:scale-[1.01]">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-lg">Sign in to your tutor account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <InputGroup 
              label="Email Address" 
              type="email" 
              placeholder="Enter your email" 
              id="email" 
              value={email}
              onChange={setEmail}
            />
            <InputGroup 
              label="Password" 
              type="password" 
              placeholder="Enter your password" 
              id="password" 
              value={password}
              onChange={setPassword}
            />

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                />
                <label htmlFor="rememberMe" className="ml-2 text-gray-700">Remember me</label>
              </div>
              <button type="button" className="font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to='/signup' className="font-semibold text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
