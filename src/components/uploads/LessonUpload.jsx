import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header/Header";

const LessonUpload = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!video) {
      setError("Please upload a video file");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description);
      formData.append("video", video); // 👈 key name must match backend

      const res = await fetch(
        `http://localhost:5000/api/topics/${topicId}/lessons`,
            {
                method: "POST",
                body: formData // multipart/form-data
            }
    );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create lesson");
      }

      navigate(-1); // back to lesson list

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Create New Lesson
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border p-6 space-y-4"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Video upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lesson Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              required
              className="w-full"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Create Lesson"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-5 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LessonUpload;
