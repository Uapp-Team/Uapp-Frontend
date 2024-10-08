import React from "react";
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

const ConsultantProfileForOthers = () => {
  const { id } = useParams();

  return (
    <>
      <BreadCrumb title="Consultant Profile" backTo="" path="/" />

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCardForView id={id} />
          {/* <Applicationtransactions id={id} />
          <AccountTransaction id={id} />
          <WithdrawTransaction id={id} />
          <Commission id={id} /> */}
          {/* <RatingBreakdown id={id} />
          <ProfileReview id={id} /> */}
        </div>

        <div className="col-lg-4 col-sm-12">
          <ParentConsultant id={id} />
          {/* <ConsultantAddress id={id} />
          <EstimatedIncome id={id} /> */}
        </div>
      </div>
    </>
  );
};

export default ConsultantProfileForOthers;
