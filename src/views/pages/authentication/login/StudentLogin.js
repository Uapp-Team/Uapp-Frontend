import React from "react";
import { Row } from "reactstrap";
import "../../../../assets/scss/pages/authentication.scss";
import LoginForm from "./LoginForm";
// import UappLogo from "../../../../assets/img/backgrounds/Layer 2@2x.png";
import UappLogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/CoustomStyle/auth.css";
import RegisterFooter from "../register/components/AuthFooter";
import { Link } from "react-router-dom";
import AuthFooter from "../register/components/AuthFooter";

class StudentLogin extends React.Component {
  state = {
    activeTab: "1",
  };

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  render() {
    return (
      <div className="auth-container">
        <div className="left-illustration d-md-block d-lg-block d-none  ">
          <div className="bg-login">
            <img
              src={UappLogo}
              className="auth-logo-fixed"
              alt="uapp"
            />
          </div>
        </div>
        <div className="right-container">
          <div className="form-container">
            <div className="d-block d-sm-none my-4 text-center">
              <img src={UappLogo} className="w-50" alt="" />
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <div className="register-header">
                  <h1> Sign In</h1>
                  <p>
                    Log in to continue in our website{" "}
                  </p>
                </div>
                <div className="register-form">
                  <LoginForm />
                </div>
              </div>
            </div>
            <AuthFooter />
          </div>
        </div>
      </div>
    );
  }
}
export default StudentLogin;
