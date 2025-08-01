import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white p-10 lg:px-16 font-sans text-sm text-gray-800 border-t border-gray-300">
      <div className="container mx-auto flex flex-wrap justify-between gap-10 flex-col md:flex-row md:items-start md:text-left">

        <div className="footer-left max-w-xs md:max-w-full">
          <h2 className="font-serif text-2xl mb-3">Logo</h2>
          <p className="font-bold mt-4">Address:</p>
          <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
          <p className="font-bold mt-4">Contact:</p>
          <p>
            <Link to="tel:1800123456" className="no-underline text-gray-800 hover:underline">1800 123 456</Link><br />
            <Link to="mailto:support@example.com" className="no-underline text-gray-800 hover:underline">support@example.com</Link>
          </p>
          <div className="flex gap-3 mt-4 text-base md:justify-start">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 md:flex-row md:gap-20">
          <div className="flex flex-col gap-2.5">
            <Link to="/about" className="no-underline text-gray-800 hover:text-blue-600">About Us</Link>
            <Link to="/courses" className="no-underline text-gray-800 hover:text-blue-600">Our Courses</Link>
            <Link to="/live-lessons" className="no-underline text-gray-800 hover:text-blue-600">Tutoring Services</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Contact Us</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">FAQ Section</Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Blog Posts</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Help Center</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Careers Page</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Community Forum</Link>
            <Link to="#" className="no-underline text-gray-800 hover:text-blue-600">Feedback Form</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 flex justify-between flex-wrap flex-col md:flex-row md:items-center md:gap-4">
        <p>© 2025 Axion. All rights reserved.</p>
        <div className="flex gap-5 flex-col md:flex-row md:items-center">
          <Link to="#" className="no-underline text-gray-800 hover:underline">Privacy Policy</Link>
          <Link to="#" className="no-underline text-gray-800 hover:underline">Terms of Service</Link>
          <Link to="#" className="no-underline text-gray-800 hover:underline">Cookies Settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;