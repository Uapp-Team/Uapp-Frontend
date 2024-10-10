import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../helpers/get";
import { dateFormate } from "../../../../components/date/calenderFormate";

const ConsultantEligibilityDetails = ({ id }) => {
  const [consultantEligibility, setConsultantEligibility] = useState({});

  useEffect(() => {
    get(`ConsultantEligibility/GetConsultantEligibility/${id}`).then((res) => {
      setConsultantEligibility(res);
      console.log(res, "eligibility");
    });
  }, [id, setConsultantEligibility]);

  return (
    <div>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Eligibility Information</b>
          </td>
        </thead>
      </Table>
      {consultantEligibility ? (
        <Table borderless responsive className="mb-4 mb-4">
          <tbody>
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>country Of Nationality</td>

              <td>{consultantEligibility?.countryOfCitizenShip?.name}</td>
            </tr>

            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Country of Residence</td>
              <td>{consultantEligibility?.countryOfResidence?.name}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Residency Status</td>
              <td>{consultantEligibility?.residencyStatus?.name}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Visa Type</td>
              <td>{consultantEligibility?.visaType}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Expiry Date of Your BRP/TRP or Visa</td>
              <td>{dateFormate(consultantEligibility?.expireDate)}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>Have Right to Work</td>
              <td>
                {consultantEligibility?.haveRightToWork === true ? "Yes" : "No"}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <span className="pl-10px">No Eligibility Information added.</span>
      )}
    </div>
  );
};

export default ConsultantEligibilityDetails;
