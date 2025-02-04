import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Form, FormGroup, Input, Label } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

const OtherInformation = () => {
  const { applicationStudentId, update } = useParams();
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const [disability, setDisability] = useState(null);
  console.log(disability);

  const [disabilityError, setDisabilityError] = useState("");
  const [crime, setCrime] = useState(null);
  console.log(crime);

  const [crimeError, setCrimeError] = useState("");
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [data, setData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [disabilityDes, setDisabilityDes] = useState("");
  const [disabilityDesError, setDisabilityDesError] = useState("");
  const [criminal, setCriminal] = useState("");
  const [criminalError, setCriminalError] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get(`OtherInformation/GetByStudentId/${applicationStudentId}`).then(
      (res) => {
        console.log(res);
        setDisabilityDes(res?.disabilityDescription);
        setCriminal(res?.criminalConvictionsDescription);
        setDisability(
          res != null && res?.isHaveDisability === true
            ? true
            : res != null && res?.isHaveDisability === false
            ? false
            : null
        );

        setCrime(
          res != null && res?.isHaveCriminalConvictions === true
            ? true
            : res != null && res?.isHaveCriminalConvictions === false
            ? false
            : null
        );

        setData(res);
        setId(res?.id);
      }
    );
  }, [success, applicationStudentId]);

  const handleDescription = (e) => {
    let data = e.target.value.trimStart();
    setDisabilityDes(data);
    if (data === "") {
      setDisabilityDesError("Disability description is required");
    } else {
      setDisabilityDesError("");
    }
  };
  const handleCriminal = (e) => {
    let data = e.target.value.trimStart();
    setCriminal(data);
    if (data === "") {
      setCriminalError("Criminal convictions Description is required");
    } else {
      setCriminalError("");
    }
  };

  useEffect(() => {
    if (disability !== null) {
      setDisabilityError("");
    }
    if (crime !== null) {
      setCrimeError("");
    }
  }, [crime, disability]);

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (disability === null) {
      isFormValid = false;
      setDisabilityError("Select one options");
    }
    if (disability === true && !disabilityDes) {
      isFormValid = false;
      setDisabilityDesError("Disability description is required");
    }
    if (crime === null) {
      isFormValid = false;
      setCrimeError("Select one options");
    }
    if (crime === true && !criminal) {
      isFormValid = false;
      setCriminalError("Criminal convictions Description is required");
    }

    return isFormValid;
  };

  const handleOtherInformation = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("isHaveDisability", disability);
    subData.append("isHaveCriminalConvictions", crime);
    if (validateRegisterForm()) {
      if (update) {
        setButtonStatus(true);
        setProgress(true);
        put("OtherInformation/Update", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/uploadDocument/${applicationStudentId}`);
          }
          setSuccess(!success);
        });
      } else if (id) {
        setButtonStatus(true);
        setProgress(true);
        put("OtherInformation/Update", subData).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/uploadDocument/${applicationStudentId}`);
          }
          setSuccess(!success);
        });
      } else {
        setButtonStatus(true);
        post("OtherInformation/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/uploadDocument/${applicationStudentId}`);
            setSuccess(!success);
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

  const goPrevious = () => {
    history.push(`/addPersonalStatement/${applicationStudentId}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Other Information"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"10"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card>
        <CardBody>
          <Form onSubmit={handleOtherInformation}>
            <p className="section-title"> Other Information</p>

            <input type="hidden" name="id" id="id" value={id} />

            <input
              type="hidden"
              name="studentId"
              id="studentId"
              value={applicationStudentId}
            />

            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span> Do you have any
                  disabilities?
                </span>
                <div>
                  <FormGroup check inline className="form-mt">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveDisabilityYes"
                      value={true}
                      checked={disability === true}
                      onChange={() => setDisability(true)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveDisabilityYes"
                    >
                      Yes
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveDisabilityNO"
                      value={false}
                      checked={disability === false}
                      onChange={() => setDisability(false)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveDisabilityNO"
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
                <span className="text-danger">{disabilityError}</span>
              </Col>
            </FormGroup>

            {disability === true ? (
              <FormGroup row>
                <Col lg="6" md="8">
                  <span>
                    <span className="text-danger">*</span> Disability
                    Description
                  </span>

                  <Input
                    type="textarea"
                    name="DisabilityDescription"
                    id="DisabilityDescription"
                    rows={4}
                    defaultValue={data?.disabilityDescription}
                    onChange={(e) => {
                      handleDescription(e);
                    }}
                  />
                  <span className="text-danger">{disabilityDesError}</span>
                </Col>
              </FormGroup>
            ) : null}

            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  {" "}
                  <span className="text-danger">*</span>
                  Do you have any criminal conviction?
                </span>

                <div>
                  <FormGroup check inline className="form-mt">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveCriminalConvictionsYes"
                      value={true}
                      checked={crime === true}
                      onChange={() => setCrime(true)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveCriminalConvictionsYes"
                    >
                      Yes
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveCriminalConvictionsNo"
                      value={false}
                      checked={crime === false}
                      onChange={() => setCrime(false)}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveCriminalConvictionsNo"
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
                <span className="text-danger">
                  {<span className="text-danger">{crimeError}</span>}
                </span>
              </Col>
            </FormGroup>

            {crime === true ? (
              <FormGroup row>
                <Col lg="6" md="8">
                  <span>
                    <span className="text-danger">*</span> Criminal convictions
                    Description
                  </span>

                  <Input
                    type="textarea"
                    name="CriminalConvictionsDescription"
                    id="CriminalConvictionsDescription"
                    rows={4}
                    defaultValue={data?.criminalConvictionsDescription}
                    onChange={(e) => {
                      handleCriminal(e);
                    }}
                  />
                  <span className="text-danger">{criminalError}</span>
                </Col>
              </FormGroup>
            ) : null}

            <FormGroup row className=" mt-4">
              <Col lg="6" md="8" className="d-flex justify-content-between">
                <PreviousButton action={goPrevious} />
                {permissions?.includes(permissionList?.Edit_Student) ? (
                  <SaveButton
                    text="Save and Next"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                ) : null}
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default OtherInformation;
