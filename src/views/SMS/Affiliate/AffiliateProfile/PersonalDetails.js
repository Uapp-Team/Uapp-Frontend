import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFormate } from "../../../../components/date/calenderFormate";
import { userTypes } from "../../../../constants/userTypeConstant";

const PersonalDetails = ({
  affiliateProfileData,
  affiliateId,
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
            {" "}
            {affiliateId === referenceId ||
            userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ? (
              <Link to={`/affiliatePersonalInfo/${affiliateId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td cwidth="60%">Date Of Birth</td>
            <td width="40%">
              {dateFormate(affiliateProfileData?.data?.dateOfBirth)}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport ID</td>
            <td>{affiliateProfileData?.data?.passportId}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Phone Number</td>
            <td>{affiliateProfileData?.data?.phoneNumber}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Gender</td>
            <td>{affiliateProfileData?.data?.genderName}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Marital Status</td>
            <td>{affiliateProfileData?.data?.maritalStatusName}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalDetails;
