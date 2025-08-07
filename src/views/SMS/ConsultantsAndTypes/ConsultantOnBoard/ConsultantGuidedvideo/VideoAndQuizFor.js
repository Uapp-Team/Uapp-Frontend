import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Select from "react-select";
import get from "../../../../../helpers/get";
import QuizAnswers from "./QuizAnswers";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import YourConsultantForm from "./YourConsultantForm";

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

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setShowVideoPlayer(false);
    setVideoUrl(null);

    if (!file) {
      setVideoFileError("Video file is required");
    } else {
      // Check file type
      const allowedTypes = [
        "video/mp4",
        "video/avi",
        "video/mov",
        "video/wmv",
        "video/flv",
      ];
      if (!allowedTypes.includes(file.type)) {
        setVideoFileError(
          "Please select a valid video file (MP4, AVI, MOV, WMV, FLV)"
        );
      } else {
        const maxSize = 200 * 1024 * 1024;
        if (file.size > maxSize) {
          setVideoFileError("Video file size should be less than 200MB");
        } else {
          setVideoFileError("");
          // Create video URL but don't show player yet
          const url = URL.createObjectURL(file);
          setVideoUrl(url);
          // Start upload simulation - player will show at 100%
          simulateUploadProgress();
        }
      }
    }
  };

  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setShowVideoPlayer(false); // Hide video player during upload

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Show video player only when upload is complete
          setShowVideoPlayer(true);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment between 0-15
      });
    }, 200); // Update every 200ms
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
            <Form onSubmit={handleSubmitQuizFor}>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="7" sm="12">
                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          <span className="text-danger">*</span>Video Title
                        </span>

                        <Input
                          className="form-mt"
                          type="text"
                          name="firstName"
                          id="firstName"
                          onChange={(e) => {
                            handleFirstNameChange(e);
                          }}
                          placeholder="Enter video title"
                          value={videoTitle}
                        />

                        <span className="text-danger">{videoTitleError}</span>
                      </FormGroup>

                      <FormGroup className="has-icon-left position-relative">
                        <span>
                          <span className="text-danger">*</span>Upload Video
                        </span>

                        <div className="form-mt Quiz-video-border">
                          <Input
                            className="d-none"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoFileChange}
                            id="videoFile"
                            name="videoFile"
                          />
                          <label
                            htmlFor="videoFile"
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <i
                              className="fas fa-cloud-upload-alt"
                              style={{
                                fontSize: "2rem",
                                color: "#6c757d",
                              }}
                            ></i>
                            <span
                              style={{
                                color: "#6c757d",
                                fontWeight: "500",
                              }}
                            >
                              {videoFile ? videoFile.name : "Upload video"}
                            </span>
                            {videoFile && (
                              <span
                                style={{
                                  fontSize: "0.875rem",
                                  color: "#28a745",
                                }}
                              >
                                ✓ File selected
                              </span>
                            )}
                          </label>
                        </div>

                        <span className="text-danger">{videoFileError}</span>
                      </FormGroup>
                    </Col>
                    <Col md="5" sm="12">
                      {videoFile && (
                        <div className="quiz-progress-container">
                          {!showVideoPlayer ? (
                            <div className="quiz-circular-progress-container">
                              <div className="quiz-circular-progress">
                                <svg
                                  className="quiz-circular-progress-svg"
                                  viewBox="0 0 120 120"
                                >
                                  <defs>
                                    <linearGradient
                                      id="progressGradient"
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="0%"
                                    >
                                      <stop offset="40%" stopColor="#045D5E" />

                                      <stop offset="90%" stopColor="#045D5E" />
                                      <stop offset="100%" stopColor="#05E594" />
                                    </linearGradient>
                                  </defs>
                                  <circle
                                    className="quiz-circular-progress-bg"
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    fill="none"
                                    stroke="#e9ecef"
                                    strokeWidth="8"
                                  />
                                  <circle
                                    className="quiz-circular-progress-fill"
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    fill="none"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 50}`}
                                    strokeDashoffset={`${
                                      2 *
                                      Math.PI *
                                      50 *
                                      (1 - uploadProgress / 100)
                                    }`}
                                    transform="rotate(-90 60 60)"
                                  />
                                </svg>
                                <div className="quiz-circular-progress-text">
                                  <span className="quiz-progress-percentage">
                                    {Math.round(uploadProgress)}%
                                  </span>
                                </div>
                              </div>

                              <div className="quiz-upload-status">
                                {isUploading ? (
                                  <span className="quiz-status-uploading">
                                    <i className="fas fa-spinner fa-spin me-1"></i>
                                    Uploading...
                                  </span>
                                ) : uploadProgress >= 100 ? (
                                  <span className="quiz-status-complete">
                                    <i className="fas fa-check-circle me-1"></i>
                                    Upload Complete
                                  </span>
                                ) : (
                                  <span className="quiz-status-ready">
                                    <i className="fas fa-clock me-1"></i>
                                    Ready to upload
                                  </span>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="video-player-container">
                              <div
                                className="video-player-header"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  marginBottom: "10px",
                                }}
                              >
                                <h6 className="mb-0">
                                  <i
                                    className="fas fa-play-circle me-2"
                                    style={{ color: "#0D9596" }}
                                  ></i>
                                  Video Preview
                                </h6>
                              </div>
                              <div className="video-player-wrapper">
                                <video
                                  controls
                                  className="video-player"
                                  style={{
                                    width: "100%",
                                    maxHeight: "300px",
                                    borderRadius: "8px",
                                    backgroundColor: "#000",
                                  }}
                                >
                                  <source
                                    src={videoUrl}
                                    type={videoFile.type}
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <div>
                    {/* Question Section */}
                    <div className="quiz-question-section">
                      <div className="quiz-question-header">
                        <span className="quiz-character-counter">
                          {question.length}/150
                        </span>
                        <i
                          className="fas fa-trash quiz-delete-icon"
                          onClick={() => {
                            setQuestion("");
                            setIsQuestionEditing(false);
                            setQuestionError("");
                          }}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </div>

                      <div className="quiz-question-input-container">
                        {isQuestionEditing ? (
                          <Input
                            type="text"
                            value={question}
                            onChange={handleQuestionChange}
                            onKeyPress={handleQuestionKeyPress}
                            onBlur={handleQuestionBlur}
                            placeholder="Write question"
                            className="quiz-question-input"
                            autoFocus
                          />
                        ) : (
                          <div
                            className="quiz-question-placeholder"
                            onClick={handleQuestionClick}
                          >
                            {question || "Write question"}
                          </div>
                        )}
                      </div>
                      <div className="separator"></div>

                      {questionError && (
                        <div className="error-message">{questionError}</div>
                      )}
                    </div>

                    {/* Answer Section */}
                    <div className="quiz-answer-section">
                      <div className="quiz-answer-instruction">
                        Check the write answer
                      </div>

                      <div className="quiz-answer-options">
                        {answers.map((answer, index) => (
                          <div key={answer.id} className="quiz-answer-option">
                            <div className="quiz-radio-container">
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={answer.isCorrect}
                                onChange={() =>
                                  handleCorrectAnswerChange(answer.id)
                                }
                                className="quiz-answer-radio"
                              />
                            </div>

                            <div className="quiz-answer-input-container">
                              {answer.isEditing ? (
                                <Input
                                  type="text"
                                  value={answer.text}
                                  onChange={(e) =>
                                    handleAnswerChange(
                                      answer.id,
                                      e.target.value
                                    )
                                  }
                                  onKeyPress={(e) =>
                                    handleAnswerKeyPress(e, answer.id)
                                  }
                                  onBlur={() => handleAnswerBlur(answer.id)}
                                  placeholder={`Answer ${answer.id}`}
                                  className="quiz-answer-input"
                                  autoFocus
                                />
                              ) : (
                                <div
                                  className="quiz-answer-placeholder"
                                  onClick={() => handleAnswerClick(answer.id)}
                                >
                                  {answer.text || `Answer ${answer.id}`}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Answer Section */}
                    <div className="quiz-question-input-container">
                      {isDetailedAnswerEditing ? (
                        <Input
                          type="text"
                          value={detailedAnswer}
                          onChange={handleDetailedAnswerChange}
                          onKeyPress={handleDetailedAnswerKeyPress}
                          onBlur={handleDetailedAnswerBlur}
                          placeholder="Write in details answer (optional)"
                          className="quiz-question-input"
                          autoFocus
                        />
                      ) : (
                        <div
                          className="quiz-question-placeholder"
                          onClick={handleDetailedAnswerClick}
                        >
                          {detailedAnswer ||
                            "Write in details answer (optional)"}
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <div className="quiz-save-button-container">
                      <button
                        className="quiz-save-button"
                        onClick={() => {
                          // Handle save logic here
                          console.log("Question:", question);
                          console.log("Answers:", answers);
                          console.log("Detailed Answer:", detailedAnswer);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <QuizAnswers />
              {/* Add More Button */}
              <div className="quiz-add-more-container">
                <button className="quiz-add-more-button" type="button">
                  <i className="fas fa-plus quiz-add-more-icon"></i>
                  <span className="quiz-add-more-text">Add more</span>
                </button>
              </div>

              <FormGroup className="mt-4 text-left">
                <PreviousButton />
                <SaveButton
                  text="Submit"
                  // progress={progress}
                  // buttonStatus={buttonStatus}
                />
              </FormGroup>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoAndQuizFor;
