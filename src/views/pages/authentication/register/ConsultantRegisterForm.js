import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";
import { rootUrl } from "../../../../constants/constants";
import { Link, useHistory, useParams } from "react-router-dom";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import notify from "../../../../assets/img/notify.png";

const ConsultantRegisterForm = () => {
  const [parameter, setParameter] = useState("");
  const { invitationcode } = useParams();
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
  const [checked, setChecked] = useState(null);

  useEffect(() => {
    setParameter(invitationcode);
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
    } else {
      setLastNameError("");
    }
  };
  const handleradio = (e) => {
    setChecked("radio");
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First name is required");
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

    if (subData.Password == "") {
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
    return isFormValid;
  }

  const handleRegister = (e) => {
    e.preventDefault();

    const subData = {
      ConsultantTypeId: 2,
      NameTittleId: title,
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      InvitationCode: referCode,
    };
    console.log("subdata", subData);

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      // clearAllErrors();
      fetch(`${rootUrl}ConsultantRegister/Register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(subData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.isSuccess == true) {
            console.log("data", data);
            addToast(data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/consultantAccountCreated");
          } else {
            setPasswordError(data?.message);
          }
        });
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
              onChange={(e) => handleConfirmPassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <span className="text-danger">{confirmPasswordError}</span>
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
          <div>
            <span className="text-danger">{error}</span>
          </div>
          <button className="btn-register-lg" type="submit" disabled={!checked}>
            Register Now
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
