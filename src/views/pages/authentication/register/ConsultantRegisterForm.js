import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import notify from "../../../../assets/img/notify.png";
import UploadFile from "../../../../components/form/UploadFile";
import { rootUrl } from "../../../../constants/constants";
import containsDigit from "../../../../helpers/nameContainDigit";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";

const ConsultantRegisterForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  console.log(source, "source");

  const [parameter, setParameter] = useState("");
  const { invitationcode } = useParams();
  console.log(invitationcode, "invitationCode");

  const [title, setTitle] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [names, setNames] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { addToast } = useToasts();
  const history = useHistory();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referCode, setReferCode] = useState("");
  console.log(referCode, "referCode");
  const [linkedFacebook, setLinkedFacebook] = useState("");
  const [linkedFacebookError, setLinkedFacebookError] = useState("");
  const [checked, setChecked] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState("");
  const [loansForEu, setLoansForEu] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [progress, setProgress] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  useEffect(() => {
    setReferCode(invitationcode);
  }, [invitationcode]);

  useEffect(() => {
    fetch(`${rootUrl}NameTittleDD/index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNames(data?.result);
      });

    fetch(`${rootUrl}ConsultantTypeDD/index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConsultants(data?.result);
      });
  }, []);

  const SetNameTitleFromDD = (e) => {
    setTitle(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last name is required");
    } else if (containsDigit(e.target.value)) {
      setLastNameError("Last name cannot contain digits");
    } else {
      setLastNameError("");
    }
  };

  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 35, color: "white", fontWeight: "bold" }}
      spin
    />
  );
  const handleLinkedFacebookChange = (e) => {
    setLinkedFacebook(e.target.value);
    if (e.target.value === "") {
      setLinkedFacebookError("LinkedIn or Facebook is required");
    } else {
      setLinkedFacebookError("");
    }
  };

  const handleradio = (e) => {
    setChecked("radio");
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First name is required");
    } else if (containsDigit(e.target.value)) {
      setFirstNameError("First name cannot contain digits");
    } else {
      setFirstNameError("");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value, data) => {
    const dialCode = data?.dialCode || "";
    const cleanedValue = value.replace(/^\+/, "");

    const nationalNumber = cleanedValue.startsWith(dialCode)
      ? cleanedValue.slice(dialCode.length)
      : cleanedValue;

    setCountryCode(`+${dialCode}`);
    setLocalNumber(nationalNumber.trim());

    setphoneNumber(value);
    if (value === "") {
      setphoneNUmberError("Phone number is required");
    } else if (value?.length < 9) {
      setphoneNUmberError("Phone number required minimum 9 digit");
    } else {
      setphoneNUmberError("");
    }
    // setphoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Define validation conditions
    const errors = [];
    if (password === "") {
      errors.push("Password is required");
    } else {
      if (password.length < 8) {
        errors.push("At least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("One uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("One lowercase letter");
      }
      if (!/\d/.test(password)) {
        errors.push("One number");
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push("One special character");
      }
    }

    // Join errors into a single message or clear the error
    if (errors.length > 0) {
      setPasswordError(errors.join(" & "));
    } else {
      setPasswordError(""); // Clear the error if everything is valid
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") {
      setConfirmPasswordError("Confirm your password");
    } else {
      setConfirmPasswordError("");
    }
    if (password && e.target.value !== password) {
      setConfirmPasswordError("Passwords doesn't match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  function validateRegisterForm(subData) {
    var isFormValid = true;

    if (firstName === "") {
      isFormValid = false;
      setFirstNameError("First name is required");
    }

    if (containsDigit(firstName)) {
      isFormValid = false;
      setFirstNameError("First name cannot contain digits");
    }

    if (lastName === "") {
      isFormValid = false;
      setLastNameError("Last name is required");
    }

    if (containsDigit(lastName)) {
      isFormValid = false;
      setLastNameError("Last name cannot contain digits");
    }
    if (linkedFacebook === "") {
      isFormValid = false;
      setLinkedFacebookError("LinkedIn or Facebook is required");
    }

    if (!phoneNumber) {
      isFormValid = false;
      setphoneNUmberError("Phone number is required");
    }

    if (phoneNumber?.length < 9) {
      isFormValid = false;
      setphoneNUmberError("Phone number required minimum 9 digit");
    }

    if (email === "") {
      isFormValid = false;
      setEmailError("Email is required");
    }

    if (password == "") {
      isFormValid = false;
      setPasswordError("Provide a valid password");
    }
    if (confirmPassword == "") {
      isFormValid = false;
      setConfirmPasswordError("Confirm your password");
    }
    if (confirmPassword !== password) {
      isFormValid = false;
      setConfirmPasswordError("Password doesn't match");
    }

    // }

    if (!cvFile) {
      isFormValid = false;
      setCvError("CV file is required");
    }
    return isFormValid;
  }
  console.log(cvFile);
  const handleRegister = async (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("consultantTypeId", 2);
    subData.append("nameTittleId", title);
    subData.append("firstName", firstName);
    subData.append("lastName", lastName);
    subData.append("email", email);
    subData.append(
      source ? "SalesTeamLeaderInvitationCode" : "invitationCode",
      referCode
    );
    subData.append("linkedIn_Facebook", linkedFacebook);
    subData.append("cvfile", cvFile);
    subData.append("password", password);
    subData.append("linkTypeId", loansForEu);
    subData.append("countryCode", countryCode);
    subData.append("PhoneNumber", localNumber);

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      try {
        setProgress(true);
        await axios
          .post(`${rootUrl}ConsultantRegister/Register`, subData)
          .then((res) => {
            if (res?.data?.isSuccess === true) {
              addToast(res?.data?.message, {
                appearance: "success",
                autoDismiss: true,
              });
              history.push("/consultantAccountCreated");
            } else {
              addToast(res?.data?.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          });
      } catch (error) {
        addToast(
          "An error occurred while registering. Please try again later.",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
        return;
      } finally {
        setProgress(false);
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleRegister} className="mb-5">
        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left d-flex"
            style={{ marginTop: "-6px" }}
          >
            <Label for="exampleSelect">Select</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(e) => SetNameTitleFromDD(e)}
              style={{
                height: "calc(1.5em + 1.3rem + 2px)",
                width: "20%",
                borderRightStyle: "double",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              {names.map((item, i) => (
                <option value={item?.id}>{item.name}</option>
              ))}
            </Input>
            <span class="info-icon">
              <span
                className="info-cursor"
                data-toggle="tooltip"
                data-placement="top"
                title="First name as identity/passport"
              >
                <i class="fas fa-info-circle"></i>
              </span>
            </span>

            <Input
              className="inside-placeholder"
              type="text"
              placeholder="First Name"
              onChange={(e) => handleFirstNameChange(e)}
              style={{
                height: "calc(1.5em + 1.3rem + 2px)",
                width: "80%",
                borderLeftStyle: "none",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            />
          </FormGroup>
        </div>
        <span
          className="text-danger"
          style={{ position: "relative", top: "-20px" }}
        >
          {firstNameError}
        </span>

        <FormGroup
          className="form-label-group position-relative has-icon-left"
          style={{ marginTop: "-12px", marginBottom: "9px" }}
        >
          <span class="info-icon">
            <span
              className="info-cursor"
              data-toggle="tooltip"
              data-placement="top"
              title="Last name as identity/passport"
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
          <Input
            className="inside-placeholder"
            type="text"
            placeholder="Last Name"
            onChange={(e) => handleLastNameChange(e)}
            style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
          />
          <span className="text-danger">{lastNameError}</span>
        </FormGroup>

        <FormGroup
          className="has-icon-left position-relative"
          style={{ marginBottom: "5px" }}
        >
          <span>Social Media</span>
          <br />

          <FormGroup check inline className="form-mt">
            <input
              className="form-check-input"
              type="radio"
              name="loanfromStudentLoansCompanyForEU"
              value={true}
              checked={loansForEu === true}
              onChange={() => setLoansForEu(!loansForEu)}
            />
            <Label
              className="form-check-label"
              check
              htmlFor="loanfromStudentLoansCompanyForEU"
            >
              LinkedIn
            </Label>
          </FormGroup>

          <FormGroup check inline>
            <input
              className="form-check-input"
              type="radio"
              name="loanfromStudentLoansCompanyForEU"
              value={false}
              checked={loansForEu === false}
              onChange={() => setLoansForEu(!loansForEu)}
            />
            <Label
              className="form-check-label"
              check
              htmlFor="loanfromStudentLoansCompanyForEU"
            >
              Facebook
            </Label>
          </FormGroup>
        </FormGroup>

        {loansForEu === true || loansForEu === false ? (
          <div className="mb-3">
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                className="inside-placeholder"
                type="text"
                placeholder="LinkedIn/Facebook (Mandatory)"
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                onChange={(e) => handleLinkedFacebookChange(e)}
              />
              <span className="text-danger">{linkedFacebookError}</span>
            </FormGroup>
          </div>
        ) : null}

        <div className="mb-3">
          <FormGroup style={{ marginBottom: "-6px" }}>
            <span>Phone Number</span>
            <PhoneInput
              type="string"
              name="phoneNumber"
              id="phoneNumber"
              country={"gb"}
              countryCodeEditable={false}
              enableLongNumbers={true}
              onChange={handlePhoneNumber}
              value={phoneNumber ? phoneNumber : ""}
              inputProps={{
                required: true,
              }}
            />

            <span className="text-danger">{phoneNUmberError}</span>
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            <Input
              className="inside-placeholder"
              type="email"
              placeholder="Enter the email"
              onChange={(e) => handleEmail(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <span className="text-danger">{emailError}</span>
          </FormGroup>
        </div>

        <div className="mb-3">
          <img
            src={notify}
            className="img-fluid"
            alt=""
            style={{
              position: " relative",
              bottom: "2px",
              marginRight: "6.33px",
            }}
          />
          <span
            style={{ color: " #B2B3BD", fontSize: "12px", fontWeight: 400 }}
          >
            {" "}
            This email will be used as your user ID
          </span>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            {/* <Input
              className="inside-placeholder"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => handlePassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            /> */}
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePassword}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              />
              <InputGroupText
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </InputGroupText>
            </InputGroup>
            <span className="text-danger">{passwordError}</span>
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            {/* <Input
              className="inside-placeholder"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            /> */}
            <InputGroup>
              <Input
                className="inside-placeholder"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  handleConfirmPassword(e);
                }}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              />
              <InputGroupText
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {isConfirmPasswordVisible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </InputGroupText>
            </InputGroup>
            <span className="text-danger">{confirmPasswordError}</span>
          </FormGroup>
        </div>

        <FormGroup>
          <div className="d-flex pt-3">
            <Col sm={12}>
              <UploadFile
                label="CV File :"
                file={cvFile}
                id="avaterFile"
                setFile={setCvFile}
                // defaultValue={}
                error={cvError}
                setError={setCvError}
              />
            </Col>
          </div>
        </FormGroup>

        <div className="mb-3">
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              disabled={invitationcode}
              className="inside-placeholder"
              type="text"
              placeholder="Invitation code (optional)"
              defaultValue={invitationcode}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              onChange={(event) => setReferCode(event.target.value)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{
              paddingLeft: "20px",
              fontSize: "13px",
              fontWeight: 400,
            }}
          >
            <Input
              type="radio"
              name=""
              className="color"
              onChange={handleradio}
              checked={checked === "radio"}
            />
            <p style={{ color: " #7D8287" }}>
              Agree our <span style={{ color: "#045D5E" }}>terms</span> and{" "}
              <span style={{ color: "#045D5E" }}>conditions</span>
            </p>
          </FormGroup>
        </div>

        <div className="mb-3">
          <div></div>
          <button className="btn-register-lg" type="submit" disabled={!checked}>
            {progress ? <Spin indicator={antIcon} /> : "Register Now"}
          </button>
        </div>
        <Link to={"/"} className="already-registered mb-5">
          I am already registered
        </Link>
        {/* <div className="mb-5">
          <Link to={"/"} className="already-registered">
            I am already registered
          </Link>
         
        </div> */}
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    values: state.auth.register,
  };
};
export default connect(mapStateToProps, { signupWithJWT })(
  ConsultantRegisterForm
);
