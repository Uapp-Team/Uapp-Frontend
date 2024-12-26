import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { dateFormate } from "../../../../components/date/calenderFormate";
import { userTypes } from "../../../../constants/userTypeConstant";

const PersonalDetails = ({
  companionProfileData,
  companionId,
  referenceId,
}) => {
  const userType = localStorage.getItem("userType");
  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Personal Information</b>
          </td>
          <td className="border-0 text-right">
            {companionId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/companionPersonalInfo/${companionId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td cwidth="60%">Date Of Birth</td>
            <td width="40%">
              {companionProfileData?.data?.dateOfBirth
                ? dateFormate(companionProfileData?.data?.dateOfBirth)
                : ""}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport ID</td>
            <td>{companionProfileData?.data?.passportId}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Phone Number</td>
            <td>
              {companionProfileData?.data?.phoneNumber &&
              companionProfileData?.data?.phoneNumber.includes("+")
                ? companionProfileData?.data?.phoneNumber
                : companionProfileData?.data?.phoneNumber &&
                  !companionProfileData?.data?.phoneNumber.includes("+")
                ? "+" + companionProfileData?.data?.phoneNumber
                : null}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Gender</td>
            <td>{companionProfileData?.data?.genderName}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Marital Status</td>
            <td>{companionProfileData?.data?.maritalStatusName}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalDetails;
