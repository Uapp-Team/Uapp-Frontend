import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Select from "react-select";
import get from "../../../../../helpers/get";

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
  }, []);

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  const ValidateForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("isAcceptedHome", homeAccept);
    subdata.append("isAcceptedEU_UK", ukAccept);
    subdata.append("isAcceptedInternational", intAccept);

    for (var value of subdata) {
      console.log(value);
    }

    if (ValidateForm()) {
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
        <Col md="4" sm="12">
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
        <Col md="8" lg="6">
          {activeStep === "consultant" && (
            <div className="p-4">
              <Form onSubmit={handleSubmit}>
                <Card>
                  <CardBody>
                    {" "}
                    <Row>
                      <Col lg="6" md="8">
                        <FormGroup className="has-icon-left position-relative">
                          <span>
                            <span className="text-danger">*</span>
                            Branch
                          </span>

                          <Select
                            className="form-mt"
                            options={branchOptions}
                            value={{ label: branchLabel, value: branchValue }}
                            onChange={(opt) =>
                              selectBranch(opt.label, opt.value)
                            }
                            name="BranchId"
                            id="BranchId"
                            // isDisabled={consultantRegisterId ? true : false}
                          />

                          {branchError && (
                            <span className="text-danger">
                              Branch is required
                            </span>
                          )}
                        </FormGroup>

                        <FormGroup className="has-icon-left position-relative">
                          <span>
                            {/* <span className="text-danger">*</span> */}
                            <b> Recruitment Type</b>
                          </span>

                          <Row>
                            <Col
                              xs="2"
                              sm="12"
                              md="3"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    setHomeAccept(e.target.checked);
                                    setAcceptError(false);
                                  }}
                                  checked={homeAccept}
                                />
                                <span className="mr-2">Home/UK </span>
                              </FormGroup>
                            </Col>

                            <Col
                              xs="2"
                              sm="12"
                              md="3"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    setUkAccept(e.target.checked);
                                    setAcceptError(false);
                                  }}
                                  checked={ukAccept}
                                />
                                <span className="mr-2">EU/EEU </span>
                              </FormGroup>
                            </Col>

                            <Col
                              xs="2"
                              sm="12"
                              md="3"
                              className="text-center mt-2"
                            >
                              <FormGroup check inline>
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    setIntAccept(e.target.checked);
                                    setAcceptError(false);
                                    console.log(
                                      "Tria testing",
                                      e.target.checked
                                    );
                                  }}
                                  checked={intAccept}
                                />
                                <span className="mr-2">International </span>
                              </FormGroup>
                            </Col>
                          </Row>
                          {acceptError ? (
                            <span className="text-danger">
                              Recruitment type is required
                            </span>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <FormGroup className="mt-4 text-right">
                  <SaveButton
                    text="Save and Next"
                    // progress={progress}
                    // buttonStatus={buttonStatus}
                  />
                </FormGroup>
              </Form>
            </div>
          )}
          {activeStep === "videoQuiz" && (
            <div className="p-4">
              <h4>akif</h4>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideoAndQuizFor;
