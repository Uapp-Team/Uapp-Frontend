import React, { useEffect, useState } from "react";
import { rootUrl } from "../../../../../constants/constants";
import locationIcon from "../../../../../assets/img/pages/locationIcon.png";
import editbtn from "../../../../../assets/img/editbtn2.png";
import { Link } from "react-router-dom";
import ToggleSwitch from "../../../Components/ToggleSwitch";
import { permissionList } from "../../../../../constants/AuthorizationConstant.js";
import get from "../../../../../helpers/get";
import { tableIdList } from "../../../../../constants/TableIdConstant.js";
import put from "../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
export default function UniversityProfileInfoCard({
  uniData,
  LogoUrl,
  Name,
  CountryName,
  UniversityId,
  FoundationYear,
  UniversityType,
  props,
}) {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [orderValue, setOrderValue] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [uniTypeValue, setUniTypeValue] = useState(0);
  const [uniCountryValue, setUniCountryValue] = useState(0);
  const [unistateValue, setUniStateValue] = useState(0);
  const [providerValue, setProviderValue] = useState(0);
  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);

  const [delData, setDelData] = useState({});
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const providerData = useSelector(
    (state) => state?.universityProviderDataReducer?.universityProviders
  );
  const providerDataResult = providerData?.models;
  //
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const { counId, univerTypeId, provideId } = useParams();
  useEffect(() => {
    get(`TableDefination/Index/${tableIdList?.University_List}`).then((res) => {
      console.log("table data", res);
      setTableData(res);
    });
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    uniCountryValue,
    uniTypeValue,
    unistateValue,
    orderValue,
    providerValue,
    success,
  ]);

  const handleUpdateStatus = (data) => {
    put(`University/UpdateStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
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
            {permissions?.includes(permissionList?.Change_University_Status) ? (
              <>
                {tableData[10]?.isActive ? (
                  <td style={{ marginBottom: "-10px" }}>
                    <ToggleSwitch
                      className="university-Toggle"
                      defaultChecked={uniData?.isActive}
                      onChange={() => handleUpdateStatus(uniData)}
                    />
                  </td>
                ) : null}
              </>
            ) : null}
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
