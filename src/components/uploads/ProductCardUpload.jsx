import { useState } from "react";
import { useProductCard } from "@/hooks/useProductCard"; // Replace with actual product card hook
import Header from "../layout/Header/Header";

const ProductCardUpload = () => {
  const { createProductCard } = useProductCard(); // Replace with actual product card hook
  const [productCardData, setProductCardData] = useState({
    id: "",
    type: "product",
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    discount: "" // optional field, default = 0
  });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (field, value) => {
    setProductCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Append all product card data
    Object.keys(productCardData).forEach(key => {
      if (productCardData[key] !== "" && productCardData[key] !== null) {
        formData.append(key, productCardData[key]);
      }
    });
    
    if (imageFile) formData.append("image", imageFile);
    
    try {
      await createProductCard(formData);
      // Reset form
      setProductCardData({
        id: "",
        type: "product",
        title: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        discount: "" // optional field, default = 0
      });
      setImageFile(null);
      console.log("Product card uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <> 
      <Header />
      <div className="max-w-lg mx-auto space-y-4 border rounded-2xl shadow-md p-6 bg-white mt-4">
        <h2 className="text-xl font-bold text-gray-800">Upload New Product Card</h2>

        <input
          type="text"
          name="id"
          placeholder="Product ID (e.g., C004)"
          value={productCardData.id}
          onChange={(e) => handleInputChange("id", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={productCardData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100 cursor-pointer"
          />
        </div>

        <input
          type="number"
          name="price"
          placeholder="Price ($)"
          value={productCardData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          step="0.01"
          min="0"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={productCardData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          rows="4"
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
        />
        
        <select
          name="category"
          value={productCardData.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">Select Category</option>
          <option value="Data Science">Data Science</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
          <option value="Development">Development</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={productCardData.stock}
          onChange={(e) => handleInputChange("stock", e.target.value)}
          min="1"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%), default 0"
          value={productCardData.discount}
          default="0"
          onChange={(e) => handleInputChange("discount", e.target.value)}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                      hover:bg-blue-700 transition-colors cursor-pointer"
        > 
          Save Product Card
        </button>
      </div>
    
    </>
  );
};

export default ProductCardUpload;