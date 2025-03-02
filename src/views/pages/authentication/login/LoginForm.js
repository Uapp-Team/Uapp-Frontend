import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Input, InputGroup, InputGroupText } from "reactstrap";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import { androidAppUrl, rootUrl } from "../../../../constants/constants";
import SetStorage from "../../../SMS/TableColumn/SetStorage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [progress, setProgress] = useState(false);
  const [IpAddress, setIpAddress] = useState("");
  const [GeoLocationInfo, setGeoLocationInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!email) {
      isValid = false;
      setEmailError("Email is required");
    }

    if (!password) {
      isValid = false;
      setPasswordError("Provide a valid password");
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (ValidateForm()) {
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
              localStorage.setItem(
                "token",
                "Bearer " + response?.data?.authToken
              );
              localStorage.setItem("date", response?.data?.expireDate);
              localStorage.setItem(
                "refreshToken",
                response?.data?.refreshToken
              );
              localStorage.setItem(
                "permissions",
                JSON.stringify(response?.data?.permissions)
              );
              const AuthStr = "Bearer " + response?.data?.authToken;
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
                      localStorage.setItem(
                        "referenceId",
                        res?.data?.referenceId
                      );

                      if (res?.data?.userTypeId === 6) {
                        axios
                          .get(
                            `${rootUrl}Student/CheckIsLead/${res?.data?.referenceId}`,
                            {
                              headers: {
                                authorization: AuthStr,
                              },
                            }
                          )
                          .then((res) => {
                            if (res?.status === 200) {
                              localStorage.setItem("IsLead", res?.data?.result);
                              window.location.reload();
                            } else {
                              seterror(res?.data?.authToken);
                            }
                          });
                      } else {
                        window.location.reload();
                      }
                    } else {
                      seterror("User is blocked");
                      // setcanNavigate(false);
                    }
                  }
                });

              // history.push("/");
            } else {
              seterror(response?.data?.authToken);
            }
          }
        })
        .catch();
    }
    SetStorage();
  };

  const sendRequest = () => {
    // history.push(`/admissionManagerPersonalInformation/${0}`);
  };

  return (
    <>
      {/* <p onClick={() => setIsModalOpen(!isModalOpen)}>Open Modal</p> */}
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
          <InputGroup>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => handlePassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <InputGroupText
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </InputGroupText>
          </InputGroup>
          <div className="form-control-position"></div>

          {passwordError && (
            <span className="text-danger">{passwordError}</span>
          )}
        </FormGroup>
        <div className="text-danger">
          <span>{error}</span>
        </div>
        <div className="row d-flex justify-content-space-between">
          <div className="col-md-5">
            <div>
              <button className="btn-register-lg" type="submit">
                {progress ? <Spin indicator={antIcon} /> : "Sign In"}
              </button>
            </div>
          </div>

          <div className="col-md-7">
            <div className="mt-2">
              <Link to="/pages/forgot-password" className="Forgot-Password">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </Form>
      {/* <div className="register-links-section">
        <div className="d-flex">
          <div className="mr-3">
            <img src={maintenance} width={45} alt="" />
          </div>
          <p className="maintenance-text">
            The UAPP Portal is now fully updated and live. Meanwhile, get ready
            for the full website launch very soon!
          </p>
        </div>
      </div> */}
      <div className="register-links-section">
        <h1 className="mb-4">Don't have any account yet?</h1>
        <h1>Register as</h1>
        <div className="d-flex">
          <Link className="register-button-hover" to="/studentRegister">
            Student
          </Link>
          <Link to="/consultantRegister" className="register-button-hover">
            Consultant
          </Link>
          <Link to="/providerRegister" className="register-button-hover">
            Provider
          </Link>
        </div>
      </div>

      <div className="Download-app-section">
        <h4 className="mb-3">Download for mobile</h4>

        <div className="d-flex">
          {/* <a href={androidAppUrl}>
            {" "}
            <div className="apple-download mr-2 d-flex justify-content-center align-items-center">
              <i class="fab fa-app-store-ios"></i>
              <div className="mt-2">
                {" "}
                <p className="ml-2">
                  <span>Download for the</span>
                  <br />
                  Apple users
                </p>
              </div>
            </div>
          </a> */}

          <a href={androidAppUrl}>
            <div className="android-download d-flex justify-content-center align-items-center">
              <i class="fab fa-android"></i>
              <div className="mt-2">
                <p className="ml-2">
                  <span>GET IT ON</span>
                  <br />
                  Android users
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <ConfirmModal
        text="Your account has been deleted."
        text2="Would you like to recover your account? please get in touch with the admin by email."
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        buttonStatus={buttonStatus}
        progress={progress}
        noText="Cancel"
        yesText="Send Request"
        cancel={() => setIsModalOpen(false)}
        confirm={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default LoginForm;
