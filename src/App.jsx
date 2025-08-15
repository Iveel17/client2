import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import CoursesPage from './pages/CoursesPage/CoursesPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import LiveLessonsPage from './pages/LiveLessonsPage/LiveLessonsPage'

import NotificationPage from './pages/NotificationPage'
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProtectedRoute from '@/components/ProtectedRoute';
import Dashboard from '@/pages/Dashboard';
import './App.css'

function App() {

  return (
    <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/live-lessons" element={<LiveLessonsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            {/* Protected route for Dashboard */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            {/* Add more routes as needed */}
          </Routes>
        </Router>
  )
}

export default App
