import { useVideos } from "@/hooks/useVideos";

function VideoList() {
  const { videos, loading, error } = useVideos();

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 mt-6">
      {videos.map((video) => (
        <div key={video._id} className="border p-4 rounded shadow">
          <h3 className="font-bold">{video.title}</h3>
          {video.subtitle && <p className="text-gray-600">{video.subtitle}</p>}

          {video.coverImage && (
            <img
              src={`http://localhost:5000/uploads/${video.coverImage}`}
              alt="cover"
              className="w-64 h-40 object-cover rounded mt-2"
            />
          )}

          <video controls className="w-full mt-3 rounded">
            <source
              src={`http://localhost:5000/uploads/${video.filePath}`}
              type="video/mp4"
            />
          </video>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
