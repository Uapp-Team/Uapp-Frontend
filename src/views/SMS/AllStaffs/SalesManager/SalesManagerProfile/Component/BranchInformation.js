import React from "react";
import { Card, Table } from "reactstrap";

const BranchInformation = ({ generalInfo }) => {
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        Branch Information
      </span>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch</td>

            <td width="60%">{generalInfo?.branch?.name}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch Email</td>

            <td width="60%">{generalInfo?.branch?.email}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch Admin</td>

            <td width="60%">
              {generalInfo?.branchAdmin?.firstName}{" "}
              {generalInfo?.branchAdmin?.lastName}
            </td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch Admin Email</td>

            <td width="60%">{generalInfo?.branchAdmin?.email}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch Manager</td>

            <td width="60%">
              {generalInfo?.branchManager?.firstName}{" "}
              {generalInfo?.branchManager?.lastName}
            </td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Branch Manager Email</td>

            <td width="60%">{generalInfo?.branchManager?.email}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default BranchInformation;
