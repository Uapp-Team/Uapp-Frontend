import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Card, Col, Row } from "reactstrap";

const Index = () => {
  const [activeStep, setActiveStep] = useState("consultant");

  const handleStepClick = (step) => {
    setActiveStep(step);
    if (step === "consultant") {
      // toggleConsultantModal();
    } else if (step === "videoQuiz") {
      // toggleVideoQuizModal();
    }
  };

  return (
    <div className="custom-card-border mb-3 ">
      {/* Steps */}
      {/* <Form onSubmit={handleAllPart}>
      
      </Form> */}
      <Row>
        <Col md="3" sm="12" className="border-right pr-0">
          <h5 className="fw-bold mb-3">Consultant Guided video</h5>

          <div className="d-flex align-items-center" style={{ minHeight: 60 }}>
            <div id="chart" className="p-0" style={{ width: 60, height: 60 }}>
              <ReactApexChart
                options={{
                  chart: {
                    type: "radialBar",
                    sparkline: { enabled: true },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -90,
                      endAngle: 270,
                      hollow: {
                        margin: 0,
                        size: "70%",
                        // background: "#F4F6F8",
                      },
                      track: {
                        background: "#F4F6F8",
                        strokeWidth: "100%",
                        margin: 0,
                      },
                      dataLabels: {
                        show: true,
                        name: {
                          show: false,
                        },
                        value: {
                          show: true,
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "#222",
                          offsetY: 4,
                          formatter: function (val) {
                            return `${val}%`;
                          },
                        },
                      },
                    },
                  },
                  colors: ["#FC7300"],
                  stroke: {
                    lineCap: "round",
                  },
                  labels: [""],
                }}
                series={[20]}
                type="radialBar"
                height={60}
                width={60}
              />
            </div>
            <span
              style={{
                marginLeft: 12,
                fontSize: 16,
                color: "#222",
                fontWeight: 400,
              }}
            >
              Completed
            </span>
          </div>

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
        <Col md="9" sm="12" className="p-4">
          {/* {activeStep === "consultant" && (
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
              detailedAnswerError={detailedAnswerError}
              handleDetailedAnswerChange={handleDetailedAnswerChange}
              handleDetailedAnswerKeyPress={handleDetailedAnswerKeyPress}
              handleDetailedAnswerBlur={handleDetailedAnswerBlur}
              handleDetailedAnswerClick={handleDetailedAnswerClick}
              isQuestionEditing={isQuestionEditing}
              handleQuestionChange={handleQuestionChange}
              handleQuestionKeyPress={handleQuestionKeyPress}
              handleQuestionClick={handleQuestionClick}
              handleQuestionBlur={handleQuestionBlur}
              savedQuestions={savedQuestions}
              handleSaveQuestion={handleSaveQuestion}
              showQuestionForm={showQuestionForm}
              handleAddMoreQuestion={handleAddMoreQuestion}
              handleDeleteQuestion={handleDeleteQuestion}
              currentQuestionNumber={currentQuestionNumber}
              FileList1={FileList1}
              setFileList1={setFileList1}
              previewImage1={previewImage1}
              setPreviewImage1={setPreviewImage1}
              setPreviewTitle1={setPreviewTitle1}
              previewTitle1={previewTitle1}
              previewVisible1={previewVisible1}
              setPreviewVisible1={setPreviewVisible1}
              error={error}
              setError={setError}
            />
          )} */}
        </Col>
      </Row>
    </div>
  );
};

export default Index;
