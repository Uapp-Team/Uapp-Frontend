import React from "react";
import { Card } from "reactstrap";
import profileImage from "../../../../assets/img/profile/user-uploads/user-07.jpg";
import { rootUrl } from "../../../../constants/constants";
// import get from "../../../../helpers/get";
// import { useHistory } from "react-router-dom";
// import { userTypes } from "../../../../constants/userTypeConstant";

const CompanionTeamMember = ({ companionProfileData, companionId }) => {
  // const [consultantData, setConsultantData] = useState({});
  // const [success, setSuccess] = useState(false);
  // const userTypeId = localStorage.getItem("userType");
  // const history = useHistory();

  // const adminRedirectToParentConsultantProfile = () => {
  //   history.push(`/consultantProfile/${consultantData?.id}`);
  // };
  // const redirectToParentConsultantProfile = () => {
  //   history.push(`/parentConsultantProfile/${consultantData?.id}`);
  // };
  return (
    <div>
      <Card className="p-4">
        <div className="d-flex mb-4">
          <h5 className="mb-0">Team Member </h5>
          <span className="count-summery">
            {companionProfileData?.data?.teamMembers?.length}
          </span>
        </div>

        {companionProfileData?.data?.teamMembers.map((details) => (
          <div className="d-flex justify-between-start align-items-center mb-3">
            <div className="pr-3">
              {details?.profileImage == null ? (
                <img
                  src={profileImage}
                  alt="profile_img"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50px",
                  }}
                />
              ) : (
                <img
                  src={rootUrl + details?.profileImage?.fileUrl}
                  alt="profile_img"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50px",
                  }}
                />
              )}
            </div>
            <div className="font-theme-second fw-600">{details?.name}</div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default CompanionTeamMember;
