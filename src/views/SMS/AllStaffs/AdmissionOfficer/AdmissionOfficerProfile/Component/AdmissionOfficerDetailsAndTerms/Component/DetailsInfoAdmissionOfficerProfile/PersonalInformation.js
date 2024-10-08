import React from "react";
import { Table } from "reactstrap";

const PersonalInformation = ({ data }) => {
  return (
    <Table>
      <thead className="tablehead">
        <td className="border-0">
          <span className="td-text">Personal Information</span>
        </td>
        <td className="border-0"></td>
      </thead>
      <tbody>
        <tr>
          <td width="40%">Date of Birth</td>

          <td width="60%">{data?.dateOfBirth}</td>
        </tr>
        <tr>
          <td width="40%">Passport/Id</td>
          <td width="60%">{data?.passportId}</td>
        </tr>
        <tr>
          <td width="40%">Gender</td>
          <td width="60%">{data?.gender?.name}</td>
        </tr>
        <tr>
          <td width="40%">Marital Status</td>
          <td width="60%">{data?.maritalStatus?.name}</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
          <td width="40%">Phone Number</td>
          <td width="60%">{data?.phoneNumber}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default PersonalInformation;
