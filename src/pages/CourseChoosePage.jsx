import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header/Header";

const API_URL = "http://localhost:5000/api/courses";

const CourseChoosePage = () => {
  const navigate = useNavigate(); // ✅ MUST be inside component

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        setCourses(data);
      } catch {
        setError("Could not load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Choose a Course
        </h1>

        {loading && <p className="text-gray-600">Loading courses...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {/* Existing courses */}
            {courses.map((course) => (
            <div
                key={course._id}
                onClick={() => navigate(`/topic-choose/${course._id}`)}
                className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition cursor-pointer"
            >
                <h2 className="font-semibold text-lg text-gray-800">
                {course.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                {course.category} • {course.level}
                </p>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {course.description}
                </p>

                <div className="mt-4 font-bold text-blue-600">
                ${course.price}
                </div>
            </div>
            ))}

            {/* ➕ Add new course card */}
            <div
            onClick={() => navigate("/course-upload")}
            className="flex items-center justify-center bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer min-h-[170px]"
            >
            <div className="flex flex-col items-center text-gray-400 hover:text-blue-600">
                <span className="text-5xl font-light">+</span>
                <span className="mt-2 text-sm font-medium">
                Create New Course
                </span>
            </div>
            </div>

        </div>
        )}
      </main>
    </div>
  );
};

export default CourseChoosePage;
