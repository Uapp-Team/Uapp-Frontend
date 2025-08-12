import React from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import QuizAnswers from "./QuizAnswers";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";

const VideoQuizForm = ({
  handleSubmitQuizFor,
  handleFirstNameChange,
  videoTitle,
  videoTitleError,
  handleVideoFileChange,
  videoFile,
  videoFileError,
  showVideoPlayer,
  uploadProgress,
  isUploading,
  videoUrl,
  question,
  setQuestion,
  setIsQuestionEditing,
  questionError,
  setQuestionError,
  answers,
  handleCorrectAnswerChange,
  handleAnswerChange,
  handleAnswerKeyPress,
  handleAnswerBlur,
  handleAnswerClick,
  isDetailedAnswerEditing,
  detailedAnswer,
  handleDetailedAnswerChange,
  handleDetailedAnswerKeyPress,
  handleDetailedAnswerBlur,
  handleDetailedAnswerClick,
  isQuestionEditing,
  handleQuestionChange,
  handleQuestionKeyPress,
  handleQuestionClick,
  handleQuestionBlur,
}) => {
  // Ensure upload progress never exceeds 100%
  const safeUploadProgress = Math.min(uploadProgress || 0, 100);
  return (
    <div>
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
                      accept="video/mp4"
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
                                (1 - safeUploadProgress / 100)
                              }`}
                              transform="rotate(-90 60 60)"
                            />
                          </svg>
                          <div className="quiz-circular-progress-text">
                            <span className="quiz-progress-percentage">
                              {Math.round(safeUploadProgress)}%
                            </span>
                          </div>
                        </div>

                        <div className="quiz-upload-status">
                          {isUploading ? (
                            <span className="quiz-status-uploading">
                              <i className="fas fa-spinner fa-spin me-1"></i>
                              Uploading...
                            </span>
                          ) : safeUploadProgress >= 100 ? (
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
                            <source src={videoUrl} type={videoFile.type} />
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
                          onChange={() => handleCorrectAnswerChange(answer.id)}
                          className="quiz-answer-radio"
                        />
                      </div>

                      <div className="quiz-answer-input-container">
                        {answer.isEditing ? (
                          <Input
                            type="text"
                            value={answer.text}
                            onChange={(e) =>
                              handleAnswerChange(answer.id, e.target.value)
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
                    {detailedAnswer || "Write in details answer (optional)"}
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
    </div>
  );
};

export default VideoQuizForm;
