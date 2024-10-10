import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const FundingInformation = ({ sId, fundingData, setFundingData }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`StudentFunding/Overview/${sId}`).then((res) => {
      setFundingData(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Funding Information</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/sourceofFund/${sId}/1`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Fund</td>
            <td width="40%">
              {fundingData?.fundingType ? fundingData?.fundingType : "-"}
            </td>
          </tr>
          {fundingData?.details ? (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Details</td>
              <td>{fundingData?.details}</td>
            </tr>
          ) : null}
          {fundingData?.fileUrl ? (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Attachment</td>
              <td>
                {" "}
                {fundingData?.studentDocumentFile === null ? (
                  "-"
                ) : (
                  <a href={rootUrl + fundingData?.fileUrl} target="blank">
                    attachment
                  </a>
                )}
              </td>
            </tr>
          ) : null}
        </tbody>
      </Table>
    </>
  );
};

export default FundingInformation;
