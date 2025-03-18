import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Col,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { rootUrl } from "../../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import { userTypes } from "../../../../../constants/userTypeConstant";
import axios from "axios";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Student from "../../../../../components/Dropdown/Student";
import get from "../../../../../helpers/get";

const Apply = ({
  success,
  setSuccess,
  modalCampus,
  currentData,
  modalDeliveryPattern,
  setModal,
  primaryCampus,
  campusValue,
  setModalCampusValue,
  setModalIntake,
  modalIntake,
  setModalIntakeValue,
  setModalDeliveryPatternValue,
  modalIntakeValue,
  modalDeliveryPatternValue,
  modalCampusValue,
  unInfo,
}) => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  const [isApply, setIsApply] = useState("");
  const [studentDataValue, setStudentDataValue] = useState(
    userType === userTypes?.Student.toString()
      ? localStorage.getItem("referenceId")
      : 0
  );
  const [elStatus, setElStatus] = useState({});
  const [fee, setFee] = useState({});

  const [campusError, setCampusError] = useState(false);
  const [intakeError, setIntakeError] = useState(false);
  const [deliveryError, setDeliveryError] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);

  // drawer code antd end

  const [message, setMessage] = useState("");
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (modalCampusValue !== 0 && studentDataValue !== 0) {
      get(
        `CampusSubjects/CheckEligibility/${currentData?.id}/${modalCampusValue}/${studentDataValue}`
      ).then((res) => {
        setIsApply(res);
      });
    }
  }, [currentData, modalCampusValue, studentDataValue]);

  const checkEligibilityWhileApplying = (student) => {
    get(
      `Eligibility/ApplicationOverview/${currentData?.universityId}/${currentData?.id}/${student}`
    ).then((res) => {
      setElStatus(res);
    });

    get(`Eligibility/ApplicationSummery/${student}/${currentData?.id}`).then(
      (res) => {
        setFee(res);
      }
    );
  };

  const modalCampusOptions = modalCampus?.map((data) => ({
    label: data?.campusName,
    value: data?.campusId,
  }));

  const selectModalCampus = (label, value) => {
    setCampusError(false);
    // setModalCampusLabel(label);
    setModalCampusValue(value);

    axios
      .get(
        `${rootUrl}SubjectIntake/CampusSubjectIntakes/${currentData?.id}/${value}`,
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
    // setModalIntakeLabel(label);
    setModalIntakeValue(value);
  };

  const modalDeliveryOptions = modalDeliveryPattern?.map((data) => ({
    label: data?.name,
    value: data?.deliveryPatterId,
  }));

  const selectModalDelivery = (label, value) => {
    setDeliveryError(false);
    // setModalDeliveryPatternLabel(label);
    setModalDeliveryPatternValue(value);
  };

  const closeModal = () => {
    // setModalCampusLabel("Select Campus");
    setModalCampusValue(0);
    // setModalDeliveryPatternLabel("Select Delivery Pattern");
    setModalDeliveryPatternValue(0);
    // setModalIntakeLabel("Select Intake");
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
          universitySubjectId: currentData?.id,
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
        // setModalCampusLabel("Select Campus");
        setModalCampusValue(0);
        // setModalDeliveryPatternLabel("Select Delivery Pattern");
        setModalDeliveryPatternValue(0);
        // setModalIntakeLabel("Select Intake");
        setModalIntakeValue(0);
        setModal(false);
        setSuccess(!success);
      }
    } else {
      if (ValidForm()) {
        const subData = {
          studentId:
            userType === userTypes?.Student
              ? localStorage.getItem("referenceId")
              : studentDataValue,
          universitySubjectId: currentData?.id,
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
        // setModalCampusLabel("Select Campus");
        setModalCampusValue(0);
        // setModalDeliveryPatternLabel("Select Delivery Pattern");
        setModalDeliveryPatternValue(0);
        // setModalIntakeLabel("Select Intake");
        setModalIntakeValue(0);
        setModal(false);
        setSuccess(!success);
      }
    }
  };

  if (modalCampusOptions?.length === 1) {
    // setModalCampusLabel(modalCampusOptions[0]?.label);
    setModalCampusValue(modalCampusOptions[0]?.value);
  }
  if (modalIntakeOptions?.length === 1) {
    // setModalIntakeLabel(modalIntakeOptions[0]?.label);
    setModalIntakeValue(modalIntakeOptions[0]?.value);
  }
  if (modalDeliveryOptions?.length === 1) {
    // setModalDeliveryPatternLabel(modalDeliveryOptions[0]?.label);
    setModalDeliveryPatternValue(modalDeliveryOptions[0]?.value);
  }

  return (
    <>
      <ModalHeader toggle={closeModal}> Apply Course</ModalHeader>

      <Form className="px-3" onSubmit={submitModalForm}>
        <ModalBody className="overflowY-search-modal-630px">
          {" "}
          <Row className="px-3">
            <Col xs={12}>
              <h3 className="text-dark-green">{currentData?.name}</h3>
              <div className="d-flex">
                <img
                  src={rootUrl + unInfo[0]}
                  className="apply-logo mr-2"
                  alt="logo-img"
                />
                <p className="text-gray-70 fw-500">{unInfo[1]}</p>
              </div>
            </Col>
          </Row>
          <Row className="px-3">
            <Col className="applyright my-3">
              <Row>
                <Col lg="7">
                  {" "}
                  <div className="mb-4">
                    <Student
                      data={studentDataValue}
                      setData={setStudentDataValue}
                      name="student"
                      error={() => {}}
                      setError={() => {}}
                      action={checkEligibilityWhileApplying}
                    />
                  </div>
                </Col>
              </Row>

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

              <Row>
                <Col lg="7">
                  <div className="mb-4 p-4 Adm-Requirements-parts">
                    <p>
                      <b>Admission Requirements</b>
                    </p>

                    {elStatus?.admissionRequirements?.length !== 0 ? (
                      <>
                        {elStatus?.admissionRequirements?.map((data, i) => (
                          <ul className="list-unstyled for-all-li">
                            <li className="pl-3" key={i}>
                              {" "}
                              <span className="mr-1">
                                {data?.isEligible === true ? (
                                  <i
                                    class="fa-solid fa-check"
                                    style={{ color: "#079455" }}
                                  ></i>
                                ) : (
                                  <i
                                    class="fa-solid fa-x"
                                    style={{ color: "#D92D20" }}
                                  ></i>
                                )}
                              </span>
                              {data?.details}
                            </li>
                          </ul>
                        ))}
                      </>
                    ) : (
                      <span>No requirements found</span>
                    )}
                  </div>
                </Col>
                <Col lg="5">
                  {" "}
                  <div className="mb-4 p-4 Std-Qualification">
                    <p>
                      <b>Student Qualification</b>
                    </p>
                    {elStatus?.studentQualifications?.length !== 0 ? (
                      <>
                        {elStatus?.studentQualifications?.map((data, i) => (
                          <li className="pl-3 mb-2" key={i}>
                            {data}
                          </li>
                        ))}
                      </>
                    ) : (
                      <span>No requirements found</span>
                    )}
                  </div>
                </Col>
              </Row>

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

              <>
                {" "}
                <div>
                  <>
                    {!(campusValue === 0) ? (
                      <>
                        <span className="my-2">
                          You are applying at <b>{primaryCampus?.campusName}</b>{" "}
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
                      <span className="text-danger">
                        Intake Must be Selected
                      </span>
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

                      <div className="my-4">
                        <h5>
                          <b>Application Fee: £{fee?.applicationFee}</b>
                        </h5>
                      </div>

                      <div>
                        {studentDataValue === 0 ? (
                          <span>
                            <i class="fas fa-exclamation-circle"></i> Please
                            Select Student
                          </span>
                        ) : modalCampusOptions.length === 0 ||
                          modalIntakeOptions.length === 0 ||
                          modalDeliveryOptions.length === 0 ? (
                          <span className=" mt-1 mb-2 cardborder-for-apply-course">
                            <i class="fas fa-exclamation-circle"></i> The course
                            is currently not accepting applications. You can
                            apply for similar courses in other universities
                          </span>
                        ) : fee?.activeApplications === 0 ? (
                          <span className=" mt-1 mb-2 cardborder-for-apply-course">
                            <i class="fas fa-exclamation-circle"></i> Please
                            Provide Correct Information. You can have 3 active
                            applications at a time.
                          </span>
                        ) : (
                          <span className=" mt-1 mb-2 cardborder-for-apply-course">
                            <i class="fas fa-exclamation-circle"></i> Please
                            Provide Correct Information. You have{" "}
                            {fee?.activeApplications} active application
                            currently and have {3 - fee?.activeApplications}{" "}
                            application left.
                          </span>
                        )}
                      </div>

                      <div className="mt-2">
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
                                <CancelButton
                                  cancel={closeModal}
                                  text={"Close"}
                                />
                              </div>
                            ) : (
                              <>
                                <div className="mb-3">
                                  <input
                                    onChange={(e) => {
                                      setCheck(e.target.checked);
                                    }}
                                    type="checkbox"
                                    name=""
                                    value=""
                                    checked={check}
                                  />{" "}
                                  <b>
                                    Are you sure want to apply this Course?{" "}
                                  </b>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  )
                )}
              </>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <CancelButton cancel={closeModal} />

          {check && (
            <>
              {" "}
              {studentDataValue !== "0" || userType === userTypes?.Student ? (
                <SaveButton
                  text="Apply"
                  progress={progress}
                  buttonStatus={buttonStatus}
                />
              ) : null}
            </>
          )}
        </ModalFooter>
      </Form>
    </>
  );
};

export default Apply;
