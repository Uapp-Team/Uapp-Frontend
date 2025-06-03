import React from "react";
import { Col, Row } from "reactstrap";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";
import { rootUrl } from "../../../../../../constants/constants";

const AdmissionCompliance = ({ applicationInfo }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-3 ">
        <div className="d-flex justify-content-between">
          <Row>
            <Col md="3">
              <div className="user-profile-pic">
                {applicationInfo?.admissionCompliance?.image === null ? (
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
                    src={rootUrl + applicationInfo?.admissionCompliance?.image}
                    alt="profile_img"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50px",
                    }}
                  />
                )}
              </div>
            </Col>
            <Col md="9">
              <div>
                <h5>Admission Compliance</h5>

                <p>{applicationInfo?.admissionCompliance?.fullName} </p>
                <ul className="uapp-ul">
                  <li>
                    {" "}
                    <i className="far fa-envelope pr-1 pb-2"></i>
                    {applicationInfo?.admissionCompliance?.email}
                  </li>
                  {applicationInfo?.admissionCompliance?.phone ===
                  null ? null : (
                    <li>
                      {" "}
                      <i className="fas fa-phone pr-1"></i> +
                      {applicationInfo?.admissionCompliance?.phone}
                    </li>
                  )}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default AdmissionCompliance;
