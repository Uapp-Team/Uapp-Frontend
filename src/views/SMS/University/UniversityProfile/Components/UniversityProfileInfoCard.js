import React, { useEffect, useState } from "react";
import { rootUrl } from "../../../../../constants/constants";
import locationIcon from "../../../../../assets/img/pages/locationIcon.png";
import editbtn from "../../../../../assets/img/editbtn2.png";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import get from "../../../../../helpers/get";
import put from "../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router";
import ToggleSwitch2 from "../../../Components/ToggleSwitch2.js";
export default function UniversityProfileInfoCard({
  LogoUrl,
  Name,
  CountryName,
  UniversityId,
  FoundationYear,
  UniversityType,
}) {
  const { id } = useParams();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [uniData, setUniData] = useState({});
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    get(`University/Get/${id}`).then((res) => {
      setUniData(res);
    });
  }, [id, success]);

  const handleUpdateStatus = (data) => {
    put(`University/UpdateStatus/${data?.id}`).then((res) => {
      if (res?.data?.result === true && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setSuccess(!success);
      }
    });
  };

  return (
    <div className="university-profile-info-card mx-auto">
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 mb-xs-10">
          <div className="d-flex align-items-center">
            <div>
              <img className="uniLogo" src={rootUrl + LogoUrl} alt="" />
            </div>
            <div style={{ marginLeft: "25px" }}>
              <div className="uniProfileInfo ">{Name}</div>
              <div style={{ color: "#495057" }}>
                <span>
                  <img src={locationIcon} alt="" />
                </span>{" "}
                <span className="mt-2">{CountryName}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div style={{ lineHeight: "24px" }}>
            <span className="text-university-info">
              Established: {FoundationYear}
            </span>{" "}
            <br />
            <span className="text-university-info">Type: {UniversityType}</span>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div style={{ lineHeight: "24px" }}>
            <span className="text-university-info">Total Students: 12500+</span>{" "}
            <br />
            <span className="text-university-info">
              Int. Students: 3700+
            </span>{" "}
            <br />
          </div>
        </div>
        <div className="col-12 ">
          <div className="d-flex align-items-center justify-content-end">
            <>
              {permissions?.includes(
                permissionList?.Change_University_Status
              ) ? (
                <ToggleSwitch2
                  className="university-Toggle"
                  checked={uniData?.isActive === true ? true : false}
                  onChange={(e) => handleUpdateStatus(uniData)}
                />
              ) : (
                uniData?.isActive
              )}
            </>

            {permissions?.includes(permissionList.Edit_University) && (
              <Link to={`/addUniversity/${UniversityId}`}>
                <img className={"mx-1 btn-sm"} src={editbtn} alt="" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
