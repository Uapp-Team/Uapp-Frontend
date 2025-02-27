import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import "../../../assets/CoustomStyle/auth.css";
import providerlogo from "../../../assets/img/providerlogo.svg";
import "../../../assets/scss/pages/authentication.scss";
import { rootUrl } from "../../../constants/constants";
import { history } from "../../../history";
import AuthFooter from "./register/components/AuthFooter";

const ForgotPassword = () => {
  const { addToast } = useToasts();
  const [email, setEmail] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [send, setSend] = useState(false);
  const [reSend, setReSend] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time]);

  const handleEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError(" Email is not validate");
    } else {
      setEmailError("");
    }
  };

  const handleSend = () => {
    setSend(true);
    setTime(30); // Start countdown
    setReSend(false);
    // Call your send email API here
  };

  const handleReSend = () => {
    setReSend(true);
    setTime(30); // Restart countdown
    // Call your resend email API here
  };

  const handleReset = () => {
    setTimeout(() => {
      setReSend(true);
    }, 30000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Email is not validate");
    } else {
      if (send === false) {
        axios
          .put(`${rootUrl}Account/ForgotPassword?email=${email}`)
          .then((res) => {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
          });
        setSend(true);
      } else {
        setReSend(false);
        axios
          .put(`${rootUrl}Account/ResendForgotEmail?email=${email}`)
          .then((res) => {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
          });
      }

      handleReset();
    }
  };

  return (
    <>
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
                  <h1> Recover your password </h1>
                  <p>
                    Enter your email to verify your identity in the recovery
                    password
                  </p>
                </div>
                <div className="register-form">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="form-label-group">
                      <Input
                        className="inside-placeholder"
                        style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                        type="text"
                        placeholder="Email"
                        onChange={(e) => handleEmail(e)}
                      />
                      <Label>Email</Label>
                      <span className="text-danger">{emailerror}</span>
                    </FormGroup>
                    <div className="float-md-left d-block mb-1">
                      <Button
                        color="primary"
                        outline
                        className="px-75 btn-block py-2"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push("/");
                        }}
                      >
                        Back to Login
                      </Button>
                    </div>
                    <div className="float-md-right d-block mb-1">
                      {reSend === true ? (
                        <Button
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          onClick={handleReSend}
                          disabled={time > 0}
                        >
                          {time > 0 ? `Wait ${time} Sec` : "Resend Email"}
                        </Button>
                      ) : (
                        <>
                          {!send ? (
                            <Button
                              color="primary"
                              type="submit"
                              className="px-75 btn-block"
                              onClick={handleSend}
                            >
                              Send Email
                            </Button>
                          ) : (
                            <span>
                              {time > 0 ? `Wait ${time} Sec` : "Time's up!"}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <AuthFooter />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
