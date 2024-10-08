import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { rootUrl } from "../../../../../../constants/constants";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";
import get from "../../../../../../helpers/get";

const ProviderCardForProviderAdmin = ({ providerAdminId, userId }) => {
  const [providerData, setproviderData] = useState({});
  const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();
  // const userId = localStorage.getItem("referenceId");

  useEffect(() => {
    if (providerAdminId !== undefined) {
      get(`ProviderAdminProfile/Provider/${providerAdminId}`).then((res) => {
        console.log("provider", res);
        setproviderData(res);
      });
    } else {
      get(`ProviderAdminProfile/Provider/${userId}`).then((res) => {
        console.log("provider", res);
        setproviderData(res);
      });
    }
  }, [success, providerAdminId]);

  const redirectToProviderProfile = () => {
    history.push(`/providerDetails/${providerData?.id}`);
  };
  return (
    <div>
      {providerData === null ? null : (
        <Card className="uapp-employee-profile-right1">
          <div
            style={{
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
            }}
            className="uapp-profile-CardHeader"
          >
            <div className="uapp-circle-image margin-top-minus">
              {providerData?.providerImageMedia == null ? (
                <img src={profileImage} alt="profile_img" />
              ) : (
                <img
                  src={rootUrl + providerData?.providerImageMedia?.thumbnailUrl}
                  alt="profile_img"
                />
              )}
            </div>

            <h5>
              {userTypeId == userTypes?.SystemAdmin ||
              userTypeId == userTypes?.Admin ||
              userTypeId == userTypes?.AdmissionManager ? (
                <span
                  onClick={redirectToProviderProfile}
                  style={{ cursor: "pointer" }}
                >
                  {providerData?.name}{" "}
                </span>
              ) : (
                <span>{providerData?.name} </span>
              )}
            </h5>
            {userTypeId == userTypes?.Consultant ? (
              <div className="pb-2"></div>
            ) : (
              <p> {providerData?.consultantType?.name} </p>
            )}
          </div>
          <CardBody>
            <div>
              <ul className="uapp-ul text-center">
                {userTypeId == userTypes?.SystemAdmin ||
                userTypeId == userTypes?.Admin ? (
                  <li> {providerData?.accountStatus?.statusName} </li>
                ) : null}

                {userTypeId == userTypes?.AdmissionManager ||
                userTypeId == userTypes?.SystemAdmin ||
                userTypeId == userTypes?.Admin ||
                userTypeId == userTypes?.ProviderAdmin ||
                userTypeId == userTypes?.AdmissionOfficer ? (
                  <>
                    <li>
                      {" "}
                      <b>{providerData?.branch?.name}</b>{" "}
                    </li>
                    <li>
                      {" "}
                      <i className="far fa-envelope"></i> {providerData?.email}{" "}
                    </li>
                    {providerData?.phoneNumber == null ? null : (
                      <li>
                        {" "}
                        <i className="fas fa-phone"></i>{" "}
                        {providerData?.phoneNumber}{" "}
                      </li>
                    )}
                  </>
                ) : null}
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ProviderCardForProviderAdmin;
