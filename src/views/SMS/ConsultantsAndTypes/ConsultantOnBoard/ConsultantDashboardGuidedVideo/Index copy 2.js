import React, { useEffect, useState } from "react";
import { Col, Modal, ModalFooter, ModalHeader, Row } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import Uget from "../../../../../helpers/Uget";
import post from "../../../../../helpers/post";
import CloseBtn from "../../../../../components/buttons/CloseBtn";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState("consultant");
  const [videoWatched, setVideoWatched] = useState(true);
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
    if (step === "consultant") {
      // toggleConsultantModal();
    } else if (step === "videoQuiz") {
      // toggleVideoQuizModal();
    }
  };

  useEffect(() => {
    Uget("ConsultantOnboarding/GetVideoByConsultant").then((res) => {
      setData(res?.data);
      // setVideoWatched(res?.data?.isVideoShown);
    });
  }, []);

  const handleNext = (id) => {
    post(`OnboardingQuizAttempt/CreateQuizAttempt?onboardingQuizId=${id}`).then(
      (res) => {
        console.log(res);
        if (res?.status === 200) {
          setVideoWatched(true);
        }
      }
    );
  };
  const handleAnswer = (id, answer) => {
    console.log(answer, id, "answer");

    const isExist = answers.find(
      (ans) =>
        ans.onboardingQuestionId === id && ans.onboardingAnswerId === answer
    );
    if (isExist) {
      setAnswers(
        answers.filter(
          (ans) =>
            ans.onboardingQuestionId !== id && ans.onboardingAnswerId !== answer
        )
      );
    } else {
      setAnswers([
        ...answers,
        { onboardingQuestionId: id, onboardingAnswerId: answer },
      ]);
    }
  };
  const handleQuiz = (id) => {
    // const formData = new FormData();
    // formData.append("onboardingQuizId", id);
    // formData.append("consultantQuestionAnswersDtos", JSON.stringify(answers));

    const formData = {
      onboardingQuizId: id,
      consultantQuestionAnswersDtos: answers,
    };

    post(`OnboardingQuizAttempt/QuestionAttempt`, formData).then((res) => {
      console.log(res?.data?.data?.questionResults);
      if (res?.status === 200) {
        setQuizResults(res?.data?.data);
        toggleModal();
      }
    });
  };

  return (
    <>
      <div className="custom-card-border mb-3 ">
        <Row>
          <Col md="3" sm="12" className="border-right pr-0">
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
                Guided video
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
                Quiz
              </h5>
            </div>
          </Col>
          <Col md="9" sm="12" className="p-4 bg-white">
            {/* Guided Video Section */}
            {(activeStep === "consultant" || activeStep === "videoQuiz") && (
              <div>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3" style={{ fontSize: 17 }}>
                    Guided video
                  </h6>

                  <div
                    style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      boxShadow: "0 2px 8px #0001",
                    }}
                  >
                    {data?.blobUrl && (
                      <video
                        src={data?.blobUrl}
                        width="100%"
                        height="450"
                        controls
                        // autoPlay
                        // loop
                        className="w-100 bg-black"
                        onEnded={() => handleNext(data?.id)}
                        poster={data?.videoImage}
                        // poster="https://uappstorage.blob.core.windows.net/onboarding-temp-videos/012c64b0-eda8-4128-ac3d-d912f797058c.mp4?sp=r&st=2025-08-14T12:07:51Z&se=2025-08-14T20:22:51Z&sv=2024-11-04&sr=b&sig=SqSvJWOrN2eaaJ14egFo6R4jYlsYuNI9cveQmNmoIS8%3D"
                      />
                    )}
                  </div>

                  {videoWatched && (
                    <SaveButton
                      text="Next"
                      className="mt-3 px-4 py-2"
                      style={{ fontWeight: 500, fontSize: 15 }}
                      action={() => handleStepClick("videoQuiz")}
                      // action={() => handleNext(data?.id)}
                    />
                  )}
                </div>
              </div>
            )}
            {/* Quiz Section */}
            {activeStep === "videoQuiz" && (
              <div>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3" style={{ fontSize: 17 }}>
                    Quiz
                  </h6>
                  <span className="text-muted fs-14px">
                    Some question has multiple choice
                  </span>
                  <hr className="my-4" />
                  <Row>
                    <Col md="12" lg="9">
                      {data?.questions?.map((question) => (
                        <div
                          className="custom-card-border p-4 mb-4"
                          key={question?.id}
                        >
                          <div className="fw-600 fs-20px mb-2">
                            Question {question?.order} of{" "}
                            {data?.questions?.length}
                          </div>
                          <div className="mb-2" style={{ fontSize: 15 }}>
                            {question?.question}
                          </div>
                          <div>
                            {question?.answers?.map((answer) => (
                              <div className="form-check mb-1">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name={`q${question?.id}`}
                                  id={`q${question?.id}a${answer?.id}`}
                                  onChange={() =>
                                    handleAnswer(question?.id, answer?.id)
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`q${question?.id}a${answer?.id}`}
                                >
                                  {answer?.text}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      <div className="mt-4">
                        <PreviousButton
                          className="px-4"
                          action={() => handleStepClick("consultant")}
                        />

                        <SaveButton
                          text="Done"
                          className="px-4"
                          action={() => handleQuiz(data?.id)}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader className="d-flex justify-content-end align-items-center">
          <CloseBtn action={toggleModal} />
        </ModalHeader>

        {isQuizDone ? (
          <div>
            <div className="p-4" style={{ minWidth: 320 }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={{ fontWeight: 500, fontSize: 16 }}>
                  Question {data?.questionCount} of {data?.questionCount}
                </span>
                <span
                  style={{ fontWeight: 500, fontSize: 15, color: "#667085" }}
                >
                  {quizResults?.percentange?.toString()}% Completed
                </span>
              </div>
              <div>
                {quizResults?.questionResults?.map((result, index) => (
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      border: "1px solid #EAECF0",
                      borderLeft: `4px solid ${
                        result?.isCorrect ? "#0D9596" : "#F04438"
                      }`,
                      marginBottom: 16,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#045D5E",
                      }}
                    >
                      Question {index + 1} of{" "}
                      {quizResults?.questionResults?.length}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#344054",
                        margin: "8px 0",
                      }}
                    >
                      {result?.questionText}
                    </div>
                    <div
                      style={{
                        color: result?.isCorrect ? "#0D9596" : "#F04438",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {result?.isCorrect ? "Correct answer" : "Wrong answer"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-4" style={{ minWidth: 320 }}>
            <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 4 }}>
              Question {data?.questionCount} of {data?.questionCount}
            </div>
            <div style={{ fontSize: 20, color: "#495057", marginBottom: 16 }}>
              100% Completed
            </div>
            <div className="my-3">
              <span
                style={{
                  display: "inline-block",
                  background: "#E6F4EA",
                  borderRadius: "50%",
                  width: 56,
                  height: 56,
                  lineHeight: "56px",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                <svg
                  width="81"
                  height="81"
                  viewBox="0 0 81 81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M42.6455 23H25.1455C23.763 23 22.6455 21.88 22.6455 20.5C22.6455 19.12 23.763 18 25.1455 18H42.6455C44.028 18 45.1455 19.12 45.1455 20.5C45.1455 21.88 44.028 23 42.6455 23Z"
                    fill="#05E594"
                  />
                  <path
                    d="M50.1455 35.5H25.1455C23.763 35.5 22.6455 34.38 22.6455 33C22.6455 31.62 23.763 30.5 25.1455 30.5H50.1455C51.528 30.5 52.6455 31.62 52.6455 33C52.6455 34.38 51.528 35.5 50.1455 35.5Z"
                    fill="#05E594"
                  />
                  <path
                    d="M39.7955 45.5H25.1455C23.763 45.5 22.6455 44.38 22.6455 43C22.6455 41.62 23.763 40.5 25.1455 40.5H39.7955C41.178 40.5 42.2955 41.62 42.2955 43C42.2955 44.38 41.178 45.5 39.7955 45.5Z"
                    fill="#05E594"
                  />
                  <path
                    d="M33.7955 55.5H25.1455C23.763 55.5 22.6455 54.38 22.6455 53C22.6455 51.62 23.763 50.5 25.1455 50.5H33.7955C35.178 50.5 36.2955 51.62 36.2955 53C36.2955 54.38 35.178 55.5 33.7955 55.5Z"
                    fill="#05E594"
                  />
                  <path
                    d="M33.7955 70.5H22.6455C15.753 70.5 10.1455 64.8925 10.1455 58V15.5C10.1455 8.6075 15.753 3 22.6455 3H52.6455C59.538 3 65.1455 8.6075 65.1455 15.5V36C65.1455 37.38 64.028 38.5 62.6455 38.5C61.263 38.5 60.1455 37.38 60.1455 36V15.5C60.1455 11.365 56.7805 8 52.6455 8H22.6455C18.5105 8 15.1455 11.365 15.1455 15.5V58C15.1455 62.135 18.5105 65.5 22.6455 65.5H33.7955C35.178 65.5 36.2955 66.62 36.2955 68C36.2955 69.38 35.178 70.5 33.7955 70.5Z"
                    fill="#045D5E"
                  />
                  <g clip-path="url(#clip0_23419_2581)">
                    <path
                      d="M50.2952 59.0001L54.2952 63.0001L62.2952 55.0001M69.6286 59.0001C69.6286 66.3639 63.659 72.3334 56.2952 72.3334C48.9315 72.3334 42.9619 66.3639 42.9619 59.0001C42.9619 51.6363 48.9315 45.6667 56.2952 45.6667C63.659 45.6667 69.6286 51.6363 69.6286 59.0001Z"
                      stroke="#045D5E"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_23419_2581">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(40.2954 43)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </div>
            <div>Thanks for completing that!</div>
          </div>
        )}

        <ModalFooter className="d-flex justify-content-center">
          {isQuizDone ? (
            <>
              {quizResults?.percentage === 100 ? (
                <SaveButton
                  text="Done"
                  action={() => {
                    history.push("/");
                  }}
                />
              ) : (
                <SaveButton
                  text="Try Again"
                  className="px-4 bg-danger text-white"
                  action={() => {
                    toggleModal();
                    setQuizResults([]);
                    setAnswers([]);
                  }}
                />
              )}
            </>
          ) : (
            <SaveButton
              text="Continue"
              action={() => {
                setIsQuizDone(true);
              }}
            />
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Index;
