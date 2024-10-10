import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../helpers/get";
import { rootUrl } from "../../../../constants/constants";
import { dateFormate } from "../../../../components/date/calenderFormate";
import { userTypes } from "../../../../constants/userTypeConstant";

const Rightwork = ({ affiliateId, affiliateProfileData, referenceId }) => {
  const userType = localStorage.getItem("userType");
  const handleDate = (e) => {
    let format =
      new Date(e).getDate() +
      "-" +
      (new Date(e).getMonth() + 1) +
      "-" +
      new Date(e).getFullYear();

    return format;
  };

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Right to work Information</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            {affiliateId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/affiliateEligibilityInfo/${affiliateId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Country of Nationality</td>
            <td width="40%">
              {affiliateProfileData?.data?.rightToWork?.nationality}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Residence</td>
            <td>{affiliateProfileData?.data?.rightToWork?.residence}</td>
          </tr>

          {affiliateProfileData?.data?.rightToWork?.nationality !==
            affiliateProfileData?.data?.rightToWork?.residence && (
            <>
              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                <td>Residency Status</td>
                <td>
                  {affiliateProfileData?.data?.rightToWork?.residencyStatus}
                </td>
              </tr>

              {affiliateProfileData?.data?.rightToWork?.residencyStatus !==
                "Permanent Resident" && (
                <>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Visa Type</td>
                    <td>{affiliateProfileData?.data?.rightToWork?.visaType}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Expiry Date of Your BRP/TRP or Visa</td>
                    <td>
                      {dateFormate(
                        affiliateProfileData?.data?.rightToWork
                          ?.expiryDateOfVisa
                      )}
                    </td>
                  </tr>
                </>
              )}
            </>
          )}

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Id/Passport</td>
            <td>
              <a
                href={
                  rootUrl +
                  affiliateProfileData?.data?.rightToWork?.idPassport?.fileUrl
                }
                target="blank"
              >
                {affiliateProfileData?.data?.rightToWork?.idPassport?.fileName}
              </a>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Proof of Address</td>
            <td>
              <a
                href={
                  rootUrl +
                  affiliateProfileData?.data?.rightToWork?.proofOfAddress
                    ?.fileUrl
                }
                target="blank"
              >
                {
                  affiliateProfileData?.data?.rightToWork?.proofOfAddress
                    ?.fileName
                }
              </a>
            </td>
          </tr>
          {affiliateProfileData?.data?.rightToWork?.nationality !==
            affiliateProfileData?.data?.data?.rightToWork?.residence && (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>BRP / TRP / Settled / Pre-Settled / Share Code</td>
              <td>
                <a
                  href={
                    rootUrl +
                    affiliateProfileData?.data?.rightToWork?.brpTrp?.fileUrl
                  }
                  target="blank"
                >
                  {affiliateProfileData?.data?.rightToWork?.brpTrp?.fileName}
                </a>
              </td>
            </tr>
          )}

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>CV File</td>
            <td>
              <a
                href={
                  rootUrl + affiliateProfileData?.data?.rightToWork?.cv?.fileUrl
                }
                target="blank"
              >
                {affiliateProfileData?.data?.rightToWork?.cv?.fileName}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Rightwork;
