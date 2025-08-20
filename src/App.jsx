import React, { Suspense, lazy } from 'react'
import HomePage from './pages/HomePage/HomePage'
const CoursesPage = lazy(() => import("./pages/CoursesPage/CoursesPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage/ProductsPage"));
const LiveLessonsPage = lazy(() => import("./pages/LiveLessonsPage/LiveLessonsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

import ErrorBoundary from './pages/ErrorBoundary'

import NotificationPage from './pages/NotificationPage'
import CheckoutPage from './pages/CheckoutPage' // Adjusted path
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/error-boundary" element={
              <ErrorBoundary>
                <div>Test Error Boundary</div>
              </ErrorBoundary>
            } />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/live-lessons" element={<LiveLessonsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
      </Suspense>
    </Router>
  )
}

export default App
