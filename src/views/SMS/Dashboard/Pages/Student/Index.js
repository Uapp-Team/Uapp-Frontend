import React, { useEffect, useState } from "react";
import plusicon from "../../../../../assets/img/plusicon.svg";
import vector from "../../../../../assets/img/Vector.png";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import banner from "../../../../../assets/img/banner.svg";
import arrowright from "../../../../../assets/img/arrowright.svg";
import tick from "../../../../../assets/img/tick.svg";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import post from "../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import axios from "axios";
import { rootUrl } from "../../../../../constants/constants";
import ApplicationList from "./Components/ApplicationList";
import profileImage from "../../../../../assets/img/profile/user-uploads/user-07.jpg";

const Student = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [consultantData, setConsultantData] = useState({});

  const referenceId = localStorage.getItem("referenceId");
  const { addToast } = useToasts();
  const history = useHistory();
  const [info, setInfo] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [applicationinfo, setApplicationInfo] = useState([]);

  useEffect(() => {
    get(`Student/CheckIfStudentIsConsultant/${currentUser?.displayEmail}`).then(
      (res) => {
        setInfo(res);
      }
    );
  }, [currentUser]);

  useEffect(() => {
    get(`StudentApplication/Index/${referenceId}`).then((res) => {
      setApplicationInfo(res);
    });

    get(`ConsultantProfile/StudentParentConsultant/${referenceId}`).then(
      (res) => {
        setConsultantData(res);
      }
    );

    get(`StudentConsent/Dashboard/${referenceId}`).then((res) => {
      setDashboard(res);
    });
  }, [referenceId]);

  const makeStudentConsultant = () => {
    history.push(`/becomeConsultant`);
  };
  const redirectToAddStudent = () => {
    history.push(
      `/addStudentInformation/${localStorage.getItem("referenceId")}`
    );
  };
  const handleConsent = () => {
    history.push(`/studentDeclaration/${localStorage.getItem("referenceId")}`);
  };
  const redirectSearchApply = () => {
    history.push(`/search/${localStorage.getItem("referenceId")}`);
  };

  const convertAccount = (e) => {
    axios
      .get(`${rootUrl}AccountSwitch/SwitchToConsultant`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response?.status === 200) {
          if (response?.data?.isSuccess === true) {
            localStorage.removeItem("token");
            localStorage.removeItem("permissions");

            localStorage.setItem("token", "Bearer " + response?.data?.message);
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
                  }
                }
              });

            history.push("/");
          }
        }
      })
      .catch();
  };

  return (
    <>
      <div></div>

      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div style={{ cursor: "pointer" }}>
            {/* <div className="std-dashboard-style4"></div> */}

            <>
              {dashboard?.isProfileCompleted === false ? (
                <div className="std-profile">
                  <span onClick={redirectToAddStudent}>Complete Profile</span>
                </div>
              ) : dashboard?.isConsentSigned === false ? (
                <div className="std-consent-and-profile">
                  <img
                    src={vector}
                    className="img-fluid dashbard-img-style1"
                    alt=""
                  />
                  <span onClick={handleConsent}>Sign Consent</span>
                </div>
              ) : dashboard?.canApply === true ? (
                <div className="std-search">
                  <span onClick={redirectSearchApply}>Search And Apply</span>
                </div>
              ) : null}
            </>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div>
              <img
                src={Vectorbeat}
                alt=""
                className="img-fluid dashbard-img-style2"
              />
            </div>
          </div>
        </div>
      </div>

      <ApplicationList referenceId={referenceId} />

      {/* Student Profile Redirect Section End*/}

      {/* Banner Image and Consultant Section Start */}

      <div className="row">
        <div className="col-md-8">
          {info ? (
            <Card style={{ marginTop: "24px", backgroundColor: "#1890FF" }}>
              <CardBody>
                <div
                  style={{ height: "60px" }}
                  className="d-flex flex-wrap align-items-center justify-content-between px-4"
                >
                  <span className="text-white fw-500">
                    You become a consultant of UAPP.
                    <br /> Do you want to login to your consultant account?
                  </span>

                  <button
                    className="become-consultant text-dark"
                    onClick={convertAccount}
                  >
                    <i class="fas fa-sync"></i> Switch to consultant
                  </button>
                </div>
              </CardBody>
            </Card>
          ) : (
            <>
              <i mg src={banner} className="w-100" alt="" />

              <Card style={{ marginTop: "24px" }}>
                <CardBody className="waiting-for">
                  <div
                    style={{ height: "60px" }}
                    className="d-flex flex-wrap align-items-center justify-content-between px-4"
                  >
                    <span className="std-dashboard-style-why">
                      Why you waiting for?
                    </span>

                    <button
                      className="become-consultant"
                      onClick={makeStudentConsultant}
                    >
                      Become Consultant
                    </button>
                  </div>
                </CardBody>
              </Card>
            </>
          )}
        </div>
        <div className="col-md-4">
          <Card className="p-4">
            <div className="d-flex justify-between-start">
              {consultantData?.consultantProfileImageMedia == null ? (
                <img
                  src={profileImage}
                  alt="profile_img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                />
              ) : (
                <img
                  src={
                    rootUrl +
                    consultantData?.consultantProfileImageMedia?.fileUrl
                  }
                  alt="profile_img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                />
              )}
              <div>
                <div className="consultant-info-style-std-dashboard">
                  <span className="consultant-name-style-student-dashboard">
                    {consultantData?.fullName}
                  </span>
                  <br />
                  <span className="consultant-role-student-dashboard">
                    Hello, I’m your consultant
                  </span>
                  <br />
                  <span className="consultant-role-student-dashboard">
                    I am here to assist you.
                    <br /> Connect me when necessary
                  </span>
                </div>
              </div>
            </div>
            <Row>
              <Col>
                <ul className="uapp-ul ">
                  {consultantData?.email === null ? null : (
                    <li>
                      {" "}
                      <i className="far fa-envelope pr-2"></i>{" "}
                      {consultantData?.email}{" "}
                    </li>
                  )}

                  {consultantData?.phoneNumber == null ? null : (
                    <li>
                      {" "}
                      <i className="fas fa-phone pr-2"></i>{" "}
                      {consultantData?.phoneNumber}{" "}
                    </li>
                  )}
                </ul>
              </Col>
            </Row>

            {/* <div className="necessary-link-student-dashboard">
                    <Link style={{ textDecorationColor: "#1E98B0" }}>
                      <span className="consultant-role-student-dashboard2">
                        {consultantData?.email}
                      </span>
                    </Link>
                    <br />
                    <Link style={{ textDecorationColor: "#1E98B0" }}>
                      <span className="consultant-role-student-dashboard2">
                        {consultantData?.phoneNumber}
                      </span>
                    </Link>
                  </div> */}
          </Card>

          <Card>
            <CardBody>
              <iframe
                className="w-100"
                height="177"
                src="https://www.youtube.com/embed/V685_4XUz2Q"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style={{ marginBottom: "19px" }}
              ></iframe>

              <div>
                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      FAQ
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      BLOG
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      CONTACT
                    </span>
                  </Link>
                </li>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Banner Image and Consultant Section End */}
    </>
  );
};

export default Student;
