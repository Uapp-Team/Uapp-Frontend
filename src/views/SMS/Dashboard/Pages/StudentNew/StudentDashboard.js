import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import LinkButton from "../../../Components/LinkButton";

import video from "../../../../../assets/video/video.mp4";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";

const StudentDashboard = () => {
  const [applicationinfo, setApplicationInfo] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const history = useHistory();

  useEffect(() => {
    get(`StudentApplication/Index/${currentUser?.referenceId}`).then((res) => {
      setApplicationInfo(res);
    });

    get(`StudentProfile/Get/${currentUser?.referenceId}`).then((res) => {
      setStudentDetails(res);
      // setIsHaveDisability(res?.profileOtherInfo?.isHaveDisability);
      // setIsHaveCriminalConvictions(res?.profileOtherInfo?.isHaveCriminalConvictions);
      // setEducationInfos(res?.educationInfos);

      // setGMatResult(res?.gmatScoreInfo);
      // setGreResult(res?.greScoreInfo);
      // setStudentTestScore(res?.studentTestScoreInfo);
      // setExperience(res?.experienceinfo);
      // setReference(res?.referenceInfo);

      // var datee =res?.dateOfBirth;
      // var utcDate = new Date(datee);
      // var localeDte = utcDate.toLocaleString("en-CA");
      // var bDate = localeDte?.split(",");
      // setDate(bDate[0]);
    });
  }, []);

  const handleRedirectToAppDetails = (appId, studentId) => {
    history.push({
      pathname: `applicationDetails/${appId}/${studentId}`,
      appId: appId,
    });
  };

  return (
    <div>
      <div className="uapp-user-name mb-3">
        <Row>
          <Col sm="9" xs="12">
            <h2>Welcome, {currentUser?.displayName}.</h2>
          </Col>

          <Col sm="3" xs="12 text-sm-right">
            {/* <button className="uapp-btn btn">Add New Action</button> */}
          </Col>
        </Row>
      </div>

      {applicationinfo.map((appInfo, i) => (
        <Row>
          <Col md="12">
            <Card style={{ borderLeft: "6px solid #1e98b0" }} className="p-2">
              <div key={i} className="row">
                <div className="col-md-2 my-auto">
                  <div className="text-center">
                    {/* <span className="university-title-style">Course</span> */}
                    <span className="">
                      {/* <i className="fas fa-location-dot"></i> */}
                      <b>APP ID</b>
                    </span>
                    <br />
                    <span className="span-style-search">
                      {/* <i className="fas fa-location-dot"></i> */}
                      {appInfo?.id}
                    </span>
                  </div>
                </div>

                <div className="col-md-2 my-auto">
                  <div className="text-center">
                    {/* <span className="university-title-style">Course</span> */}
                    <span className="">
                      {/* <i className="fas fa-location-dot"></i> */}
                      <b>Course</b>
                    </span>
                    <br />
                    <span className="span-style-search">
                      {/* <i className="fas fa-location-dot"></i> */}
                      {appInfo?.subject?.name}
                    </span>
                  </div>
                </div>

                <div className="col-md-2 my-auto">
                  <div className="text-center">
                    {/* <span className="university-title-style">University</span> */}
                    <span className="">
                      <b>University</b>
                    </span>
                    <br />
                    <span className="span-style-search">
                      {/* <i className="fas fa-location-dot"></i>
                    address */}
                      {appInfo?.university?.name}
                    </span>
                  </div>
                </div>

                <div className="col-md-2 my-auto">
                  <div className="text-center">
                    {/* <span className="university-title-style">Intake</span> */}
                    <span className="">
                      <b>Intake</b>
                    </span>
                    <br />
                    <span className="span-style-search">
                      {/* <i className="fas fa-location-dot"></i>
                    address */}
                      {appInfo?.intake?.name}
                    </span>
                  </div>
                </div>

                <div className="col-md-2 my-auto">
                  <div className="text-center">
                    {/* <span className="university-title-style">Status</span> */}
                    <span className="">
                      <b>Status</b>
                    </span>
                    <br />
                    <span className="span-style-search">
                      {/* <i className="fas fa-location-dot"></i>
                    address */}
                      {appInfo?.applicationStatus?.name}
                    </span>
                  </div>
                </div>

                <div className="col-md-2 my-auto text-center">
                  {/* <div className="d-flex justify-content-end"> */}
                  {/* <LinkButton
                    // url={`/universityDetails/${info?.universityId}`}
                    target={"_blank"}
                    color={"primary"}
                    className={"mx-1 btn-sm"}
                    icon={<i className="fas fa-eye"></i>}
                    permission={6}
                  /> */}
                  <span
                    style={{ color: "#1e98b0", cursor: "pointer" }}
                    className="font-weight-bold"
                    onClick={() =>
                      handleRedirectToAppDetails(
                        appInfo?.id,
                        appInfo?.studentId
                      )
                    }
                  >
                    View
                  </span>
                  {/* </div> */}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ))}

      <h5>
        <b>Need help before applying</b>
      </h5>
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-6">
                  {/* <video
                    width="100%"
                    height="100%"
                    src={video}
                    controls
                    autoPlay
                    loop
                  /> */}
                  <iframe
                    width="330"
                    height="190"
                    src="https://www.youtube.com/embed/V685_4XUz2Q"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>

                <div className="col-md-6">
                  <div className="row mb-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> FAQ
                      </span>
                    </div>
                  </div>

                  <div className="row my-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> BLOG
                      </span>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-12 col-sm-12">
                      <span>
                        <i className="fas fa-chevron-circle-right"></i> CONTACT
                      </span>
                    </div>
                  </div>

                  <div className="row mt-2 mt-5 pt-4">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ borderLeft: "2px solid #626262" }}>
                        <span className="ml-2">Email: support@uapp.uk</span>
                        <br />
                        <span className="ml-2">Phone: +0232383902</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-md-4 col-sm-12">
          <Card className="uapp-employee-profile-right1">
            <div
              style={{
                borderTopLeftRadius: "7px",
                borderTopRightRadius: "7px",
              }}
              className="uapp-profile-CardHeader"
            >
              <div className="uapp-circle-image margin-top-minus">
                <img
                  src={
                    rootUrl +
                    studentDetails?.consultant?.consultantProfileImageMedia
                      ?.thumbnailUrl
                  }
                  alt="consultant_photo"
                />
              </div>

              <h5>
                {studentDetails?.consultant?.firstName}{" "}
                {studentDetails?.consultant?.lastName}
              </h5>
              <p style={{ marginBottom: "90px" }}> Consultant </p>
            </div>
            <CardBody>
              <div>
                <ul className="uapp-ul text-center">
                  <li> {studentDetails?.consultant?.email} </li>
                  <li> {studentDetails?.consultant?.phoneNumber} </li>
                  {/* <li> 80-82 Nelson st, Whitechapel, E12DY, london United Kingdom </li> */}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div className="my-4 join-consultant-banner">
            <div className="p-4 join-consultant-container">
              <h4 style={{ color: "rgb(30, 152, 176)", fontSize: "20px" }}>
                <b>JOIN OUR CONSULTANT TEAM</b>
              </h4>
              <div className="ml-2 mt-2">
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Recommend your friends and family</span> <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Earn money for each successful students</span> <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Develop your skill while studying</span> <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Opportunity to work in your own time</span> <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Change your life & help others to change theirs</span>{" "}
                <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span>Contribute to the community to be educated</span> <br />
                <span>
                  <i class="fas fa-check-circle"></i>
                </span>{" "}
                <span style={{ color: "#00cc00" }}>
                  Permanent job opportunity
                </span>{" "}
                <br />
              </div>

              <div className="ml-2 mt-2 d-sm-flex">
                <div
                  className="mr-3"
                  style={{
                    fontSize: "12px",
                    marginTop: "20px",
                    border: "1px solid rgb(30, 152, 176)",
                    borderRadius: "7px",
                    padding: "5px",
                  }}
                >
                  <span>Contact us for more details</span> <br />
                  <span style={{ color: "rgb(30, 152, 176)" }}>
                    <span>
                      <i class="fas fa-envelope-open-text"></i>{" "}
                    </span>
                    consultant@uapp.uk
                  </span>
                </div>

                {/* <div
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        marginTop: "20px",
                        backgroundColor: "rgb(30, 152, 176)",
                        // border: "1px solid rgb(30, 152, 176)",
                        borderRadius: "47px",
                        padding: "5px"
                      }}
                    >
                        <span><b>Become Consultant</b></span>
                    </div> */}

                <Button
                  color="rgb(30, 152, 176)"
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    marginTop: "20px",
                    backgroundColor: "rgb(30, 152, 176)",
                    // border: "1px solid rgb(30, 152, 176)",
                    borderRadius: "47px",
                    padding: "5px",
                  }}
                >
                  <b>Become Consultant</b>
                </Button>
              </div>
            </div>

            <div className="col-md-6 col-sm-12"></div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12"></div>
      </div>
    </div>
  );
};

export default StudentDashboard;
