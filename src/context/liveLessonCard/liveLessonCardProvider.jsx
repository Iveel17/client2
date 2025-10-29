import React, { useState, useEffect } from "react";
import { LiveLessonCardContext } from "./liveLessonCardContext.js";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const LiveLessonCardProvider = ({ children }) => {
  const [liveLessonCards, setLiveLessonCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

    // Fetch all live lesson cards
    const fetchLiveLessonCards = async () => {
        const API_URL = '/api/live-lessons';
        setLoading(true);
        setError(null);       
        try {         
        const response= await fetch(`${API_BASE}${API_URL}`);
        if (!response.ok) {
            // Throw an error if the status code is 4xx or 5xx
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 4. Parse the JSON data from the response body
        const liveLessonData = await response.json();
        liveLessonData.forEach(liveLesson => {
            console.log(`liveLesson: ${liveLesson.title}, Price: $${liveLesson.price}`);});
            // You would now map this data to render your liveLessonCard components
        } 
        
        catch (err) {
        console.error("Failed to fetch liveLesson cards:", err);
        setError("Could not load liveLesson cards");
        } finally {
        setLoading(false);
        }     
    };

    const createLiveLessonCard = async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/api/live-lesson-cards/create`, {
            method: 'POST',
            body: formData, // ✅ send raw FormData
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newCard = await response.json();
            setLiveLessonCards((prev) => [...prev, newCard]); // update state
            return newCard;
        } catch (error) {
            console.error('Create live-lesson card error:', error);
            throw error;
        }
        };
    useEffect(() => {
        fetchLiveLessonCards();
    }, []);

    const value = {
        liveLessonCards,
        loading,
        error,
        fetchLiveLessonCards,
        createLiveLessonCard,
    };      
    return (
        <LiveLessonCardContext.Provider value={value}>
            {children}      
        </LiveLessonCardContext.Provider>
    );
}