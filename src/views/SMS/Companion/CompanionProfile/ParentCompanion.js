import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import profileImage from "../../../../assets/img/profile/user-uploads/user-07.jpg";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import { userTypes } from "../../../../constants/userTypeConstant";

const ParentCompanion = ({ companionProfileData, companionId }) => {
  const [consultantData, setConsultantData] = useState({});
  // const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();

  const adminRedirectToParentConsultantProfile = () => {
    history
      .push
      // `/consultantProfile/${companionProfileData?.data?.parent?.id}`
      ();
  };
  const redirectToParentConsultantProfile = () => {
    // history.push(`/parentConsultantProfile/${consultantData?.id}`);
  };

  return (
    <>
      {companionProfileData?.data?.parent === null ? null : (
        <Card className="p-4">
          <div className="d-flex justify-between-start">
            <div className="pr-3">
              {companionProfileData?.data?.parent.profilePic == null ? (
                <img
                  src={profileImage}
                  alt="profile_img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                />
              ) : (
                <img
                  src={
                    rootUrl +
                    companionProfileData?.data?.parent.profilePic?.fileUrl
                  }
                  alt="profile_img"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50px",
                  }}
                />
              )}
            </div>
            <div>
              {" "}
              <h5>
                {userTypeId === userTypes?.SystemAdmin.toString() ||
                userTypeId === userTypes?.Admin.toString() ? (
                  <span
                    onClick={adminRedirectToParentConsultantProfile}
                    // style={{ cursor: "pointer" }}
                  >
                    {companionProfileData?.data?.parent?.name}
                  </span>
                ) : (
                  <span
                    onClick={redirectToParentConsultantProfile}
                    // style={{ cursor: "pointer" }}
                  >
                    {companionProfileData?.data?.parent?.name}
                  </span>
                )}
              </h5>
              {/* {userTypeId === userTypes?.Consultant.toString() ? null : (
                <p className="text-gray-70">
                  {consultantData?.parentConsultant}{" "}
                </p>
              )} */}
              <p> Parent Companion</p>
            </div>
          </div>

          <Row>
            <Col>
              <ul className="uapp-ul">
                {companionProfileData?.data?.parent?.email === null ? null : (
                  <li>
                    <i className="far fa-envelope pr-2"></i>
                    {companionProfileData?.data?.parent?.email}
                  </li>
                )}

                {companionProfileData?.data?.parent?.phone === null ? null : (
                  <li>
                    <i className="fas fa-phone pr-2"></i>
                    {companionProfileData?.data?.parent?.phone}
                  </li>
                )}
              </ul>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default ParentCompanion;
