import React from "react";
import { Card, Table } from "reactstrap";
import { rootUrl } from "../../../../../../constants/constants";

const EligibilityForm = ({ eligibilityInfo }) => {
  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        Eligibility
      </span>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Country of Citizenship</td>
            <td width="60%">{eligibilityInfo?.countryOfCitizenShip?.name}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Residence</td>
            <td width="60%">{eligibilityInfo?.countryOfResidence?.name}</td>
          </tr>

          {eligibilityInfo?.countryOfCitizenShip?.id ==
          eligibilityInfo?.countryOfResidence?.id ? null : (
            <tr
              style={{
                borderBottom: "1px solid #2525251F",
              }}
            >
              <td width="40%">Residency Status</td>
              <td width="60%">{eligibilityInfo?.residencyStatus?.name}</td>
            </tr>
          )}

          {eligibilityInfo?.countryOfCitizenShip?.id !==
            eligibilityInfo?.countryOfResidence?.id &&
          eligibilityInfo?.residencyStatus?.id == 2 ? (
            <>
              <tr
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td width="40%">Visa Type</td>
                <td width="60%">{eligibilityInfo?.visaType}</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td width="40%">Expiry Date of Your BRP/TRP or Visa</td>
                <td width="60%">{handleDate(eligibilityInfo?.expireDate)}</td>
              </tr>
              <tr
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td>Do You Have Right to Work?</td>
                <td>
                  {eligibilityInfo?.haveRightToWork !== false ? "Yes" : "No"}
                </td>
              </tr>
            </>
          ) : null}

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            {eligibilityInfo?.idOrPassport !== null ? (
              <>
                <td width="40%">Id or Passport</td>

                <td width="60%" className="border-0">
                  {eligibilityInfo === null ? (
                    "-"
                  ) : (
                    <a
                      href={rootUrl + eligibilityInfo?.idOrPassport?.fileUrl}
                      target="blank"
                    >
                      {eligibilityInfo?.idOrPassport?.fileName}
                    </a>
                  )}
                </td>
              </>
            ) : null}
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            {eligibilityInfo?.proofOfAddress !== null ? (
              <>
                <td width="40%">Proof of Address</td>

                <td width="60%" className="border-0">
                  {eligibilityInfo === null ? (
                    "-"
                  ) : (
                    <a
                      href={rootUrl + eligibilityInfo?.proofOfAddress?.fileUrl}
                      target="blank"
                    >
                      {eligibilityInfo?.proofOfAddress?.fileName}
                    </a>
                  )}
                </td>
              </>
            ) : null}
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            {eligibilityInfo?.brp !== null ? (
              <>
                <td width="40%">BRP/TRP</td>

                <td width="60%" className="border-0">
                  {eligibilityInfo === null ? (
                    "-"
                  ) : (
                    <a
                      href={rootUrl + eligibilityInfo?.brp?.fileUrl}
                      target="blank"
                    >
                      {eligibilityInfo?.brp?.fileName}
                    </a>
                  )}
                </td>
              </>
            ) : null}
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            {eligibilityInfo?.cv !== null ? (
              <>
                <td width="40%">CV</td>

                <td width="60%" className="border-0">
                  {eligibilityInfo === null ? (
                    "-"
                  ) : (
                    <a
                      href={rootUrl + eligibilityInfo?.cv?.fileUrl}
                      target="blank"
                    >
                      {eligibilityInfo?.cv?.fileName}
                    </a>
                  )}
                </td>
              </>
            ) : null}
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default EligibilityForm;
