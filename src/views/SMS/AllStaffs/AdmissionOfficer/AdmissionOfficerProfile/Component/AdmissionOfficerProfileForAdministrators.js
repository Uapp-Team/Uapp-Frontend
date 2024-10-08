import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { userTypes } from "../../../../../../constants/userTypeConstant";
import AdmissionOfficerProfileHeadCard from "../ProfileComponent/AdmissionOfficerProfileHeadCard";
import AssignedUniversities from "../ProfileComponent/AssignedUniversities";
import AssignedSubjects from "../ProfileComponent/AssignedSubjects";
import ProviderCard from "../ProfileComponent/ProviderCard";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerProfileForAdministrators = () => {
  const userType = localStorage.getItem("userType");
  const [headData, setHeadData] = useState({});

  const { officerId } = useParams();
  console.log("object", officerId);
  const userId = localStorage.getItem("referenceId");

  return (
    <div>
      <BreadCrumb
        title="Admission Officer Profile"
        backTo="Admission Officer"
        path="/admissionOfficerList"
      />

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <AdmissionOfficerProfileHeadCard
            id={officerId}
            userId={userId}
            setHeadData={setHeadData}
            headData={headData}
          />

          <AssignedUniversities
            officerId={officerId}
            setHeadData={setHeadData}
            headData={headData}
          />

          <AssignedSubjects
            officerId={officerId}
            setHeadData={setHeadData}
            headData={headData}
          />

          {/* <ProfileStatistics id={id}/> */}

          {/* <ProfileReview id={id}/> */}
        </div>

        <div className="col-md-4 col-sm-12">
          {userType === userTypes?.ProviderAdmin.toString() ? null : (
            <ProviderCard officerId={officerId} />
          )}

          {/* {userType === userTypes?.AdmissionManager.toString() ? null : (
            <AdmissionManagerCard officerId={id} />
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

export default AdmissionOfficerProfileForAdministrators;
