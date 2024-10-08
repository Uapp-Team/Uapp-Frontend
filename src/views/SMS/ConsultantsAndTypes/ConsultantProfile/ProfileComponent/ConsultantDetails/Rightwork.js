import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { rootUrl } from "../../../../../../constants/constants";

const Rightwork = ({ id }) => {
  console.log(id);
  const [data, setData] = useState({});
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
      <Table className="border">
        <thead className="tablehead">
          <td className="border-0">
            <b>Right to work Information</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            <Link to={`/consultantEligibilityInformation/${id}`}> Edit</Link>
          </td>
        </thead>
        <tbody>
          <tr>
            <td>Country of Nationality</td>
            <td>{data?.countryOfCitizenShip?.name}</td>
          </tr>
          <tr>
            <td>Country of Residence</td>
            <td>{data?.countryOfResidence?.name}</td>
          </tr>
          <tr>
            <td>Residency Status</td>
            <td>{data?.residencyStatus?.name}</td>
          </tr>
          <tr>
            <td>Visa Type</td>
            <td>{data?.visaType}</td>
          </tr>
          <tr>
            <td>Expiry Date of Your BRP/TRP or Visa</td>
            <td>{handleDate(data?.expireDate)}</td>
          </tr>
          <tr>
            <td>Id/Passport</td>
            <td>
              <a href={rootUrl + data?.idOrPassport?.fileUrl} target="blank">
                {data?.idOrPassport?.fileName}
              </a>
            </td>
          </tr>
          <tr>
            <td>Proof of Address</td>
            <td>
              <a href={rootUrl + data?.proofOfAddress?.fileUrl} target="blank">
                {data?.proofOfAddress?.fileName}
              </a>
            </td>
          </tr>
          <tr>
            <td>BRP/TRP</td>
            <td>
              <a href={rootUrl + data?.brp?.fileUrl} target="blank">
                {data?.brp?.fileName}
              </a>
            </td>
          </tr>
          <tr>
            <td>CV File</td>
            <td>
              <a href={rootUrl + data?.cv?.fileUrl} target="blank">
                {data?.cv?.fileName}
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Rightwork;
