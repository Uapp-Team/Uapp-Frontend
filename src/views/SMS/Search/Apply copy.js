import React, { useEffect, useState } from "react";
import { Form, Input, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { rootUrl } from "../../../constants/constants";

import { useToasts } from "react-toast-notifications";
import post from "../../../helpers/post";
import { userTypes } from "../../../constants/userTypeConstant";
import axios from "axios";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import get from "../../../helpers/get";

const Apply = ({
  success,
  setSuccess,
  modalCampus,
  setModalCampus,
  currentData,
  modalDeliveryPattern,
  setModalDeliveryPattern,
  setModal,
  primaryCampus,
  studentDataValue,
  eligibilityWhileAppying,
  elStatus,
  campusValue,
  applicationCount,
  setModalCampusLabel,
  setModalCampusValue,
  setModalIntake,
  modalIntake,
  setModalIntakeLabel,
  setModalIntakeValue,
  setModalDeliveryPatternLabel,
  setModalDeliveryPatternValue,
  modalIntakeValue,
  modalDeliveryPatternValue,
  modalCampusValue,
  fee,
  unInfo,
  modalCampusLabel,
  modalIntakeLabel,
  modalDeliveryPatternLabel,
}) => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();

  const [campusError, setCampusError] = useState(false);
  const [intakeError, setIntakeError] = useState(false);
  const [deliveryError, setDeliveryError] = useState(false);
  const [isApply, setIsApply] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  // drawer code antd end

  const [message, setMessage] = useState("");
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    if (modalCampusValue !== 0 && studentDataValue !== 0) {
      get(
        `CampusSubjects/CheckEligibility/${currentData?.subjectId}/${modalCampusValue}/${studentDataValue}`
      ).then((res) => {
        setIsApply(res);
      });
    }
  }, [currentData, modalCampusValue, studentDataValue]);

  const modalCampusOptions = modalCampus?.map((data) => ({
    label: data?.campusName,
    value: data?.campusId,
  }));

  const selectModalCampus = (label, value) => {
    setCampusError(false);
    setModalCampusLabel(label);
    setModalCampusValue(value);

    axios
      .get(
        `${rootUrl}SubjectIntake/CampusSubjectIntakes/${currentData?.subjectId}/${value}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setModalIntake(res?.data?.result);
      });
  };

  const modalIntakeOptions = modalIntake?.map((data) => ({
    label: data?.intakeName,
    value: data?.intakeId,
  }));

  const selectModalIntake = (label, value) => {
    setIntakeError(false);
    setModalIntakeLabel(label);
    setModalIntakeValue(value);
  };

  const modalDeliveryOptions = modalDeliveryPattern?.map((data) => ({
    label: data?.deliveryPatternName,
    value: data?.deliveryPatternId,
  }));

  const selectModalDelivery = (label, value) => {
    setDeliveryError(false);
    setModalDeliveryPatternLabel(label);
    setModalDeliveryPatternValue(value);
  };

  const closeModal = () => {
    setModalCampus([]);
    setModalIntake([]);
    setModalDeliveryPattern([]);
    setModalCampusLabel("Select Campus");
    setModalCampusValue(0);
    setModalDeliveryPatternLabel("Select Delivery Pattern");
    setModalDeliveryPatternValue(0);
    setModalIntakeLabel("Select Intake");
    setModalIntakeValue(0);
    setModal(false);
  };

  let ValidForm = () => {
    let isFormValid = true;

    if (!primaryCampus?.campusId && modalCampusValue === 0) {
      isFormValid = false;
      setCampusError(true);
    }
    if (modalIntakeValue === 0) {
      isFormValid = false;
      setIntakeError(true);
    }
    if (modalDeliveryPatternValue === 0) {
      isFormValid = false;
      setDeliveryError(true);
    }

    return isFormValid;
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    if (primaryCampus?.campusId) {
      if (ValidForm()) {
        const subData = {
          studentId:
            userType === userTypes?.Student
              ? localStorage.getItem("referenceId")
              : studentDataValue,
          universitySubjectId: currentData?.subjectId,
          inakeId: modalIntakeValue,
          deliveryPatternId: modalDeliveryPatternValue,
          campusId: primaryCampus?.campusId,
          additionalMessage: message,
        };
        setButtonStatus(true);
        setProgress(true);
        post(`Apply/Submit`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModalCampusLabel("Select Campus");
            setModalCampusValue(0);
            setModalDeliveryPatternLabel("Select Delivery Pattern");
            setModalDeliveryPatternValue(0);
            setModalIntakeLabel("Select Intake");
            setModalIntakeValue(0);
            setModal(false);
            setSuccess(!success);
            history.push(
              `/applicationDetails/${res?.data?.result?.applicationId}/${
                userType === userTypes?.Student
                  ? localStorage.getItem("referenceId")
                  : studentDataValue
              }`
            );
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else {
      if (ValidForm()) {
        const subData = {
          studentId:
            userType === userTypes?.Student
              ? localStorage.getItem("referenceId")
              : studentDataValue,
          universitySubjectId: currentData?.subjectId,
          inakeId: modalIntakeValue,
          deliveryPatternId: modalDeliveryPatternValue,
          campusId: modalCampusValue,
          additionalMessage: message,
        };
        setButtonStatus(true);
        setProgress(true);
        post(`Apply/Submit`, subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setModalCampusLabel("Select Campus");
            setModalCampusValue(0);
            setModalDeliveryPatternLabel("Select Delivery Pattern");
            setModalDeliveryPatternValue(0);
            setModalIntakeLabel("Select Intake");
            setModalIntakeValue(0);
            setModal(false);
            setSuccess(!success);
            history.push(
              `/applicationDetails/${res?.data?.result?.applicationId}/${
                userType === userTypes?.Student
                  ? localStorage.getItem("referenceId")
                  : studentDataValue
              }`
            );
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  if (modalCampusOptions?.length === 1) {
    setModalCampusLabel(modalCampusOptions[0]?.label);
    setModalCampusValue(modalCampusOptions[0]?.value);
  }
  if (modalIntakeOptions?.length === 1) {
    setModalIntakeLabel(modalIntakeOptions[0]?.label);
    setModalIntakeValue(modalIntakeOptions[0]?.value);
  }
  if (modalDeliveryOptions?.length === 1) {
    setModalDeliveryPatternLabel(modalDeliveryOptions[0]?.label);
    setModalDeliveryPatternValue(modalDeliveryOptions[0]?.value);
  }

  return (
    <>
      <Row className="px-3">
        <Col xs={10}>
          <h3 className="text-dark-green">{currentData?.title}</h3>
          <div className="d-flex">
            <img
              src={rootUrl + unInfo[0]}
              className="apply-logo"
              alt="logo-img"
            />
            <p className="text-gray-70 fw-500">{unInfo[1]}</p>
          </div>
        </Col>
        <Col xs={2} className="text-right">
          <i className="fas fa-times pointer" onClick={closeModal}></i>
        </Col>
        <hr />
      </Row>

      <Form className="px-3" onSubmit={submitModalForm}>
        <Row>
          <Col lg="6" className="applyborder applyright my-3">
            {!elStatus?.englishWaiverAvailable &&
            !elStatus?.moiAccepted ? null : (
              <div className="mb-4">
                {elStatus?.englishWaiverAvailable && (
                  <span className="tag-key">English waiver available</span>
                )}

                {elStatus?.moiAccepted && (
                  <span className="tag-key">MOI Accepted</span>
                )}
              </div>
            )}

            <div className="mb-4">
              <p>
                <b>Admission Requirements</b>
              </p>

              {elStatus?.admissionRequirements?.length !== 0 ? (
                <>
                  {elStatus?.admissionRequirements?.map((data, i) => (
                    <li key={i}>{data}</li>
                  ))}
                </>
              ) : (
                <span>No requirements found</span>
              )}
            </div>

            <div className="mb-4">
              <p>
                <b>Student Qualification</b>
              </p>
              {elStatus?.studentQualifications?.length !== 0 ? (
                <>
                  {elStatus?.studentQualifications?.map((data, i) => (
                    <li key={i}>{data}</li>
                  ))}
                </>
              ) : (
                <span>No requirements found</span>
              )}
            </div>

            {elStatus?.nonEligibilityKeys?.length !== 0 && (
              <div className="mb-4">
                {elStatus?.nonEligibilityKeys?.map((data, i) => (
                  <li className="text-danger" key={i}>
                    {data}
                  </li>
                ))}
                <p>
                  Considering your qualification there is a mismatch between
                  your qualifications and admission requirements. <br />
                  However you are still able to apply with less success
                  possibility.
                </p>
              </div>
            )}

            <div className="my-4">
              <span
                className={
                  elStatus?.isEligible ? "tag-key celg" : "tag-key celg2"
                }
              >
                {elStatus?.isEligible
                  ? "You are eligible to apply"
                  : "You are not eligible to apply"}
              </span>
            </div>

            <div className="my-4">
              <h5>
                <b>Application Fee: £{fee?.applicationFee}</b>
              </h5>
            </div>
          </Col>
          <Col lg="6" className="applyleft my-3">
            <div>
              <>
                {!(campusValue === "0") ? (
                  <>
                    <span className="my-2">
                      You are appling at <b>{primaryCampus?.campusName}</b>{" "}
                    </span>

                    <input type="hidden" name="campusId" id="campusId" />
                  </>
                ) : (
                  <>
                    {modalCampusOptions.length === 0 ? (
                      <p className="text-yellow">No Campus available</p>
                    ) : modalCampusOptions.length === 1 ? (
                      <>
                        <p>
                          <b>Where do you want to study?</b>
                        </p>

                        {modalCampusOptions?.map((data, i) => (
                          <input
                            key={i}
                            type="button"
                            name="campusId"
                            id="campusId"
                            value={data?.label}
                            className={
                              modalCampusValue === data?.value
                                ? "btn-key-checked"
                                : "btn-key"
                            }
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        <p>
                          <b>Where do you want to study?</b>
                        </p>

                        {modalCampusOptions?.map((data, i) => (
                          <input
                            key={i}
                            type="button"
                            name="campusId"
                            id="campusId"
                            value={data?.label}
                            onClick={() => {
                              selectModalCampus(data.label, data.value);
                            }}
                            className={
                              modalCampusValue === data?.value
                                ? "btn-key-checked"
                                : "btn-key"
                            }
                          />
                        ))}

                        <br />
                        {campusError ? (
                          <span className="text-danger">
                            Campus is required
                          </span>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </>
            </div>

            {modalIntakeOptions.length === 0 ? (
              <p className="text-yellow">No Intake available</p>
            ) : modalIntakeOptions.length === 1 ? (
              <>
                <p>
                  <b>When do you want to Start?</b>
                </p>
                {modalIntakeOptions?.map((data, i) => (
                  <input
                    key={i}
                    type="button"
                    name="inakeId"
                    id="inakeId"
                    value={data?.label}
                    className={
                      modalIntakeValue === data?.value
                        ? "btn-key-checked"
                        : "btn-key"
                    }
                  />
                ))}
              </>
            ) : (
              <div>
                <p>
                  <b>When do you want to Start?</b>
                </p>

                {modalIntakeOptions?.map((data, i) => (
                  <>
                    <input
                      key={i}
                      type="button"
                      name="inakeId"
                      id="inakeId"
                      value={data?.label}
                      onClick={() => {
                        selectModalIntake(data.label, data.value);
                      }}
                      className={
                        modalIntakeValue === data?.value
                          ? "btn-key-checked"
                          : "btn-key"
                      }
                    />
                  </>
                ))}
                <br />

                {intakeError ? (
                  <span className="text-danger">Intake Must be Selected</span>
                ) : null}
              </div>
            )}

            {modalDeliveryOptions.length === 0 ? (
              <input
                type="hidden"
                name="deliveryPatternId"
                id="deliveryPatternId"
                value={3}
              />
            ) : modalDeliveryOptions.length === 1 ? (
              <div>
                <p>
                  <b>Delivery pattern</b>
                </p>
                {modalDeliveryOptions?.map((data, i) => (
                  <>
                    <input
                      key={i}
                      type="button"
                      name="deliveryPatternId"
                      id="deliveryPatternId"
                      value={data?.label}
                      className={
                        modalDeliveryPatternValue === data?.value
                          ? "btn-key-checked"
                          : "btn-key"
                      }
                    />
                  </>
                ))}
              </div>
            ) : (
              <div>
                <p>
                  <b>Delivery pattern</b>
                </p>
                {modalDeliveryOptions?.map((data, i) => (
                  <>
                    <input
                      key={i}
                      type="button"
                      name="deliveryPatternId"
                      id="deliveryPatternId"
                      value={data?.label}
                      onClick={() => {
                        selectModalDelivery(data.label, data.value);
                      }}
                      className={
                        modalDeliveryPatternValue === data?.value
                          ? "btn-key-checked"
                          : "btn-key"
                      }
                    />
                  </>
                ))}
                <br />
                {deliveryError ? (
                  <span className="text-danger">
                    Delivery Pattern Must be Selected
                  </span>
                ) : null}
              </div>
            )}

            {isApply.canApply === false ? (
              <p className="text-danger">
                <b>{isApply?.message} </b>
              </p>
            ) : (
              modalCampusOptions.length !== 0 &&
              modalIntakeOptions.length !== 0 &&
              modalDeliveryOptions.length !== 0 && (
                <>
                  <div>
                    <p>
                      <b>Additional message</b>
                    </p>

                    <Input
                      type="textarea"
                      name="additionalMessage"
                      id="additionalMessage"
                      rows={4}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="mt-3">
                    {fee?.isAlreadyApplied ? (
                      <div className="text-center">
                        <p>
                          <strong>
                            You have already applied to this Courses
                          </strong>
                        </p>
                        <CancelButton cancel={closeModal} text={"Close"} />
                      </div>
                    ) : (
                      <>
                        {fee?.activeApplications >= 3 ? (
                          <div className="text-center">
                            <p>
                              <strong>
                                You have {fee?.activeApplications} active
                                application. You can not apply.
                              </strong>
                            </p>
                            <CancelButton cancel={closeModal} text={"Close"} />
                          </div>
                        ) : (
                          <>
                            <p>
                              <b>Are you sure want to apply this Course? </b>
                            </p>
                            <CancelButton cancel={closeModal} />

                            {studentDataValue !== "0" ||
                            userType === userTypes?.Student ? (
                              <SaveButton
                                text="Submit"
                                progress={progress}
                                buttonStatus={buttonStatus}
                              />
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </>
              )
            )}
          </Col>
        </Row>
      </Form>

      <div className="p-3 text-yellow">
        {modalCampusOptions.length === 0 ||
        modalIntakeOptions.length === 0 ||
        modalDeliveryOptions.length === 0 ? (
          <span>
            <i class="fas fa-exclamation-circle"></i> The course is currently
            not accepting applications. You can apply for similar courses in
            other universities
          </span>
        ) : fee?.activeApplications === 0 ? (
          <span>
            <i class="fas fa-exclamation-circle"></i> Please Provide Correct
            Information. You can have 3 active applications at a time.
          </span>
        ) : (
          <span>
            <i class="fas fa-exclamation-circle"></i> Please Provide Correct
            Information. You have {fee?.activeApplications} active application
            currently and have {3 - fee?.activeApplications} application left.
          </span>
        )}
      </div>
    </>
  );
};

export default Apply;
