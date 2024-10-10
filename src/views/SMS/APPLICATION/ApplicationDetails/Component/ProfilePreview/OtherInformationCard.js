import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const OtherInformationCard = ({ sId, othersDetails, setOthersDetails }) => {
  useEffect(() => {
    get(`OtherInformation/GetByStudentId/${sId}`).then((res) => {
      setOthersDetails(res);
    });
  }, [sId]);
  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Other Information</b>
          </td>
          <td className="border-0 text-right"></td>
        </thead>
      </Table>

      <>
        <div className="pl-10px mb-3">
          <span>
            <b>Disability Description</b>
          </span>
          <br />
          <span className="text-gray-70">
            {othersDetails?.isHaveDisability
              ? othersDetails?.disabilityDescription
              : "No Disability"}
          </span>
        </div>

        <div className="pl-10px mb-3">
          <span>
            <b>Criminal convictions Description</b>
          </span>
          <br />
          <span className="text-gray-70">
            {othersDetails?.isHaveCriminalConvictions
              ? othersDetails?.criminalConvictionsDescription
              : "No Criminal conviction"}
          </span>
        </div>
      </>
    </>
  );
};

export default OtherInformationCard;
