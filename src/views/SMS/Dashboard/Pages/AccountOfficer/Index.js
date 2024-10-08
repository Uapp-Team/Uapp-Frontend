import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import user from "../../../../../assets/img/Uapp_fav.png";
import downloadBtn from "../../../../../assets/img/downloadBtn.svg";
import Assets from "../../../../../assets/img/Asset 12Icon.svg";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import ReactToPrint from "react-to-print";
import * as Icon from "react-feather";
import "../../../../../assets/CoustomStyle/dashboard.css";
import { Link } from "react-router-dom";
import DashboardCount from "../../../../../components/ui/DashboardCount";

const AccountOfficer = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({});
  const [applications, setApplications] = useState([]);
  const componentRef2 = useRef();

  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`AccountOfficerDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`AccountOfficerDashboard/WithdrawRequest`).then((res) => {
      setApplications(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);
  console.log(applications);
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

          <div style={{ cursor: "pointer" }}>
            <div className="std-dashboard-style6"></div>

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

      {/* Status reports start */}
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
            link={`/applicationsByStatus/${5}/${1}`}
            bgColor="#FBF5E8"
            borderColor="#FFBA08"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Unconditional Offer"
            value={count?.totalUnconditionalOffer}
            link={`/applicationsByStatus/${2}/${2}`}
            bgColor="#F8F3FF"
            borderColor="#AE75F8"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Registered"
            value={count?.totalRegistered}
            link={`/applicationsByStatus/${2}/${3}`}
            bgColor="#F0FFE0"
            borderColor="#70E000"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Rejected"
            value={count?.totalRejected}
            link={`/applicationsByStatus/${12}/${1}`}
            bgColor="#FEF6F5"
            borderColor="#F87675"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Withdrawn Application"
            value={count?.totalWithdrawn}
            link={`/applicationsByStatus/${4}/${3}`}
            bgColor="#EDF1F5"
            borderColor="#34495E"
          />
        </Col>
      </Row>

      {/* status reports end */}

      {/* table start */}

      <div className="custom-card-border p-4 mb-30px">
        <h5>Withdrawal Requests</h5>

        {applications?.length > 0 ? (
          <Table borderless responsive className="mt-3">
            <thead className="tablehead">
              <th>Request Date</th>
              <th>Agent</th>
              <th>Transaction Code</th>
              <th>Amount</th>
              <th>Payment type</th>
              <th>Payment Date</th>
              <th>Payment Status</th>
              <th>Invoice</th>
            </thead>

            <tbody>
              {applications?.map((app, i) => (
                <tr key={i} className="border-buttom">
                  <td>{app?.transactionDate}</td>
                  <td>
                    <div>
                      <img
                        src={
                          app?.imageUrl == null ? user : rootUrl + app?.imageUrl
                        }
                        alt=""
                        style={{
                          height: "28px",
                          width: "28px",
                          borderRadius: "50%",
                        }}
                        className="img-fluid"
                      />
                      <span style={{ marginLeft: "5px" }}>
                        {app?.consultantName}
                      </span>
                    </div>
                  </td>
                  <td>{app?.transactionCode}</td>
                  <td>{app?.amount}</td>

                  <td>{app?.paymentType}</td>

                  <td>{app?.paymentDate}</td>
                  <td>{app?.paymentStatus}</td>

                  <td>
                    <ReactToPrint
                      trigger={() => (
                        <img
                          src={downloadBtn}
                          className="img-fluid"
                          style={{ cursor: "pointer" }}
                          alt=""
                        />
                      )}
                      content={() => componentRef2.current}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Withdrawal Requests
          </p>
        )}
        {applications?.length > 0 ? (
          <div className="text-center text-blue">
            <Link to="/withdrawRequestList">See All</Link>
          </div>
        ) : null}
      </div>

      {/* table end */}

      {/* invoice pdf start */}

      <div style={{ display: "none" }}>
        <div ref={componentRef2} style={{ marginTop: "100px" }}>
          <div className="invoice-winthdraw-request-style">
            <img height={100} src={Assets} alt="" />
            <h1>Remittance Advice</h1>
          </div>

          <div style={{ marginTop: "100px" }}>
            <hr />
          </div>

          <div style={{ marginTop: "100px" }}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <div>
                  <span>
                    <Icon.PhoneCall color="#1e98b0" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    +442072658478
                  </span>
                </div>
                <div>
                  <span>
                    <Icon.Search color="#1e98b0" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    finance@uapp.uk
                  </span>
                </div>
                <div>
                  <span>
                    <Icon.Map color="#1e98b0" />
                  </span>
                  <span
                    style={{ marginLeft: "10px" }}
                    className="inv-span-styles"
                  >
                    80-82 Nelson Street London E1 2DY
                  </span>
                </div>
                <div>
                  <span className="inv-span-styles">TC Date 24/11/2022</span>
                </div>
                <div>
                  <span className="inv-span-styles">TC ID 332</span>
                </div>
              </div>

              <div>
                <div>
                  <div>
                    <span className="inv-span-styles">
                      Consultant Name : Mirela-Gabriela
                    </span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Porcisteanu</span>
                  </div>
                  <div>
                    <span className="inv-span-styles">
                      Consultant ID : AG009
                    </span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Reference No :</span>
                  </div>
                  <div>
                    <span className="inv-span-styles">Date : 24/11/2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ marginTop: "100px", width: "80%", marginLeft: "100px" }}
          >
            <table style={{ width: "100%" }}>
              <thead className="tablehead">
                <tr>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Quantity</span>
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Description</span>
                  </th>
                  <th style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">Line Total</span>
                  </th>
                </tr>
              </thead>

              <tbody style={{ textAlign: "center" }}>
                <tr>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">1</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">TC-W317</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">200.00</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">SubTotal</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">200.00</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">Deductions</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">0</span>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderBottom: "1px solid black",
                      borderLeft: "1px solid black",
                    }}
                  >
                    <span></span>
                  </td>
                  <td style={{ borderBottom: "1px solid black" }}>
                    <span className="inv-span-styles">Total</span>
                  </td>
                  <td style={{ border: "1px solid black" }}>
                    <span className="inv-span-styles">£ 200.00</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: "100px", marginLeft: "100px" }}>
            <div>
              <span style={{ color: "#1e98b0" }} className="inv-span-styles">
                Bank Details
              </span>
            </div>
            <div>
              <span className="inv-span-styles">
                Account Name : M G PORCISTEANU
              </span>
            </div>
            <div>
              <span className="inv-span-styles">Account Number : 31882007</span>
            </div>
            <div>
              <span className="inv-span-styles">Short code : 402310</span>
            </div>
            <div>
              <span className="inv-span-styles">Bank Name : HSBC</span>
            </div>
          </div>

          <div style={{ marginTop: "100px", textAlign: "center" }}>
            <span className="inv-span-styles">
              Thank you for your business.
            </span>
          </div>
        </div>
      </div>

      {/* invoice pdf end */}
    </>
  );
};

export default AccountOfficer;
