import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const ApplicationInformation = ({
  sId,
  applicationData,
  setApplicationData,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ApplicationInfo/Overview/${sId}`).then((res) => {
      setApplicationData(res);
      console.log(res, "student application");
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
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Student's preferred study destination</td>
            <td width="40%">{applicationData?.preferredCountry}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Application Type</td>
            <td>{applicationData?.applicationInfo}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default ApplicationInformation;
