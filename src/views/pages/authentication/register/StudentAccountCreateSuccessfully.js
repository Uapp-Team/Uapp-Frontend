import React from "react";
import {} from "reactstrap";
// import StudentRegisterForm from "./StudentRegisterForm";
import { Link } from "react-router-dom";
import "../../../../assets/CoustomStyle/auth.css";
import providerlogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/scss/pages/authentication.scss";
import AuthFooter from "./components/AuthFooter";
// import { Link } from "react-router-dom";
const StudentAccountCreateSuccessfully = () => {
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
            <div className="w-75 my-5">
              <div className="register-header mt-5">
                <h1 className="text-orange fw-600">Congratulations !</h1>
                <h1 className="my-4" style={{ fontSize: "20px" }}>
                  Successfully submitted
                </h1>

                <p style={{ fontSize: "14px" }}>
                  A verification email has been sent to your email address.
                  Please follow the instructions within the email to verify your
                  account.
                </p>
                <Link className="text-id hover" to="/">
                  Log In to your UAPP Account
                </Link>

                {/* <p style={{ fontSize: "14px" }}>
                  Your student account has been created. We have send a
                  verification email to your email address. To continue to the
                  next steps please verify your email first.
                </p> */}
              </div>
              {/* 
              <div className="mb-3 ">
                <Link to="/" className="already-registered">
                  <button className="btn-register-lg" type="submit">
                    Login Now
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default StudentAccountCreateSuccessfully;
