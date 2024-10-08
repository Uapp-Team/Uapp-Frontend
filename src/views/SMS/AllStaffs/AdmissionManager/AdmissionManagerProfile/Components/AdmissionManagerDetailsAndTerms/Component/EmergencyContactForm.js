import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";

import { Link } from "react-router-dom";

const EmergencyContactForm = ({ emergencyInfo }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0 p-2">
            <h5>Emergency Contact</h5>
          </td>
          <td className="border-0 text-right">
            {/* {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentEmergencyInformation/${sId}/${1}`}>
                Edit
              </Link>
            ) : null} */}
          </td>
        </thead>
      </Table>

      <Card className="p-2">
        {emergencyInfo ? (
          <Table className="text-gray-70">
            <thead className="tablehead">
              <td
                className="border-0"
                style={{ borderLeft: "1px solid #dee2e6" }}
              >
                <b>Name</b>
              </td>
              <td
                className="border-0"
                style={{ borderLeft: "1px solid #dee2e6" }}
              >
                <b>Relation</b>
              </td>
              <td
                className="border-0"
                style={{ borderLeft: "1px solid #dee2e6" }}
              >
                <b>Address</b>
              </td>
              <td
                className="border-0"
                style={{ borderLeft: "1px solid #dee2e6" }}
              >
                <b>Phone</b>
              </td>
              <td
                className="border-0"
                style={{ borderLeft: "1px solid #dee2e6" }}
              >
                <b>Email</b>
              </td>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                <td className="border-0">{emergencyInfo?.personName}</td>
                <td className="border-0">{emergencyInfo?.relationship}</td>
                <td className="border-0">
                  <li className="emergency-list">
                    <span>{emergencyInfo?.addressLine}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{emergencyInfo?.city}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{emergencyInfo?.state}</span>
                  </li>
                </td>
                <td className="border-0">{emergencyInfo?.phoneNumber}</td>
                <td className="border-0">{emergencyInfo?.emailAddress}</td>
              </tr>
            </tbody>
          </Table>
        ) : null}
      </Card>
    </>
  );
};

export default EmergencyContactForm;
