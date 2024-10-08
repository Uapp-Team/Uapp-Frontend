import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";
import { userTypes } from "../../../../constants/userTypeConstant";
import get from "../../../../helpers/get";
import ParentConsultant from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ParentConsultant";
import ProfileRatingsBreakdown from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileRatingsBreakdown";
import ProfileReview from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileReview";
import ProfileStatistics from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileStatistics";
import AssociateProfileHead from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/AssociateProfileHead";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AssociateSelfProfile = ({}) => {
  const { id } = useParams();
  const history = useHistory();
  const userType = localStorage.getItem("userType");

  const backToConsultantList = () => {
    history.push(`/associateDetaiols/${id}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Associate Profile"
        backTo={
          userType == userTypes?.SystemAdmin ||
          userType == userTypes?.BranchManager ||
          userType == userTypes?.Admin ||
          userType == userTypes?.ComplianceManager
            ? "Profile"
            : null
        }
        path={
          userType == userTypes?.SystemAdmin ||
          userType == userTypes?.BranchManager ||
          userType == userTypes?.Admin ||
          userType == userTypes?.ComplianceManager
            ? `/associateDetaiols/${id}`
            : null
        }
      />

      <div className="row">
        <div className="col-md-8">
          <AssociateProfileHead id={id} />

          <ProfileStatistics id={id} />

          <ProfileReview id={id} />
        </div>

        <div className="col-md-4">
          <ProfileRatingsBreakdown id={id} />
        </div>
      </div>
    </div>
  );
};

export default AssociateSelfProfile;
