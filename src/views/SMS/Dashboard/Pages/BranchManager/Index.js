import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "../../../../../assets/CoustomStyle/dashboard.css";
import plusicon from "../../../../../assets/img/plusicon.svg";
import "../../../../../assets/scss/pages/dashboard-analytics.scss";
import Filter from "../../../../../components/Dropdown/Filter";
import DashboardApplication from "../../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../../components/ui/DashboardReadyToApply";
import get from "../../../../../helpers/get";
import UserNotices from "../../Component/UserNotices";
import CountCard from "./CountCard";

const BranchManager = () => {
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const history = useHistory();
  const [intake, setIntake] = useState({});
  const [intakeRngDD, setIntakeRngDD] = useState([]);
  const [intakeRngLabel, setIntakeRngLabel] = useState("Intake Range");
  const [intakeRngValue, setIntakeRngValue] = useState(0);
  const [manager, setManager] = useState({});

  useEffect(() => {
    const branchManagerId = localStorage.getItem("referenceId");

    get(`BranchManager/Get/${branchManagerId}`).then((res) => {
      setManager(res);
    });

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
          <CountCard id={manager?.branchId} intakeRngValue={intakeRngValue} />
          {/* <ConsultantListForBranch id={manager?.branchId} /> */}
          {/* <ComplianceOfficerListForBranch id={manager?.branchId} /> */}

          <DashboardApplication
            url={`BranchManagerDashboard/Application?id=${manager?.branchId}&rangeid=${intakeRngValue}`}
          />
          <DashboardReadyToApply
            url={`BranchManagerDashboard/readytoapplyapplications?id=${manager?.branchId}&rangeid=${intakeRngValue}`}
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
