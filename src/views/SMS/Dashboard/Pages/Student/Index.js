import React, { useEffect, useState } from "react";
import vector from "../../../../../assets/img/Vector.png";
import banner from "../../../../../assets/img/banner.svg";
import { Card, CardBody, Col, Row } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import get from "../../../../../helpers/get";
import axios from "axios";
import { rootUrl } from "../../../../../constants/constants";
import ApplicationList from "./Components/ApplicationList";
import profileImage from "../../../../../assets/img/profile/user-uploads/user-07.jpg";
import UserNotices from "../../Component/UserNotices";
import Consent from "../../../STUDENT/StudentProfile/Component/Consent";
import ProfilePreview from "../../../STUDENT/StudentProfile/ProfilePreview";
import StudentJoinBanner from "../../../Affiliate/AffiliateComponents/StudentJoinBanner";
import Department from "./Components/Department";

const Student = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [consultantData, setConsultantData] = useState({});
  const referenceId = localStorage.getItem("referenceId");
  const history = useHistory();
  const [canConsultant, setCanConsultant] = useState(false);
  const [info, setInfo] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});
  const [contactData, setContactData] = useState([]);
  const [emergencyContactList, setEmergencyContactList] = useState({});
  const [applicationData, setApplicationData] = useState({});
  const [fundingData, setFundingData] = useState({});
  const [educationalInfos, setEducationalInfos] = useState([]);
  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});
  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});
  const [experienceInfo, setExperienceInfo] = useState([]);
  const [referenceList, setReferenceList] = useState([]);
  const [studentStatement, setStudentStatement] = useState({});
  const [scanId, setScanId] = useState("");
  const [result, setResult] = useState("");
  const [otherInformation, setOtherInformation] = useState({});
  const [UploadData, setUploadData] = useState({});
  const [completeAssessment, setcompleteAssessment] = useState({});

  useEffect(() => {
    get(`Student/CheckIfStudentIsConsultant/${currentUser?.displayEmail}`).then(
      (res) => {
        setInfo(res);
      }
    );
    if (referenceId) {
      get(`Student/CanBecomeConsultant/${referenceId}`).then((res) => {
        setCanConsultant(res);
      });
    }
  }, [currentUser.displayEmail, referenceId]);

  useEffect(() => {
    get(`ApplicationAssesment/DashboardAssesment`).then((res) => {
      setcompleteAssessment(res);
    });
  }, []);

  useEffect(() => {
    //get(`StudentApplication/Index/${referenceId}`).then((res) => {
    //  setApplicationInfo(res);
    //});

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

  const redirectConsultantProfile = () => {
    history.push(`/consultantProfile/${consultantData?.id}`);
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
      <div className="d-flex justify-content-between flex-wrap">
        <div>
          <span className="std-dashboard-style1">
            Hello, {currentUser?.displayName}!
          </span>
          <br />
          <span className="std-dashboard-style2">
            Here's what's happening with your portal.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          {completeAssessment?.isRequired !== false ? (
            <div className="complete-assessment mr-2">
              <a href={completeAssessment?.link} target="blank">
                complete assessment
              </a>
            </div>
          ) : null}
          <div style={{ cursor: "pointer" }}>
            {/* <div className="std-dashboard-style4"></div> */}

            {/* <>
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
            </> */}
          </div>
          <UserNotices />

          {/*<div style={{ cursor: "pointer" }}>*/}
          {/*  <div className="std-dashboard-style6"></div>*/}

          {/*  <div>*/}
          {/*    <img*/}
          {/*      src={Vectorbeat}*/}
          {/*      alt=""*/}
          {/*      className="img-fluid dashbard-img-style2"*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>

      <ApplicationList
        referenceId={referenceId}
        consultantData={consultantData}
        totalStars={5}
      />

      {/* Student Profile Redirect Section End*/}

      {/* Banner Image and Consultant Section Start */}

      <div className="row">
        <div className="col-md-8">
          <Department />
          {/* {info ? (
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
              {canConsultant ? (
                <>
                  <img src={banner} className="w-100" alt="" />

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
              ) : null}
            </>
          )} */}
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
                  <span
                    className="consultant-name-style-student-dashboard"
                    onClick={redirectConsultantProfile}
                    style={{ cursor: "pointer" }}
                  >
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

          <Consent
            sId={referenceId}
            studentDetails={studentDetails}
            contactData={contactData}
            emergencyContactList={emergencyContactList}
            applicationData={applicationData}
            fundingData={fundingData}
            educationalInfos={educationalInfos}
            ielts={ielts}
            duolingo={duolingo}
            toefl={toefl}
            functions={functions}
            gcse={gcse}
            pearson={pearson}
            others={others}
            pte={pte}
            greData={greData}
            gmatData={gmatData}
            experienceInfo={experienceInfo}
            referenceList={referenceList}
            studentStatement={studentStatement}
            scanId={scanId}
            result={result}
            otherInformation={otherInformation}
            UploadData={UploadData}
          />
          <StudentJoinBanner className="my-4" />
          <div className="d-none">
            <ProfilePreview
              sId={referenceId}
              studentDetails={studentDetails}
              setStudentDetails={setStudentDetails}
              contactData={contactData}
              setContactData={setContactData}
              emergencyContactList={emergencyContactList}
              setEmergencyContactList={setEmergencyContactList}
              applicationData={applicationData}
              setApplicationData={setApplicationData}
              fundingData={fundingData}
              setFundingData={setFundingData}
              educationalInfos={educationalInfos}
              setEducationalInfos={setEducationalInfos}
              ielts={ielts}
              setIelts={setIelts}
              duolingo={duolingo}
              setDuolingo={setDuolingo}
              toefl={toefl}
              setToefl={setToefl}
              functions={functions}
              setFunctions={setFunctions}
              gcse={gcse}
              setGcse={setGcse}
              pearson={pearson}
              setPearson={setPearson}
              others={others}
              setOthers={setOthers}
              pte={pte}
              setPte={setPte}
              greData={greData}
              setGreData={setGreData}
              gmatData={gmatData}
              setGmatData={setGmatData}
              experienceInfo={experienceInfo}
              setExperienceInfo={setExperienceInfo}
              referenceList={referenceList}
              setReferenceList={setReferenceList}
              studentStatement={studentStatement}
              setStudentStatement={setStudentStatement}
              scanId={scanId}
              setScanId={setScanId}
              result={result}
              setResult={setResult}
              otherInformation={otherInformation}
              setOtherInformation={setOtherInformation}
              UploadData={UploadData}
              setUploadData={setUploadData}
            />
          </div>

          {/* <Card>
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
                  <img src={arrowright} className="img-fluid" alt="" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      FAQ
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" alt="" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      BLOG
                    </span>
                  </Link>
                </li>

                <li style={{ listStyleType: "none" }}>
                  <img src={arrowright} className="img-fluid" alt="" />
                  <Link style={{ textDecorationColor: "#1E98B0" }}>
                    {" "}
                    <span className="video-info-style-student-dashboard">
                      CONTACT
                    </span>
                  </Link>
                </li>
              </div>
            </CardBody>
          </Card> */}
        </div>
      </div>

      {/* Banner Image and Consultant Section End */}
    </>
  );
};

export default Student;
