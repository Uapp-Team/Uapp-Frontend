import React from "react";
import { Table } from "reactstrap";

const GeneralInformation = ({ data }) => {
  return (
    <Table>
      <thead className="tablehead">
        <td className="border-0">
          <span className="td-text">General Information</span>
        </td>
        <td className="border-0"></td>
      </thead>
      <tbody>
        <tr>
          <td width="40%">Name</td>
          <td width="60%">
            {data?.nameTitle?.name} {data?.firstName} {data?.lastName}
          </td>
        </tr>
        <tr>
          <td width="40%">Provider</td>
          <td width="60%">{data?.provider?.providerName}</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #dee2e6" }}>
          <td width="40%">Email</td>
          <td width="60%">{data?.email}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default GeneralInformation;
