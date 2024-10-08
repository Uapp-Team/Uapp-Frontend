import React from "react";
import locationIcon from "../../../../../assets/img/pages/locationIcon.png";
import editbtn from "../../../../../assets/img/editbtn2.png";
// import editbtn from "../../../../../assets/img/editbtn.png";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const CampusProfileInfoCard = ({
  campusInfo,
  setUniId,
  redirectToCampusEdit,
  uniId,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <div className="university-profile-info-card mx-auto">
      <div className="row ">
        <div className="col-12 col-md-4 col-sm-4">
          <div className="d-flex align-items-center">
            <div style={{ marginLeft: "25px" }}>
              <div style={{ fontSize: "14px", fontWeight: 500 }}>
                {campusInfo?.university?.name}
              </div>
              <div className="uniProfileInfo ">{campusInfo?.name}</div>
              <div style={{ color: "#495057" }}>
                <span>
                  <img src={locationIcon} alt="" />
                </span>{" "}
                <span className="mt-2">
                  {campusInfo?.university?.universityCountry?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-4 col-md-4">
          <div style={{ lineHeight: "24px" }}>
            <span style={{ fontSize: "15px", fontWeight: 500 }}>
              Total student : {campusInfo?.totalStudent}
            </span>{" "}
            <br />
            <span style={{ fontSize: "15px", fontWeight: 500 }}>
              International student : {campusInfo?.internationalStudent}
            </span>
          </div>
        </div>
        <div className="col-12 col-sm-3 col-md-2"></div>
        <div className="col-12 col-sm-1 col-md-2 text-right">
          {permissions?.includes(permissionList.Edit_University) && (
            <Link to={`/CampusInformation/${uniId}/${campusInfo?.id}`}>
              <img className={"mx-1 btn-sm"} src={editbtn} alt="" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusProfileInfoCard;
