import React from "react";
import { Card, Table } from "reactstrap";

const GeneralForm = ({ generalInfo }) => {
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        General Information
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
              {generalInfo?.firstName} {generalInfo?.lastName}
            </td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Email</td>

            <td width="60%">{generalInfo?.email}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default GeneralForm;
