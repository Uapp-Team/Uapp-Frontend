import React, { useEffect, useState } from "react";
import banner from "../../../../assets/img/affiliate-banner.png";
import editbtn from "../../../../assets/img/editbtn.png";
// import user1 from "../../../../assets/img/user-1.svg";
// import user2 from "../../../../assets/img/user-2.svg";
import { Select } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Col, Row } from "reactstrap";
import user3 from "../../../../assets/img/user-3.svg";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../constants/constants";
import { userTypes } from "../../../../constants/userTypeConstant";
import put from "../../../../helpers/put";
import Uget from "../../../../helpers/Uget";
import { dateFormate } from "../../../../components/date/calenderFormate";

const CompanionBanner = ({
  companionProfileData,
  companionId,
  referenceId,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setStatusLabel(companionProfileData?.data?.accountStatusName);
    setStatusValue(companionProfileData?.data?.accountStatusId);
  }, [companionProfileData]);

  useEffect(() => {
    Uget(`CompanionDD/get-account-status-selects/${companionId}`).then(
      (res) => {
        setStatusType(res?.data);
      }
    );
  }, [companionId, success]);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (value) => {
    setStatusValue(value);
    const data = statusType.filter((x) => x.value === value);
    setStatusLabel(data?.label);

    put(
      `Companion/update-status?companionId=${companionId}&status=${value}`
    ).then((res) => {
      addToast(res?.data?.title, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };
  return (
    <div
      className="bg-affiliate-banner mb-3"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundBlendMode: `overlay, normal`,
      }}
    >
      <Row>
        <Col md="7">
          {" "}
          <div className="d-flex justify-content-start align-items-center">
            {companionProfileData?.data?.companionProfileImage === null ? (
              <>
                <img
                  className="aff-profile-img"
                  src={user3}
                  alt="profile_img"
                />
              </>
            ) : (
              <img
                className="aff-profile-img"
                src={
                  rootUrl +
                  companionProfileData?.data?.companionProfileImage?.fileUrl
                }
                alt="profile_img"
              />
            )}
            <div className="pl-40px text-gray-70">
              <div className="d-flex">
                <h4 className="mr-2 mb-0">
                  {companionProfileData?.data?.nameTitleName}{" "}
                  {companionProfileData?.data?.fullName}
                </h4>
                {companionId === referenceId ||
                userType === userTypes?.SystemAdmin ||
                userType === userTypes?.Admin ? (
                  <Link to={`/companionPersonalInfo/${companionId}`}>
                    {" "}
                    <img
                      style={{ width: "24px", height: "24px" }}
                      src={editbtn}
                      alt=""
                    />
                  </Link>
                ) : null}
              </div>

              <p className="mb-2">{companionProfileData?.data?.viewId}</p>
              {/* {studentDetails?.email === null ? null : ( */}
              <p className="mb-2">
                <i class="far fa-envelope pr-2"></i>
                {companionProfileData?.data?.email}
              </p>
              {/* )} */}

              {/* {studentDetails?.phoneNumber === null ? null : ( */}
              <p className="mb-2">
                <i className="fas fa-phone pr-2"></i>
                {companionProfileData?.data?.phoneNumber &&
                companionProfileData?.data?.phoneNumber.includes("+")
                  ? companionProfileData?.data?.phoneNumber
                  : companionProfileData?.data?.phoneNumber &&
                    !companionProfileData?.data?.phoneNumber.includes("+")
                  ? "+" + companionProfileData?.data?.phoneNumber
                  : null}
              </p>
              {/* )} */}

              {/* <p className="mb-0" style={{ color: "#6B6B6B" }}>
                UAPP Registration Date <br />
                {companionProfileData?.data?.startedDate}
              </p> */}
            </div>
          </div>
        </Col>
        <Col md="5" className="text-md-right mt-3">
          <span>UAPP Registration Date</span>
          <br />
          <span className="text-gray">
            {" "}
            {dateFormate(companionProfileData?.data?.startedDate)}
            {/* {companionProfileData?.data?.startedDate} */}
          </span>
          <br />
          {/* <span>{headData?.branchName}</span> */}
          <br />
          <ul className="uapp-ul text-md-right">
            {permissions?.includes(
              permissionList?.Change_Consultant_AccountStatus
            ) ? (
              <div className="d-flex justify-content-md-end mb-2">
                <Select
                  options={statusTypeMenu}
                  value={{
                    label: statusLabel,
                    value: statusValue,
                  }}
                  onChange={(opt) => selectStatusType(opt)}
                  name="consultantTypeId"
                  id="consultantTypeId"
                />
              </div>
            ) : (
              statusLabel
            )}
          </ul>
          {/* <p className="text-gray">{headData?.consultantTypeName}</p> */}
        </Col>
      </Row>
    </div>
  );
};

export default CompanionBanner;
