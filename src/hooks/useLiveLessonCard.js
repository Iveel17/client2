import { useContext } from "react";
import { LiveLessonCardContext } from "../context/liveLessonCard/liveLessonCardContext.js";

export const useLiveLessonCard = () => {    
    const context = useContext(LiveLessonCardContext);

    if (!context) {
        throw new Error("useLiveLessonCard must be used within a LiveLessonCardProvider");
    }
    const { liveLessonCards, loading, error, fetchLiveLessonCards, createLiveLessonCard } = context;
    return {
        // Core state
        liveLessonCards,
        loading,
        error,

        // Actions
        fetchLiveLessonCards,
        createLiveLessonCard,       
        // Helper values
        hasLiveLessonCards: liveLessonCards && liveLessonCards.length > 0,
        totalLiveLessonCards: liveLessonCards?.length || 0,
    };
}   