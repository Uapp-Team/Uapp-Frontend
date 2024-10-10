import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const OtherInformationCard = ({
  sId,
  otherInformation,
  setOtherInformation,
  activity,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`OtherInformation/GetByStudentId/${sId}`).then((res) => {
      setOtherInformation(res);
    });
  }, [sId, setOtherInformation]);
  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Other Information</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) && activity ? (
              <Link to={`/addOtherinformation/${sId}/${1}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <>
        <div className="pl-10px mb-3">
          <span>
            <b>Disability Description</b>
          </span>
          <br />
          <span className="text-gray-70">
            {otherInformation?.isHaveDisability
              ? otherInformation?.disabilityDescription
              : "No Disability"}
          </span>
        </div>

        <div className="pl-10px mb-3">
          <span>
            <b>Criminal convictions Description</b>
          </span>
          <br />
          <span className="text-gray-70">
            {otherInformation?.isHaveCriminalConvictions
              ? otherInformation?.criminalConvictionsDescription
              : "No Criminal conviction"}
          </span>
        </div>
      </>
    </>
  );
};

export default OtherInformationCard;
