import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ApplicationInformation = ({ sId }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

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
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentApplicationInformation/${sId}/1`}>
                {" "}
                Edit
              </Link>
            ) : null}
          </td>
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
