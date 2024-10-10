import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup, Form, Input, Button } from "reactstrap";
import { history } from "../../../history";
import "../../../assets/scss/pages/authentication.scss";
import "../../../assets/CoustomStyle/auth.css";
import providerlogo from "../../../assets/img/providerlogo.svg";
import AuthFooter from "./register/components/AuthFooter";
import axios from "axios";
import { rootUrl } from "../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import logoLg from "../../../assets/img/Logo.svg";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";

const ResetPassword = () => {
  const { email } = useParams();
  const { addToast } = useToasts();
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  const [token, setToken] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    axios.get(`${rootUrl}Account/GetResetToken?email=${email}`).then((res) => {
      setToken(res?.data?.result);
      console.log(res?.data?.result);
    });
  }, [email]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Provide a valid password");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(e.target.value)) {
      setPasswordError(
        "Password must be six digits and combination of letters and numbers"
      );
    } else {
      setPasswordError("");
    }
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

  function validateRegisterForm() {
    var isFormValid = true;

    if (password === "") {
      isFormValid = false;
      setPasswordError("Provide a valid password");
    }

    if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
      isFormValid = false;
      setPasswordError(
        "Password must be six digits and combination of letters and numbers"
      );
    }

    if (confirmPassword === "") {
      isFormValid = false;
      setConfirmPasswordError("Confirm your password");
    }

    if (confirmPassword !== password) {
      isFormValid = false;
      setConfirmPasswordError("Password doesn't match");
    }

    return isFormValid;
  }

  const handleReset = (e) => {
    e.preventDefault();
    const subData = {
      token: token,
      email: email,
      password: password,
    };
    console.log("object", subData);
    const formIsValid = validateRegisterForm();
    if (formIsValid) {
      fetch(`${rootUrl}Account/ResetPassword`, {
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
            history.push("/");
          } else {
            setPasswordError(data?.message);
          }
        });
    }
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutStorageHandler();
    // window.localStorage.clear();
    // window.location.reload();
    // history.push("/");
  };

  return (
    <>
      {current_user ? (
        <>
          <div className="text-center" style={{ paddingTop: "250px" }}>
            <img height={30} src={logoLg} alt="" />
            <div>
              <h3 className="mt-3">
                You are already login as {current_user?.displayName}
              </h3>
              <p>
                Please logout first before reset <b>{email}</b> password
              </p>
              <div className="text-center mt-3">
                <button
                  className="px-5 py-2"
                  style={{
                    backgroundColor: "rgb(252 115 0)",
                    color: "white",
                    borderRadius: "69px",
                    fontSize: "24px",
                    fontWeight: "400",
                    border: "0",
                  }}
                  onClick={(e) => {
                    handleLogOut(e);
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="auth-container">
          <div className="left-illustration d-md-block d-lg-block d-none  ">
            <div className="forgot-container">
              <img src={providerlogo} className="auth-logo-fixed" alt="uapp" />
            </div>
          </div>
          <div className="right-container">
            <div className="form-container">
              <div className="d-block d-sm-none my-4 text-center">
                <img src={providerlogo} className="w-50" alt="" />
              </div>
              <div className="d-flex justify-content-center">
                <div className="responsive-form my-5">
                  <div className="register-header mb-5">
                    <h1> Reset Password </h1>
                    <p>
                      Enter your email to verify your identity in the recovery
                      password
                    </p>
                  </div>
                  <div className="register-form">
                    <Form onSubmit={handleReset}>
                      {/* <FormGroup className="form-label-group">
                        <Input type="email" placeholder="Email" required />
                        <Label>Email</Label>
                      </FormGroup> */}
                      {/* <FormGroup className="form-label-group">
                      <Input type="password" placeholder="Password" required />
                      <Label>Password</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group">
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        required
                      />
                      <Label>Confirm Password</Label>
                    </FormGroup> */}

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
                          <span className="text-danger">
                            {confirmPasswordError}
                          </span>

                          <div className="form-control-position"></div>
                        </FormGroup>
                      </div>

                      <div className="d-flex justify-content-between flex-wrap flex-sm-row flex-column">
                        <Button.Ripple
                          block
                          className="btn-block py-2"
                          color="primary"
                          outline
                          onClick={() => history.push("/")}
                        >
                          Go Back to Login
                        </Button.Ripple>
                        <Button.Ripple
                          block
                          color="primary"
                          type="submit"
                          className="btn-block mt-1 mt-sm-0"
                          // onClick={(e) => e.preventDefault()}
                        >
                          Reset
                        </Button.Ripple>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
              <AuthFooter />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ResetPassword;
