import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";

import gift from "../../../../../assets/img/gift.PNG";
import get from "../../../../../helpers/get";
import { Link } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardProgressReportStaff from "../../../../../components/ui/DashboardProgressReportStaff";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import UserNotices from "../../Component/UserNotices";

const AccountManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  const [count, setCount] = useState({});
  const [consultants, setConsultants] = useState([]);
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`AccountManagerDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`AccountManagerDashboard/GetTransactions`).then((res) => {
      setConsultants(res);
    });

    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);

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

          <UserNotices />
        </div>
      </div>

      {/* status Report */}
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

      {/* status Report */}

      {/* progress Report */}
      <DashboardProgressReportStaff />
      {/* progress Report */}

      {/* table start */}

      <div className="custom-card-border p-4 mb-30px">
        <h5>Consultant Transaction List</h5>

        {consultants?.length > 0 ? (
          <div>
            <Table borderless responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <th>Consultant ID</th>
                  <th>Consultant Name</th>
                  <th>Total In Flow</th>
                  <th>Total Out Flow</th>
                  <th>Total Balance</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {consultants?.map((con, i) => (
                  <tr key={i} className="border-buttom">
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        className="text-body"
                        to={`consultantProfile/${con?.consultantId}`}
                      >
                        {con?.consultantViewId}
                      </Link>
                    </td>
                    <td>
                      <Link
                        className="text-body"
                        to={`consultantProfile/${con?.consultantId}`}
                      >
                        {con?.consultantName}
                      </Link>
                    </td>
                    <td>{con?.credit}</td>
                    <td>{con?.debit}</td>
                    <td>{con?.balance}</td>
                    <td className="cursor-pointer hyperlink-hover">
                      <Link
                        to={`accountTransactionByConsultant/${con?.consultantId}`}
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/accountTransaction">See All</Link>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: "center", fontWeight: "700" }}>
            No Transaction
          </p>
        )}
      </div>

      {/* table end */}
    </>
  );
};

export default AccountManager;
