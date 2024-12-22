import React from "react";
import { Link } from "react-router-dom";
import { Card, Table } from "reactstrap";
import { userTypes } from "../../../../constants/userTypeConstant";

const EmergencyContact = ({
  companionProfileData,
  companionId,
  referenceId,
}) => {
  const userType = localStorage.getItem("userType");
  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0 p-2 d-flex justify-content-between">
            <h5>Emergency Contact</h5>
            {companionId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/companionEmergencyInfo/${companionId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Card className="p-2">
        {companionProfileData?.data?.contact ? (
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
                <td className="border-0">
                  {companionProfileData?.data?.contact.personName}
                </td>
                <td className="border-0">
                  {companionProfileData?.data?.contact?.relationship}
                </td>
                <td className="border-0">
                  <li className="emergency-list">
                    <span>
                      {companionProfileData?.data?.contact?.addressLine}
                    </span>
                  </li>
                  <li className="emergency-list">
                    <span>{companionProfileData?.data?.contact?.city}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{companionProfileData?.data?.contact?.state}</span>
                  </li>
                </td>
                <td className="border-0">
                  {companionProfileData?.data?.phoneNumber &&
                  companionProfileData?.data?.phoneNumber.includes("+")
                    ? companionProfileData?.data?.phoneNumber
                    : companionProfileData?.data?.phoneNumber &&
                      !companionProfileData?.data?.phoneNumber.includes("+")
                    ? "+" + companionProfileData?.data?.phoneNumber
                    : null}
                </td>
                <td className="border-0">
                  {companionProfileData?.data?.contact?.email}
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

export default EmergencyContact;
