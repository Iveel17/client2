import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-left">
          <h2 className="logo">Logo</h2>
          <p className="address-title">Address:</p>
          <p>Level 1, 12 Sample St, Sydney NSW 2000</p>
          <p className="contact-title">Contact:</p>
          <p>
            <a href="tel:1800123456">1800 123 456</a><br />
            <a href="mailto:support@example.com">support@example.com</a>
          </p>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>

        <div className="footer-links">
          <div>
            <a href="#">About Us</a>
            <a href="#">Our Courses</a>
            <a href="#">Tutoring Services</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQ Section</a>
          </div>
          <div>
            <a href="#">Blog Posts</a>
            <a href="#">Help Center</a>
            <a href="#">Careers Page</a>
            <a href="#">Community Forum</a>
            <a href="#">Feedback Form</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Axion. All rights reserved.</p>
        <div className="legal-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
