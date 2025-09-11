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

    // Debug check
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
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
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow" encType="multipart/form-data" method="POST">
      <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required className="border p-2 w-full" />
      <input type="text" name="subtitle" placeholder="Subtitle" onChange={(e) => setSubtitle(e.target.value)} className="border p-2 w-full" />
      <input type="file" name="video" accept="video/*"  onChange={(e) => setVideoFile(e.target.files[0])} required className="block" />
      <input type="file" name="cover" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="block" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload Video
      </button>
    </form>
  );
}

export default VideoUpload;
