import React, { useState, useEffect } from "react";
import { CourseCardContext } from "./courseCardContext.js";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const CourseCardProvider = ({ children }) => {
  const [courseCards, setCourseCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

    // Fetch all course cards
    const fetchCourseCards = async () => {
        const API_URL = '/api/courses';
        setLoading(true);
        setError(null);       
        try {         
        const response= await fetch(`${API_BASE}${API_URL}`);
        if (!response.ok) {
            // Throw an error if the status code is 4xx or 5xx
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 4. Parse the JSON data from the response body
        const courseData = await response.json();
        courseData.forEach(course => {
            console.log(`Course: ${course.title}, Price: $${course.price}`);});
            // You would now map this data to render your CourseCard components
        } 
        
        catch (err) {
        console.error("Failed to fetch course cards:", err);
        setError("Could not load course cards");
        } finally {
        setLoading(false);
        }     
    };

    const createCourseCard = async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/api/course-cards/create`, {
            method: 'POST',
            body: formData, // ✅ send raw FormData
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newCard = await response.json();
            setCourseCards((prev) => [...prev, newCard]); // update state
            return newCard;
        } catch (error) {
            console.error('Create course card error:', error);
            throw error;
        }
        };
    useEffect(() => {
        fetchCourseCards();
    }, []);

    const value = {
        courseCards,
        loading,
        error,
        fetchCourseCards,
        createCourseCard,
    };      
    return (
        <CourseCardContext.Provider value={value}>
            {children}      
        </CourseCardContext.Provider>
    );
}