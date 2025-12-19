import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContent } from "@/hooks/useCourseContent";
import Header from "../layout/Header/Header";

const API_URL = "http://localhost:5000/api/courses";

const CourseContentUpload = () => {
  const { courseId } = useParams();
  const { createCourseContent } = useCourseContent();

  const [courseTitle, setCourseTitle] = useState("");
  const [loadingCourse, setLoadingCourse] = useState(true);

  const [videoData, setVideoData] = useState({
    title: "",
    subtitles: "",
  });

  const [videoFile, setVideoFile] = useState(null);

  /* ============================
     Fetch course title
  ============================ */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`${API_URL}/${courseId}`);
        const data = await res.json();
        setCourseTitle(data.title);
      } catch {
        setCourseTitle("Unknown Course");
      } finally {
        setLoadingCourse(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  const handleInputChange = (field, value) => {
    setVideoData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(videoData).forEach(([k, v]) => v && formData.append(k, v));
    formData.append("courseId", courseId);
    if (videoFile) formData.append("video", videoFile);

    try {
      await createCourseContent(formData);
      setVideoData({ title: "", subtitles: "" });
      setVideoFile(null);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-64px)] bg-gray-100 flex justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-2xl border shadow-sm p-6 mt-10 space-y-5">

          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Upload Course Video
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Uploading to course:
              <span className="ml-2 font-semibold text-blue-600">
                {loadingCourse ? "Loading..." : courseTitle}
              </span>
            </p>
          </div>

          {/* Video title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video Title
            </label>
            <input
              type="text"
              value={videoData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* File upload (button style) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video File
            </label>

            <label className="inline-flex items-center px-4 py-2 border rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">
                Choose File
              </span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </label>

            {videoFile && (
              <p className="text-xs text-gray-500 mt-2">
                Selected: {videoFile.name}
              </p>
            )}
          </div>

          {/* Subtitles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitles
            </label>
            <textarea
              rows="6"
              value={videoData.subtitles}
              onChange={(e) =>
                handleInputChange("subtitles", e.target.value)
              }
              className="w-full border rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Upload Video
          </button>
        </div>
      </main>
    </>
  );
};

export default CourseContentUpload;

