import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormGroup, Form, Input } from "reactstrap";
import { history } from "../../../../history";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { rootUrl } from "../../../../constants/constants";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState(false);
  const [IpAddress, setIpAddress] = useState("");
  const [GeoLocationInfo, setGeoLocationInfo] = useState("");

  useEffect(() => {
    try {
      fetch(`https://geolocation-db.com/json/`)
        .then((res) => res?.json())
        .then((data) => {
          setIpAddress(data?.IPv4);
          setGeoLocationInfo(
            `latitude ${data?.latitude}, longitude ${data?.longitude} `
          );
        })
        .catch((error) => {
          setGeoLocationInfo("not connected");
        });
    } catch {
      setGeoLocationInfo("not connected");
    }
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: 35, color: "white", fontWeight: "bold" }}
      spin
    />
  );

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("Provide a valid password");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setProgress(true);
    axios
      .post(`${rootUrl}Account/Login`, {
        email: email,
        password: password,
        IpAddress: IpAddress,
        GeoLocationInfo: GeoLocationInfo,
      })
      .then((response) => {
        setProgress(false);
        if (response?.status === 200) {
          if (response?.data?.isSuccess === true) {
            seterror("");
            localStorage.removeItem("date");
            localStorage.setItem("token", "Bearer " + response?.data?.message);
            localStorage.setItem("date", response?.data?.expireDate);
            localStorage.setItem(
              "permissions",
              JSON.stringify(response?.data?.permissions)
            );
            const AuthStr = "Bearer " + response?.data?.message;
            axios
              .get(`${rootUrl}Account/GetCurrentUser`, {
                headers: {
                  authorization: AuthStr,
                },
              })
              .then((res) => {
                if (res?.status === 200) {
                  if (res?.data?.isActive === true) {
                    localStorage.setItem(
                      "current_user",
                      JSON.stringify(res?.data)
                    );
                    localStorage.setItem("userType", res?.data?.userTypeId);
                    localStorage.setItem("referenceId", res?.data?.referenceId);
                    window.location.reload();
                  } else {
                    seterror("User is blocked");
                    // setcanNavigate(false);
                  }
                }
              });

            history.push("/");
          } else {
            seterror(response?.data?.message);
          }
        }
      })
      .catch();
  };
  return (
    <>
      <Form action="/" onSubmit={handleLogin} className="form-items">
        <FormGroup className="form-label-group position-relative has-icon-left">
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => handleEmail(e)}
            style={{
              height: "calc(1.5em + 1.3rem + 2px)",
            }}
          />
          <div className="form-control-position"></div>

          {emailerror && <span className="text-danger">{emailerror}</span>}
        </FormGroup>
        <FormGroup
          className="form-label-group position-relative has-icon-left"
          style={{ marginTop: "30px" }}
        >
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handlePassword(e)}
            style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
          />
          <div className="form-control-position"></div>

          {passwordError && (
            <span className="text-danger">{passwordError}</span>
          )}
        </FormGroup>
        <div className="text-danger">
          <span>{error}</span>
        </div>
        <div className="row d-flex justify-content-space-between">
          <div className="col-md-6">
            <div>
              <button className="btn-register-lg" type="submit">
                {progress ? <Spin indicator={antIcon} /> : "Sign In"}
              </button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="mt-2 ">
              <Link to="/pages/forgot-password" className="Forgot-Password">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </Form>
      <div className="register-links-section">
        <h1 className="mb-4">Don't have any account yet?</h1>
        <h1>Register as</h1>
        <div className="d-flex">
          <Link className="register-button-hover" to="/studentRegister">
            Student
          </Link>
          <Link to="/consultantRegister" className="register-button-hover">
            {" "}
            Consultant
          </Link>
          <Link to="/providerRegister" className="register-button-hover">
            {" "}
            Provider
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
