import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const FundingInformation = ({ sId }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`StudentFunding/Overview/${sId}`).then((res) => {
      setData(res);
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
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td className="border-0">Fund</td>
            <td className="border-0">
              {data?.fundingType ? data?.fundingType : "-"}
            </td>
          </tr>
          {data?.details ? (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td className="border-0">Details</td>
              <td className="border-0">{data?.details}</td>
            </tr>
          ) : null}
          {data?.fileUrl ? (
            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
              <td className="border-0">Attachment</td>
              <td className="border-0">
                {" "}
                {data?.studentDocumentFile === null ? (
                  "-"
                ) : (
                  <a href={rootUrl + data?.fileUrl} target="blank">
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
