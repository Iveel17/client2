import { useState } from "react";
import { useVideos } from "@/hooks/useVideos";

const VideoUpload = () => {
  const { uploadVideo } = useVideos();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (videoFile) formData.append("video", videoFile);
    if (coverFile) formData.append("cover", coverFile);

    try {
      await uploadVideo(formData);
      setTitle("");
      setSubtitle("");
      setVideoFile(null);
      setCoverFile(null);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto space-y-4 border rounded-2xl shadow-md p-6 bg-white"
      encType="multipart/form-data"
      method="POST"
    >
      <h2 className="text-xl font-bold text-gray-800">Upload New Video</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Video
        </label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 
                     hover:file:bg-blue-100 cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Cover Image
        </label>
        <input
          type="file"
          name="cover"
          accept="image/*"
          onChange={(e) => setCoverFile(e.target.files[0])}
          className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 
                     hover:file:bg-green-100 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium 
                   hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Upload Video
      </button>
    </form>
  );
};

export default VideoUpload;
