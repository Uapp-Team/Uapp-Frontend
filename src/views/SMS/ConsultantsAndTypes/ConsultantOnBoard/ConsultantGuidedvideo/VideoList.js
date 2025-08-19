import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videoList, success, setSuccess }) => {
  return (
    <div>
      {videoList?.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          success={success}
          setSuccess={setSuccess}
        />
      ))}
    </div>
  );
};

export default VideoList;
