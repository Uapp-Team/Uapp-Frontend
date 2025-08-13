import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videoList }) => {
  return (
    <div>
      {videoList?.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
