import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileReview from "./ProfileComponent/ProfileReview";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ProfileHeadCardForView from "./ProfileComponent/ProfileHeadCardForView";
import RatingBreakdown from "./ProfileComponent/RatingBreakdown";
import Applicationtransactions from "./ProfileComponent/Applicationtransactions";
import Commission from "./ProfileComponent/ConsultantDetails/Commission";
import ParentConsultant from "./ProfileComponent/ParentConsultant";
import ConsultantAddress from "./ProfileComponent/ConsultantAddress";
import EstimatedIncome from "./ProfileComponent/EstimatedIncome";
import AccountTransaction from "./ProfileComponent/AccountTransaction";
import WithdrawTransaction from "./ProfileComponent/WithdrawTransaction";
import CountingCards from "./ProfileComponent/CountingCards";
import DashboardApplication from "../../../../components/ui/DashboardApplication";
import DashboardReadyToApply from "../../../../components/ui/DashboardReadyToApply";
import ConsultantDetails from "./ProfileComponent/ConsultantDetails";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Consent from "./ProfileComponent/Consent";
import ProfileImportantLinks from "./ProfileComponent/ProfileImportantLinks";
import TargetApplications from "./ProfileComponent/TargetApplications";
import ProfileRatingsBreakdown from "./ProfileComponent/ProfileRatingsBreakdown";

const ConsultantProfileForOthers = () => {
  const { id } = useParams();
  const [headData, setHeadData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <>
      <BreadCrumb title="Consultant Profile" backTo="" path="/" />

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCardForView id={id} />

          {permissions?.includes(permissionList.View_Consultant_Application) ? (
            <CountingCards id={id} />
          ) : null}
          {permissions?.includes(permissionList.View_Consultant_Application) ? (
            <DashboardApplication
              url={`ConsultantProfile/GetApplication/${id}`}
            />
          ) : null}
          {permissions?.includes(permissionList.View_Consultant_Application) ? (
            <DashboardReadyToApply
              url={`ConsultantDashboard/ReadyToApplyApplications?id=${id}`}
            />
          ) : null}

          <ConsultantDetails id={id} />
          {/* <Applicationtransactions id={id} />
          <AccountTransaction id={id} />
          <WithdrawTransaction id={id} />
          <Commission id={id} /> */}
          {/* <RatingBreakdown id={id} />
          <ProfileReview id={id} /> */}

          {permissions?.includes(permissionList.View_Consultant) ? (
            <>
              {" "}
              <ProfileReview id={id} />
            </>
          ) : null}
        </div>

        <div className="col-lg-4 col-sm-12">
          <ParentConsultant id={id} />
          <ConsultantAddress id={id} />
          <Consent id={id} />
          <ProfileImportantLinks id={id} />

          {permissions?.includes(permissionList.View_Consultant_Balance) ? (
            <EstimatedIncome id={id} />
          ) : null}
          {permissions?.includes(permissionList.View_Consultant_Application) ? (
            <TargetApplications id={id} />
          ) : null}

          {/* <ProfileRecruitingType id={id} /> */}
          {permissions?.includes(permissionList.View_Consultant) ? (
            <ProfileRatingsBreakdown id={id} />
          ) : null}

          {/* <ProfileNotice id={id} /> */}
          {/* <ConsultantAddress id={id} />
          <EstimatedIncome id={id} /> */}
        </div>
      </div>
    </>
  );
};

export default ConsultantProfileForOthers;
