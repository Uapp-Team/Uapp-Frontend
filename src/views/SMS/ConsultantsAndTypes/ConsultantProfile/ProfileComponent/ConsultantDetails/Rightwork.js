import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { rootUrl } from "../../../../../../constants/constants";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const Rightwork = ({ id }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`ConsultantEligibility/GetConsultantEligibility/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

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
            {permissions?.includes(permissionList.Edit_Consultant) ? (
              <Link to={`/consultantEligibilityInformation/${id}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Country of Nationality</td>
            <td width="40%">{data?.countryOfCitizenShip?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Residence</td>
            <td>{data?.countryOfResidence?.name}</td>
          </tr>

          {data?.countryOfCitizenShip?.name !==
            data?.countryOfResidence?.name && (
            <>
              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                <td>Residency Status</td>
                <td>{data?.residencyStatus?.name}</td>
              </tr>

              {data?.residencyStatus?.name !== "Permanent Resident" && (
                <>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Visa Type</td>
                    <td>{data?.visaType}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>Expiry Date of Your BRP/TRP or Visa</td>
                    <td>{dateFormate(data?.expireDate)}</td>
                  </tr>
                </>
              )}
            </>
          )}

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Id/Passport</td>
            <td>
              <a
                className="mr-2"
                href={rootUrl + data?.idOrPassport?.fileUrl}
                target="blank"
              >
                {data?.idOrPassport?.fileName}
              </a>{" "}
              {data?.isIdOrPasswordApproved === true ? (
                <i className="fas fa-check text-success"></i>
              ) : (
                <i className="fas fa-times text-danger"></i>
              )}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Proof of Address</td>
            <td>
              <a
                className="mr-2"
                href={rootUrl + data?.proofOfAddress?.fileUrl}
                target="blank"
              >
                {data?.proofOfAddress?.fileName}
              </a>{" "}
              {data?.isProofOfAddressApproved === true ? (
                <i className="fas fa-check text-success"></i>
              ) : (
                <i className="fas fa-times text-danger"></i>
              )}
            </td>
          </tr>
          {data?.countryOfCitizenShip?.name !==
            data?.countryOfResidence?.name && (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td>BRP / TRP / Settled / Pre-Settled / Share Code</td>
              <td>
                <a
                  className="mr-2"
                  href={rootUrl + data?.brp?.fileUrl}
                  target="blank"
                >
                  {data?.brp?.fileName}
                </a>
                {data?.isBRPApproved === true ? (
                  <i className="fas fa-check text-success"></i>
                ) : (
                  <i className="fas fa-times text-danger"></i>
                )}
              </td>
            </tr>
          )}

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>CV File</td>
            <td>
              <a
                className="mr-2"
                href={rootUrl + data?.cv?.fileUrl}
                target="blank"
              >
                {data?.cv?.fileName}
              </a>
              {data?.isCvApproved === true ? (
                <i className="fas fa-check text-success"></i>
              ) : (
                <i className="fas fa-times text-danger"></i>
              )}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>BAC File</td>
            <td>
              <a
                className="mr-2"
                href={rootUrl + data?.bacCertificate?.fileUrl}
                target="blank"
              >
                {data?.bacCertificate?.fileName}
              </a>
              {data?.isBacCertificateApproved === true ? (
                <i className="fas fa-check text-success"></i>
              ) : (
                <i className="fas fa-times text-danger"></i>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Rightwork;
