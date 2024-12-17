import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import get from "../../../../../../helpers/get";
import { rootUrl } from "../../../../../../constants/constants";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import { useHistory } from "react-router-dom";
import profileImage from "../../../../../../assets/img/profile/user-uploads/user-07.jpg";

const ProviderCard = ({ admissionManagerId }) => {
  const [consultantData, setConsultantData] = useState({});
  const [success, setSuccess] = useState(false);
  const userTypeId = localStorage.getItem("userType");
  const history = useHistory();
  const userId = localStorage.getItem("referenceId");
  const [addAdmissionManagerOfficers, setAddmissionManagerOfficers] = useState(
    []
  );

  useEffect(() => {
    if (admissionManagerId !== undefined) {
      get(`AddmissionManagerProfile/Officers/${admissionManagerId}`).then(
        (res) => {
          setAddmissionManagerOfficers(res);
        }
      );
    } else {
      get(`AddmissionManagerProfile/Officers/${userId}`).then((res) => {
        setAddmissionManagerOfficers(res);
      });
    }
  }, [userId, admissionManagerId]);

  useEffect(() => {
    if (admissionManagerId !== undefined) {
      get(`AddmissionManagerProfile/Provider/${admissionManagerId}`).then(
        (res) => {
          console.log(res);
          setConsultantData(res);
        }
      );
    } else {
      get(`AddmissionManagerProfile/Provider/${userId}`).then((res) => {
        console.log(res);
        setConsultantData(res);
      });
    }
  }, [success, admissionManagerId]);

  return (
    <>
      {userTypeId === userTypes?.ProviderAdmin ? null : (
        <>
          <div>
            {consultantData === null ? null : (
              <Card className="p-4">
                <div className="d-flex justify-between-start">
                  <div className="pr-3">
                    {consultantData?.providerProfileImageMedia == null ? (
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
                          consultantData?.providerProfileImageMedia?.fileUrl
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
                      <span
                        // onClick={redirectToParentConsultantProfile}
                        style={{ cursor: "pointer" }}
                      >
                        {consultantData?.name}
                      </span>
                    </h5>
                    {userTypeId === userTypes?.Provider ? (
                      <div className="pb-2"></div>
                    ) : (
                      <p> {consultantData?.providerType?.name} </p>
                    )}
                  </div>
                </div>

                <Row>
                  <Col>
                    {userTypeId == userTypes?.SystemAdmin ||
                    userTypeId == userTypes?.AdmissionManager ||
                    userTypeId == userTypes?.Admin ||
                    userTypeId == userTypes?.ProviderAdmin ? (
                      <ul className="uapp-ul ">
                        {consultantData?.email === null ? null : (
                          <li>
                            {" "}
                            <i className="far fa-envelope pr-2"></i>{" "}
                            {consultantData?.email}{" "}
                          </li>
                        )}

                        {consultantData?.phoneNumber == null ? null : (
                          <li>
                            {" "}
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
                    ) : null}
                  </Col>
                </Row>
              </Card>
            )}
          </div>
        </>
      )}

      <div>
        {addAdmissionManagerOfficers?.map((managerOfficers, i) => (
          <Card className="p-4" key={i}>
            <div className="d-flex justify-between-start">
              <div className="pr-3">
                {managerOfficers?.profileImage == null ? (
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
                    src={rootUrl + managerOfficers?.profileImage?.fileUrl}
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
                  <span style={{ cursor: "pointer" }}>
                    Assigned Admission Officer
                  </span>
                </h5>
                <p>
                  {managerOfficers.nameTittleName}
                  <span className="mx-1">{managerOfficers.firstName}</span>
                  {managerOfficers.lastName}
                </p>
              </div>
            </div>

            <Row>
              <Col>
                <ul className="uapp-ul ">
                  <li>
                    {" "}
                    <i className="far fa-envelope pr-2"></i>{" "}
                    {managerOfficers.email}
                  </li>

                  <li>
                    {" "}
                    <i className="fas fa-phone pr-2"></i>{" "}
                    {managerOfficers.phoneNumber &&
                    managerOfficers.phoneNumber.includes("+")
                      ? managerOfficers.phoneNumber
                      : managerOfficers.phoneNumber &&
                        !managerOfficers.phoneNumber.includes("+")
                      ? "+" + managerOfficers.phoneNumber
                      : null}
                  </li>
                </ul>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProviderCard;
