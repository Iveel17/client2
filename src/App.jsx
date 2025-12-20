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

import CourseCardUpload from './components/uploads/courseCardUpload';
import LiveLessonCardUpload from './components/uploads/LiveLessonCardUpload';
import ProductCardUpload from './components/uploads/ProductCardUpload';
import CourseContentUpload from './components/uploads/CourseContentUpload';
import TopicUpload from './components/uploads/TopicUpload';
import CourseChoosePage from './pages/CourseChoosePage';
import TopicChoosePage from './pages/TopicChoosePage';
import LessonChoosePage from './pages/LessonChoosePage';
import LessonUpload from './components/uploads/LessonUpload';

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
            <Route path="/course-upload" element={<CourseCardUpload />} />
            <Route path="/live-lesson-upload" element={<LiveLessonCardUpload />} />
            <Route path="/product-upload" element={<ProductCardUpload />} />
            <Route
              path="/course-content-upload/:courseId"
              element={<CourseContentUpload />}
            />
            <Route path="/topic-upload/:courseId" element={<TopicUpload />} />
            <Route path="/lesson-upload/:topicId" element={<LessonUpload />} />
            <Route path="/course-choose" element={<CourseChoosePage />} />
            <Route path="/topic-choose/:courseId" element={<TopicChoosePage />} />
            <Route path="/lesson-choose/:topicId" element={<LessonChoosePage />} />

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

