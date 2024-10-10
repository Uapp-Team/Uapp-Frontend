import React from "react";
import ScrollToTop from "react-scroll-up";
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";
import classnames from "classnames";
import logo from "../../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import { userTypes } from "../../../constants/userTypeConstant";

const Footer = () => {
  const userType = localStorage.getItem("userType");
  return (
    <footer className={classnames("footer")}>
      <div className="uapp-footer ">
        <div className="row justify-content-center">
          <div className="show-max-678 uapp-footer-img">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 order-md-1 order-3  footer-text">
            <span> © UAPP</span>
          </div>

          <div className="col-md-4 col-sm-12 order-md-2  order-1 footer-text">
            <ul className="uapp-footer-list">
              {/* <li> Privacy policy </li> */}

              {userType === userTypes?.Student.toString() ? (
                <li>
                  <Link to={`/student-declaration`}>Terms & conditions</Link>{" "}
                </li>
              ) : userType === userTypes?.Consultant.toString() ? (
                <li>
                  <Link to={`/consultant-declaration`}>Terms & conditions</Link>{" "}
                </li>
              ) : null}

              {/* <li> Terms & conditions </li> */}
            </ul>
          </div>

          <div className="col-md-4 col-sm-12 order-md-3 d-flex justify-content-center order-2  footer-text">
            <span className="text-center">support: support@uapp.uk</span>
            <span className="ml-2">Powered by Jpro UK ltd. </span>
          </div>
        </div>
      </div>

      <p className="mb-0 clearfix"></p>
      <ScrollToTop showUnder={160}>
        <Button color="primary" className="btn-icon scroll-top">
          <ArrowUp size={15} />
        </Button>
      </ScrollToTop>
    </footer>
  );
};

export default Footer;
