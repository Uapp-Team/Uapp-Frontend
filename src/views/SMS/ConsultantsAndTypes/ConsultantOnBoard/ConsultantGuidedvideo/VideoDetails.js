import React, { useState, useRef, useEffect } from "react";
import { Edit, Volume2, Maximize } from "lucide-react";
import { Card, CardBody } from "react-bootstrap";
import QuizAnswers from "./QuizAnswers";

const VideoDetails = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(15);
  const [duration, setDuration] = useState(298); // 4:58 in seconds
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState(null);
  const videoRef = useRef(null);

  // Auto-hide controls when video is playing
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000); // Hide controls after 2 seconds of playing

      setControlsTimeout(timer);

      return () => {
        if (timer) clearTimeout(timer);
      };
    } else {
      setShowControls(true);
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    }
  }, [isPlaying]);

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);

    // Reset the auto-hide timer
    if (controlsTimeout) {
      clearTimeout(controlsTimeout);
    }

    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 2000);
      setControlsTimeout(timer);
    }
  };

  // Show controls on mouse enter
  const handleMouseEnter = () => {
    setShowControls(true);
  };

  // Hide controls on mouse leave (only if video is playing)
  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

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

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        // Exit fullscreen
        document.exitFullscreen();
      } else {
        // Enter fullscreen
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
          videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
          videoRef.current.msRequestFullscreen();
        }
      }
    }
  };

  return (
    <div className="video-details-container">
      <Card>
        <CardBody className="p-0">
          {" "}
          {/* Video Player Section */}
          <div
            className="video-details-videoSection"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <video
              ref={videoRef}
              className="video-details-video"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={handlePlayPause}
              // poster="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            >
              <source
                src="https://uappstorage.blob.core.windows.net/onboarding-temp-videos/9e9701cb-05f3-4003-8610-e8ae98ddba0d.mp4?sp=r&st=2025-08-11T07:19:38Z&se=2025-08-12T15:34:38Z&sv=2024-11-04&sr=b&sig=r841pVG0wE70HwetOOy8Envn0yn0Fft0JK9HTHf8Bew%3D"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            <div
              className={`video-details-videoControls ${
                showControls ? "show" : "hide"
              }`}
              style={{
                opacity: showControls ? 1 : 0,
                transition: "opacity 0.3s ease-in-out",
              }}
            >
              {/* Progress Bar */}
              <div
                className="video-details-progressBar mb-3"
                onClick={handleSeek}
              >
                <div
                  className="video-details-progressFill"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="video-details-controlsRow">
                <div className="video-details-leftControls">
                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlayPause}
                    className="video-details-playButton"
                  >
                    {isPlaying ? (
                      <div className="pauseIcon">
                        <i class="fas fa-pause"></i>
                      </div>
                    ) : (
                      <i class="fas fa-play"></i>
                    )}
                  </button>

                  {/* Volume Control */}
                  <div className="video-details-volumeControl">
                    <Volume2 size={20} color="white" />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="video-details-volumeSlider"
                    />
                  </div>

                  {/* Time Display */}
                  <div className="video-details-timeDisplay">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>

                <div className="video-details-rightControls">
                  {/* Fullscreen */}
                  <button
                    className="video-details-controlButton"
                    onClick={handleFullscreen}
                  >
                    <Maximize size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Video Information Section */}
          <div className="video-details-infoSection">
            {/* Edit Button */}
            <button className="video-details-editButton">
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
              <div className="cons-guided-video-list-question">
                Question 5/5
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <QuizAnswers />
      <QuizAnswers />
      <QuizAnswers />
      <QuizAnswers />
      <QuizAnswers />
      <div className="d-flex">
        <button className="video-details-delete mr-4">Delete video</button>
        <button className="video-details-active-edit">Active</button>
      </div>
    </div>
  );
};

export default VideoDetails;
