import React, { useEffect, useState } from "react";
import { Row } from "reactstrap";
import "../../../../assets/scss/pages/authentication.scss";
import LoginForm from "./LoginForm";
// import UappLogo from "../../../../assets/img/backgrounds/Layer 2@2x.png";
import UappLogo from "../../../../assets/img/providerlogo.svg";
import "../../../../assets/CoustomStyle/auth.css";
import RegisterFooter from "../register/components/AuthFooter";
import { Link } from "react-router-dom";
import AuthFooter from "../register/components/AuthFooter";
import img1 from "../../../../assets/img/loginpage-Illustration1.png";
import img2 from "../../../../assets/img/loginpage-Illustration2.png";
import img3 from "../../../../assets/img/loginpage-Illustration3.png";

const Login = () => {
  const state = {
    activeTab: "1",
  };

  const toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };
  console.log("rghtrhryh");
  // const imagesList = [img1, img2, img3];
  // const [currentSlide, setCurrentSlide] = useState(0);

  // const nextSlide = () => {
  //   setCurrentSlide((prevSlide) => (prevSlide + 1) % imagesList.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide(
  //     (prevSlide) => (prevSlide - 1 + imagesList.length) % imagesList.length
  //   );
  // };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     nextSlide();
  //   }, 2000); // Change slide every 3 seconds

  //   return () => clearInterval(intervalId);
  // }, [currentSlide]);

  return (
    <div className="auth-container">
      <div className="left-illustration d-md-block d-lg-block d-none  ">
        <div className="bg-login">
          {/* <img
            
            src={imagesList[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
          /> */}
          <img src={UappLogo} className="auth-logo-fixed" alt="uapp" />
        </div>
      </div>
      <div className="right-container">
        <div className="form-container">
          <div className="d-block d-sm-none my-4 text-center">
            <img src={UappLogo} className="w-50" alt="" />
          </div>
          <div className="d-flex justify-content-center">
            <div style={{ width: "360px" }}>
              <div className="register-header">
                <h1> Log In to your</h1>
                <h1>UAPP Account</h1>
                {/* <p>Log In to your UAPP Account </p> */}
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
};

export default Login;
