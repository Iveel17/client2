import { useState } from "react";
import { useLiveLessonCard } from "@/hooks/useLiveLessonCard"; // Replace with actual live lesson card hook
import Header from "../layout/Header/Header";

const LiveLessonCardUpload = () => {
  const { createLiveLessonCard } = useLiveLessonCard(); // Replace with actual live lesson card hook
  const [liveLessonCardData, setLiveLessonCardData] = useState({
    id: "",
    type: "live-lesson",
    title: "",
    price: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    lessons: "",
    capacity: "",
    instructor: "" // optional field
  });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (field, value) => {
    setLiveLessonCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Append all live lesson card data
    Object.keys(liveLessonCardData).forEach(key => {
      if (liveLessonCardData[key] !== "" && liveLessonCardData[key] !== null) {
        formData.append(key, liveLessonCardData[key]);
      }
    });
    
    if (imageFile) formData.append("image", imageFile);
    
    try {
      await createLiveLessonCard(formData);
      // Reset form
      setLiveLessonCardData({
        id: "",
        type: "live-lesson",
        title: "",
        price: "",
        description: "",
        category: "",
        level: "",
        duration: "",
        lessons: "",
        capacity: "",
        instructor: ""
      });
      setImageFile(null);
      console.log("LiveLesson card uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <> 
      <Header />
      <div className="max-w-lg mx-auto space-y-4 border rounded-2xl shadow-md p-6 bg-white mt-4">
        <h2 className="text-xl font-bold text-gray-800">Upload New Live Lesson Card</h2>

        <input
          type="text"
          name="id"
          placeholder="Live Lesson ID (e.g., C004)"
          value={liveLessonCardData.id}
          onChange={(e) => handleInputChange("id", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="title"
          placeholder="Live Lesson Title"
          value={liveLessonCardData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Live Lesson Image
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
          value={liveLessonCardData.price}
          onChange={(e) => handleInputChange("price", e.target.value)}
          step="0.01"
          min="0"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <textarea
          name="description"
          placeholder="Live Lesson Description"
          value={liveLessonCardData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          rows="4"
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none resize-vertical"
        />
        
        <select
          name="category"
          value={liveLessonCardData.category}
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

        <select
          name="level"
          value={liveLessonCardData.level}
          onChange={(e) => handleInputChange("level", e.target.value)}
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>

        <input
          type="number"
          name="duration"
          placeholder="Duration (in hours)"
          value={liveLessonCardData.duration}
          onChange={(e) => handleInputChange("duration", e.target.value)}
          min="1"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          name="lessons"
          placeholder="Number of Lessons"
          value={liveLessonCardData.lessons}
          onChange={(e) => handleInputChange("lessons", e.target.value)}
          min="1"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="number"
          name="capacity"
          placeholder="Maximum Capacity"
          value={liveLessonCardData.capacity}
          onChange={(e) => handleInputChange("capacity", e.target.value)}
          min="1"
          required
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <input
          type="text"
          name="instructor"
          placeholder="Instructor ID (optional)"
          value={liveLessonCardData.instructor}
          onChange={(e) => handleInputChange("instructor", e.target.value)}
          className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium
                      hover:bg-blue-700 transition-colors cursor-pointer"
        > 
          Save Live Lesson Card
        </button>
      </div>
    
    </>
  );
};

export default LiveLessonCardUpload;