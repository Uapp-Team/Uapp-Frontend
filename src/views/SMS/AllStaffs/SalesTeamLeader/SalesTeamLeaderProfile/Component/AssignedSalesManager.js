import React from "react";
import { Card, Table } from "reactstrap";

const AssignedSalesManager = ({ assignedSalesManager }) => {
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        Assigned Sales Manager
      </span>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Name</td>

            <td width="60%">
              {assignedSalesManager?.fullName
                ? assignedSalesManager?.fullName
                : "There is no assigned sales manager"}
            </td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Email</td>

            <td width="60%">
              {assignedSalesManager?.email
                ? assignedSalesManager?.email
                : "There is no assigned sales manager"}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default AssignedSalesManager;
