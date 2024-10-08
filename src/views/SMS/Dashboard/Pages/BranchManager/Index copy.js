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
import down from "../../../../../assets/img/down.svg";
import camera2 from "../../../../../assets/img/camera2.svg";
import Chart from "react-apexcharts";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { Link, useHistory } from "react-router-dom";
import { dom } from "@fortawesome/fontawesome-svg-core";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const BranchManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  const [application, setApplication] = useState([]);
  const [count, setCount] = useState({});
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`BranchManagerDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`BranchManagerDashboard/Application`).then((res) => {
      setApplication(res);
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

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/addConsultant");
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img
                src={plusicon}
                className="img-fluid dashbard-img-style1"
                alt=""
              />
              <span className="std-dashboard-style3">Add Consultant</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                className="img-fluid dashbard-img-style2"
                onClick={showDrawer}
                alt=""
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
                            <img src={user1} alt="" />
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
                            <img src={user2} alt="" />
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
                            <img src={capture} className="img-fluid" alt="" />
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
                            <img src={user2} alt="" />
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
                              <img src={images1} className="img-fluid" alt="" />
                              <img src={images1} className="img-fluid" alt="" />
                              <img src={images1} className="img-fluid" alt="" />
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
                        <img src={gift} className="img-fluid" alt="" />
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col lg={9}>
          {/* Status reports start */}

          <Row>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Total Application"
                value={count?.totalApplication}
                link="/applications"
                bgColor="#E1F5FC"
                borderColor="#24A1CD"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Applications in Process"
                value={count?.totalApplicationInProgress}
                link={`/applicationsByStatus/${5}/${1}`}
                bgColor="#FBF5E8"
                borderColor="#FFBA08"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Unconditional Offer"
                value={count?.totalUnconditionalOffer}
                link={`/applicationsByStatus/${2}/${2}`}
                bgColor="#F8F3FF"
                borderColor="#AE75F8"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Total Registered"
                value={count?.totalRegistered}
                link={`/applicationsByStatus/${2}/${3}`}
                bgColor="#F0FFE0"
                borderColor="#70E000"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Total Rejected"
                value={count?.totalRejected}
                link={`/applicationsByStatus/${12}/${1}`}
                bgColor="#FEF6F5"
                borderColor="#F87675"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Withdrawn Application"
                value={count?.totalWithdrawn}
                link={`/applicationsByStatus/${4}/${3}`}
                bgColor="#EDF1F5"
                borderColor="#34495E"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="New Consultants"
                value={count?.totalNewConsultant}
                bgColor="#E8FAF5"
                borderColor="#5B9A8B"
              />
            </Col>
            <Col md={3} xs={6} className="mb-30px">
              <DashboardCount
                title="Conversion Rate"
                value={`${count?.conversionRate}%`}
                bgColor="#FDF5E7"
                borderColor="#9E6F21"
              />
            </Col>
          </Row>

          {/* <div className="row">
            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #24A1CD" }}
              >
                <span className="pvdadmin-span-style1">Total Application</span>

                <span
                  className="pvdadmin-span-style2"
                  onClick={() => {
                    history.push(`/applications`);
                  }}
                  style={{ color: "#24A1CD", cursor: "pointer" }}
                >
                  {count?.totalApplication}
                </span>
              </div>
            </div>

            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #23CCB5" }}
              >
                <span className="pvdadmin-span-style1">
                  Applications In Process
                </span>

                <span
                  className="pvdadmin-span-style2"
                  onClick={() => {
                    history.push(`applicationsByStatus/${2}/${1}`);
                  }}
                  style={{ color: "#23CCB5", cursor: "pointer" }}
                >
                  {count?.totalApplicationInProgress}
                </span>
              </div>
            </div>

            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #AE75F8" }}
              >
                <span className="pvdadmin-span-style1">
                  Unconditional Offer
                </span>

                <span
                  className="pvdadmin-span-style2"
                  onClick={() => {
                    history.push(`applicationsByStatus/${2}/${2}`);
                  }}
                  style={{ color: "#AE75F8", cursor: "pointer" }}
                >
                  {count?.totalUnconditionalOffer}
                </span>
              </div>
            </div>

            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #F7BD12" }}
              >
                <span className="pvdadmin-span-style1">Total Registered</span>

                <span
                  className="pvdadmin-span-style2"
                  onClick={() => {
                    history.push(`applicationsByStatus/${2}/${3}`);
                  }}
                  style={{ color: "#F7BD12", cursor: "pointer" }}
                >
                  {count?.totalRegistered}
                </span>
              </div>
            </div>

            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #F87675" }}
              >
                <span className="pvdadmin-span-style1">
                  Rejected / Cancelled
                </span>

                <span
                  onClick={() => {
                    history.push(`/applicationsByStatus/${5}/${1}`);
                  }}
                  className="pvdadmin-span-style2"
                  style={{ color: "#F87675", cursor: "pointer" }}
                >
                  {count?.totalRejected}
                </span>
              </div>
            </div>

            <div className="col-md-2 mb-3">
              <div
                className="count-card counter-h-112"
                style={{ border: "0.5px solid #707070" }}
              >
                <span className="pvdadmin-span-style1">
                  Withdrawn Application
                </span>

                <span
                  onClick={() => {
                    history.push(`/applicationsByStatus/${4}/${3}`);
                  }}
                  className="pvdadmin-span-style2"
                  style={{ color: "#707070", cursor: "pointer" }}
                >
                  {count?.totalWithdrawn}
                </span>
              </div>
            </div>
          </div> */}

          {/* status reports end */}

          {/* new applications table start */}

          <DashboardApplication url={``} />
          <DashboardReadyToApply url={``} />

          {/* new applications table end */}
        </Col>
        <Col lg={3}></Col>
      </Row>
    </>
  );
};

export default BranchManager;
