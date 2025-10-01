import React, { useState, useEffect } from "react";
import { CourseCardContext } from "./courseCardContext.js";
import courseCardService from "@/services/courseCardService";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const CourseCardProvider = ({ children }) => {
  const [courseCards, setCourseCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

    // Fetch all course cards
    const fetchCourseCards = async () => {
        setLoading(true);
        setError(null);       
        try {         
        const result = await courseCardService.getCourseCards();
        setCourseCards(result.data || []); // Axios returns { data }
        } catch (err) {
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