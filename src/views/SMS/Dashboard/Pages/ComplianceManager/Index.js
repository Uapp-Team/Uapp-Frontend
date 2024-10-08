import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import cuser1 from "../../../../../assets/img/cuser1.svg";
import user from "../../../../../assets/img/Uapp_fav.png";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { Link, useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";

const ComplianceManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`CompilanceManagerDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`CompilanceManagerDashboard/Application`).then((res) => {
      setApplications(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const textDecorationStyle = {
    textDecoration: "underline",
    textDecorationColor: "#1e98b0",
    color: "#1e98b0",
    cursor: "pointer",
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
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
            Here's what's happening with your store today.
          </span>
        </div>

        <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4">
            <span style={{ fontWeight: "500" }}>
              Intake Range: {intake?.intakeName}
            </span>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div>
              <img src={Vectorbeat} className="img-fluid dashbard-img-style2" />
            </div>
          </div>
        </div>
      </div>

      {/* Status reports start */}
      <Row className="p-2">
        <Col className="m-2 p-3 AdmissionManager-card-application">
          <Link to="/applications">
            <h2> {count?.totalApplication}</h2>
          </Link>
          <Link to="/applications">
            <p className="text-gray-70">Total Application</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Process">
          <Link to={`/applicationsByStatus/${2}/${1}`}>
            <h2>{count?.totalApplicationInProgress}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${2}/${1}`}>
            <p className="text-gray-70">Applications in Process</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Unconditional">
          <Link to="">
            <h2>{count?.totalUnconditionalOffer}</h2>
          </Link>
          <Link to="">
            <p className="text-gray-70">Unconditional Offer</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Registered">
          <Link to="">
            <h2> {count?.totalRegistered}</h2>
          </Link>
          <Link to="">
            <p className="text-gray-70">Total Registered</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Rejected">
          <Link to="">
            <h2> {count?.totalRejected}</h2>
          </Link>
          <Link to="">
            <p className="text-gray-70">Rejected / Cancelled</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Withdrawn">
          <h2> {count?.totalWithdrawn}</h2>
          <p className="text-gray-70">Withdrawn Application</p>
        </Col>
      </Row>

      {/* status reports end */}

      {/* table start */}

      <div>
        <Card>
          <CardBody>
            <span className="app-style-const">Registered Applications</span>

            {applications?.length > 0 ? (
              <div style={{ height: "300px", overflowY: "scroll" }}>
                <Table borderless responsive className="mt-3">
                  <thead className="tablehead">
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>University</th>
                      <th>Status</th>
                      <th>Application Assesment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications?.map((app, i) => (
                      <tr key={i}>
                        <td className="cursor-pointer hyperlink-hover">
                          <span
                            onClick={() => {
                              history.push(
                                `/applicationDetails/${app?.id}/${app?.studentId}`
                              );
                            }}
                          >
                            {app?.student?.studentViewId}
                          </span>
                        </td>
                        <td>
                          <div>
                            <img
                              src={
                                app?.student?.profileImage?.thumbnailUrl == null
                                  ? user
                                  : rootUrl +
                                    app?.student?.profileImage?.thumbnailUrl
                              }
                              style={{
                                height: "28px",
                                width: "28px",
                                borderRadius: "50%",
                              }}
                              className="img-fluid"
                            />
                            <span style={{ marginLeft: "5px" }}>
                              {app?.student?.nameTittle?.name}{" "}
                              {app?.student?.firstName} {app?.student?.lastName}
                            </span>
                          </div>
                        </td>
                        <td>{app?.universityName}</td>
                        <td>{app?.applicationStatusName}</td>
                        <td>{app?.applicationAssesment}</td>
                        <td>{handleDate(app?.applicationDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <p style={{ textAlign: "center", fontWeight: "700" }}>
                No Application
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      {/* table end */}
    </>
  );
};

export default ComplianceManager;
