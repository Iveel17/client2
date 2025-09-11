import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";
import { Video } from "lucide-react";

function PlusPage() {
  return (
    <div>
      <VideoList />
      <VideoUpload />

    </div>
  );
}


export default PlusPage;