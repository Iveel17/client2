import React from 'react';
import { Link } from 'react-router-dom';

// Reusable Upload Card Component
const UploadCard = ({ to, title, description, icon }) => {
  return (
    <Link 
      to={to}
      className="group block bg-white rounded-xl border border-gray-200 p-8 transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors duration-300">
          <span className="text-2xl text-blue-600">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
          {description}
        </p>
        <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-300">
          Get Started →
        </div>
      </div>
    </Link>
  );
};

const uploadOptions = [
  {
    path: '/course-choose',
    title: 'Course Content',
    description: 'Upload topics for courses, then subtopics',
    icon: '📝'
  },
  { 
    path: '/product-upload', 
    title: 'Products',
    description: 'Add new products to your catalog with detailed descriptions and pricing',
    icon: '📦'
  },
  { 
    path: '/live-lesson-upload', 
    title: 'Live Lessons',
    description: 'Schedule and manage interactive live teaching sessions with students',
    icon: '🎥'
  },
];

const ChooseUpload = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            What would you like to upload?
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the type of content you want to add to your platform. 
            Each option provides specialized tools for your upload needs.
          </p>
        </div>

        {/* Upload Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadOptions.map((option) => (
            <UploadCard
              key={option.path}
              to={option.path}
              title={option.title}
              description={option.description}
              icon={option.icon}
            />
          ))}
        </div>

        {/* Optional Help Section */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Need help deciding? Contact our support team for guidance.
          </p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium underline underline-offset-2 transition-colors duration-300">
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseUpload;