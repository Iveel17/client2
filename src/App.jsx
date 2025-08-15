import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import CoursesPage from './pages/CoursesPage/CoursesPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import LiveLessonsPage from './pages/LiveLessonsPage/LiveLessonsPage'

import NotificationPage from './pages/NotificationPage'
import CheckoutPage from './pages/CheckoutPage' // Adjusted path
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
  )
}

export default App
