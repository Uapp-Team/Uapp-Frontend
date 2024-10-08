import React from "react";
import { Table } from "reactstrap";
import { dateFormate } from "../../../../../../../../../components/date/calenderFormate";
import { rootUrl } from "../../../../../../../../../constants/constants";

const Eligibility = ({ data }) => {
  return (
    <Table>
      <thead className="tablehead">
        <td className="border-0">
          <span className="td-text">Eligibility</span>
        </td>
        <td className="border-0"></td>
      </thead>
      <tbody style={{ borderBottom: "1px solid #dee2e6" }}>
        <tr>
          <td width="40%">Country of Citizenship</td>
          <td width="60%">{data?.countryOfCitizenShip?.name}</td>
        </tr>
        <tr>
          <td width="40%">Residence</td>
          <td width="60%">{data?.countryOfResidence?.name}</td>
        </tr>
        {data?.countryOfCitizenShip?.id ===
        data?.countryOfResidence?.id ? null : (
          <tr>
            <td width="40%">Residence Status</td>
            <td width="60%">{data?.residencyStatus?.name}</td>
          </tr>
        )}

        {data?.countryOfCitizenShip?.id !== data?.countryOfResidence?.id &&
        data?.residencyStatus?.id === 2 ? (
          <>
            <tr>
              <td width="40%">Visa Type</td>
              <td width="60%">{data?.visaType}</td>
            </tr>
            <tr>
              <td width="40%">Expiry Date of Your BRP/TRP or Visa</td>
              <td width="60%">{dateFormate(data?.expireDate)}</td>
            </tr>
            <tr>
              <td width="40%">Do You Have Right to Work?</td>
              <td width="60%">
                {data?.haveRightToWork !== false ? "Yes" : "No"}
              </td>
            </tr>
          </>
        ) : null}

        {data?.idOrPassport ? (
          <tr>
            <td width="40%">Id or Passport</td>
            <td width="60%">
              <a
                href={rootUrl + data?.idOrPassport?.fileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data?.idOrPassport?.fileName}
              </a>
            </td>
          </tr>
        ) : null}
        {data?.proofOfAddress ? (
          <tr>
            <td width="40%">Proof of Address</td>
            <td width="60%">
              <a
                href={rootUrl + data?.proofOfAddress?.fileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data?.proofOfAddress?.fileName}
              </a>
            </td>
          </tr>
        ) : null}
        {data?.brp ? (
          <tr>
            <td width="40%">BRP/TRP</td>
            <td width="60%">
              <a
                href={rootUrl + data?.brp?.fileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data?.brp?.fileName}
              </a>
            </td>
          </tr>
        ) : null}
        {data?.cv ? (
          <tr>
            <td width="40%">CV</td>
            <td width="60%">
              <a
                href={rootUrl + data?.cv?.fileUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {data?.cv?.fileName}
              </a>
            </td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  );
};

export default Eligibility;
