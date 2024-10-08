import React from "react";
// import { useParams } from "react-router-dom";
// import { Card, CardHeader } from "reactstrap";
// import { userTypes } from "../../../../../../constants/userTypeConstant";
// import AssociateDetails from "./Component/AssociateDetails";
import ParentConsultant from "./ProfileComponent/ParentConsultant";
import ProfileHeadCard from "./ProfileComponent/ProfileHeadCard";
// import ProfileRatingsBreakdown from "../../ProfileComponent/ProfileRatingsBreakdown";
// import ProfileRecruitingForFrom from "../../ProfileComponent/ProfileRecruitingForFrom";
// import ProfileRecruitingType from "../../ProfileComponent/ProfileRecruitingType";
import ProfileReview from "./ProfileComponent/ProfileReview";
import Consent from "./ProfileComponent/Consent";
import ConsultantDetails from "./ProfileComponent/ConsultantDetails";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const ConsultantProfile = () => {
  const userId = localStorage.getItem("referenceId");
  // const history = useHistory();
  // const { id } = useParams();
  // console.log(id);

  // const backToConsultantList = () => {
  //   history.push("/consultantList");
  // };

  return (
    <div>
      {/* <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Consultant Profile</h3>
          {userType == userTypes?.SystemAdmin ||
          userType == userTypes?.BranchManager ||
          userType == userTypes?.Admin ||
          userType == userTypes?.ComplianceManager ? (
            <div className="page-header-back-to-home">
              <span onClick={backToConsultantList} className="text-white">
                {" "}
                <i className="fas fa-arrow-circle-left"></i> Back to Consultant
                List
              </span>
            </div>
          ) : null}
        </CardHeader>
      </Card> */}
      <BreadCrumb title="Profile" backTo="" path={`/`} />
      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCard id={userId} />
          <ConsultantDetails id={userId} />
          {/* <ProfileReview id={id} /> */}
          {/* <AssociateDetails id={id} /> */}
        </div>
        <div className="col-lg-4 col-sm-12">
          <ParentConsultant id={userId} />
          {/* <ProfileRecruitingType id={id} /> */}
          {/* <ProfileRecruitingForFrom id={id} /> */}
          {/* <ProfileRatingsBreakdown id={id} /> */}
          <Consent id={userId} />
          <ProfileReview id={userId} />
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfile;
