import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import user1 from "../../../../../assets/img/user1.svg";
import user2 from "../../../../../assets/img/user2.svg";
import capture from "../../../../../assets/img/capture.PNG";
import images1 from "../../../../../assets/img/images1.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import { Drawer } from "antd";
import plusicon from "../../../../../assets/img/plusicon.svg";
import Vectorbeat from "../../../../../assets/img/Vectorbeat.svg";
import gift from "../../../../../assets/img/gift.PNG";
import get from "../../../../../helpers/get";
import { useHistory } from "react-router-dom";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import BranchEstimatedIncome from "./BranchEstimatedIncome";
import IncomeAmount from "./IncomeAmount";
import ConsultantListForBranch from "./ConsultantListForBranch";
import CountCard from "./CountCard";
import UserNotices from "../../Component/UserNotices";

const BranchManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [open, setOpen] = useState(false);

  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [manager, setManager] = useState({});

  useEffect(() => {
    const branchManagerId = localStorage.getItem("referenceId");

    get(`BranchManager/Get/${branchManagerId}`).then((res) => {
      console.log(res);
      setManager(res);
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

          <UserNotices />
        </div>
      </div>

      <Row>
        <Col lg={12}>
          <CountCard id={manager?.branchId} />
          <ConsultantListForBranch id={manager?.branchId} />
          {/* <ComplianceOfficerListForBranch id={manager?.branchId} /> */}

          <DashboardApplication url={`BranchManagerDashboard/Application`} />
          <DashboardReadyToApply
            url={`BranchManagerDashboard/readytoapplyapplications`}
          />
        </Col>
        {/* <Col lg={3}>
          <IncomeAmount
            title="Revenue"
            amount="250K"
            intake=" July 2022-October 2022"
          />
          <IncomeAmount
            title="Outgoing Commission"
            amount="250K"
            intake=" July 2022-October 2022"
          />
          <BranchEstimatedIncome
            amount="250K"
            intake=" July 2022-October 2022"
          />
        </Col> */}
      </Row>
    </>
  );
};

export default BranchManager;
