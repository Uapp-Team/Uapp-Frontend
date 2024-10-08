import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
// import cuser1 from "../../../../../assets/img/cuser1.svg";
// import down from "../../../../../assets/img/down.svg";
// import camera2 from "../../../../../assets/img/camera2.svg";
// import Chart from "react-apexcharts";
import get from "../../../../../helpers/get";
// import { Link, useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import ApplicationTransactions from "./ApplicationTransactions";
import AccountTransactions from "./AccountTransactions";
import WithdrawTransactions from "./WithdrawTransactions";
import UserNotices from "../../Component/UserNotices";

const FinanceManager = () => {
  const [open, setOpen] = useState(false);
  // const [totalApp, setTotalApp] = useState(0);
  // const [appInProcess, setAppInProcess] = useState(0);
  // const [unconditional, setUnconditional] = useState(0);
  // const [registered, setRegistered] = useState(0);
  // const [rejected, setRejected] = useState(0);
  // const [withdrawn, setWithdrawn] = useState(0);
  const [count, setCount] = useState({});
  // const [consultants, setConsultants] = useState([]);
  // const history = useHistory();
  const [intake, setIntake] = useState({});

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    get(`FinanceManagerDashboard/Counting`).then((res) => setCount(res));

    // get(`FinanceManagerDashboard/GetTransactions`).then((res) =>
    //   setConsultants(res)
    // );

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

          <UserNotices />
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

      <ApplicationTransactions />
      <AccountTransactions />
      <WithdrawTransactions />

      {/* status reports end */}

      {/* consultant transaction list table start */}

      {/* consultant transaction list table end */}
    </>
  );
};

export default FinanceManager;
