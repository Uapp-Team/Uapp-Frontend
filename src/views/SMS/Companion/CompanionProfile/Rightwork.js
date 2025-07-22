import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { dateFormate } from "../../../../components/date/calenderFormate";
import { rootUrl } from "../../../../constants/constants";
import { userTypes } from "../../../../constants/userTypeConstant";

const Rightwork = ({ companionId, companionProfileData, referenceId }) => {
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
            {companionId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/referrerEligibilityInfo/${companionId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Country of Nationality</td>
            <td width="40%">
              {companionProfileData?.data?.rightToWork?.nationality}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Residence</td>
            <td>{companionProfileData?.data?.rightToWork?.residence}</td>
          </tr>

          {companionProfileData?.data?.rightToWork?.nationality !==
            companionProfileData?.data?.rightToWork?.residence && (
            <>
              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                <td>Residency Status</td>
                <td>
                  {companionProfileData?.data?.rightToWork?.residencyStatus}
                </td>
              </tr>

              {companionProfileData?.data?.rightToWork?.residencyStatus !==
                "Permanent Resident" && (
                <>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Visa Type</td>
                    <td>{companionProfileData?.data?.rightToWork?.visaType}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Expiry Date of Your BRP/TRP or Visa</td>
                    <td>
                      {companionProfileData?.data?.rightToWork?.expiryDateOfVisa
                        ? dateFormate(
                            companionProfileData?.data?.rightToWork
                              ?.expiryDateOfVisa
                          )
                        : "N/A"}
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
                  companionProfileData?.data?.rightToWork?.idPassport?.fileUrl
                }
                target="blank"
              >
                {companionProfileData?.data?.rightToWork?.idPassport?.fileName}
              </a>
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Proof of Address</td>
            <td>
              <a
                href={
                  rootUrl +
                  companionProfileData?.data?.rightToWork?.proofOfAddress
                    ?.fileUrl
                }
                target="blank"
              >
                {
                  companionProfileData?.data?.rightToWork?.proofOfAddress
                    ?.fileName
                }
              </a>
            </td>
          </tr>
          {companionProfileData?.data?.rightToWork?.nationality !==
            companionProfileData?.data?.data?.rightToWork?.residence && (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>BRP / TRP / Settled / Pre-Settled / Share Code</td>
              <td>
                <a
                  href={
                    rootUrl +
                    companionProfileData?.data?.rightToWork?.brpTrp?.fileUrl
                  }
                  target="blank"
                >
                  {companionProfileData?.data?.rightToWork?.brpTrp?.fileName}
                </a>
              </td>
            </tr>
          )}

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>CV File</td>
            <td>
              <a
                href={
                  rootUrl + companionProfileData?.data?.rightToWork?.cv?.fileUrl
                }
                target="blank"
              >
                {companionProfileData?.data?.rightToWork?.cv?.fileName}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Rightwork;
