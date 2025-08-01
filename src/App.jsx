import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import CoursesPage from './pages/CoursesPage/CoursesPage'
import ProductsPage from './pages/ProductsPage/ProductsPage'
import LiveLessonsPage from './pages/LiveLessonsPage/LiveLessonsPage'

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
          </Routes>
        </Router>
  )
}

export default App
