import React from "react";
import { Col, Row } from "reactstrap";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";
import { rootUrl } from "../../../../../../constants/constants";

const AdmissionCompliance = ({ applicationInfo }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-3 ">
        <div className="d-flex">
          {" "}
          <div className="user-profile-pic">
            {applicationInfo?.admissionCompliance?.image === null ? (
              <img src={profileImage} alt="profile_img" />
            ) : (
              <img
                src={rootUrl + applicationInfo?.admissionCompliance?.image}
                alt="profile_img"
              />
            )}
          </div>{" "}
          <div className="mx-4">
            <h5>Admission Compliance</h5>

            <p>{applicationInfo?.admissionCompliance?.fullName} </p>
            <ul className="uapp-ul word-break">
              <li>
                {" "}
                <i className="far fa-envelope pr-1 pb-2"></i>
                {applicationInfo?.admissionCompliance?.email}
              </li>
              {applicationInfo?.admissionCompliance?.phone === null ? null : (
                <li>
                  {" "}
                  <i className="fas fa-phone pr-1"></i>
                  {applicationInfo?.admissionCompliance?.phone &&
                  applicationInfo?.admissionCompliance?.phone.includes("+")
                    ? applicationInfo?.admissionCompliance?.phone
                    : applicationInfo?.admissionCompliance?.phone &&
                      !applicationInfo?.admissionCompliance?.phone.includes("+")
                    ? "+" + applicationInfo?.admissionCompliance?.phone
                    : null}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionCompliance;
