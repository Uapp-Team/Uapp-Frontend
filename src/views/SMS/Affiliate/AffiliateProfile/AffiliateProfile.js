import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Col, Row } from "reactstrap";
import AffiliateBanner from "./AffiliateBanner";
import AffiliateDetails from "./AffiliateDetails";
import { useParams } from "react-router-dom";
import EstimatedIncome from "./EstimatedIncome";
import ParentConsultant from "./ParentAffiliate";
import AffiliateTeamMember from "./AffiliateTeamMember";
import Uget from "../../../../helpers/Uget";
import AffiliateLink from "./AffiliateLink";
import ParentAffiliate from "./ParentAffiliate";
import AffiliateCommissionSetting from "./AffiliateCommissionSetting";
import AffiliateParentConsultant from "./AffiliateParentConsultant";

const AffiliateProfile = () => {
  const { affiliateId } = useParams();
  const referenceId = localStorage.getItem("referenceId");
  const [affiliateProfileData, setAffiliateProfileData] = useState({});

  const userId = affiliateId ? affiliateId : referenceId;

  useEffect(() => {
    Uget(`Affiliate/get-by/${userId}`).then((res) => {
      setAffiliateProfileData(res);
    });
  }, [userId]);
  return (
    <div>
      <BreadCrumb title="Affiliate Profile" backTo="" path="/" />
      <Row>
        <Col lg="8" sm="12">
          <AffiliateBanner
            affiliateId={userId}
            affiliateProfileData={affiliateProfileData}
            referenceId={referenceId}
          />
          <AffiliateDetails
            affiliateProfileData={affiliateProfileData}
            affiliateId={userId}
            referenceId={referenceId}
          />
        </Col>
        <Col lg="4" sm="12">
          <ParentAffiliate
            affiliateProfileData={affiliateProfileData}
            affiliateId={userId}
          />
          <AffiliateParentConsultant
            affiliateProfileData={affiliateProfileData}
            affiliateId={userId}
          />
          <EstimatedIncome
            affiliateId={userId}
            affiliateProfileData={affiliateProfileData}
          />
          <AffiliateLink
            affiliateId={userId}
            affiliateProfileData={affiliateProfileData}
          />
          <AffiliateCommissionSetting
            affiliateId={userId}
            affiliateProfileData={affiliateProfileData}
          />
          <AffiliateTeamMember
            affiliateId={userId}
            affiliateProfileData={affiliateProfileData}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AffiliateProfile;
