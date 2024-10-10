import React from "react";
import {} from "reactstrap";
import StudentRegisterForm from "./StudentRegisterForm";
import "../../../../assets/scss/pages/authentication.scss";
import providerlogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/CoustomStyle/auth.css";
import AuthFooter from "./components/AuthFooter";

export default function Register() {
  return (
    <div className="auth-container">
      <div className="left-illustration d-md-block d-lg-block d-none  ">
        <div className="student-register-container">
          <img src={providerlogo} className="auth-logo-fixed" alt="uapp" />
        </div>
      </div>
      <div className="right-container">
        <div className="form-container">
          <div className="d-block d-sm-none my-4 text-center">
            <img src={providerlogo} className="w-50" alt="" />
          </div>
          <div className="d-flex justify-content-center">
            <div className="responsive-form">
              <div className="register-header">
                <h1> Become a Student</h1>
                <p> Apply to Multiple Universities </p>
              </div>
              <div className="register-form">
                <StudentRegisterForm />
              </div>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
