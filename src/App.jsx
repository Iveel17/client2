import React, { Suspense, lazy } from 'react'
import HomePage from './pages/HomePage/HomePage'
const CoursesPage = lazy(() => import("./pages/CoursesPage/CoursesPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage/ProductsPage"));
const LiveLessonsPage = lazy(() => import("./pages/LiveLessonsPage/LiveLessonsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

import ErrorBoundary from './pages/ErrorBoundary'
import NotificationPage from './pages/NotificationPage'
import PlusPage from './pages/PlusPage';
import CheckoutPage from './pages/CheckoutPage' // Adjusted path
import CartPage from './pages/CartPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'

import { 
  ProtectedRoute, 
  RoleBasedRoute, 
  GuestOnlyRoute, 
  ConditionalRoute 
} from '@/components/uploads/ProtectedRoute'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Guest-Only Routes - Only for unauthenticated users */}
            <Route path="/login" element={
              <GuestOnlyRoute redirectTo="/">
                <LoginPage />
              </GuestOnlyRoute>
            } />

            <Route path="/signup" element={
              <GuestOnlyRoute redirectTo="/">
                <SignupPage />
              </GuestOnlyRoute>
            } />

            <Route path="/signup" element={<SignupPage />} />
            {/* Public Content Routes - Available to all, but may show different content */}
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/live-lessons" element={<LiveLessonsPage />} />

            {/* Protected Routes - Only for authenticated users */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            
            <Route path="/notification" element={
              <ProtectedRoute>
                <NotificationPage />
              </ProtectedRoute>
            } />
            
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />

            {/* Teacher Routes */}
            <Route path="/plus" element={
              <RoleBasedRoute requiredRole="teacher">
                <PlusPage />
              </RoleBasedRoute>
            } />
            <Route path="/error-boundary" element={
              <ErrorBoundary>
                <div>Test Error Boundary</div>
              </ErrorBoundary>
            } />

            {/* 404 Route - Should be last */}
            <Route path="*" element={
              <div className="text-center py-8">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
      </Suspense>
    </Router>
  )
}

export default App

