import React, { useEffect, useState } from "react";
import logoLg from "../../../assets/img/Logo.svg";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../../assets/CoustomStyle/auth.css";
import { rootUrl } from "../../../constants/constants";
import Axios from "axios";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";

const VerifyEmail = () => {
  const { email } = useParams();
  const history = useHistory();
  const [verify, setVerify] = useState(false);
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    if (!current_user) {
      Axios.put(`${rootUrl}Account/verify-email?email=${email}`).then((res) => {
        setVerify(res);
      });
    }
  }, [email, current_user]);

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutStorageHandler();
    // window.localStorage.clear();
    // window.location.reload();
    // history.push("/");
  };

  return (
    <div className="text-center" style={{ paddingTop: "250px" }}>
      <img height={30} src={logoLg} alt="" />

      {current_user ? (
        <>
          <div>
            <h3 className="mt-3">
              You are already login as {current_user?.displayName}
            </h3>
            <p>
              Please logout first before verify <b>{email}</b>
            </p>
            <div className="text-center mt-3">
              <button
                className="px-5 py-2"
                style={{
                  backgroundColor: "rgb(252 115 0)",
                  color: "white",
                  borderRadius: "69px",
                  fontSize: "24px",
                  fontWeight: "400",
                  border: "0",
                }}
                onClick={(e) => {
                  handleLogOut(e);
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      ) : !current_user && verify !== false ? (
        <>
          <div>
            <h1 className="mt-3">Email is verified</h1>
            <p>
              Congratulations! Your <b>{email}</b> is verified successfully.{" "}
              <br />
              Now you can log into your account.-details
            </p>
            <Link to="/" className="text-center mt-3">
              <button
                className="px-5 py-2"
                style={{
                  backgroundColor: "rgb(252 115 0)",
                  color: "white",
                  borderRadius: "69px",
                  fontSize: "24px",
                  fontWeight: "400",
                  border: "0",
                }}
              >
                Log In
              </button>
            </Link>
          </div>{" "}
        </>
      ) : (
        <>
          <div>
            <h1 className="mt-3">Failed to verify</h1>
            <p>
              The email verification process failed. Try with different email or
              contact UAPP helpline.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
