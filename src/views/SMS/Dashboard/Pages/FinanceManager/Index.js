import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import get from "../../../../../helpers/get";
import "../../../../../assets/CoustomStyle/dashboard.css";
import DashboardCount from "../../../../../components/ui/DashboardCount";
import ApplicationTransactions from "./ApplicationTransactions";
import AccountTransactions from "./AccountTransactions";
import WithdrawTransactions from "./WithdrawTransactions";
import UserNotices from "../../Component/UserNotices";
import Filter from "../../../../../components/Dropdown/Filter";

const FinanceManager = () => {
  const [count, setCount] = useState({});
  const [intake, setIntake] = useState({});
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);

  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

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
    get(`FinanceManagerDashboard/Counting/${intakeRngValue}`).then((res) =>
      setCount(res)
    );
  }, [intakeRngValue]);

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

          <UserNotices />
        </div>
      </div>

      {/* Status reports start */}

      <Row>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Application"
            value={count?.totalApplication}
            link={`/applicationsbyintake/${intakeRngValue}`}
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
            // link={`/applicationsByStatus/${5}/${1}/${intakeRngValue}`}
            bgColor="#FBF5E8"
            borderColor="#FFBA08"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Unconditional Offer"
            value={count?.totalUnconditionalOffer}
            link={`/applicationsByStatus/${2}/${2}/${intakeRngValue}`}
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
            link={`/applicationsByStatus/${2}/${3}/${intakeRngValue}`}
            bgColor="#F0FFE0"
            borderColor="#70E000"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Total Rejected / cancelled"
            value={count?.totalRejected}
            // link={`/applicationsByStatus/${12}/${1}/${intakeRngValue}`}
            bgColor="#FEF6F5"
            borderColor="#F87675"
          />
        </Col>
        <Col lg={2} md={4} xs={6} className="mb-30px">
          <DashboardCount
            title="Withdrawn Application"
            value={count?.totalWithdrawn}
            link={`/applicationsByStatus/${4}/${3}/${intakeRngValue}`}
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
