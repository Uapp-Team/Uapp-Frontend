import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import post from "../../../../../helpers/post";
import Select from "react-select";
import get from "../../../../../helpers/get";
import { userTypes } from "../../../../../constants/userTypeConstant";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import { useParams } from "react-router-dom";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const StudentRegister = () => {
  const history = useHistory();
  const { consultantId } = useParams();
  const referenceId = localStorage.getItem("referenceId");
  const userTypeId = localStorage.getItem("userType");

  const [studentType, setStudentType] = useState([]);
  const [studentTypeLabel, setStudentTypeLabel] = useState(
    "Select Preferred Country"
  );
  const [studentTypeValue, setStudentTypeValue] = useState(0);

  const [consultant, setConsultant] = useState([]);
  const [consultantLabel, setconsultantLabel] = useState("Select Consultant");
  const [consultantValue, setConsultantValue] = useState(0);

  const [consultantError, setConsultantError] = useState(false);
  const [studentError, setStudentError] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailExistError, setEmailExistError] = useState(true);
  const [registerId, setRegisterId] = useState();
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  //api part starts here

  useEffect(() => {
    // get("UniversityCountryDD/Index").then((res) => {
    //   setStudentType(res);
    // });

    if (userTypeId !== userTypes?.Consultant.toString()) {
      if (consultantId) {
        setConsultantValue(consultantId);
      } else {
        get("consultantdd/ActiveConsultant").then((res) => {
          setConsultant(res);
        });
      }
    } else {
      setConsultantValue(referenceId);
    }
  }, [consultantId, referenceId, userTypeId]);

  useEffect(() => {
    get(
      `RecruitmentFor/ByConsultant/${
        consultantId ? consultantId : consultantValue
      }`
    ).then((res) => {
      setStudentType(res);
    });
  }, [consultantId, consultantValue]);

  //api part ends here

  //Dropdown selection part starts here

  const studentTypeName = studentType?.map((student) => ({
    label: student?.name,
    value: student?.id,
  }));

  const selectStudentType = (label, value) => {
    setStudentError(false);
    setStudentTypeLabel(label);
    setStudentTypeValue(value);
  };

  const consultantName = consultant?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantError(false);
    setconsultantLabel(label);
    setConsultantValue(value);
  };

  //Dropdown selection part ends here

  //Form on change validation starts here
  const handleFirstNameChange = (e) => {
    let data = e.target.value.trimStart();
    setFirstName(data);
    if (data === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    let data = e.target.value.trimStart();
    setLastName(data);
    if (data === "") {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };

  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
        setEmailExistError(res);
        if (!res) {
          setEmailError("Email already exists");
        } else {
          setEmailError("");
        }
      });
    }
  };

  //Form on change validation ends here

  //Form submitting validation starts here

  const ValidateForm = () => {
    var isValid = true;
    if (studentTypeValue === 0) {
      setStudentError(true);
      isValid = false;
    }

    if (
      !consultantId &&
      userTypeId !== userTypes?.Consultant &&
      userTypeId !== userTypes?.AdmissionManager &&
      userTypeId !== userTypes?.AdmissionOfficer &&
      userTypeId !== userTypes?.ProviderAdmin &&
      consultantValue === 0
    ) {
      setConsultantError(true);
      isValid = false;
    }

    // if (consultantValue === 0) {
    //   setConsultantError(true);
    //   isValid = false;
    // }
    if (!firstName) {
      setFirstNameError("First Name is required");
      isValid = false;
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isValid = false;
      setEmailError("Email is not Valid");
    }

    if (emailExistError === false) {
      isValid = false;
      setEmailExistError(emailExistError);
    }
    return isValid;
  };

  //Form validation ends here

  //Form submitting starts here

  const handleRegisterStudent = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);
    var IsFormValid = ValidateForm();
    if (IsFormValid) {
      setButtonStatus(true);
      setProgress(true);
      setFirstName("");
      setLastName("");
      setEmail("");
      post("StudentRegistration/Create", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        if (res?.status === 200 && res?.data?.isSuccess === true) {
          setIsModalOpen(true);
          setRegisterId(res?.data?.result?.id);
          setStudentTypeValue(0);
          setconsultantLabel("Select Consultant");
          setConsultantValue(0);
          setStudentTypeLabel("Select Preferred Country");
          setFirstName("");
          setLastName("");
          setEmail("");
        } else {
          return;
        }
      });
    }
  };

  //Form submitting ends here

  //Cancel form starts

  const cancelForm = () => {
    history.push("/studentList");
  };

  //Cancel form ends

  //after submitting form redirect this page

  const goToProfile = () => {
    history.push(`/addStudentInformation/${registerId}`);
  };

  //after submitting form redirect this page

  console.log("first");
  return (
    <div>
      <BreadCrumb
        title="Register Student"
        backTo="Student List"
        path="/studentList"
      />
      <Card>
        <CardBody>
          {/*Create Student text part starts here */}
          <p className="section-title">Create Student Account</p>
          <div className="mt-1 mb-4 d-flex justify-between cardborder">
            <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
            <div className="pl-3">
              <span>Provide Information Below To Create Student Account.</span>
            </div>
          </div>
          {/*Create Student text part ends here */}

          {/*Student Register Form starts here */}

          <Form onSubmit={handleRegisterStudent} className="mt-4">
            <Row>
              <Col lg="6" md="8">
                {/* Conditional rendering on consultant type start */}
                {!consultantId &&
                userTypeId !== userTypes?.Consultant &&
                userTypeId !== userTypes?.AdmissionManager &&
                userTypeId !== userTypes?.AdmissionOfficer &&
                userTypeId !== userTypes?.ProviderAdmin ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Consultant
                    </span>

                    <Select
                      options={consultantName}
                      value={{
                        label: consultantLabel,
                        value: consultantValue,
                      }}
                      onChange={(opt) => selectConsultant(opt.label, opt.value)}
                      name="consultantId"
                      id="consultantId"
                    />

                    {consultantError && (
                      <span className="text-danger">
                        Consultant is required
                      </span>
                    )}
                  </FormGroup>
                ) : consultantId ? (
                  <input
                    type="hidden"
                    name="consultantId"
                    id="consultantId"
                    value={consultantId}
                  />
                ) : (
                  <input
                    type="hidden"
                    name="consultantId"
                    id="consultantId"
                    value={0}
                  />
                )}
                {/* Conditional rendering on consultant type end */}

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Student Preferred
                    Country{" "}
                  </span>

                  <Select
                    options={studentTypeName}
                    value={{
                      label: studentTypeLabel,
                      value: studentTypeValue,
                    }}
                    onChange={(opt) => selectStudentType(opt.label, opt.value)}
                    name="universityCountryId"
                    id="universityCountryId"
                  />
                  {studentError && (
                    <span className="text-danger">
                      Preferred country is required
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> First Name
                  </span>

                  <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => {
                      handleFirstNameChange(e);
                    }}
                    placeholder="Enter First Name"
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    {" "}
                    <span className="text-danger">*</span> Last Name
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      handleLastNameChange(e);
                    }}
                  />
                  <span className="text-danger">{lastNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Email
                  </span>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => {
                      handleEmailError(e);
                    }}
                  />
                  <span className="text-danger">{emailError}</span>
                </FormGroup>

                <FormGroup className="text-right">
                  <CancelButton cancel={cancelForm} />

                  {permissions?.includes(permissionList?.Add_New_Student) ? (
                    <SaveButton
                      text="Create Student"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  ) : null}
                </FormGroup>
              </Col>
            </Row>
          </Form>

          {/*Student Register Form ends here */}
        </CardBody>
      </Card>

      {/*ConfirmModal starts here */}

      <ConfirmModal
        text="Student added successfully"
        text2="Student account has been created and an email is sent to the student email address with login credentials."
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Add Another"
        yesText="Complete Profile"
        cancel={() => setIsModalOpen(false)}
        confirm={goToProfile}
      />

      {/*ConfirmModal ends here */}
    </div>
  );
};

export default StudentRegister;
