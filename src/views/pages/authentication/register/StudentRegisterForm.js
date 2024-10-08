import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import notify from "../../../../assets/img/notify.png";

const StudentRegisterForm = () => {
  const { invitationcode } = useParams();
  const [checked, setChecked] = useState(null);
  const [preferredCountries, setPreferredCountries] = useState([]);
  const [names, setNames] = useState([]);
  const [preferredCountryLabel, setpreferredCountryLabel] = useState(
    "Select Study Destination"
  );
  const [preferredCountryValue, setpreferredCountryValue] = useState(0);
  const [title, setTitle] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [radio, setRadio] = useState(false);
  const [radioerror, setRadioErrro] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [preferredCountryError, setPreferredCountryError] = useState("");
  const { addToast } = useToasts();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [referCode, setReferCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    setReferCode(invitationcode);
  }, [invitationcode]);

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

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
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
  const handleradio = (e) => {
    setChecked("radio");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Provide a valid password");
    } else {
      setPasswordError("");
    }
    // if (confirmPassword && e.target.value !== confirmPassword) {
    //   setPasswordError("Password doesn't match");
    // } else {
    //   setPasswordError("");
    // }
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

  function clearAllErrors() {
    setLastNameError("");
  }
  function validateRegisterForm(subData) {
    var isFormValid = true;

    if (subData.FirstName === "") {
      isFormValid = false;
      setFirstNameError("First name is required");
    }
    if (subData.LastName === "") {
      isFormValid = false;
      setLastNameError("Last name is required");
    }
    if (subData.Email === "") {
      isFormValid = false;
      setEmailError("Email is required");
    }
    if (subData.PreferredCountry === 0) {
      isFormValid = false;
      setPreferredCountryError("Select preferred study destination");
    }
    if (subData.Password === "") {
      isFormValid = false;
      setPasswordError("Provide a valid password");
    }
    if (confirmPassword === "") {
      isFormValid = false;
      setConfirmPasswordError("Confirm your password");
    }
    if (confirmPassword !== password) {
      isFormValid = false;
      setConfirmPasswordError("Password doesn't match");
    }
    // if (radio === false) {
    //   isFormValid = false;
    //   setRadioErrro("agree please");
    // }
    return isFormValid;
  }
  const handleRegister = (e) => {
    e.preventDefault();
    const subData = {
      PreferredCountry: preferredCountryValue,
      NameTittleId: title,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      InvitationCode: referCode,
    };

    console.log("register subdata", subData);

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      clearAllErrors();
      fetch(`${rootUrl}StudentRegistration/Register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(subData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data?.result === true) {
            addToast(data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/studentAccountCreated");
          } else {
            setPasswordError(data?.message);
          }
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleRegister}>
        <div
          className="mb-3"
          style={{
            fontWeight: "500",
            color: "#252525",
            fontSize: "13px",
            marginTop: "20px",
            marginBottom: "-8px",
          }}
        >
          What is your preferred study destination?
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
          <div>
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
                onChange={(e) => {
                  handleFirstNameChange(e);
                }}
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

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            <Input
              className="inside-placeholder"
              type="email"
              placeholder="Enter the email"
              onChange={(e) => {
                handleEmail(e);
              }}
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
            <Input
              className="inside-placeholder"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => {
                handlePassword(e);
              }}
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
              value={confirmPassword}
              onChange={(e) => {
                handleConfirmPassword(e);
              }}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <span className="text-danger">{confirmPasswordError}</span>

            <div className="form-control-position"></div>
          </FormGroup>
        </div>
        <div className="mb-3">
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              disabled={invitationcode}
              className="inside-placeholder"
              type="text"
              placeholder="Invitation code (optional)"
              defaultValue={invitationcode}
              onChange={(event) => setReferCode(event.target.value)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
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
            Register Now
          </button>
        </div>

        <div className="mb-3 ">
          <Link to="/" className="already-registered">
            <span> I am already registered</span>
          </Link>
        </div>
      </Form>
    </>
  );
};
export default StudentRegisterForm;
