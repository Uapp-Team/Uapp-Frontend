import React, { useEffect, useState } from "react";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import { Link } from "react-router-dom";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import gift from "../../../../../assets/img/gift.PNG";

import { Card, CardBody, Col, Row, Table } from "reactstrap";
import { Drawer } from "antd";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const AdmissionOfficer = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  // const [options, setOptions] = useState({
  //   plotOptions: {
  //     pie: {
  //       donut: {
  //         size: "40%",
  //       },
  //     },
  //   },
  // });

  // const [series, setSeries] = useState([20, 20, 20, 20, 20]);
  // const [Labels, setLabels] = useState(["A", "B", "C", "D", "E"]);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`AdmissionOfficerDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`AdmissionOfficerDashboard/Application`).then((res) => {
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
          <div className="mt-2 mr-4 mb-1">
            <span style={{ fontWeight: "500" }}>
              Intake Range: {intake?.intakeName}
            </span>
          </div>

          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/addStudentRegister`);
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img
                src={plusicon}
                className="img-fluid dashbard-img-style1"
                alt=""
              />
              <span className="std-dashboard-style3">Add Student</span>
            </div>
          </div>

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6" onClick={showDrawer}></div>

            <div onClick={function noRefCheck() {}}>
              <img
                src={Vectorbeat}
                alt=""
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

      {/* Status reports start */}

      <>
        <Row>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Application"
              value={count?.totalApplication}
              link="/applications"
              bgColor="#E1F5FC"
              borderColor="#24A1CD"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Applications in Process"
              value={count?.totalApplicationInProgress}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Registered"
              value={count?.totalRegistered}
              bgColor="#F0FFE0"
              borderColor="#70E000"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Total Rejected"
              value={count?.totalRejected}
              bgColor="#FEF6F5"
              borderColor="#F87675"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Withdrawn Application"
              value={count?.totalWithdrawn}
              bgColor="#EDF1F5"
              borderColor="#34495E"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Conversion Rate"
              value={`${count?.coversionRate}%`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
        </Row>
      </>

      {/* status reports end */}

      {/* new applications table start */}

      <Card className="p-4">
        <CardBody>
          <span className="app-style-const">Applications</span>

          {applications?.length > 0 ? (
            <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
              <Table borderless responsive className="mt-3">
                <thead className="tablehead">
                  <tr>
                    <th> ID</th>
                    <th>Name</th>
                    <th>University</th>
                    <th>Admission Manager</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {applications?.map((app, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td className="cursor-pointer hyperlink-hover">
                        <span>{app?.viewId}</span>{" "}
                      </td>
                      <td>
                        <span style={{ marginLeft: "5px" }}>
                          {app?.applicant}
                        </span>
                      </td>
                      <td>{app?.university}</td>
                      <td>{app?.admissionManager}</td>

                      <td>{app?.createdOn}</td>
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
        <Link
          to="/applications"
          className="text-center"
          style={{ color: "#1E98B0" }}
        >
          See All
        </Link>
      </Card>

      {/* new applications table end */}

      {/* progress */}

      <div>
        <Card className="p-3">
          <CardBody>
            <div className="d-flex flex-wrap justify-content-between">
              {/* <span className="const-target-style">Progress Report</span> */}
              <h5 className="mb-0">Progress Report</h5>
              {/* <div className="d-flex flex-wrap justify-content-between">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: "none",
                  }),
                }}
                options={intakeList}
                value={{ label: intakeLabel, value: intakeValue }}
                onChange={(opt) => selectIntake(opt.label, opt.value)}
                name="intake"
                id="intake"
                required
              />
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: "none",
                  }),
                }}
                options={monthList}
                value={{ label: monthLabel, value: monthValue }}
                onChange={(opt) => selectMonth(opt.label, opt.value)}
                name="month"
                id="month"
                required
              />
              <input
                style={{ border: "none" }}
                type="date"
                name="date"
                id="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                value={date}
              />
            </div> */}
            </div>
            <hr />

            <p className="text-gray">Intake July 2022-October 2022</p>
            <Row>
              <Col sm="6">
                <Row className="mb-2">
                  <Col
                    className="rounded-7px m-2 p-3"
                    style={{
                      background:
                        "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #24A1CD",
                    }}
                  >
                    <h2 className="text-white">5</h2>
                    <p className="text-white">Total Application</p>
                  </Col>
                  <Col
                    className="rounded-7px m-2 p-3"
                    style={{
                      background:
                        "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #23CCB5",
                    }}
                  >
                    <h2 className="text-white">6</h2>
                    <p className="text-white">Submitted to University</p>
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="rounded-7px m-2 p-3"
                    style={{
                      background:
                        "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #AE75F8",
                    }}
                  >
                    <h2 className="text-white">9</h2>
                    <p className="text-white">Unconditional Offer</p>
                  </Col>
                  <Col
                    className="rounded-7px m-2 p-3"
                    style={{
                      background:
                        "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #F7BD12",
                    }}
                  >
                    <h2 className="text-white">1</h2>
                    <p className="text-white">Total Registered</p>
                  </Col>
                  <Col
                    className="rounded-7px m-2 p-3"
                    style={{
                      background:
                        "linear-gradient(108.86deg, rgba(0, 0, 0, 0.2) -2.42%, rgba(0, 0, 0, 0) 98.18%), #F87675",
                    }}
                  >
                    <h2 className="text-white">6</h2>
                    <p className="text-white">Total Rejected</p>
                  </Col>
                </Row>
              </Col>
              <Col sm="1"></Col>
              <Col sm="5">
                <div className="d-flex justify-content-around">
                  <div className="picChart">
                    <div class="inner-round"></div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div class="col-5 d-flex mb-2">
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "10px",
                        background: "black",
                        marginRight: "10px",
                      }}
                    ></div>{" "}
                    <span>Total Application</span>
                  </div>

                  <div class="col-5 d-flex mb-2">
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "10px",
                        background: "green",
                        marginRight: "10px",
                      }}
                    ></div>{" "}
                    <span>Unconditional Offer</span>
                  </div>
                  <div class="col-5 d-flex mb-2">
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "10px",
                        background: "red",
                        marginRight: "10px",
                      }}
                    ></div>{" "}
                    <span>Total Rejected</span>
                  </div>
                  <div class="col-6 d-flex mb-2">
                    <div
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "10px",
                        background: "orange",
                        marginRight: "10px",
                      }}
                    ></div>{" "}
                    <span>Submitted to University</span>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AdmissionOfficer;
