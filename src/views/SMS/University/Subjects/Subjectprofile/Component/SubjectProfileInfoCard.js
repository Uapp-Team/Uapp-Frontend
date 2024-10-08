import React from "react";
import { rootUrl } from "../../../../../../constants/constants";
import locationIcon from "../../../../../../assets/img/pages/locationIcon.png";
import { Link } from "react-router-dom";
import editbtn from "../../../../../../assets/img/editbtn2.png";
const SubjectProfileInfoCard = ({
  LogoUrl,
  Name,
  CountryName,
  UniversityId,
  foundationYear,
  Type,
  id,
}) => {
  return (
    <div className="university-profile-info-card mx-auto">
      <div className="row justify-content-center align-items-center">
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
                <span className="mt-2">
                  {CountryName}
                  {/* {uniData?.universityCountry?.name} */}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5 col-md-4">
          <div style={{ lineHeight: "24px" }}>
            <span className="text-university-info">
              Established: {foundationYear}
            </span>{" "}
            <br />
            <span className="text-university-info">Type: {Type}</span>
          </div>
        </div>
        <div className="col-7 col-md-3">
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
            <Link to={`/add-University-course/${UniversityId}/${id}`}>
              <img className={"mx-1 btn-sm"} src={editbtn} alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectProfileInfoCard;
