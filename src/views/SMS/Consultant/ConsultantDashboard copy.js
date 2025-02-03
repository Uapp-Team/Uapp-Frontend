import React, { useEffect, useState } from "react";
import plusicon from "../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../assets/img/Vectorbeat.svg";
import user1 from "../../../assets/img/user1.svg";
import user2 from "../../../assets/img/user2.svg";
import capture from "../../../assets/img/capture.PNG";
import images1 from "../../../assets/img/images1.svg";
import gift from "../../../assets/img/gift.PNG";
import poundicon from "../../../assets/img/poundcoin.svg";
import camera from "../../../assets/img/camera.svg";
import cuser1 from "../../../assets/img/cuser1.svg";
import user from "../../../assets/img/Uapp_fav.png";
import speed from "../../../assets/img/speed.PNG";
import down from "../../../assets/img/down.svg";
import camera2 from "../../../assets/img/camera2.svg";
import Chart from "react-apexcharts";
import { Card, CardBody, Table } from "reactstrap";
import { Drawer } from "antd";
import GaugeChart from "react-gauge-chart";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import { useHistory, useParams } from "react-router-dom";
import "../../../assets/CoustomStyle/dashboard.css";

const ConsultantDashboard = () => {
  const { consultantId } = useParams();

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  const [showBal, setShowBal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [applications, setApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const [target, setTarget] = useState(0);
  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [options, setOptions] = useState({
    plotOptions: {
      pie: {
        donut: {
          size: "40%",
        },
      },
    },
  });
  const [series, setSeries] = useState([44, 55, 41, 17, 15]);
  const [Labels, setLabels] = useState(["A", "B", "C", "D", "E"]);

  useEffect(() => {
    get(`ConsultantDashboard/ConsultantCounting/${consultantId}`).then(
      (res) => {
        setCount(res);
      }
    );

    get(`ConsultantDashboard/ConsultantApplication/${consultantId}`).then(
      (res) => {
        setApplications(res);
      }
    );

    get(`Balance/ConsultantBalance/${consultantId}`).then((res) => {
      setBalance(res);
    });

    get(`ConsultantDashboard/ConsultantTargetApplication/${consultantId}`).then(
      (res) => {
        setTarget(res);
      }
    );

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

        <div className="d-flex flex-wrap">
          <div className="mt-2 mr-4">
            <span style={{ fontWeight: "500" }}>
              Intake: {intake?.intakeName}
            </span>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img src={plusicon} className="img-fluid dashbard-img-style1" />
              <span className="std-dashboard-style3">Add Student</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
              />

              <Drawer placement="right" onClose={onClose} open={open}>
                <div className="">
                  <Card>
                    <CardBody>
                      <span className="consultant-news-feed-style">
                        NEWS FEED
                      </span>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user1} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you to our new
                              "Become an Education Consultant...
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                read more
                              </span>
                            </span>

                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <img src={capture} className="img-fluid" />
                            <br />
                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <div>
                        <div className="d-flex">
                          <div className="notice-image-style">
                            <img src={user2} />
                          </div>
                          <div className="ml-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              We're delighted to introduce you
                            </span>
                            <br />
                            <div className="d-flex justify-content-around my-2">
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                              <img src={images1} className="img-fluid" />
                            </div>

                            <span className="notice-time-style">
                              02:14 PM Today
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <div>
                    <Card>
                      <CardBody>
                        <span className="consultant-news-feed-style">
                          NOTICE
                        </span>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div className="">
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <div>
                          <div className="notice-image-stylemb-2">
                            <span className="notice-user-name">
                              Super Admin
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="notice-user-name">
                              MD Shamim (Admin)
                            </span>
                            <br />
                            <span className="notice-user-desc">
                              University of Suffolk admissions open for
                              September 2022 intake.
                              <br />
                              <span
                                style={{
                                  textDecoration: "underline",
                                  textDecorationColor: "#878A99",
                                  cursor: "pointer",
                                }}
                              >
                                View
                              </span>
                            </span>
                          </div>

                          <div className="mt-2">
                            <span className="notice-time-style">
                              02:14 PM 19/07/22
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>

                  <Card>
                    <CardBody>
                      <div>
                        <img src={gift} className="img-fluid" />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {/* Cards */}

          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div
                    style={{ border: "0.5px solid #24A1CD" }}
                    className="count-card counter-h-112"
                  >
                    <span className="application-count-style">
                      TOTAL APPLICATION
                    </span>

                    <span
                      className="application-count-style2"
                      onClick={() => {
                        history.push(`/applications`);
                      }}
                      style={{ color: "#24A1CD", cursor: "pointer" }}
                    >
                      {count?.totalApplication}
                    </span>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    style={{ border: "0.5px solid #23CCB5" }}
                    className="count-card counter-h-112"
                  >
                    <span className="application-count-style">
                      APPLICATION IN PROCESS
                    </span>

                    <span
                      className="application-count-style2"
                      onClick={() => {
                        history.push(`/applicationsByStatus/${2}/${1}`);
                      }}
                      style={{ color: "#23CCB5", cursor: "pointer" }}
                    >
                      {count?.totalApplicationInProgress}
                    </span>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    style={{ border: "0.5px solid #AE75F8" }}
                    className="count-card counter-h-112"
                  >
                    <span className="application-count-style">
                      UNCONDITIONAL OFFER
                    </span>

                    <span
                      className="application-count-style2"
                      onClick={() => {
                        history.push(`/applicationsByStatus/${9}/${0}`);
                      }}
                      style={{ color: "#AE75F8", cursor: "pointer" }}
                    >
                      {count?.totalUnconditionalOffer}
                    </span>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    style={{ border: "0.5px solid #F7BD12" }}
                    className="count-card counter-h-112"
                  >
                    <span className="application-count-style">
                      TOTAL REGISTERED
                    </span>

                    <span
                      className="application-count-style2"
                      onClick={() => {
                        history.push(`/applicationsByStatus/${12}/${38}`);
                      }}
                      style={{ color: "#F7BD12", cursor: "pointer" }}
                    >
                      {count?.totalRegistered}
                    </span>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    style={{ border: "0.5px solid #F87675" }}
                    className="count-card counter-h-112"
                  >
                    <span className="application-count-style">
                      REJECTED / CANCELLED
                    </span>

                    <span
                      onClick={() => {
                        history.push(`/applicationsByStatus/${5}/${3}`);
                      }}
                      className="application-count-style2"
                      style={{ color: "#F87675", cursor: "pointer" }}
                    >
                      {count?.totalRejected}
                    </span>
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div
                    className="count-card counter-h-112"
                    style={{ border: "0.5px solid #707070" }}
                  >
                    <span className="application-count-style">
                      Withdrawn Application
                    </span>

                    <span
                      onClick={() => {
                        history.push(`/applicationsByStatus/${12}/${41}`);
                      }}
                      className="application-count-style2"
                      style={{ color: "#707070", cursor: "pointer" }}
                    >
                      {count?.totalWithdrawn}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <Card>
                <CardBody>
                  <span className="application-count-style">MY BALANCE</span>

                  <div
                    className="my-4 text-center"
                    style={{ position: "relative", top: "15px" }}
                  >
                    <button
                      className="consultant-balance-button pr-3"
                      onClick={() => setShowBal(!showBal)}
                    >
                      <img src={poundicon} className="img-fluid mr-4" />

                      <span style={{ color: "#1E98B0" }}>
                        {showBal ? balance : "Balance"}
                      </span>
                    </button>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span
                      onClick={() => {
                        history.push(
                          `/withdrawTransactionByConsultant/${consultantId}`
                        );
                      }}
                      className="application-count-style"
                      style={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        position: "relative",
                        top: "36px",
                      }}
                    >
                      Withdraw money
                    </span>
                    <div className="mt-4">
                      <div className="consultant-bg-img">
                        <img
                          src={camera}
                          className="img-fluid"
                          style={{
                            position: "relative",
                            left: "6px",
                            top: "5px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Table */}

          <div className="row">
            <div className="col-md-9">
              <Card>
                <CardBody>
                  <span className="app-style-const">New Applications</span>

                  {applications?.length > 0 ? (
                    <div style={{ height: "300px", overflowY: "scroll" }}>
                      <Table borderless responsive className="mt-3">
                        <thead className="tablehead">
                          <tr>
                            <th>Student ID</th>
                            <th>Name</th>
                            <th>University</th>
                            <th>Admission Manager</th>

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
                                      app?.student?.profileImage
                                        ?.thumbnailUrl == null
                                        ? user
                                        : rootUrl +
                                          app?.student?.profileImage
                                            ?.thumbnailUrl
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
                                    {app?.student?.firstName}{" "}
                                    {app?.student?.lastName}
                                  </span>
                                </div>
                              </td>
                              <td>{app?.universityName}</td>
                              <td>{app?.managerName}</td>
                              <td>{handleDate(app?.applicationDate)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <p style={{ color: "#1e98b0", textAlign: "center" }}>
                      No Application Yet
                    </p>
                  )}
                </CardBody>
              </Card>
            </div>

            <div className="col-md-3">
              <Card>
                <CardBody>
                  <div className="consultant-custom-card-style mb-3">
                    <div className="mb-3">
                      <span className="const-target-style">
                        Target Applications
                      </span>
                      <hr />
                    </div>
                    <>
                      {!(target == null) ? (
                        <>
                          <div className="text-center">
                            <span
                              style={{ fontWeight: "500", color: "#1e98b0" }}
                            >
                              Current Applications: {target?.currentApplication}
                            </span>
                          </div>

                          <div
                            className="container text-center mt-5"
                            style={{ height: "96px" }}
                          >
                            <GaugeChart
                              id="gauge-chart2"
                              nrOfLevels={30}
                              percent={
                                target?.currentApplication >
                                target.targetApplication
                                  ? 1
                                  : target?.currentApplication /
                                    target?.targetApplication
                              }
                              hideText={true}
                              colors={["#1E98B0", "#1E98B0"]}
                              textColor={"#1E98B0"}
                              arcWidth={0.3}
                              animate={false}
                            />
                          </div>
                        </>
                      ) : (
                        <p style={{ color: "#1e98b0", textAlign: "center" }}>
                          No Application Yet
                        </p>
                      )}
                    </>
                  </div>

                  {target == null ? (
                    <div className="text-center">
                      <span style={{ color: "#1e98b0", textAlign: "center" }}>
                        No Commission Group Assigned
                      </span>
                    </div>
                  ) : (
                    <div
                      className="text-center py-4 custom-border-style"
                      style={{ backgroundColor: "#1E98B0", color: "#fff" }}
                    >
                      <div>
                        <span className="target-app-style">
                          {target?.targetApplication}
                        </span>
                      </div>

                      <div className="m">
                        <span className="target-app-styless">
                          Target Applications
                        </span>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
          </div>

          {/* Progress Report */}

          <Card>
            <CardBody>
              <div className="d-flex flex-wrap justify-content-between">
                <span className="const-target-style">Progress Report</span>
                <div className="d-flex flex-wrap justify-content-between">
                  <div style={{ cursor: "pointer" }}>
                    <span>Intake</span>
                    <img className="img-fluid ml-2" src={down} />
                  </div>
                  <div className="ml-3" style={{ cursor: "pointer" }}>
                    <span>Monthly</span>
                    <img className="img-fluid ml-2" src={down} />
                  </div>
                  <div className="ml-3" style={{ cursor: "pointer" }}>
                    <span>Daily</span>
                    <img className="img-fluid ml-2" src={down} />
                  </div>
                </div>
              </div>
              <hr />

              <div>
                <span className="application-count-style">
                  Intake July 2022-October 2022
                </span>
              </div>

              <div className="row my-4">
                <div className="col-md-3">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="custom-conslt-div1"></div>
                      <p
                        style={{
                          fontWeight: "500",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        Total Application
                      </p>
                    </div>

                    <div>
                      <span style={{ position: "relative", top: "4px" }}>
                        22
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="custom-conslt-div2"></div>
                      <p
                        style={{
                          fontWeight: "500",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        Submitted To University{" "}
                      </p>
                    </div>

                    <div>
                      <span style={{ position: "relative", top: "4px" }}>
                        22
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="custom-conslt-div3"></div>
                      <p
                        style={{
                          fontWeight: "500",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        Unconditional Offer
                      </p>
                    </div>

                    <div>
                      <span style={{ position: "relative", top: "4px" }}>
                        22
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="custom-conslt-div4"></div>
                      <p
                        style={{
                          fontWeight: "500",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        Total Registered
                      </p>
                    </div>

                    <div>
                      <span style={{ position: "relative", top: "4px" }}>
                        22
                      </span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="custom-conslt-div5"></div>
                      <p
                        style={{
                          fontWeight: "500",
                          position: "relative",
                          top: "4px",
                        }}
                      >
                        Total Rejected
                      </p>
                    </div>

                    <div>
                      <span style={{ position: "relative", top: "4px" }}>
                        22
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-md-5">
                  <Chart
                    options={options}
                    series={series}
                    type="donut"
                    width="100%"
                    height="100%"
                  />
                </div>

                {/* dropdown section */}

                <div className="col-md-4">
                  <div className="text-center report-status-styles-cons p-3 text-center-report-status-styles-cons">
                    <span className="app-style-const">Estimated Income</span>

                    <br />
                    <br />

                    <img src={camera2} className="img-fluid" alt="" />

                    <br />
                    <br />

                    <span className="consultant-name-style-student-dashboard2 amount-div-style">
                      £ 125
                    </span>

                    <br />
                    <br />

                    <span
                      style={{
                        textDecoration: "underline",
                        textDecorationColor: "#495057",
                        color: "#495057",
                        cursor: "pointer",
                      }}
                    >
                      July 2022-October 2022
                    </span>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ConsultantDashboard;
