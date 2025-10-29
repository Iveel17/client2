import { useContext } from "react";
import { ProductCardContext } from "../context/productCard/productCardContext.js";

export const useProductCard = () => {    
    const context = useContext(ProductCardContext);

    if (!context) {
        throw new Error("useProductCard must be used within a ProductCardProvider");
    }
    const { productCards, loading, error, fetchProductCards, createProductCard } = context;
    return {
        // Core state
        productCards,
        loading,
        error,

        // Actions
        fetchProductCards,
        createProductCard,       
        // Helper values
        hasProductCards: productCards && productCards.length > 0,
        totalProductCards: productCards?.length || 0,
    };
}   