import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header/Header";

const LessonChoosePage = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/topics/${topicId}/lessons`
        );

        if (!res.ok) throw new Error("Failed to fetch lessons");

        const data = await res.json();
        console.log("Fetched lessons:", data); // ✅ Debug log
        setLessons(data);
      } catch (err) {
        console.error("Fetch error:", err); // ✅ Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [topicId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Choose a Lesson</h1>

        {loading && <p>Loading lessons...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Found {lessons.length} lesson(s)
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Existing lessons */}
              {lessons.map((lesson, index) => (
                <div
                  key={lesson._id}
                  className="bg-white rounded-xl border shadow-sm hover:shadow-md overflow-hidden"
                >
                  {/* Video Preview */}
                  <div className="relative bg-black aspect-video">
                    <video
                      src={`http://localhost:5000/${lesson.video}`}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  {/* Lesson Info */}
                  <div className="p-4">
                    <h2 className="font-semibold text-lg mb-2">
                      Lesson {index + 1}: {lesson.title}
                    </h2>
                    {lesson.description && (
                      <p className="text-sm text-gray-600">
                        {lesson.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      Uploaded: {new Date(lesson.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

              {/* ➕ Create new lesson */}
              <div
                onClick={() => navigate(`/lesson-upload/${topicId}`)}
                className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer min-h-[300px]"
              >
                <div className="text-center text-gray-400 hover:text-blue-600">
                  <div className="text-4xl">+</div>
                  <div className="mt-2 text-sm font-medium">
                    Create New Lesson
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default LessonChoosePage;