import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Form, Label, FormGroup, Col, Input } from "reactstrap";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const OtherInformation = () => {
  const { applicationStudentId, update } = useParams();
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const [disability, setDisability] = useState(false);
  const [crime, setCrime] = useState(false);
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
            : res != null && res?.isHaveDisability === null
            ? false
            : false
        );

        setCrime(
          res != null && res?.isHaveCriminalConvictions === true
            ? true
            : res != null && res?.isHaveCriminalConvictions === null
            ? false
            : false
        );

        setData(res);
        setId(res?.id);
      }
    );
  }, [success, applicationStudentId]);

  const handleDescription = (e) => {
    setDisabilityDes(e.target.value);
    if (e.target.value === "") {
      setDisabilityDesError("Disability description is required");
    } else {
      setDisabilityDesError("");
    }
  };
  const handleCriminal = (e) => {
    setCriminal(e.target.value);
    if (e.target.value === "") {
      setCriminalError("Criminal convictions Description is required");
    } else {
      setCriminalError("");
    }
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (disability === true && !disabilityDes) {
      isFormValid = false;
      setDisabilityDesError("Disability description is required");
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
                  <span className="text-danger">*</span> Have Disability?
                </span>
                <div>
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveDisability"
                      onChange={() => setDisability(!disability)}
                      name="isHaveDisability"
                      value={true}
                      checked={disability === true}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveDisability"
                    >
                      Yes
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveDisability"
                      onChange={() => setDisability(!disability)}
                      name="isHaveDisability"
                      value={false}
                      checked={disability === false}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveDisability"
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
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
                  Have Criminal Convictions?
                </span>

                <div>
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveCriminalConvictions"
                      onChange={() => setCrime(!crime)}
                      name="isHaveCriminalConvictions"
                      value={true}
                      checked={crime === true}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveCriminalConvictions"
                    >
                      Yes
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="isHaveCriminalConvictions"
                      onChange={() => setCrime(!crime)}
                      name="isHaveCriminalConvictions"
                      value={false}
                      checked={crime === false}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="isHaveCriminalConvictions"
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
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
