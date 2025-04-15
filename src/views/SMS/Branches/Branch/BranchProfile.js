import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";

import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import DashboardApplication from "../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../components/ui/DashboardReadyToApply";
import get from "../../../../helpers/get";
import ConsultantListForBranch from "../../Dashboard/Pages/BranchManager/ConsultantListForBranch";
import StaffListForBranch from "../../Dashboard/Pages/BranchManager/StaffListForBranch";
import BranchAdmin from "../IndividualComponent/BranchAdmin";
import BranchManager from "../IndividualComponent/BranchManager";
import BranchInfo from "./BranchInfo";
import CountCard from "./CountCard";

const BranchProfile = () => {
  const { id } = useParams();
  const [intake, setIntake] = useState({});

  useEffect(() => {
    get(`AccountIntake/GetCurrentAccountIntake`).then((res) => {
      setIntake(res);
    });
  }, []);

  return (
    <>
      <BreadCrumb
        title="Branch Profile"
        backTo="Branch List"
        path="/branchList"
      />

      <Row>
        <Col lg={8}>
          <BranchInfo id={id} />
          {intake?.id && <CountCard id={id} intakeRngValue={intake?.id} />}
          <StaffListForBranch id={id} />
          <ConsultantListForBranch id={id} />
          {/* <ComplianceOfficerListForBranch id={manager?.branchId} /> */}

          <DashboardApplication
            url={`BranchManagerDashboard/Application?id=${id}`}
          />
          <DashboardReadyToApply
            url={`BranchManagerDashboard/readytoapplyapplications?id=${id}`}
          />
        </Col>
        <Col lg={4}>
          <BranchAdmin id={id} />
          <BranchManager id={id} />

          {/* <IncomeAmount
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
          /> */}
        </Col>
      </Row>
    </>
  );
};

export default BranchProfile;
