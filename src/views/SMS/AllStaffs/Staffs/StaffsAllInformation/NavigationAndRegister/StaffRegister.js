import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import get from "../../../../../../helpers/get";
import containsDigit from "../../../../../../helpers/nameContainDigit";
import post from "../../../../../../helpers/post";

const StaffRegister = () => {
  const { addToast } = useToasts();
  const { type } = useParams();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userTypeId = localStorage.getItem("userType");
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [consType, setConsType] = useState([]);
  const [typeLabel, setTypeLabel] = useState("Select Staff Type");
  const [typeValue, setTypeValue] = useState(0);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  const [branchError, setBranchError] = useState(false);
  const [consultantError, setConsultantError] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [progress, setProgress] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailExistError, setEmailExistError] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffId, setStaffId] = useState();

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });

    get("EmployeeTypeDD/index").then((res) => {
      setConsType(res);
      console.log(res);
      if (type) {
        const filterData = res.filter((item) => item.id.toString() === type);
        setTypeLabel(filterData[0].name);
        setTypeValue(filterData[0].id);
      }
    });

    get("BranchDD/index").then((res) => {
      setBranch(res);
    });
  }, [type]);

  const consTypeMenu = consType?.map((consTypeOptions) => ({
    label: consTypeOptions?.name,
    value: consTypeOptions?.id,
  }));

  const selectConsType = (label, value) => {
    setConsultantError(false);
    setTypeLabel(label);
    setTypeValue(value);
  };

  const branchOptions = branch?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const selectBranch = (label, value) => {
    setBranchError(false);
    setBranchLabel(label);
    setBranchValue(value);
  };

  // const handleEmail = (e) => {
  //   get(`EmailCheck/EmailCheck/${e.target.value}`).then((res) => {
  //     setEmailError(res);
  //   });
  // };

  const handleFirstName = (e) => {
    const data = e.target.value;
    setFirstName(data);

    if (data === "") {
      setFirstNameError("First name is required");
    } else if (containsDigit(data)) {
      setFirstNameError("First name should not contain digits");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastName = (e) => {
    const data = e.target.value;
    setLastName(data);
    if (data === "") {
      setLastNameError("Last name is required");
    } else if (containsDigit(data)) {
      setLastNameError("Last name should not contain digits");
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

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (typeValue === 0) {
      isFormValid = false;
      setConsultantError(true);
    }
    if (userTypeId !== userTypes?.BranchAdmin && branchValue === 0) {
      isFormValid = false;
      setBranchError(true);
    }
    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isFormValid = false;
      setFirstNameError("First name is required");
    } else if (containsDigit(firstName)) {
      isFormValid = false;
      setFirstNameError("First name should not contain digits");
    }
    if (!lastName) {
      isFormValid = false;
      setLastNameError("Last name is required");
    } else if (containsDigit(lastName)) {
      isFormValid = false;
      setLastNameError("Last name should not contain digits");
    }
    if (!email) {
      isFormValid = false;
      setEmailError("Email is required");
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      isFormValid = false;
      setEmailError("Email is not Valid");
    }
    if (emailExistError === false) {
      isFormValid = false;
      setEmailExistError(emailExistError);
    }
    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    subdata.append("employeeTypeId", typeValue);

    var formIsValid = validateRegisterForm();

    if (formIsValid === true) {
      setButtonStatus(true);
      setProgress(true);
      post("Employee/GeneralInformation", subdata).then((res) => {
        setProgress(false);

        setButtonStatus(false);

        if (res.status === 200 && res.data.isSuccess === true) {
          setStaffId(res?.data?.result?.id);
          setIsModalOpen(true);
          setBranchLabel("Select Branch");
          setBranchValue(0);
          setTypeLabel("Select Staff Type");
          setTypeValue(0);
          setTitleValue(0);
          setFirstName("");
          setLastName("");
          setEmail("");
          // history.push(`/staffGeneralInformation/${res?.data?.result?.id}`);
        } else {
          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess == true ? "success" : "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const goToProfile = () => {
    history.push(`/staffPersonalInformation/${staffId}`);
  };

  const ToBack = () => {
    history.push("/staffList");
  };

  return (
    <div>
      <BreadCrumb
        title="Staff General Information"
        backTo="Staff"
        path="/staffList"
      />

      <Card>
        <CardBody>
          <p className="section-title">Create A New Staff</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                {userTypeId !== userTypes?.BranchAdmin ? (
                  <FormGroup>
                    <span>
                      Branch <span className="text-danger">*</span>
                    </span>

                    <Select
                      options={branchOptions}
                      value={{ label: branchLabel, value: branchValue }}
                      onChange={(opt) => selectBranch(opt.label, opt.value)}
                      name="BranchId"
                      id="BranchId"
                    />

                    {branchError && (
                      <span className="text-danger">Branch is required</span>
                    )}
                  </FormGroup>
                ) : (
                  <input
                    type="hidden"
                    name="BranchId"
                    id="BranchId"
                    value={branchValue}
                  />
                )}

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Staff Type
                  </span>

                  <Select
                    options={consTypeMenu}
                    value={{ label: typeLabel, value: typeValue }}
                    onChange={(opt) => selectConsType(opt.label, opt.value)}
                    name="employeeTypeId"
                    id="employeeTypeId"
                    isDisabled={type ? true : false}
                  />

                  {consultantError && (
                    <span className="text-danger">Staff type is required</span>
                  )}
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Title
                  </span>
                  <div>
                    {title?.map((tt) => (
                      <>
                        <input
                          type="radio"
                          name="nameTitleId"
                          id="nameTitleId"
                          value={tt?.id}
                          onChange={() => {
                            setTitleValue(tt?.id);
                            setTitleError(false);
                          }}
                          checked={titleValue === tt?.id ? true : false}
                        />

                        <label
                          className="mr-3"
                          style={{ fontWeight: 500, fontSize: "14px" }}
                        >
                          {tt?.name}
                        </label>
                      </>
                    ))}
                  </div>

                  {titleError && (
                    <span className="text-danger">Title is required</span>
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
                    placeholder="Enter First Name"
                    onChange={(e) => {
                      handleFirstName(e);
                    }}
                  />
                  <span className="text-danger">{firstNameError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Last Name
                  </span>

                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={lastName}
                    placeholder="Enter Last Name"
                    onChange={(e) => {
                      handleLastName(e);
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
                  <CancelButton cancel={ToBack} />
                  {permissions?.includes(permissionList?.Add_Employee) && (
                    <SaveButton
                      text="Create Staff"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <ConfirmModal
        text="Staff added successfully"
        text2="An email is sent to the staff email with login credentials"
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Add Another"
        yesText="Complete Profile"
        cancel={() => setIsModalOpen(false)}
        confirm={goToProfile}
      />
    </div>
  );
};

export default StaffRegister;
