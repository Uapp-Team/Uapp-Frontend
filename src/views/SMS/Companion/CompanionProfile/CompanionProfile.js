import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Col, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import EstimatedIncome from "./EstimatedIncome";

import Uget from "../../../../helpers/Uget";
import CompanionBanner from "./CompanionBanner";
import CompanionDetails from "./CompanionDetails";
import CompanionLink from "./CompanionLink";
import ParentCompanion from "./ParentCompanion";
import CompanionTeamMember from "./CompanionTeamMember";
import CompanionParentConsultant from "./CompanionParentConsultant";
import CompanionCommissionSetting from "./CompanionCommissionSetting";

const CompanionProfile = () => {
  const { companionId } = useParams();
  const referenceId = localStorage.getItem("referenceId");
  const [companionProfileData, setCompanionProfileData] = useState({});

  const userId = companionId ? companionId : referenceId;

  useEffect(() => {
    Uget(`Companion/get-by/${userId}`).then((res) => {
      setCompanionProfileData(res);
    });
  }, [userId]);
  return (
    <div>
      <BreadCrumb
        title="Companion
       Profile"
        backTo=""
        path="/"
      />
      <Row>
        <Col md="8">
          <CompanionBanner
            companionId={userId}
            companionProfileData={companionProfileData}
            referenceId={referenceId}
          />
          <CompanionDetails
            companionProfileData={companionProfileData}
            companionId={userId}
            referenceId={referenceId}
          ></CompanionDetails>
        </Col>
        <Col md="4">
          <ParentCompanion
            companionProfileData={companionProfileData}
            companionId={userId}
          ></ParentCompanion>
          <CompanionParentConsultant
            companionProfileData={companionProfileData}
            companionId={userId}
          ></CompanionParentConsultant>
          <EstimatedIncome
            companionId={userId}
            companionProfileData={companionProfileData}
          ></EstimatedIncome>
          <CompanionLink
            companionId={userId}
            companionProfileData={companionProfileData}
          ></CompanionLink>
          <CompanionCommissionSetting
            companionId={userId}
            companionProfileData={companionProfileData}
          ></CompanionCommissionSetting>
          <CompanionTeamMember
            companionId={userId}
            companionProfileData={companionProfileData}
          ></CompanionTeamMember>
        </Col>
      </Row>
    </div>
  );
};

export default CompanionProfile;
