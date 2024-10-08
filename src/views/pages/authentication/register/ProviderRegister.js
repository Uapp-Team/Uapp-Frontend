import React from "react";
import { Row, Col } from "reactstrap";
import ProviderRegisterForm from "./ProviderRegisterForm";
import "../../../../assets/scss/pages/authentication.scss";
import UappLogo from "../../../../assets/img/Asset 12Icon.svg";
import providerlogo from "../../../../assets/img/providerlogo.svg";

import twousers from "../../../../assets/img/twousers.png";
import illustration3 from "../../../../assets/img/illustration 3.svg";
import RegisterFooter from "./components/AuthFooter";
import "../../../../assets/CoustomStyle/auth.css";
import { Link } from "react-router-dom";
import AuthFooter from "./components/AuthFooter";

class ProviderRegister extends React.Component {
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
              <div className="responsive-form">
                <div className="register-header">
                  <h1>Become a Provider</h1>
                  <p>Details of the designated person or company </p>
                </div>
                <div className="register-form">
                  <ProviderRegisterForm />
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
export default ProviderRegister;
