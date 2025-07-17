import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { useHistory } from "react-router-dom";
import profileImage from "../../../../../assets/img/profile/user-uploads/user-07.jpg";

const StudentParentConsultant = ({ id }) => {
  const [consultantData, setConsultantData] = useState({});
  // const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();

  useEffect(() => {
    get(`ConsultantProfile/StudentParentConsultant/${id}`).then((res) => {
      console.log(res);
      setConsultantData(res);
    });
  }, [id]);

  const redirectToParentConsultantProfile = () => {
    history.push(`/consultantProfile/${consultantData?.id}`);
  };

  return (
    <>
      {consultantData === null ? null : (
        <Card className="p-4">
          <div className="d-flex justify-between-start">
            <div className="pr-3">
              {" "}
              {consultantData?.consultantProfileImageMedia == null ? (
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
                    consultantData?.consultantProfileImageMedia?.fileUrl
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
                    onClick={redirectToParentConsultantProfile}
                    style={{ cursor: "pointer" }}
                  >
                    {consultantData?.fullName}
                  </span>
                ) : (
                  <span>{consultantData?.fullName}</span>
                )}
              </h5>
              {/* {userTypeId === userTypes?.Consultant.toString() ? null : (
                <p className="text-gray-70">
                  {consultantData?.parentConsultant}{" "}
                </p>
              )} */}
              <p> Consultant </p>
            </div>
          </div>

          <Row>
            <Col>
              <ul className="uapp-ul">
                {consultantData?.email === null ? null : (
                  <li>
                    <i className="far fa-envelope pr-2"></i>{" "}
                    {consultantData?.email}{" "}
                  </li>
                )}

                {consultantData?.phoneNumber === null ? null : (
                  <li>
                    <i className="fas fa-phone pr-2"></i>{" "}
                    {consultantData?.phoneNumber}{" "}
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

export default StudentParentConsultant;
