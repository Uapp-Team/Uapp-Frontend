import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Select from "react-select";
import get from "../../../../../helpers/get";
import QuizAnswers from "./QuizAnswers";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import YourConsultantForm from "./YourConsultantForm";
import VideoQuizForm from "./VideoQuizForm";
import post from "../../../../../helpers/post";
import axios from "axios";
import { rootUrl } from "../../../../../constants/constants";

const VideoAndQuizFor = () => {
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("London office");
  const [branchValue, setBranchValue] = useState(1);
  const [branchError, setBranchError] = useState(false);
  const [consultantModal, setConsultantModal] = useState(false);
  const [videoQuizModal, setVideoQuizModal] = useState(false);
  const [activeStep, setActiveStep] = useState("consultant");
  const [homeAccept, setHomeAccept] = useState(false);
  const [ukAccept, setUkAccept] = useState(false);
  const [intAccept, setIntAccept] = useState(false);
  const [acceptError, setAcceptError] = useState(false);
  const [country, setCountry] = useState([]);
  const [countryLabel, setCountryLabel] = useState("Country");
  const [countryValue, setCountryValue] = useState(0);
  const [countryError, setCountryError] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoTitleError, setVideoTitleError] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoFileError, setVideoFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  // Question and Answer states
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [isQuestionEditing, setIsQuestionEditing] = useState(false);
  const [answers, setAnswers] = useState([
    { id: 1, text: "", isCorrect: false, isEditing: false },
    { id: 2, text: "", isCorrect: false, isEditing: false },
    { id: 3, text: "", isCorrect: false, isEditing: false },
  ]);
  const [detailedAnswer, setDetailedAnswer] = useState("");
  const [detailedAnswerError, setDetailedAnswerError] = useState("");
  const [isDetailedAnswerExpanded, setIsDetailedAnswerExpanded] =
    useState(false);
  const [isDetailedAnswerEditing, setIsDetailedAnswerEditing] = useState(false);

  const toggleConsultantModal = () => setConsultantModal(!consultantModal);
  const toggleVideoQuizModal = () => setVideoQuizModal(!videoQuizModal);

  const handleStepClick = (step) => {
    setActiveStep(step);
    if (step === "consultant") {
      toggleConsultantModal();
    } else if (step === "videoQuiz") {
      toggleVideoQuizModal();
    }
  };

  useEffect(() => {
    get("BranchDD/index").then((res) => {
      setBranch(res);
      // res?.length === 1 && setBranchValue(res[0].id);
    });
    get("CountryDD/index").then((res) => {
      setCountry(res);
    });
  }, []);

  // Cleanup video URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const countryName = country?.map((branchCountry) => ({
    label: branchCountry.name,
    value: branchCountry.id,
  }));

  // select  Country
  const selectCountry = (label, value) => {
    setCountryError(false);
    setCountryLabel(label);
    setCountryValue(value);
  };

  const handleFirstNameChange = (e) => {
    let data = e.target.value.trimStart();
    setVideoTitle(data);
    if (data === "") {
      setVideoTitleError("Video title is required");
    } else {
      setVideoTitleError("");
    }
  };

  // Question handlers
  const handleQuestionClick = () => {
    setIsQuestionEditing(true);
  };

  const handleQuestionChange = (e) => {
    const value = e.target.value;
    setQuestion(value);
    if (value.length > 150) {
      setQuestionError("Question cannot exceed 150 characters");
    } else {
      setQuestionError("");
    }
  };

  const handleQuestionKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsQuestionEditing(false);
      if (question.trim() === "") {
        setQuestionError("Question is required");
      } else {
        setQuestionError("");
      }
    }
  };

  const handleQuestionBlur = () => {
    setIsQuestionEditing(false);
    if (question.trim() === "") {
      setQuestionError("Question is required");
    } else {
      setQuestionError("");
    }
  };

  // Answer handlers
  const handleAnswerClick = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, isEditing: true } : answer
      )
    );
  };

  const handleAnswerChange = (answerId, value) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, text: value } : answer
      )
    );
  };

  const handleAnswerKeyPress = (e, answerId) => {
    if (e.key === "Enter") {
      const currentAnswer = answers.find((a) => a.id === answerId);
      if (currentAnswer && currentAnswer.text.trim() !== "") {
        // Save current answer
        setAnswers((prev) =>
          prev.map((answer) =>
            answer.id === answerId ? { ...answer, isEditing: false } : answer
          )
        );

        // Add new answer if this is the last one
        const lastAnswer = answers[answers.length - 1];
        if (answerId === lastAnswer.id) {
          const newAnswerId = lastAnswer.id + 1;
          setAnswers((prev) => [
            ...prev,
            {
              id: newAnswerId,
              text: "",
              isCorrect: false,
              isEditing: false,
            },
          ]);
        }
      }
    }
  };

  const handleAnswerBlur = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.id === answerId ? { ...answer, isEditing: false } : answer
      )
    );
  };

  const handleCorrectAnswerChange = (answerId) => {
    setAnswers((prev) =>
      prev.map((answer) => ({
        ...answer,
        isCorrect: answer.id === answerId,
      }))
    );
  };

  const handleDetailedAnswerChange = (e) => {
    setDetailedAnswer(e.target.value);
    setDetailedAnswerError("");
  };

  const handleDetailedAnswerKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsDetailedAnswerEditing(false);
      if (detailedAnswer.trim() === "") {
        setDetailedAnswerError("Answer is required");
      } else {
        setDetailedAnswerError("");
      }
    }
  };

  const handleDetailedAnswerBlur = () => {
    setIsDetailedAnswerEditing(false);
    if (detailedAnswer.trim() === "") {
      setDetailedAnswerError("Answer is required");
    } else {
      setDetailedAnswerError("");
    }
  };

  const handleDetailedAnswerClick = () => setIsDetailedAnswerEditing(true);

  const handleVideoFileChange = (event) => {
    console.log(event.target.files, "event");

    const file = event.target.files[0];
    setVideoFile(file);
    setShowVideoPlayer(false);
    setVideoUrl(null);

    if (!file) {
      setVideoFileError("Video file is required");
    } else {
      // Check file type - only allow MP4 as that's what the server supports
      const allowedTypes = ["video/mp4"];
      const allowedExtensions = [".mp4"];

      // Check both MIME type and file extension
      const hasValidType = allowedTypes.includes(file.type);
      const hasValidExtension = allowedExtensions.some((ext) =>
        file.name.toLowerCase().endsWith(ext)
      );

      if (!hasValidType || !hasValidExtension) {
        setVideoFileError(
          "Please select a valid MP4 video file (.mp4 extension required)"
        );
        console.log("File validation failed:", {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          hasValidType,
          hasValidExtension,
        });
      } else {
        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
          setVideoFileError("Video file size should be less than 200MB");
        } else {
          setVideoFileError("");
          console.log("File validation passed:", {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          });
          // Create video URL but don't show player yet
          const url = URL.createObjectURL(file);

          setVideoUrl(url);
          // Start actual video upload
          uploadVideo(file);
        }
      }
    }
  };

  const AuthStr = localStorage.getItem("token");

  const uploadVideo = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowVideoPlayer(false);
    const formData = new FormData();
    formData.append("VideoFile", file);

    axios
      .post(`${rootUrl}OnboardingVideo/UploadVideo`, formData, {
        headers: {
          authorization: AuthStr,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
      .then((res) => {
        setUploadProgress(100);
        setIsUploading(false);
        setShowVideoPlayer(true);
        console.log("Video uploaded successfully:", res);
      })
      .catch((error) => {
        setIsUploading(false);
        console.error("Video upload failed:", error);
        console.error("Error response:", error.response);
        console.error("Error status:", error.response?.status);
        console.error("Error data:", error.response?.data);
        console.error("Error headers:", error.response?.headers);
        console.error("Full error object:", error);

        if (error.response?.status === 415) {
          setVideoFileError(
            "Server rejected video format. Please ensure you're uploading an MP4 file."
          );
        } else {
          setVideoFileError("Failed to upload video. Please try again.");
        }
      });
  };

  const ValidateFormQuizFor = () => {
    var isValid = true;

    // if (
    //   userTypeId !== userTypes?.Consultant &&
    //   homeAccept === false &&
    //   ukAccept === false &&
    //   intAccept === false
    // ) {
    //   isValid = false;
    //   setAcceptError(true);
    // }

    if (!videoTitle.trim()) {
      setVideoTitleError("Video title is required");
      isValid = false;
    }

    if (!videoFile) {
      setVideoFileError("Video file is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmitQuizFor = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isAcceptedHome", homeAccept);
    subdata.append("isAcceptedEU_UK", ukAccept);
    subdata.append("isAcceptedInternational", intAccept);

    // Add video file to FormData
    if (videoFile) {
      subdata.append("videoFile", videoFile);
    }

    for (var value of subdata) {
      console.log(value);
    }

    if (ValidateFormQuizFor()) {
      // setButtonStatus(true);
      // setProgress(true);
      // post("Consultant/GeneralInformation", subdata).then((res) => {
      //   setProgress(false);
      //   addToast(res?.data?.message, {
      //     appearance: res?.data?.isSuccess === true ? "success" : "error",
      //     autoDismiss: true,
      //   });
      //   setButtonStatus(false);
      //   setSuccess(!success);
      //   history.push(`/consultantPersonalInformation/${consultantRegisterId}`);
      // });
    }
  };

  const ValidateFormVideoFor = () => {
    var isValid = true;

    // if (
    //   userTypeId !== userTypes?.Consultant &&
    //   homeAccept === false &&
    //   ukAccept === false &&
    //   intAccept === false
    // ) {
    //   isValid = false;
    //   setAcceptError(true);
    // }

    return isValid;
  };
  const handleSubmitVideoFor = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isAcceptedHome", homeAccept);
    subdata.append("isAcceptedEU_UK", ukAccept);
    subdata.append("isAcceptedInternational", intAccept);

    if (ValidateFormVideoFor()) {
      // setButtonStatus(true);
      // setProgress(true);
      // post("Consultant/GeneralInformation", subdata).then((res) => {
      //   setProgress(false);
      //   addToast(res?.data?.message, {
      //     appearance: res?.data?.isSuccess === true ? "success" : "error",
      //     autoDismiss: true,
      //   });
      //   setButtonStatus(false);
      //   setSuccess(!success);
      //   history.push(`/consultantPersonalInformation/${consultantRegisterId}`);
      // });
    }
  };

  return (
    <div className="p-4">
      {/* Steps */}
      <Row>
        <Col md="3" sm="12">
          <h5 className="fw-bold mb-3">Consultant Guided video</h5>
          {/* Your Consultant Step */}
          <div
            className={`d-flex align-items-center p-4 cursor-pointer ${
              activeStep === "consultant" ? "click-bg-shadow" : ""
            }`}
            style={{
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleStepClick("consultant")}
          >
            {activeStep === "consultant" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "#0D9596",
                }}
              ></div>
            )}
            <div
              className={`d-flex align-items-center justify-content-center me-3 ${
                activeStep === "consultant" ? "text-black" : "text-muted"
              }`}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border:
                  activeStep === "consultant"
                    ? "2px solid black"
                    : "2px solid #dee2e6",
              }}
            >
              {activeStep === "consultant" ? (
                <i className="fas fa-check" style={{ fontSize: "12px" }}></i>
              ) : (
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#dee2e6",
                  }}
                ></div>
              )}
            </div>
            <h5
              className="fw-bold mt-1 ml-2"
              style={{
                color: activeStep === "consultant" ? "black" : "#6c757d",
              }}
            >
              Your Consultant
            </h5>
          </div>
          {/* Video and Quiz Step */}
          <div
            className={`d-flex align-items-center p-4 cursor-pointer ${
              activeStep === "videoQuiz" ? "click-bg-shadow" : ""
            }`}
            style={{
              cursor: "pointer",
              position: "relative",
            }}
            onClick={() => handleStepClick("videoQuiz")}
          >
            {activeStep === "videoQuiz" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "#0D9596",
                }}
              ></div>
            )}
            <div
              className={`d-flex align-items-center justify-content-center me-3 ${
                activeStep === "videoQuiz" ? "text-black" : "text-muted"
              }`}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                border:
                  activeStep === "videoQuiz"
                    ? "2px solid black"
                    : "2px solid #dee2e6",
              }}
            >
              {activeStep === "videoQuiz" ? (
                <i className="fas fa-check" style={{ fontSize: "12px" }}></i>
              ) : (
                <div
                  style={{
                    borderRadius: "50%",
                    backgroundColor: "#dee2e6",
                  }}
                ></div>
              )}
            </div>
            <h5
              className="fw-bold mt-1 ml-2"
              style={{
                color: activeStep === "videoQuiz" ? "black" : "#6c757d",
              }}
            >
              Video and Quiz
            </h5>
          </div>
        </Col>
        <Col md="9" sm="12">
          {activeStep === "consultant" && (
            <YourConsultantForm
              handleSubmitVideoFor={handleSubmitVideoFor}
              branchOptions={branchOptions}
              branchLabel={branchLabel}
              branchValue={branchValue}
              selectBranch={selectBranch}
              branchError={branchError}
              countryName={countryName}
              countryLabel={countryLabel}
              countryValue={countryValue}
              selectCountry={selectCountry}
              countryError={countryError}
              homeAccept={homeAccept}
              setAcceptError={setAcceptError}
              setHomeAccept={setHomeAccept}
              intAccept={intAccept}
              setIntAccept={setIntAccept}
              ukAccept={ukAccept}
              setUkAccept={setUkAccept}
              acceptError={acceptError}
            />
          )}
          {activeStep === "videoQuiz" && (
            <VideoQuizForm
              handleSubmitQuizFor={handleSubmitQuizFor}
              handleFirstNameChange={handleFirstNameChange}
              videoTitle={videoTitle}
              videoTitleError={videoTitleError}
              handleVideoFileChange={handleVideoFileChange}
              videoFile={videoFile}
              videoFileError={videoFileError}
              showVideoPlayer={showVideoPlayer}
              uploadProgress={uploadProgress}
              isUploading={isUploading}
              videoUrl={videoUrl}
              question={question}
              setQuestion={setQuestion}
              setIsQuestionEditing={setIsQuestionEditing}
              questionError={questionError}
              setQuestionError={setQuestionError}
              answers={answers}
              handleCorrectAnswerChange={handleCorrectAnswerChange}
              handleAnswerChange={handleAnswerChange}
              handleAnswerKeyPress={handleAnswerKeyPress}
              handleAnswerBlur={handleAnswerBlur}
              handleAnswerClick={handleAnswerClick}
              isDetailedAnswerEditing={isDetailedAnswerEditing}
              detailedAnswer={detailedAnswer}
              handleDetailedAnswerChange={handleDetailedAnswerChange}
              handleDetailedAnswerKeyPress={handleDetailedAnswerKeyPress}
              handleDetailedAnswerBlur={handleDetailedAnswerBlur}
              handleDetailedAnswerClick={handleDetailedAnswerClick}
              isQuestionEditing={isQuestionEditing}
              handleQuestionChange={handleQuestionChange}
              handleQuestionKeyPress={handleQuestionKeyPress}
              handleQuestionClick={handleQuestionClick}
              handleQuestionBlur={handleQuestionBlur}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoAndQuizFor;
