import React, { useEffect, useState } from "react";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import gift from "../../../../../assets/img/gift.PNG";

import { Card, CardBody, Col, Row } from "reactstrap";
import { Drawer } from "antd";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import DashboardProgressReport from "../../../../../components/ui/DashboardProgressReport";
import UserNotices from "../../Component/UserNotices";

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
  // const [applications, setApplications] = useState([]);
  const history = useHistory();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`AdmissionOfficerDashboard/Counting`).then((res) => {
      console.log(res);
      setCount(res);
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

          <UserNotices />
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
              link={`/applicationsByStatus/${5}/${1}`}
              bgColor="#FBF5E8"
              borderColor="#FFBA08"
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
              bgColor="#EDF1F5"
              borderColor="#34495E"
            />
          </Col>
          <Col lg={2} md={4} xs={6} className="mb-30px">
            <DashboardCount
              title="Conversion Rate"
              value={`${count?.conversionRate}%`}
              bgColor="#FDF5E7"
              borderColor="#9E6F21"
            />
          </Col>
        </Row>
      </>

      <DashboardApplication url="AdmissionOfficerDashboard/Newapplications" />
      <DashboardReadyToApply url="AdmissionOfficerDashboard/Readyapplications" />
      <DashboardProgressReport />

      {/* status reports end */}
    </>
  );
};

export default AdmissionOfficer;
