import React from 'react';
import './HomePage.css';
import { MapPin, Phone, Mail, Clock, Users, Monitor, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import YoungBoyStudyingPic from '@/assets/images/YoungBoyStudying.jpg'

import Header from '../../components/layout/Header/Header.jsx';
import Footer from '../../components/layout/Footer.jsx';
import ButtonA from '@/components/common/buttons/ButtonA.jsx';
import ButtonB from '@/components/common/buttons/ButtonB.jsx';
import LinkA from '@/components/common/buttons/LinkA.jsx';

const HomePage = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Lead Tutor",
      description: "Passionate about teaching. Alice specializes in mathematics and science for all ages.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Mark Smith",
      role: "Language Expert",
      description: "Mark brings years of experience in teaching English as a second language.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Sophia Lee",
      role: "Creative Coach",
      description: "Sophia inspires creativity through innovative art and design courses.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "James Brown",
      role: "Tech Specialist",
      description: "James focuses on coding and technology for aspiring young programmers.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Emma Wilson",
      role: "History Mentor",
      description: "Emma shares her passion for history with engaging storytelling and interactive lessons.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Liam Davis",
      role: "Science Guru",
      description: "Liam makes science fun and accessible for learners of all levels.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "Olivia Taylor",
      role: "Math Wizard",
      description: "Olivia excels at simplifying complex math concepts for students.",
      image: "/api/placeholder/200/200"
    },
    {
      name: "We're hiring!",
      role: "Join us",
      description: "Explore exciting opportunities to become part of our educational team.",
      image: "/api/placeholder/200/200",
      isHiring: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" >
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Unlock Your Potential with Our Courses
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Welcome to your learning journey! Dive into our diverse range of courses designed to elevate your skills and knowledge.
              </p>
              <div className="flex space-x-4">
                <ButtonA text="Explore" to="/courses" cursor='hand' />
                <ButtonB text="Get Started" className to="/signup" />
              </div>
            </div>
            <div className="lg:flex justify-center">
              <div className=" flex items-center justify-center">
                <div className="text-gray-400">
                  <img 
                    src={YoungBoyStudyingPic}
                    alt="Young boy studying" 
                    className="w-full h-full rounded-lg ">
                  </img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Banner */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">We're hiring!</h2>
            <p className="text-gray-600 mb-6">Discover your potential with us today.</p>
            <ButtonA text='Open Positions' className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50"/>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Unlock Your Potential with Our High-Quality Video Courses
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Learn from the Best: Expert Tutors at Your Service
              </h3>
              <p className="text-gray-600 mb-6">
                Our platform offers engaging video courses designed to elevate your learning experience.
              </p>
              <LinkA text="Explore" to="/courses" />
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Study at Your Own Pace with Flexible Learning Schedule
              </h3>
              <p className="text-gray-600 mb-6">
                Customize your learning journey with schedules that fit your lifestyle.
              </p>
              <LinkA text="Join" to="/signup" />
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Monitor className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Interactive Learning Experience with Engaging Content and Resources
              </h3>
              <p className="text-gray-600 mb-6">
                Access a wealth of resources that enhance your understanding and retention.
              </p>
              <LinkA text="Learn More" to="/about" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-blue-600 font-semibold mb-2">Empower</p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-gray-600">Meet our dedicated team of expert educators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition duration-300">
                <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="text-gray-400">
                    <Users size={32} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                {!member.isHiring && (
                  <div className="flex justify-center space-x-3">
                    <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                      <Linkedin className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                      <Twitter className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                      <Instagram className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 font-semibold mb-2">Locations</p>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-8">Reach out to us for any inquiries.</p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Email</h3>
                    <p className="text-gray-600 mb-1">We'd love to hear from you!</p>
                    <a href="mailto:info@educationalwebsite.com" className="text-blue-600 hover:text-blue-700">
                      info@educationalwebsite.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Phone</h3>
                    <p className="text-gray-600 mb-1">Call us anytime!</p>
                    <a href="tel:+61555123456" className="text-blue-600 hover:text-blue-700">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Office</h3>
                    <p className="text-gray-600 mb-1">455 Learning Ave, Sydney NSW 2000 AU</p>
                    <LinkA text="Get Directions" to="/about" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex justify-center">
              <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-400">
                  <MapPin size={64} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;