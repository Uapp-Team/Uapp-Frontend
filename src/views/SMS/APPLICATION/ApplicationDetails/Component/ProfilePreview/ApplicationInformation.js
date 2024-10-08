import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const ApplicationInformation = ({ sId }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    get(`ApplicationInfo/Overview/${sId}`).then((res) => {
      setData(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Application Information</b>
          </td>
          <td className="border-0"></td>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td className="border-0">Student's preferred study destination</td>
            <td className="border-0">{data?.result?.preferredCountry}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td className="border-0">Application Type</td>
            <td className="border-0">{data?.result?.applicationInfo}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ApplicationInformation;
