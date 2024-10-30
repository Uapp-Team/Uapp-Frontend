import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { Card, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { userTypes } from "../../../../constants/userTypeConstant";

const EmergencyContact = ({
  affiliateProfileData,
  affiliateId,
  referenceId,
}) => {
  const [consultantEmergency, setConsultantEmergency] = useState({});
  const userType = localStorage.getItem("userType");

  return (
    <>
      <Table>
        <thead style={{ borderBottom: "1px solid #dee2e6" }}>
          <td className="border-0 p-2 d-flex justify-content-between">
            <h5>Emergency Contact</h5>
            {affiliateId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/affiliateEmergencyInfo/${affiliateId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>

      <Card className="p-2">
        {affiliateProfileData?.data?.contact ? (
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
                  {affiliateProfileData?.data?.contact.personName}
                </td>
                <td className="border-0">
                  {affiliateProfileData?.data?.contact?.relationship}
                </td>
                <td className="border-0">
                  <li className="emergency-list">
                    <span>
                      {affiliateProfileData?.data?.contact?.addressLine}
                    </span>
                  </li>
                  <li className="emergency-list">
                    <span>{affiliateProfileData?.data?.contact?.city}</span>
                  </li>
                  <li className="emergency-list">
                    <span>{affiliateProfileData?.data?.contact?.state}</span>
                  </li>
                </td>
                <td className="border-0">
                  {affiliateProfileData?.data?.contact?.phoneNumber}
                </td>
                <td className="border-0">
                  {affiliateProfileData?.data?.contact?.emailAddress}
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
