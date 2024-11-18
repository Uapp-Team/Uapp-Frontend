import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";
import { cms, rootUrl } from "../../../../constants/constants";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import notify from "../../../../assets/img/notify.png";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Captcha from "../../../../components/Captcha";

const ProviderRegisterForm = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const [types, setTypes] = useState(0);
  const [name, setName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [providerNameError, setProviderNameError] = useState("");
  const [title, setTitle] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [names, setNames] = useState([]);
  const [checked, setChecked] = useState(null);

  const [preferredCountries, setPreferredCountries] = useState([]);
  const [preferredCountryLabel, setpreferredCountryLabel] =
    useState("Select Country");
  const [preferredCountryValue, setpreferredCountryValue] = useState(0);
  const [preferredCountryError, setPreferredCountryError] = useState("");
  const [phoneNUmberError, setphoneNUmberError] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [message, setMessage] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  useEffect(() => {
    fetch(`${rootUrl}UniversityCountryDD/Index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPreferredCountries(data?.result);
      });

    fetch(`${rootUrl}NameTittleDD/index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNames(data?.result);
      });
  }, []);

  const preferredCountryOptions = preferredCountries?.map((st) => ({
    label: st?.name,
    value: st?.id,
  }));

  const selectPreferredCountry = (label, value) => {
    setPreferredCountryError("");
    setpreferredCountryLabel(label);
    setpreferredCountryValue(value);
  };

  const SetNameTitleFromDD = (e) => {
    setTitle(parseInt(e.target.value));
  };
  const handleProviderNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setProviderNameError("Company or institution name");
    } else {
      setProviderNameError("");
    }
  };

  const handleradio = (e) => {
    setChecked("radio");
  };
  const handleEmailChange = (e) => {
    setAdminEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  const handlePhoneNumber = (value) => {
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

  // const handlePassword = (e) => {
  //   setPass(e.target.value);
  //   if (e.target.value === "") {
  //     setPasswordError("Provide a valid password");
  //   } else {
  //     setPasswordError("");
  //   }
  // };
  // const handleConfirmPassword = (e) => {
  //   setConfirmPassword(e.target.value);
  //   if (e.target.value === "") {
  //     setConfirmPasswordError("Confirm your password");
  //   } else {
  //     setConfirmPasswordError("");
  //   }
  //   if (pass && e.target.value !== pass) {
  //     setConfirmPasswordError("Passwords doesn't match.");
  //   } else {
  //     setConfirmPasswordError("");
  //   }
  // };

  const validateRegisterForm = (subData) => {
    var isFormValid = true;

    if (preferredCountryValue === 0) {
      isFormValid = false;
      setPreferredCountryError("Select country");
    }

    if (subData.AdminFirstName === "") {
      isFormValid = false;
      setFirstNameError("First name is required");
    }
    if (subData.AdminLastName === "") {
      isFormValid = false;
      setLastNameError("Last name is required");
    }

    if (!phoneNumber) {
      isFormValid = false;
      setphoneNUmberError("Phone number is required");
    }

    if (subData.AdminEmail === "") {
      isFormValid = false;
      setEmailError("Email is required");
    }
    // if (subData.Password === "") {
    //   isFormValid = false;
    //   setPasswordError("Provide a valid password");
    // }
    // if (confirmPassword === "") {
    //   isFormValid = false;
    //   setConfirmPasswordError("Confirm your password");
    // }
    // if (confirmPassword !== pass) {
    //   isFormValid = false;
    //   setConfirmPasswordError("Password doesn't match");
    // }
    if (subData.ProviderName === "") {
      isFormValid = false;
      setProviderNameError("Company or institution name");
    }
    if (parseInt(captchaInput) !== captchaAnswer) {
      isFormValid = false;
      setCaptchaError(true);
    }

    return isFormValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const subData = {
      // ProviderTypeId: types,
      Country: preferredCountryValue,
      NameTittleId: title,
      PhoneNumber: phoneNumber,
      ProviderName: name,
      Email: adminEmail,
      // Password: pass,
      FirstName: firstName,
      LastName: lastName,
      AdditionalMessage: message,
    };

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      // fetch(`${rootUrl}ProviderRegistration/Register`, {
      fetch(`${cms}api/ProviderRegistration`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(subData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data === true) {
            addToast(data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/providerAccountCreated");
          } else {
            addToast(data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleRegister}>
        <div className="mb-3">
          <h1
            style={{
              fontWeight: "500",
              color: "#252525",
              fontSize: "13px",
              marginTop: "20px",
              marginBottom: "-8px",
            }}
          >
            Company or institution name
          </h1>
        </div>

        <div className="mb-3">
          <Input
            className="inside-placeholder"
            type="text"
            placeholder="Enter the Name as Registered"
            style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            onChange={(e) => handleProviderNameChange(e)}
          />
          <span className="text-danger">{providerNameError}</span>
        </div>

        <div
          className="mb-3"
          style={{
            fontWeight: "500",
            color: "#252525",
            fontSize: "13px",
            marginBottom: "-8px",
          }}
        >
          Country
        </div>

        <div
          className="mb-3"
          style={{
            fontSize: "14px",
            fontWeight: 400,
            marginTop: "-9px",
          }}
        >
          <Select
            options={preferredCountryOptions}
            value={{
              label: preferredCountryLabel,
              value: preferredCountryValue,
            }}
            onChange={(opt) => selectPreferredCountry(opt.label, opt.value)}
            name="preferredCountryId"
            id="preferredCountryId"
          />
          <span className="text-danger">{preferredCountryError}</span>
        </div>

        <div className="mb-3">
          <h1
            style={{
              fontWeight: "500",
              color: "#252525",
              fontSize: "13px",
              marginBottom: "-10px",
              marginTop: "20px",
            }}
          >
            Point of Contact
          </h1>
        </div>

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
              onChange={SetNameTitleFromDD}
              style={{
                height: "calc(1.5em + 1.3rem + 2px)",
                width: "30%",
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
                width: "70%",
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

        <div style={{ marginBottom: "3rem" }}>
          <FormGroup style={{ marginBottom: "-6px" }}>
            <div
              className="phone-input-group"
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            >
              <span>Phone Number</span>
              <PhoneInput
                type="string"
                name="phoneNumber"
                id="phoneNumber"
                country={"gb"}
                enableLongNumbers={true}
                onChange={handlePhoneNumber}
                value={phoneNumber ? phoneNumber : ""}
                inputProps={{
                  required: true,
                }}
              />

              <span className="text-danger">{phoneNUmberError}</span>
            </div>
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
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              onChange={(e) => handleEmailChange(e)}
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

        {/* <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            <Input
              className="inside-placeholder"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => handlePassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <span className="text-danger">{passwordError}</span>
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            <Input
              className="inside-placeholder"
              type="password"
              placeholder="Confirm Password"
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              onChange={(e) => handleConfirmPassword(e)}
            />
            <span className="text-danger">{confirmPasswordError}</span>
          </FormGroup>
        </div> */}

        <div className="mb-3">
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              className="inside-placeholder"
              type="textarea"
              placeholder="Additional Message (optional)"
              defaultValue={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </FormGroup>
        </div>
        <Captcha
          captchaAnswer={captchaAnswer}
          captchaInput={captchaInput}
          setCaptchaAnswer={setCaptchaAnswer}
          setCaptchaInput={setCaptchaInput}
          captchaError={captchaError}
          setCaptchaError={setCaptchaError}
        />
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
          <div>
            <span className="text-danger">{error}</span>
          </div>
          <button className="btn-register-lg" type="submit" disabled={!checked}>
            Register Now
          </button>
        </div>

        <div className="mb-3">
          <Link to="/" className="already-registered">
            I am already registered
          </Link>
        </div>
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
  ProviderRegisterForm
);
