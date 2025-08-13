import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";

const VideoCard = ({ video }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Hide menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-lg-start cons-guided-video-list-card position-relative">
          <div>
            <img
              className="cons-guided-video-list-img "
              src={video.videoImage}
              alt={video.videoTitle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div className="cons-guided-video-list-video-title">
              {video.videoTitle}
            </div>
            <div className="mt-3 cons-guided-video-list-branch">
              Branch: {video.branchName}
            </div>
            {/* <div className="my-3">
              {video.tags.map((tag, idx) => (
                <span key={tag} className="cons-guided-video-list-tags">
                  {tag}
                </span>
              ))}
            </div> */}
            <div className="cons-guided-video-list-question">
              Question {video.questionCount}/5
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="cons-guided-video-list-video-date">
              {video.creationDate}
            </div>
            <div className="mx-3">
              <span
                className={
                  video.isActive === true
                    ? "cons-guided-video-list-status-active"
                    : "cons-guided-video-list-status-deactivate"
                }
              >
                {video.isActive === true ? "Active" : "Deactivate"}
              </span>
            </div>
            <div ref={menuRef}>
              <button
                className="cons-guided-video-list-dot-btn"
                onClick={() => setShowMenu((prev) => !prev)}
                aria-label="More options"
              >
                <span>⋮</span>
              </button>
              {showMenu && (
                <div className="cons-guided-video-list-dot-btn-card">
                  <button
                    className="cons-guided-video-list-dot-btn-edit"
                    onClick={() => {
                      setShowMenu(false);
                      // handleEdit(video) // Add your edit handler here
                    }}
                  >
                    <span>
                      <i className="fas fa-edit mr-2"></i>
                    </span>
                    Edit
                  </button>
                  <button
                    className="cons-guided-video-list-dot-btn-dlt"
                    onClick={() => {
                      setShowMenu(false);
                      // handleDelete(video) // Add your delete handler here
                    }}
                  >
                    <i className="fas fa-trash-alt mr-2"></i>Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default VideoCard;
