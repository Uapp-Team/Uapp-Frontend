import React, { useEffect, useState } from "react";
import logoLg from "../../../assets/img/Logo.svg";
import { Link, useParams, useHistory } from "react-router-dom";
import "../../../assets/CoustomStyle/auth.css";
import { rootUrl } from "../../../constants/constants";
import Axios from "axios";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";

const VerifyEmail = () => {
  const { email } = useParams();
  const { code } = useParams();
  const history = useHistory();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state for the timeout
  const current_user = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    if (!current_user) {
      // Simulate loading with setTimeout for 2 seconds
      setTimeout(() => {
        Axios.put(`${rootUrl}Account/verify-email?email=${email}&code=${code}`)
          .then((res) => {
            setVerify(res);
          })
          .catch((err) => {
            console.error("Email verification failed", err);
          })
          .finally(() => {
            setLoading(false); // Stop loading after verification
          });
      }, 1000); // Set timeout for 2 seconds before making API call
    } else {
      setLoading(false); // Stop loading if user is already logged in
    }
  }, [email, current_user]);

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutStorageHandler();
    // history.push("/");
  };

  return (
    <div className="text-center" style={{ paddingTop: "250px" }}>
      <img height={30} src={logoLg} alt="Logo" />

      {loading ? (
        // Loader content displayed during the 2-second timeout and API call
        <div>
          <h1 className="mt-3">Verifying your email...</h1>
          {/* You can replace the text below with a spinner or a loader component */}
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : current_user ? (
        <>
          <div>
            <h3 className="mt-3">
              You are already logged in as {current_user?.displayName}
            </h3>
            <p>
              Please log out first before verifying <b>{email}</b>
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
                onClick={(e) => handleLogOut(e)}
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      ) : verify ? (
        <>
          <div>
            <h1 className="mt-3">Email is verified</h1>
            <p>
              Congratulations! Your <b>{email}</b> has been verified
              successfully. <br />
              Now you can log into your account.
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
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="mt-3">Failed to verify</h1>
            <p>
              The email verification process failed. Try a different email or
              contact support.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
