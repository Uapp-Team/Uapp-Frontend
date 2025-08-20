import React, { useState, useRef, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import remove from "../../../../../helpers/remove";
import put from "../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router";
import videoImage from "../../../../../assets/img/videoImage.svg";

const VideoCard = ({ video, success, setSuccess }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [delData, setDelData] = useState({});
  const [activateData, setActivateData] = useState({});
  console.log(activateData, "activate data");

  const { addToast } = useToasts();
  const history = useHistory();

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

  const toggleDanger = (p) => {
    setDelData(p);
    setDeleteModal(true);
  };
  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`ConsultantOnboarding/Delete/${delData?.id}`)
      .then((res) => {
        console.log(res);
        setProgress(false);
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setDeleteModal(false);
        setSuccess(!success);
      })
      .catch((error) => {
        setProgress(false);
        setButtonStatus(false);
        setDeleteModal(false);

        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          "An unexpected error occurred";

        addToast(errorMessage, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const toggleForActivate = (p) => {
    setActivateData(p);
    setActivateModal(true);
  };

  const handleActivate = () => {
    setButtonStatus1(true);
    setProgress1(true);
    put(
      `ConsultantOnboarding/ActiveOnboardingVideo?onboardingQuizId=${activateData?.id}`
    ).then((res) => {
      console.log(res);
      setProgress1(false);
      setButtonStatus1(false);
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      setActivateModal(false);
      setSuccess(!success);
    });
  };

  const handleEdit = (video) => {
    history.push(`/videoAndQuizFor-edit/${video?.id}`);
  };

  return (
    <>
      {" "}
      <Card>
        <CardBody>
          <div className="d-flex align-items-lg-start cons-guided-video-list-card position-relative">
            <div>
              {video.videoImage ? (
                <img
                  className="cons-guided-video-list-img "
                  src={video.videoImage}
                  alt={video.videoTitle}
                />
              ) : (
                <img
                  className="cons-guided-video-list-img "
                  src={videoImage}
                  alt={video.videoTitle}
                />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div className="cons-guided-video-list-video-title">
                {video.videoTitle}
              </div>
              <div className="mt-3 cons-guided-video-list-branch">
                Branch: {video.branchName}
              </div>
              <div className="my-3">
                {video?.isAcceptHome === true && (
                  <span className="cons-guided-video-list-tags">Home/UK</span>
                )}
                {video?.isAcceptEU_UK === true && (
                  <span className="cons-guided-video-list-tags">EU/EEU</span>
                )}
                {video?.isAcceptInternational === true && (
                  <span className="cons-guided-video-list-tags">
                    International
                  </span>
                )}
              </div>
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
                        handleEdit(video);
                      }}
                    >
                      <span>
                        <i className="fas fa-edit mr-2"></i>
                      </span>
                      Edit
                    </button>
                    <button
                      className="cons-guided-video-list-dot-btn-dlt my-3"
                      onClick={() => {
                        setShowMenu(false);
                        toggleDanger(video);
                      }}
                    >
                      <i className="fas fa-trash-alt mr-2"></i>Delete
                    </button>
                    {video?.isActive === false && (
                      <button
                        className="cons-guided-video-list-dot-btn-activate"
                        onClick={() => {
                          setShowMenu(false);
                          toggleForActivate(video);
                        }}
                      >
                        Activate
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      <ConfirmModal
        text="Do You Want To Delete This consultant Guided Video ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        buttonStatus={buttonStatus}
        progress={progress}
      />
      <ConfirmModal
        text="Do You Want To activate This consultant Guided Video ? Previous one will be deactivate!"
        isOpen={activateModal}
        toggle={() => setActivateModal(!activateModal)}
        confirm={handleActivate}
        cancel={() => setActivateModal(false)}
        buttonStatus={buttonStatus1}
        progress={progress1}
      />
    </>
  );
};

export default VideoCard;
