import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../../assets/CoustomStyle/auth.css";
import logoLg from "../../../assets/img/Logo.svg";
import { rootUrl } from "../../../constants/constants";
import { logoutStorageHandler } from "../../../helpers/logoutStorageHandler";

const VerifyEmail = () => {
  const { email, code } = useParams();
  const [verify, setVerify] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .put(`${rootUrl}Account/verify-email?email=${email}&code=${code}`)
      .then((res) => {
        setVerify(res.data);
      })
      .catch((err) => {
        console.error("Email verification failed", err);
        setVerify(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, code]);

  const handleLogOut = (e) => {
    e.preventDefault();
    logoutStorageHandler();
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
      ) : // current_user ? (
      //   <>
      //     <div>
      //       <h3 className="mt-3">
      //         You are already logged in as {current_user?.displayName}
      //       </h3>
      //       <p>
      //         Please log out first before verifying <b>{email}</b>
      //       </p>
      //       <div className="text-center mt-3">
      //         <button
      //           className="px-5 py-2"
      //           style={{
      //             backgroundColor: "rgb(252 115 0)",
      //             color: "white",
      //             borderRadius: "69px",
      //             fontSize: "24px",
      //             fontWeight: "400",
      //             border: "0",
      //           }}
      //           onClick={(e) => handleLogOut(e)}
      //         >
      //           Log Out
      //         </button>
      //       </div>
      //     </div>
      //   </>
      // )
      verify ? (
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
