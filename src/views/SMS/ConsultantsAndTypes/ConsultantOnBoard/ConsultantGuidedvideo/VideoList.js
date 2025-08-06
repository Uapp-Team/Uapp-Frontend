import React from "react";
import VideoCard from "./VideoCard";

const VideoList = () => {
  const mockVideos = [
    {
      id: 1,
      title: "Consultant guided video for home",
      branch: "UK",
      tags: ["EU/EEA", "International"],
      questionCount: 5,
      date: "5 August",
      status: "Active",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      title: "Consultant guided video for International",
      branch: "London",
      tags: ["EU/EEA", "International,Home"],
      questionCount: 5,
      date: "5 October",
      status: "Deactivate",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <div>
      {mockVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoList;
