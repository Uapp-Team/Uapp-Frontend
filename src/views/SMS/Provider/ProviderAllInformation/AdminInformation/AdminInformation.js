import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import ProviderNavigation from "../ProviderRegistrationAndNavigation/ProviderNavigation";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Col, FormGroup, Input, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import post from "../../../../../helpers/post";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";

const AdminInformation = () => {
  const { id } = useParams();
  const activetab = "3";
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState([]);
  const [titleValue, setTitleValue] = useState(0);
  const [firstNameError, setFirstNameError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [valid, setValid] = useState(true);
  const [adminId, setAdminId] = useState(0);
  const [providerAdminInfo, setProviderAdminInfo] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    get("NameTittleDD/index").then((res) => {
      setTitle(res);
    });
    get(`ProviderAdmin/get/${id}`).then((res) => {
      console.log(res, "info");
      setProviderAdminInfo(res);
      setAdminId(res?.id);
      setTitleValue(res?.nameTittleId);
      setFirstName(res?.firstName);
      setLastName(res?.lastName);
      setPhone(res?.phoneNumber);
      setDesignation(res?.designation);
    });
  }, [id]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };
  const handleDesignation = (e) => {
    setDesignation(e.target.value);
    if (e.target.value === "") {
      setDesignationError("Designation is required");
    } else {
      setDesignationError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
    setPhone(value);
    if (value === "") {
      setPhoneError("Phone number is required");
    } else if (value?.length < 9) {
      setPhoneError("Phone number required minimum 9 digit");
    } else {
      setPhoneError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (titleValue === 0) {
      isFormValid = false;
      setTitleError(true);
    }
    if (!firstName) {
      isFormValid = false;
      setFirstNameError("First Name is required");
    }
    if (!lastName) {
      isFormValid = false;
      setLastNameError("Last Name is required");
    }
    if (!designation) {
      isFormValid = false;
      setDesignationError("Designation is required");
    }
    if (!phone) {
      setPhoneError("Phone is required");
      isFormValid = false;
    }
    if (phone?.length < 9) {
      isFormValid = false;
      setPhoneError("Phone number required minimum 9 digit");
    }
    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = new FormData();
    subData.append("firstName", firstName);
    subData.append("nameTittleId", titleValue);
    subData.append("designation", designation);
    subData.append("lastName", lastName);
    subData.append("phoneNumber", phone);
    subData.append("lastName", lastName);
    subData.append("id", adminId);

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      setProgress(true);
      setButtonStatus(true);
      post(`ProviderAdmin/Update`, subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);

        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        // history.push("/providerList");
      });
    }
  };
  const handlePrevious = () => {
    history.push(`/providerAddress/${id}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Admin Information"
        backTo={userType === userTypes?.ProviderAdmin ? null : "Provider"}
        path="/providerList"
      />
      <ProviderNavigation id={id} activetab={activetab}></ProviderNavigation>

      <Card>
        <CardBody>
          <p className="section-title">Designated person Details</p>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <span>
                {" "}
                <span className="text-danger">*</span> Title
              </span>
              <div>
                {title?.map((tt) => (
                  <>
                    <input
                      type="radio"
                      name="NameTittleId"
                      id="NameTittleId"
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
            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span> <span>First Name</span>
                </span>

                <Input
                  type="text"
                  name="FirstName"
                  id="FirstName"
                  placeholder="Enter First Name"
                  onChange={(e) => {
                    handleFirstNameChange(e);
                  }}
                  value={firstName}
                />
                <span className="text-danger">{firstNameError}</span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span> <span>Last Name</span>
                </span>

                <Input
                  type="text"
                  name="LastName"
                  id="LastName"
                  placeholder="Enter Last Name"
                  onChange={(e) => {
                    handleLastNameChange(e);
                  }}
                  value={lastName}
                />
                <span className="text-danger">{lastNameError}</span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col lg="6" md="8">
                <span>
                  <span className="text-danger">*</span>{" "}
                  <span>Designation</span>
                </span>

                <Input
                  type="text"
                  name="Designation"
                  id="Designation"
                  placeholder="Enter Designation"
                  onChange={(e) => {
                    handleDesignation(e);
                  }}
                  value={designation}
                />
                <span className="text-danger">{designationError}</span>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col lg="6" md="8">
                {" "}
                <span>
                  <span className="text-danger">*</span> <span>Email vai</span>
                </span>
                <Input
                  type="email"
                  name="Email"
                  id="Email"
                  placeholder="Enter Email"
                  required
                  value={providerAdminInfo?.email}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col lg="6" md="8" className="phone-input-group">
                <span>
                  <span className="text-danger">*</span>
                  Phone
                </span>
                <PhoneInput
                  className="w-100"
                  type="string"
                  name="officialPhoneNumber"
                  id="officialPhoneNumber"
                  country={"us"}
                  onChange={handlePhoneNumber}
                  value={phone ? phone : "1"}
                  inputProps={{
                    required: true,
                  }}
                />

                <span className="text-danger">{phoneError}</span>
              </Col>
            </FormGroup>

            <FormGroup row className="">
              <Col
                lg="6"
                md="8"
                className="d-flex justify-content-between mt-4"
              >
                <PreviousButton action={handlePrevious} />
                {permissions?.includes(permissionList.Edit_Provider) ? (
                  <SaveButton
                    // text="Save and Next"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                ) : null}
              </Col>
            </FormGroup>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminInformation;
