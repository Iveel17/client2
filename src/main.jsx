import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App.jsx';

import { CartProvider } from './context/cart/CartProvider.jsx'; 
import { AuthProvider } from './context/auth/AuthProvider.jsx'; // Assuming you have an AuthProvider
import { VideoProvider } from './context/video/VideoProvider.jsx';
import { CourseCardProvider } from './context/courseCard/courseCardProvider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
      Nest your providers here.
      AuthProvider is typically the outermost if other contexts (like CartProvider)
      depend on user authentication status or user ID.
    */}
    <AuthProvider>
      <VideoProvider>
          <CartProvider>
            <CourseCardProvider>
              <App />
            </CourseCardProvider>
          </CartProvider>
      </VideoProvider>
    </AuthProvider>
  </StrictMode>,
);
