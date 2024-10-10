import React from "react";
import { useParams } from "react-router-dom";
import { userTypes } from "../../../../constants/userTypeConstant";
import ProfileRatingsBreakdown from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileRatingsBreakdown";
import ProfileReview from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileReview";
import ProfileStatistics from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/ProfileStatistics";
import AssociateProfileHead from "../../ConsultantsAndTypes/ConsultantProfile/ProfileComponent/AssociateProfileHead";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AssociateSelfProfile = () => {
  const { id } = useParams();

  const userType = localStorage.getItem("userType");

  return (
    <div>
      <BreadCrumb
        title="Associate Profile"
        backTo={
          userType === userTypes?.SystemAdmin ||
          userType === userTypes?.BranchManager ||
          userType === userTypes?.Admin ||
          userType === userTypes?.Consultant ||
          userType === userTypes?.ComplianceManager
            ? "Associate"
            : null
        }
        path={
          userType === userTypes?.SystemAdmin ||
          userType === userTypes?.BranchManager ||
          userType === userTypes?.Admin ||
          userType === userTypes?.Consultant ||
          userType === userTypes?.ComplianceManager
            ? `/associateList`
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
