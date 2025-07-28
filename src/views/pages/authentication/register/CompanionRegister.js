import React from "react";
import "../../../../assets/scss/pages/authentication.scss";
import providerlogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/CoustomStyle/auth.css";
import AuthFooter from "./components/AuthFooter";
import CompanionRegisterForm from "./CompanionRegisterForm";

class CompanionRegister extends React.Component {
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
          <div className="consultant-register-container">
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
                  <h1 style={{ fontSize: "28px" }}>Become a Referrers</h1>
                  {/* <p>Help student to apply in appropriate university </p> */}
                </div>
                <div className="register-form">
                  <CompanionRegisterForm />
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
export default CompanionRegister;
