import React, { useEffect, useState } from "react";
import banner from "../../../../assets/img/affiliate-banner.png";
import editbtn from "../../../../assets/img/editbtn.png";
import user3 from "../../../../assets/img/user-3.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { rootUrl } from "../../../../constants/constants";
import { Col, Row } from "reactstrap";
import { Select } from "antd";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import Uget from "../../../../helpers/Uget";
import { userTypes } from "../../../../constants/userTypeConstant";

const AffiliateBanner = ({
  affiliateProfileData,
  affiliateId,
  referenceId,
}) => {
  // const { affiliateId } = useParams();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [statusType, setStatusType] = useState([]);
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(0);
  const userType = localStorage.getItem("userType");
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    setStatusLabel(affiliateProfileData?.data?.accountStatusName);
    setStatusValue(affiliateProfileData?.data?.accountStatusId);
  }, [affiliateProfileData]);

  useEffect(() => {
    Uget(`AffiliateDD/get-account-status-selects/${affiliateId}`).then(
      (res) => {
        setStatusType(res?.data);
      }
    );
  }, [affiliateId, success]);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (value) => {
    setStatusValue(value);
    const data = statusType.filter((x) => x.value === value);
    setStatusLabel(data?.label);

    put(
      `Affiliate/update-status?affiliateId=${affiliateId}&status=${value}`
    ).then((res) => {
      addToast(res?.data?.title, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  return (
    <>
      {" "}
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
              {affiliateProfileData?.data?.affiliateProfileImage === null ? (
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
                    affiliateProfileData?.data?.affiliateProfileImage?.fileUrl
                  }
                  alt="profile_img"
                />
              )}
              <div className="pl-40px text-gray-70">
                <div className="d-flex">
                  <h4 className="mr-2 mb-0">
                    {affiliateProfileData?.data?.nameTitleName}{" "}
                    {affiliateProfileData?.data?.fullName}
                  </h4>
                  {affiliateId === referenceId ||
                  userType === userTypes?.SystemAdmin ||
                  userType === userTypes?.Admin ? (
                    <Link to={`/affiliatePersonalInfo/${affiliateId}`}>
                      {" "}
                      <img
                        style={{ width: "24px", height: "24px" }}
                        src={editbtn}
                        alt=""
                      />
                    </Link>
                  ) : null}
                </div>

                <p className="mb-2">{affiliateProfileData?.data?.viewId}</p>
                {/* {studentDetails?.email === null ? null : ( */}
                <p className="mb-2">
                  <i class="far fa-envelope pr-2"></i>
                  {affiliateProfileData?.data?.email}
                </p>
                {/* )} */}

                {/* {studentDetails?.phoneNumber === null ? null : ( */}
                <p className="mb-2">
                  <i className="fas fa-phone pr-2"></i>
                  {affiliateProfileData?.data?.phoneNumber}
                </p>
                {/* )} */}

                {/* <p className="mb-0" style={{ color: "#6B6B6B" }}>
                  UAPP Registration Date <br />
                  {affiliateProfileData?.data?.startedDate}
                </p> */}
              </div>
            </div>
          </Col>
          <Col md="5" className="text-md-right mt-3">
            <span>UAPP Registration Date</span>
            <br />
            <span className="text-gray">
              {" "}
              {affiliateProfileData?.data?.startedDate}
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
    </>
  );
};

export default AffiliateBanner;
