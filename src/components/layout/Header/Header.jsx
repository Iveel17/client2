import React, { useState } from 'react';
// import './Header.css'; // Assuming this is no longer needed if using pure Tailwind
import { Link } from 'react-router-dom';
import AuthSection from './AuthSection';
import Logo from '@/assets/icons/UpgradeLogo.jpg';

// Reusable Navigation Link Component
const NavLink = ({ to, children, onClick }) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="no-underline text-[#333] font-medium text-base transition-all duration-300 ease-in-out relative py-2 hover:text-[#007bff] group
      after:content-[''] after:absolute after:bottom-0 after:w-0 after:left-0 after:h-[2px] after:bg-gradient-to-r after:from-[#007bff] after:to-[#0056b3] after:transition-[width] after:duration-300 after:ease-in-out after:origin-left hover:after:w-full"
    >
      {children}
    </Link>
  );
};

// Navigation Items Configuration
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/products', label: 'Products' },
  { path: '/live-lessons', label: 'Live-lessons' },
  { path: '/about', label: 'About' },
  { path: '/cart', label: '🛒' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    // The header element now explicitly spans the full viewport width (w-screen)
    // and uses negative margins to counteract any parent padding, ensuring it
    // stretches edge-to-edge.
    <header className="bg-white shadow-md w-screen h-25 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Main header container for content: uses 'container' to center and 'px' for padding */}
      {/* Changed 'justify-between' to 'justify-around' to move items closer to the center */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-around items-center">

        {/* Logo Section */}
        <div className="logo flex-shrink-0">
          <Link to="/" className="logo-link">
            <img 
              src={Logo}
              alt="Upgrade Logo" 
              className="w-12.5 h-auto object-cover"
            />
          </Link>          
        </div>

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-[#333] focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Menu (Desktop) */}
        <nav className="hidden md:flex md:flex-row items-center gap-10">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="auth-section hidden md:block flex-shrink-0">
          <AuthSection />
        </div>
      </div>

      {/* Mobile Navigation Menu - appears below the main header on small screens */}
      <nav className={`
        ${isMenuOpen ? 'flex' : 'hidden'} 
        md:hidden
        flex-col 
        bg-white 
        shadow-lg 
        py-4 
        px-6
        w-full
        border-t border-gray-200
      `}>
        {navItems.map((item) => (
          <div key={item.path} className="py-2">
            <NavLink to={item.path} onClick={closeMenu}>
              {item.label}
            </NavLink>
          </div>
        ))}
        
        {/* Auth Section for Mobile */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <AuthSection />
        </div>
      </nav>
    </header>
  );
};

export default Header;