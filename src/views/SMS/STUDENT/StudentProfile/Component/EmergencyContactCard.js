import React, { useEffect, useState } from "react";
import { Card, Table } from "reactstrap";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";

const EmergencyContactCard = ({ sId }) => {
  const [emergencyList, setEmergencyList] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`StudentEmergency/GetByStudentId/${sId}`).then((res) => {
      setEmergencyList(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0 p-2">
            <h5>Emergency Contact</h5>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentEmergencyInformation/${sId}/${1}`}>
                Edit
              </Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Card className="p-2">
        {emergencyList ? (
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
                <td className="border-0">{emergencyList?.personName}</td>
                <td className="border-0">{emergencyList?.relationship}</td>
                <td className="border-0">
                  <li className="emergency-list">
                    <span>{emergencyList?.addressLine}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{emergencyList?.city}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{emergencyList?.state}</span>
                  </li>
                </td>
                <td className="border-0">{emergencyList?.phoneNumber}</td>
                <td className="border-0">{emergencyList?.emailAddress}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <span className="pl-10px">No Emergency Contact added.</span>
        )}
      </Card>
    </>
  );
};

export default EmergencyContactCard;
