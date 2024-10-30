import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import profileImage from "../../../../assets/img/profile/user-uploads/user-07.jpg";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import { userTypes } from "../../../../constants/userTypeConstant";

const CompanionParentConsultant = ({ companionProfileData, affiliateId }) => {
  const [consultantData, setConsultantData] = useState({});
  // const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();

  const adminRedirectToParentConsultantProfile = () => {
    history
      .push
      // `/consultantProfile/${affiliateProfileData?.data?.parent?.id}`
      ();
  };
  const redirectToParentConsultantProfile = () => {
    // history.push(`/parentConsultantProfile/${consultantData?.id}`);
  };

  return (
    <>
      {companionProfileData?.data?.parentConsultant === null ? null : (
        <Card className="p-4">
          <div className="d-flex justify-between-start">
            <div className="pr-3">
              {companionProfileData?.data?.parentConsultant?.profilePic ==
              null ? (
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
                    companionProfileData?.data?.parentConsultant?.profilePic
                      ?.fileUrl
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
                    {companionProfileData?.data?.parentConsultant?.name}
                  </span>
                ) : (
                  <span
                    onClick={redirectToParentConsultantProfile}
                    // style={{ cursor: "pointer" }}
                  >
                    {companionProfileData?.data?.parentConsultant?.name}
                  </span>
                )}
              </h5>
              {/* {userTypeId === userTypes?.Consultant.toString() ? null : (
                <p className="text-gray-70">
                  {consultantData?.parentConsultant}{" "}
                </p>
              )} */}
              <p> Parent Consultant</p>
            </div>
          </div>

          <Row>
            <Col>
              <ul className="uapp-ul">
                {companionProfileData?.data?.parentConsultant?.email ===
                null ? null : (
                  <li>
                    <i className="far fa-envelope pr-2"></i>
                    {companionProfileData?.data?.parentConsultant?.email}
                  </li>
                )}

                {companionProfileData?.data?.parentConsultant?.phone ===
                null ? null : (
                  <li>
                    <i className="fas fa-phone pr-2"></i>
                    {companionProfileData?.data?.parentConsultant?.phone}
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

export default CompanionParentConsultant;
