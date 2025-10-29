import React, { useState, useEffect } from "react";
import { ProductCardContext } from "./productCardContext.js";
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export const ProductCardProvider = ({ children }) => {
  const [productCards, setProductCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

    // Fetch all product cards
    const fetchProductCards = async () => {
        const API_URL = '/api/products';
        setLoading(true);
        setError(null);       
        try {         
        const response= await fetch(`${API_BASE}${API_URL}`);
        if (!response.ok) {
            // Throw an error if the status code is 4xx or 5xx
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 4. Parse the JSON data from the response body
        const productData = await response.json();
        productData.forEach(product => {
            console.log(`Product: ${product.title}, Price: $${product.price}`);});
            // You would now map this data to render your ProductCard components
        } 
        
        catch (err) {
        console.error("Failed to fetch product cards:", err);
        setError("Could not load product cards");
        } finally {
        setLoading(false);
        }     
    };

    const createProductCard = async (formData) => {
        try {
            const response = await fetch(`${API_BASE}/api/product-cards/create`, {
            method: 'POST',
            body: formData, // ✅ send raw FormData
            });

            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newCard = await response.json();
            setProductCards((prev) => [...prev, newCard]); // update state
            return newCard;
        } catch (error) {
            console.error('Create product card error:', error);
            throw error;
        }
        };
    useEffect(() => {
        fetchProductCards();
    }, []);

    const value = {
        productCards,
        loading,
        error,
        fetchProductCards,
        createProductCard,
    };      
    return (
        <ProductCardContext.Provider value={value}>
            {children}      
        </ProductCardContext.Provider>
    );
}