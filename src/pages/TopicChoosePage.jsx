import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header/Header";

const TopicChoosePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/courses/${courseId}/topics`
        );

        if (!res.ok) throw new Error("Failed to fetch topics");

        const data = await res.json();
        setTopics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [courseId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Choose a Topic</h1>

        {loading && <p>Loading topics...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Existing topics */}
            {topics.map((topic, index) => (
              <div
                key={topic._id}
                className="bg-white rounded-xl border p-4 shadow-sm hover:shadow-md cursor-pointer"
                onClick={() =>
                  navigate(`/lesson-choose/${topic._id}`)
                }
              >
                <h2 className="font-semibold text-lg">
                  Topic {index + 1}: {topic.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {topic.lessonCount} lessons
                </p>
              </div>
            ))}

            {/* ➕ Create new topic */}
            <div
              onClick={() => navigate(`/topic-upload/${courseId}`)}
              className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer min-h-[150px]"
            >
              <div className="text-center text-gray-400 hover:text-blue-600">
                <div className="text-4xl">+</div>
                <div className="mt-2 text-sm font-medium">
                  Create New Topic
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default TopicChoosePage;
