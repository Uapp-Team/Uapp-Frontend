import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import user from "../../../../../assets/img/Uapp_fav.png";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { Link, useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import Filter from "../../../../../components/Dropdown/Filter";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const ComplianceManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);

  useEffect(() => {
    get("AccountIntakeDD/index").then((res) => {
      setIntakeRngDD(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);

  useEffect(() => {
    const filterData = intakeRngDD.filter((status) => {
      return status.id === intake?.id;
    });

    setIntakeRngValue(filterData[0]?.id);
    setIntakeRngLabel(filterData[0]?.name);
  }, [intakeRngDD, intake]);

  useEffect(() => {
    get(`CompilanceManagerDashboard/Counting/${intakeRngValue}`).then((res) => {
      setCount(res);
    });

    get(`CompilanceManagerDashboard/Application/${intakeRngValue}`).then(
      (res) => {
        setApplications(res);
      }
    );
  }, [intakeRngValue]);

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
            Here's what's happening with your portal.
          </span>
        </div>

        <div className="d-flex  align-items-center">
          <div
            className=" mr-4 mb-1 d-flex align-items-center"
            style={{ marginTop: "-17px" }}
          >
            <span className="mr-1 fw-500">Intake Range:</span>
            <Filter
              data={intakeRngDD}
              label={intakeRngLabel}
              setLabel={setIntakeRngLabel}
              value={intakeRngValue}
              setValue={setIntakeRngValue}
              action={() => {}}
              isDisabled={false}
            />
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

            <div>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Status reports start */}
      <Row className="p-2">
        <Col className="m-2 p-3 AdmissionManager-card-application">
          <Link to={`/applicationsbyintake/${intakeRngValue}`}>
            <h2> {count?.totalApplication}</h2>
          </Link>
          <Link to={`/applicationsbyintake/${intakeRngValue}`}>
            <p className="text-gray-70">Total Application</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Process">
          <Link to={`/applicationsByStatus/${5}/${1}/${intakeRngValue}`}>
            <h2>{count?.totalApplicationInProgress}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${5}/${1}/${intakeRngValue}`}>
            <p className="text-gray-70">Applications in Process</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Unconditional">
          <Link to={`/applicationsByStatus/${9}/${0}/${intakeRngValue}`}>
            <h2>{count?.totalUnconditionalOffer}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${9}/${0}/${intakeRngValue}`}>
            <p className="text-gray-70">Unconditional Offer</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Registered">
          <Link to={`/applicationsByStatus/${12}/${38}/${intakeRngValue}`}>
            <h2> {count?.totalRegistered}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${12}/${38}/${intakeRngValue}`}>
            <p className="text-gray-70">Total Registered</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Rejected">
          <Link to={`/applicationsByStatus/${12}/${1}/${intakeRngValue}`}>
            <h2> {count?.totalRejected}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${12}/${1}/${intakeRngValue}`}>
            <p className="text-gray-70">Rejected / Cancelled</p>
          </Link>
        </Col>
        <Col className="m-2 p-3 AdmissionManager-card-Withdrawn">
          <Link to={`/applicationsByStatus/${12}/${41}/${intakeRngValue}`}>
            <h2> {count?.totalWithdrawn}</h2>
          </Link>
          <Link to={`/applicationsByStatus/${12}/${41}/${intakeRngValue}`}>
            <p className="text-gray-70">Withdrawn Application</p>
          </Link>
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
                              alt=""
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
                        <td>{dateFormate(app?.applicationDate)}</td>
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
