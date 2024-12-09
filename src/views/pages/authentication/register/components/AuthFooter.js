import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <div>
      <div className="d-flex justify-content-between mb-4 mr-3">
        <div>
          <Link to={"/"} className="register-footer-link">
            Privacy
          </Link>
          <Link to={"/"} className="register-footer-link">
            Policy
          </Link>
        </div>
        <div>
          <span className="register-footer-credit">
            <span>© UAPP</span>
          </span>
        </div>
      </div>
    </div>
  );
}
