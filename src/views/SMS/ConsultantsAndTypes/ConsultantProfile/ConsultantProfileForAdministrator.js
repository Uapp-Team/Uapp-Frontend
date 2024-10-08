import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ParentConsultant from "./ProfileComponent/ParentConsultant";
import ProfileApplications from "./ProfileComponent/ProfileApplications";
// import ProfileAssociates from "../../ProfileComponent/ProfileAssociates";
import ProfileHeadCard from "./ProfileComponent/ProfileHeadCard";
import ProfileImportantLinks from "./ProfileComponent/ProfileImportantLinks";
import ProfileNotice from "./ProfileComponent/ProfileNotice";
import ProfileRatingsBreakdown from "./ProfileComponent/ProfileRatingsBreakdown";
import ProfileReview from "./ProfileComponent/ProfileReview";
// import ProfileRecruitingForFrom from "../../ProfileComponent/ProfileRecruitingForFrom";
// import ProfileStatistics from "../../ProfileComponent/ProfileStatistics";
// import ProfileRecruitingType from "../../ProfileComponent/ProfileRecruitingType";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import CountingCards from "./ProfileComponent/CountingCards";
import ConsultantAddress from "./ProfileComponent/ConsultantAddress";
import Consent from "./ProfileComponent/Consent";
import EstimatedIncome from "./ProfileComponent/EstimatedIncome";
import TargetApplications from "./ProfileComponent/TargetApplications";
import ProgressReport from "./ProfileComponent/ProgressReport";
import RatingBreakdown from "./ProfileComponent/RatingBreakdown";
import ProfileRecruitingForFrom from "./ProfileComponent/ProfileRecruitingForFrom";

const ConsultantProfileForAdministrator = () => {
  const { id } = useParams();
  const [headData, setHeadData] = useState({});

  return (
    <div>
      <BreadCrumb
        title="Consultant Profile"
        backTo="Consultant"
        path="/consultantList"
      />

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCard
            id={id}
            headData={headData}
            setHeadData={setHeadData}
          />
          <CountingCards id={id} />
          <ProfileApplications id={id} />
          <ProgressReport id={id} />
          {/* <ProfileAssociates id={id} /> */}
          {/* <ProfileStatistics id={id} /> */}
          {/* <RatingBreakdown id={id} /> */}
          {/* <ProfileReview id={id} /> */}
        </div>

        <div className="col-lg-4 col-sm-12">
          <ParentConsultant id={id} />
          <ConsultantAddress id={id} />
          <Consent id={id} />
          <ProfileRecruitingForFrom id={id} headData={headData} />
          <ProfileImportantLinks id={id} />
          <EstimatedIncome id={id} />
          <TargetApplications id={id} />
          {/* <ProfileRecruitingType id={id} /> */}
          <ProfileRatingsBreakdown id={id} />
          {/* <ProfileNotice /> */}
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfileForAdministrator;
