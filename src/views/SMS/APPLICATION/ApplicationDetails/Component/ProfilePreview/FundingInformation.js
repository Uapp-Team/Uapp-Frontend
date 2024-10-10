import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";
import { rootUrl } from "../../../../../../constants/constants";

const FundingInformation = ({ sId, fundingData, setFundingData }) => {
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
          <td className="border-0 text-right"></td>
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
