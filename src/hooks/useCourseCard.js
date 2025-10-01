import { useContext } from "react";
import { CourseCardContext } from "../context/courseCard/courseCardContext.js";

export const useCourseCard = () => {    
    const context = useContext(CourseCardContext);

    if (!context) {
        throw new Error("useCourseCard must be used within a CourseCardProvider");
    }
    const { courseCards, loading, error, fetchCourseCards, createCourseCard } = context;
    return {
        // Core state
        courseCards,
        loading,
        error,

        // Actions
        fetchCourseCards,
        createCourseCard,       
        // Helper values
        hasCourseCards: courseCards && courseCards.length > 0,
        totalCourseCards: courseCards?.length || 0,
    };
}   