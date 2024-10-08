import React, { useEffect, useState } from "react";
import { rootUrl } from "../../../../../constants/constants";
import editbtn from "../../../../../assets/img/editbtn2.png";
import institute from "../../../../../assets/img/Institute.svg";
import { Link } from "react-router-dom";
import { userTypes } from "../../../../../constants/userTypeConstant";
import Select from "react-select";
import put from "../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

export default function ProviderProfileInfoCard({
  LogoUrl,
  Name,
  Address,
  Email,
  Phone,
  TypeName,
  TotalStudent,
  InternationalStudent,
  ProviderId,
  accountStatusId,
  success,
  setSuccess,
}) {
  const { addToast } = useToasts();
  const userTypeId = localStorage.getItem("userType");
  const [statusLabel, setStatusLabel] = useState("Account Status");
  const [statusValue, setStatusValue] = useState(accountStatusId);
  const [statusType, setStatusType] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ProviderAccountStatusDD/Index`).then((res) => {
      setStatusType(res);
    });
  }, []);

  useEffect(() => {
    const initialStatus = statusType.filter((status) => {
      return status.id === accountStatusId;
    });

    setStatusLabel(initialStatus[0]?.name);
  }, [statusType, accountStatusId]);

  const statusTypeMenu = statusType?.map((statusTypeOptions) => ({
    label: statusTypeOptions?.name,
    value: statusTypeOptions?.id,
  }));

  const selectStatusType = (label, value) => {
    setStatusLabel(label);
    setStatusValue(value);

    put(`Provider/UpdateStatus/${ProviderId}/${value}`).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };
  return (
    <div className="university-profile-info-card mx-auto">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-5">
          <div className="d-flex align-items-center">
            <div>
              {LogoUrl ? (
                <img className="uniLogo" src={rootUrl + LogoUrl} alt="" />
              ) : (
                <img className="uniLogo" src={institute} alt="" />
              )}
            </div>
            <div style={{ marginLeft: "25px" }}>
              <div className="uniProfileInfo">{Name}</div>
              <div style={{ color: "#495057" }}>
                <span className="fas fa-location-dot"></span>{" "}
                <span className="mt-2">{Address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-7 col-md-4">
          <div className="text-gray-75">
            <span>Email : {Email}</span> <br />
            <span>Phone : {Phone}</span> <br />
            <span>Type : {TypeName}</span>
          </div>
        </div>
        <div className="col-12 col-sm-5 col-md-3">
          <div className="text-gray-75">
            <span>Total Students: {TotalStudent}</span> <br />
            <span>Int. Students: {InternationalStudent}</span> <br />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-end">
            {userTypeId === userTypes?.SystemAdmin.toString() ||
            userTypeId === userTypes?.Admin.toString() ? (
              <>
                {permissions?.includes(
                  permissionList.Change_Provider_Account_Status
                ) ? (
                  <Select
                    className="pr-2"
                    options={statusTypeMenu}
                    value={{ label: statusLabel, value: statusValue }}
                    onChange={(opt) => selectStatusType(opt.label, opt.value)}
                    name="consultantTypeId"
                    id="consultantTypeId"
                    styles={{ height: "35px" }}
                  />
                ) : (
                  <p className="mr-1 pt-2"> {statusLabel}</p>
                )}
              </>
            ) : (
              <p className="mr-1 pt-2"> {statusLabel}</p>
            )}

            {permissions?.includes(permissionList.Edit_Provider) ? (
              <Link to={`/updateProvider/${ProviderId}`}>
                <img
                  style={{ width: "35px", height: "35px" }}
                  src={editbtn}
                  alt=""
                />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
