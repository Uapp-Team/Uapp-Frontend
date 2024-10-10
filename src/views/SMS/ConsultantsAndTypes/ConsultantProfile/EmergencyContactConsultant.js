import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const EmergencyContactConsultant = ({ id }) => {
  const [consultantEmergency, setConsultantEmergency] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`ConsultantEmergency/GetByConsultant/${id}`).then((res) => {
      setConsultantEmergency(res);
    });
  }, [id, setConsultantEmergency]);

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0 p-2 d-flex justify-content-between">
            <h5>Emergency Contact</h5>
            {permissions?.includes(permissionList.Edit_Consultant) ? (
              <Link to={`/consultantEmergencyInformation/${id}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Card className="p-2">
        {consultantEmergency ? (
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
                <td className="border-0">{consultantEmergency?.personName}</td>
                <td className="border-0">
                  {consultantEmergency?.relationship}
                </td>
                <td className="border-0">
                  <li className="emergency-list">
                    <span>{consultantEmergency?.addressLine}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{consultantEmergency?.city}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{consultantEmergency?.state}</span>
                  </li>
                </td>
                <td className="border-0">{consultantEmergency?.phoneNumber}</td>
                <td className="border-0">
                  {consultantEmergency?.emailAddress}
                </td>
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

export default EmergencyContactConsultant;
