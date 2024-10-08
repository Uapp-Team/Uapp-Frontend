import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Row } from "reactstrap";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import { rootUrl } from "../../../constants/constants";

import { useToasts } from "react-toast-notifications";
import post from "../../../helpers/post";
import { userTypes } from "../../../constants/userTypeConstant";
import axios from "axios";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const Apply = ({
  success,
  setSuccess,
  modalCampus,
  currentData,
  modalDeliveryPattern,
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
  modalCampusLabel,
  modalIntakeLabel,
  modalDeliveryPatternLabel,
}) => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();

  const [campusError, setCampusError] = useState(false);
  const [intakeError, setIntakeError] = useState(false);
  const [deliveryError, setDeliveryError] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);

  // drawer code antd end

  const [message, setMessage] = useState("");
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);

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

  const customStyles2 = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),
  };

  const closeModal = () => {
    setModalCampusLabel("Select Campus");
    setModalCampusValue(0);
    setModalDeliveryPatternLabel("Select Delivery Pattern");
    setModalDeliveryPatternValue(0);
    setModalIntakeLabel("Select Intake");
    setModalIntakeValue(0);
    setModal(false);
  };

  const submitModalForm = (event) => {
    event.preventDefault();

    if (primaryCampus?.campusId) {
      if (modalIntakeValue === 0) {
        setIntakeError(true);
      } else if (modalDeliveryPatternValue === 0) {
        setDeliveryError(true);
      } else {
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
      setModalCampusLabel("Select Campus");
      setModalCampusValue(0);
      setModalDeliveryPatternLabel("Select Delivery Pattern");
      setModalDeliveryPatternValue(0);
      setModalIntakeLabel("Select Intake");
      setModalIntakeValue(0);
      setModal(false);
      setSuccess(!success);
    } else {
      if (modalCampusValue === 0) {
        setCampusError(true);
      } else if (modalIntakeValue === 0) {
        setIntakeError(true);
      } else if (modalDeliveryPatternValue === 0) {
        setDeliveryError(true);
      } else {
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

  return (
    <>
      <Row>
        <Col md="12">
          <FormGroup>
            <h4 className="px-3 mb-3">{currentData?.title}</h4>
          </FormGroup>
        </Col>
      </Row>

      <Form className="px-3" onSubmit={submitModalForm}>
        <Row>
          <Col md="6">
            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Campus
              </span>

              <>
                {!(campusValue === 0) ? (
                  <>
                    <span className="my-2">{primaryCampus?.campusName}</span>

                    <input
                      type="hidden"
                      name="providerTypeId"
                      id="providerTypeId"
                    />
                  </>
                ) : (
                  <>
                    <Select
                      className="my-2"
                      styles={customStyles2}
                      options={modalCampusOptions}
                      value={{
                        label: modalCampusLabel,
                        value: modalCampusValue,
                      }}
                      name="providerTypeId"
                      id="providerTypeId"
                      onChange={(opt) =>
                        selectModalCampus(opt.label, opt.value)
                      }
                    />
                    {campusError ? (
                      <span className="text-danger">Campus is required</span>
                    ) : null}
                  </>
                )}
              </>
            </FormGroup>

            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Intake
              </span>

              <Select
                className="my-2"
                styles={customStyles2}
                options={modalIntakeOptions}
                value={{
                  label: modalIntakeLabel,
                  value: modalIntakeValue,
                }}
                name="providerTypeId"
                id="providerTypeId"
                onChange={(opt) => selectModalIntake(opt.label, opt.value)}
              />
              {intakeError ? (
                <span className="text-danger">Intake Must be Selected</span>
              ) : null}
            </FormGroup>

            <FormGroup>
              <span>
                <span className="text-danger">*</span>
                Delivery Pattern
              </span>

              <Select
                className="my-2"
                styles={customStyles2}
                options={modalDeliveryOptions}
                value={{
                  label: modalDeliveryPatternLabel,
                  value: modalDeliveryPatternValue,
                }}
                name="providerTypeId"
                id="providerTypeId"
                onChange={(opt) => selectModalDelivery(opt.label, opt.value)}
              />
              {deliveryError ? (
                <span className="text-danger">
                  Delivery Pattern Must be Selected
                </span>
              ) : null}
            </FormGroup>

            <FormGroup>
              <span>Additional Message</span>

              <Input
                className="my-2"
                type="textarea"
                name="statement"
                id="statement"
                rows={4}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col md="6">
            {/* <h6>
              {" "}
              <span className="text-gray"> EU Fee: </span> £{" "}
              {currentData?.eu_Fee}
            </h6>
            <h6>
              {" "}
              <span className="text-gray"> Home Fee: </span> £{" "}
              {currentData?.home_Fee}
            </h6> */}

            <div className="opacity-5 mb-3">
              <h6>Education Required</h6>
              {/* {elStatus?.ieltsMessage && (
                <span>IELTS: {elStatus?.ieltsMessage}</span>
              )}
              <br /> */}
              {elStatus?.requiredEducationlevel && (
                <span>
                  {/* Level Requirement:  */}
                  {elStatus?.requiredEducationlevel}
                </span>
              )}
              <br />
              {elStatus?.requiredResultInPercentage && (
                <span>
                  {/* Percentage Requirement:  */}
                  {elStatus?.requiredResultInPercentage}
                </span>
              )}
            </div>

            <div className="my-3 opacity-5">
              <span
                className={
                  eligibilityWhileAppying?.isEligible ? "celg" : "celg2"
                }
              >
                {eligibilityWhileAppying?.isEligible
                  ? "Considering your qualifications, you are eligible to apply"
                  : "Considering your qualifications, there is a gap between requirement and your qualification"}
              </span>
            </div>

            <FormGroup>
              <h6>Are You Sure You Want to Apply for This Course?</h6>
              <CancelButton cancel={closeModal} />

              {(studentDataValue !== "0" || userType === userTypes?.Student) &&
              applicationCount < 3 ? (
                <SaveButton
                  text="Submit"
                  progress={progress}
                  buttonStatus={buttonStatus}
                />
              ) : null}
            </FormGroup>
          </Col>
        </Row>
        {/* <FormGroup row>
          <Col md="12">
            <CancelButton cancel={closeModal} />

            {(studentDataValue !== "0" || userType === userTypes?.Student) &&
            applicationCount < 3 ? (
              <SaveButton
                text="Submit"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            ) : null}
          </Col>
        </FormGroup> */}
      </Form>

      <div className="px-3 text-gray pb-3">
        <span>Note: Please Provide Correct Information. </span>
        <span>You Can Have Three Applications at a Time.</span>
      </div>
    </>
  );
};

export default Apply;
