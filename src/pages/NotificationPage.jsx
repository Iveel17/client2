import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header/Header';

const NotificationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-inter">
        <Header />
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-lg shadow-lg">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Abstract background shapes */}
          <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#ffffff" fillOpacity="0.1" d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,128C672,128,768,192,864,208C960,224,1056,192,1152,160C1248,128,1344,96,1392,80L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            <path fill="#ffffff" fillOpacity="0.05" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,203,576,213.3C672,224,768,213,864,197.3C960,181,1056,160,1152,149.3C1248,139,1344,139,1392,139.7L1440,140.3L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Notification Us
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed animate-fade-in-up delay-100">
            Empowering Minds Through Accessible Online Education
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg mx-4 md:mx-8 lg:mx-16 -mt-10 relative z-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            At [Your Website Name], our mission is to break down barriers to quality education. We believe
            that learning should be accessible to everyone, everywhere. Through innovative and engaging
            online courses, we strive to equip individuals with the skills and knowledge needed to
            thrive in a rapidly changing world. We are committed to fostering a vibrant
            community of learners and educators.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Founded in [Year], [Your Website Name] began with a simple idea: to make expert-led
              education available to anyone with an internet connection. What started as a small
              collection of courses has grown into a comprehensive platform, continually expanding
              its offerings and reaching thousands of students worldwide.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We've overcome challenges, celebrated successes, and learned invaluable lessons
              along the way. Our journey is defined by our dedication to our students and our
              passion for lifelong learning.
            </p>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src="https://placehold.co/400x300/E0F2FE/2563EB?text=Our+Story"
              alt="Our Story"
              className="rounded-lg shadow-xl w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Values Section (Optional - can be expanded based on user input) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl text-blue-500 mb-4">💡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Constantly evolving our methods and content to deliver cutting-edge education.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl text-green-500 mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Building a supportive and interactive environment for all learners.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl text-purple-500 mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to providing high-quality, impactful learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center bg-gray-100">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Join our growing community of learners and discover your potential. Explore our diverse range of courses today!
          </p>
          
          <Link to="/courses" >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
                Explore Courses
            </button>
          </Link>
          
        </div>
      </section>
    </div>
  );
};

export default NotificationPage;
