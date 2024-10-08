import React from "react";
import {} from "reactstrap";
import StudentRegisterForm from "./StudentRegisterForm";
import "../../../../assets/scss/pages/authentication.scss";
import providerlogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/CoustomStyle/auth.css";
import AuthFooter from "./components/AuthFooter";
import { Link } from "react-router-dom";
const ProviderAccountCreateSuccessfully = () => {
  return (
    <div className="auth-container">
      <div className="left-illustration d-md-block d-lg-block d-none  ">
        <div className="provider-register-container">
          <img src={providerlogo} className="auth-logo-fixed" alt="uapp" />
        </div>
      </div>
      <div className="right-container">
        <div className="form-container">
          <div className="d-block d-sm-none my-4 text-center">
            <img src={providerlogo} className="w-50" alt="" />
          </div>
          <div className="d-flex justify-content-center">
            <div className="w-50 my-5">
              <div className="register-header">
                <h1 style={{ color: "black", marginBottom: "5px" }}>
                  Congratulation
                </h1>
                <h1 style={{ fontSize: "20px" }}>Registration is successful</h1>
                <p className="my-4" style={{ fontSize: "14px" }}>
                  {" "}
                  Your provide account has been created. You can now login and
                  add your universities where student can apply.
                </p>
              </div>

              <div className="mb-3 ">
                <Link to="/" className="already-registered">
                  <button className="btn-register-lg" type="submit">
                    Login Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <AuthFooter />
        </div>
      </div>
    </div>
  );
};

export default ProviderAccountCreateSuccessfully;
