import React, { useState, useRef } from "react";
import { Edit, Play, Volume2, Maximize, PictureInPicture } from "lucide-react";

const VideoDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(15);
  const [duration, setDuration] = useState(298); // 4:58 in seconds
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.floor(videoRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(Math.floor(videoRef.current.duration));
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(Math.floor(newTime));
    }
  };

  return (
    <div className="container">
      {/* Video Player Section */}
      <div className="videoSection">
        <video
          ref={videoRef}
          className="video"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls */}
        <div className="videoControls">
          <div className="controlsRow">
            <div className="leftControls">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="playButton"
                onMouseEnter={(e) => (e.target.style.color = "playButtonHover")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                {isPlaying ? (
                  <div className="pauseIcon">
                    <div className="pauseBars"></div>
                  </div>
                ) : (
                  <Play size={32} fill="white" />
                )}
              </button>

              {/* Volume Control */}
              <div className="volumeControl">
                <Volume2 size={20} color="white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volumeSlider"
                />
              </div>

              {/* Time Display */}
              <div className="timeDisplay">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="rightControls">
              {/* Picture in Picture */}
              <button
                className="controlButton"
                onMouseEnter={(e) => (e.target.style.color = "playButtonHover")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                <PictureInPicture size={20} />
              </button>

              {/* Fullscreen */}
              <button
                className="controlButton"
                onMouseEnter={(e) => (e.target.style.color = "playButtonHover")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progressBar" onClick={handleSeek}>
            <div
              className="progressFill"
              style={{
                width: `${(currentTime / duration) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Video Information Section */}
      <div className="infoSection">
        {/* Edit Button */}
        <button
          className="editButton"
          onMouseEnter={(e) => (e.target.style.color = "editButtonHover")}
          onMouseLeave={(e) => (e.target.style.color = "#2563EB")}
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        <div style={{ flex: 1 }}>
          <div className="cons-guided-video-list-video-title">
            consultant guided video for home
          </div>
          <div className="mt-3 cons-guided-video-list-branch">
            Branch: London
          </div>
          <div className="my-3">
            <span className="cons-guided-video-list-tags">Eu/EEA</span>
          </div>
          <div className="cons-guided-video-list-question">Question 5/5</div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
