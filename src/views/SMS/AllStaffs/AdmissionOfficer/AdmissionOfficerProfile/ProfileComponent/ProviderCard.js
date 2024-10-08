import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import get from "../../../../../../helpers/get";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { rootUrl } from "../../../../../../constants/constants";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";

const ProviderCard = ({ officerId, userId }) => {
  const [providerData, setproviderData] = useState({});

  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();
  console.log("provider", officerId);

  useEffect(() => {
    if (officerId !== undefined) {
      get(`AdmissionOfficerProfile/Provider/${officerId}`).then((res) => {
        console.log("provider", res);

        setproviderData(res);
      });
    } else {
      get(`AdmissionOfficerProfile/Provider/${userId}`).then((res) => {
        console.log("provider", res);
        setproviderData(res);
      });
    }
  }, [officerId, userId]);

  const redirectToProviderProfile = () => {
    history.push(`/providerDetails/${providerData?.id}`);
  };

  return (
    <div>
      {providerData === null ? null : (
        <>
          <Card className="p-4">
            <span className="app-style-const">Provider</span>
            <div className="d-flex justify-between-start">
              <div className="pr-3">
                {providerData?.providerImageMedia == null ? (
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
                      rootUrl + providerData?.providerImageMedia?.thumbnailUrl
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
                      onClick={redirectToProviderProfile}
                      style={{ cursor: "pointer" }}
                    >
                      {providerData?.name}{" "}
                    </span>
                  ) : (
                    <span
                      onClick={redirectToProviderProfile}
                      style={{ cursor: "pointer" }}
                    >
                      <span>{providerData?.name} </span>
                    </span>
                  )}
                </h5>
                {userTypeId === userTypes?.Consultant.toString() ? (
                  <div className="pb-2"></div>
                ) : (
                  <p> {providerData?.consultantType?.name} </p>
                )}
              </div>
            </div>

            <Row className="mt-3">
              <Col>
                <ul className="uapp-ul">
                  {userTypeId === userTypes?.AdmissionManager.toString() ||
                  userTypeId === userTypes?.SystemAdmin.toString() ||
                  userTypeId === userTypes?.Admin.toString() ||
                  userTypeId === userTypes?.ProviderAdmin.toString() ||
                  userTypeId === userTypes?.AdmissionOfficer.toString() ? (
                    <>
                      {providerData?.email === null ? null : (
                        <li>
                          <i className="far fa-envelope pr-2"></i>
                          {providerData?.email}
                        </li>
                      )}

                      {providerData?.phoneNumber == null ? null : (
                        <li>
                          <i className="fas fa-phone pr-2"></i>{" "}
                          {providerData?.phoneNumber}
                        </li>
                      )}
                    </>
                  ) : null}
                </ul>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProviderCard;
