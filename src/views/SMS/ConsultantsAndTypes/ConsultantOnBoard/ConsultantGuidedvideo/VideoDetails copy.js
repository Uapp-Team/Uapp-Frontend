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

  const styles = {
    container: {
      maxWidth: "1024px",
      margin: "0 auto",
      padding: "24px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    videoSection: {
      position: "relative",
      backgroundColor: "#111827",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "24px",
    },
    video: {
      width: "100%",
      height: "384px",
      objectFit: "cover",
    },
    videoControls: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
      padding: "16px",
    },
    controlsRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftControls: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    rightControls: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    playButton: {
      color: "white",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    playButtonHover: {
      color: "#60A5FA",
    },
    pauseIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    pauseBars: {
      width: "8px",
      height: "16px",
      backgroundColor: "white",
      borderRadius: "2px",
      margin: "0 2px",
    },
    volumeControl: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    volumeSlider: {
      width: "64px",
      height: "4px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "4px",
      appearance: "none",
      cursor: "pointer",
    },
    timeDisplay: {
      color: "white",
      fontSize: "14px",
      fontWeight: "500",
    },
    controlButton: {
      color: "white",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    progressBar: {
      width: "100%",
      height: "4px",
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      borderRadius: "4px",
      marginTop: "12px",
      cursor: "pointer",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#3B82F6",
      borderRadius: "4px",
      transition: "width 0.15s ease",
    },
    infoSection: {
      backgroundColor: "#F9FAFB",
      borderRadius: "8px",
      padding: "24px",
      position: "relative",
    },
    editButton: {
      position: "absolute",
      top: "16px",
      right: "16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: "#2563EB",
      cursor: "pointer",
      transition: "color 0.2s ease",
      border: "none",
      background: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    editButtonHover: {
      color: "#1D4ED8",
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "16px",
      paddingRight: "80px",
    },
    locationDetails: {
      marginBottom: "16px",
    },
    locationRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    },
    locationRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    },
    label: {
      color: "#6B7280",
      fontWeight: "500",
    },
    value: {
      color: "#111827",
    },
    tagsSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "16px",
    },
    tagsContainer: {
      display: "flex",
      gap: "8px",
    },
    tag: {
      padding: "4px 12px",
      backgroundColor: "#E5E7EB",
      color: "#374151",
      borderRadius: "9999px",
      fontSize: "14px",
      fontWeight: "500",
    },
    progressSection: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    progressValue: {
      color: "#2563EB",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      {/* Video Player Section */}
      <div style={styles.videoSection}>
        <video
          ref={videoRef}
          style={styles.video}
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
        <div style={styles.videoControls}>
          <div style={styles.controlsRow}>
            <div style={styles.leftControls}>
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                style={styles.playButton}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.playButtonHover.color)
                }
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                {isPlaying ? (
                  <div style={styles.pauseIcon}>
                    <div style={styles.pauseBars}></div>
                  </div>
                ) : (
                  <Play size={32} fill="white" />
                )}
              </button>

              {/* Volume Control */}
              <div style={styles.volumeControl}>
                <Volume2 size={20} color="white" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  style={styles.volumeSlider}
                />
              </div>

              {/* Time Display */}
              <div style={styles.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div style={styles.rightControls}>
              {/* Picture in Picture */}
              <button
                style={styles.controlButton}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.playButtonHover.color)
                }
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                <PictureInPicture size={20} />
              </button>

              {/* Fullscreen */}
              <button
                style={styles.controlButton}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.playButtonHover.color)
                }
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                <Maximize size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={styles.progressBar} onClick={handleSeek}>
            <div
              style={{
                ...styles.progressFill,
                width: `${(currentTime / duration) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Video Information Section */}
      <div style={styles.infoSection}>
        {/* Edit Button */}
        <button
          style={styles.editButton}
          onMouseEnter={(e) =>
            (e.target.style.color = styles.editButtonHover.color)
          }
          onMouseLeave={(e) => (e.target.style.color = "#2563EB")}
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>

        {/* Video Title */}
        <h2 style={styles.title}>Consultant guided video for home</h2>

        {/* Location Details */}
        <div style={styles.locationDetails}>
          <div style={styles.locationRow}>
            <span style={styles.label}>Country:</span>
            <span style={styles.value}>UK</span>
          </div>
          <div style={styles.locationRow}>
            <span style={styles.label}>Branch:</span>
            <span style={styles.value}>UK</span>
          </div>
        </div>

        {/* Tags */}
        <div style={styles.tagsSection}>
          <span style={styles.label}>Tags:</span>
          <div style={styles.tagsContainer}>
            <span style={styles.tag}>EU/EEA</span>
            <span style={styles.tag}>International</span>
          </div>
        </div>

        {/* Progress Indicator */}
        <div style={styles.progressSection}>
          <span style={styles.label}>Progress:</span>
          <span style={styles.progressValue}>Question 5/5</span>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
