import VideoList from "@/components/VideoList";
import VideoUpload from "@/components/VideoUpload";
import Header from "@/components/layout/Header/Header";
import { Video } from "lucide-react";

function PlusPage() {
  return (
    <div>
      <Header />
      <VideoList />
      <VideoUpload />

    </div>
  );
}


export default PlusPage;