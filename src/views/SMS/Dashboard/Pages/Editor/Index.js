import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import plusicon from "../../../../../assets/img/plusicon.svg";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import RecentUniversity from "./RecentUniversity";
import UserNotices from "../../Component/UserNotices";
import DashboardProgressChart from "../../../../../components/ui/DashboardProgressChart";

const Editor = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [count, setCount] = useState({});
  const [universities, setUniversities] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`EditorDashboard/Counting`).then((res) => {
      setCount(res);
    });

    get(`EditorDashboard/University`).then((res) => {
      setUniversities(res);
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
            Here's what's happening with your portal.
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
              history.push("/addUniversity");
            }}
          >
            <div className="std-dashboard-style4"></div>

            <div className="std-dashboard-style5">
              <img
                src={plusicon}
                alt=""
                className="img-fluid dashbard-img-style1"
              />
              <span className="std-dashboard-style3">Add University</span>
            </div>
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
            // link={`/applicationsbyintake/${intake?.id}`}
            bgColor="#E1F5FC"
            borderColor="#24A1CD"
            secondValue={count?.totalApplicant}
            secondColor="#176682"
            secondBgColor="#BAE7F7"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Applications in Process"
            value={count?.totalApplicationInProgress}
            // link={`/applicationsByStatus/${5}/${1}/${intake?.id}`}
            bgColor="#FBF5E8"
            borderColor="#FFBA08"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Unconditional Offer"
            value={count?.totalUnconditionalOffer}
            // link={`/applicationsByStatus/${2}/${2}/${intake?.id}`}
            bgColor="#F8F3FF"
            borderColor="#AE75F8"
            secondValue={count?.totalUnconditionalStudent}
            secondColor="#451782"
            secondBgColor="#E3D1FA"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Registered"
            value={count?.totalRegistered}
            // link={`/applicationsByStatus/${2}/${3}/${intake?.id}`}
            bgColor="#F0FFE0"
            borderColor="#70E000"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Rejected / cancelled"
            value={count?.totalRejected}
            // link={`/applicationsByStatus/${12}/${1}/${intake?.id}`}
            bgColor="#FEF6F5"
            borderColor="#F87675"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Withdrawn Application"
            value={count?.totalWithdrawn}
            // link={`/applicationsByStatus/${4}/${3}/${intake?.id}`}
            bgColor="#EDF1F5"
            borderColor="#34495E"
          />
        </Col>
      </Row>

      {/* status reports end */}
      <RecentUniversity data={universities} />
      <DashboardProgressChart />
    </>
  );
};

export default Editor;
