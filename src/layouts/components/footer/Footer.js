import React from "react";
import ScrollToTop from "react-scroll-up";
import { Button } from "reactstrap";
import { ArrowUp } from "react-feather";
import classnames from "classnames";
import Lgimage from "../../../assets/img/Asset 12Icon.svg";
const Footer = () => {
  return (
    <footer className={classnames("footer")}>
      <div className="uapp-footer ">
        <div className="row justify-content-center">
          <div className="show-max-678 uapp-footer-img">
            <img src={Lgimage} alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 order-md-1 order-3  footer-text">
            <a href="/">UAPP</a>
            <span> © SMS Higher Education Group.</span>
          </div>

          <div className="col-md-4 col-sm-12 order-md-2  order-1 footer-text">
            <ul className="uapp-footer-list">
              <li> Privacy policy </li>
              <li> Terms & conditions </li>
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
