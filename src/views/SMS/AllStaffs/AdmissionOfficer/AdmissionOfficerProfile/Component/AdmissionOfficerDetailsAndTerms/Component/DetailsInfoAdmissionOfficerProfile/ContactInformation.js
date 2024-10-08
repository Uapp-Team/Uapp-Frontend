import React from "react";
import { Table } from "reactstrap";

const ContactInformation = ({ data }) => {
  return (
    <Table>
      <thead className="tablehead">
        <td className="border-0">
          <span className="td-text">Contact Information</span>
        </td>
        <td className="border-0"></td>
      </thead>
      <tbody>
        <tr>
          <td width="40%">Address Line 1</td>
          <td width="60%">{data?.houseNo}</td>
        </tr>
        <tr>
          <td width="40%">Address Line 2</td>
          <td width="60%">{data?.addressLine}</td>
        </tr>
        <tr>
          <td width="40%">Country</td>
          <td width="60%">{data?.country?.name}</td>
        </tr>
        <tr>
          <td width="40%">City</td>
          <td width="60%">{data?.city}</td>
        </tr>
        <tr>
          <td width="40%">State/County</td>
          <td width="60%">{data?.state}</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
          <td width="40%">Zip/Post Code</td>
          <td width="60%">{data?.zipCode}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ContactInformation;
