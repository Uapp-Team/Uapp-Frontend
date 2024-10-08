import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import AdmissionOfficerProfileHeadCard from "../ProfileComponent/AdmissionOfficerProfileHeadCard";

import ProviderCard from "../ProfileComponent/ProviderCard";
import DetailsInfoAdmissionOfficerProfile from "./AdmissionOfficerDetailsAndTerms/Component/DetailsInfoAdmissionOfficerProfile";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerProfile = ({ userId }) => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  // const { officerId } = useParams();
  // const userId = localStorage.getItem("referenceId");

  return (
    <div>
      <BreadCrumb title="Profile" backTo="" path={`/`} />
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <AdmissionOfficerProfileHeadCard userId={userId} />
          <DetailsInfoAdmissionOfficerProfile userId={userId} />

          {/* <AssignedUniversities officerId={officerId} /> */}

          {/* <AssignedSubjects officerId={officerId} /> */}

          {/* <ProfileStatistics id={id}/> */}

          {/* <ProfileReview id={id}/> */}
        </div>

        <div className="col-md-4 col-sm-12">
          {userType === userTypes?.ProviderAdmin.toString() ? null : (
            <ProviderCard userId={userId} />
          )}

          {/* {userType == userTypes?.AdmissionManager ? null : (
            <AdmissionManagerCard userId={userId} />
          )} */}

          {/* <ProfileRecruitingType id={id} /> */}

          {/* <ProfileRecruitingForFrom id={id} /> */}

          {/* <ProfileImportantLinks/> */}

          {/* <ProfileRatingsBreakdown id={id} /> */}

          {/* <ProfileNotice/> */}
        </div>
      </div>
    </div>
  );
};

export default AdmissionOfficerProfile;
