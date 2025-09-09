import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { userTypes } from "../../../../../constants/userTypeConstant";
import { useHistory } from "react-router-dom";
import profileImage from "../../../../../assets/img/profile/user-uploads/user-07.jpg";
import bacCertImg from "../../../../../assets/img/bac-cert.svg";

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
          <div className="d-flex align-items-center">
            <div
              className="position-relative d-inline-block"
              style={{ width: "120px", height: "120px" }}
            >
              <img
                src={
                  consultantData?.consultantProfileImageMedia == null
                    ? profileImage
                    : rootUrl +
                      consultantData?.consultantProfileImageMedia?.fileUrl
                }
                alt="profile_img"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              {consultantData?.isBacCertificateApproved === true && (
                <img
                  src={bacCertImg}
                  alt="certification"
                  className="position-absolute"
                  style={{
                    width: "60px",
                    bottom: "-15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              )}
            </div>

            <div className="ml-4 std-cons-parent">
              <h5 className="word-break">
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
              <p className="mb-1"> Consultant </p>
              <ul className="std-parent-cons word-break">
                {consultantData?.email === null ? null : (
                  <li>
                    <i className="far fa-envelope pr-2"></i>{" "}
                    {consultantData?.email}{" "}
                  </li>
                )}

                {consultantData?.phoneNumber === null ? null : (
                  <li>
                    <i className="fas fa-phone pr-2"></i>{" "}
                    {consultantData?.phoneNumber &&
                    consultantData?.phoneNumber.includes("+")
                      ? consultantData?.phoneNumber
                      : consultantData?.phoneNumber &&
                        !consultantData?.phoneNumber.includes("+")
                      ? "+" + consultantData?.phoneNumber
                      : null}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default StudentParentConsultant;
