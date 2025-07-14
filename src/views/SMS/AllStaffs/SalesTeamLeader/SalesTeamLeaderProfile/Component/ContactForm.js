import React from "react";
import { Card, Table } from "reactstrap";

const ContactForm = ({ contactInfo }) => {
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        Contact Information
      </span>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Address Line 1</td>

            <td width="60%">{contactInfo?.houseNo}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Address Line 2</td>

            <td width="60%">{contactInfo?.addressLine}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Country</td>

            <td width="60%">{contactInfo?.country?.name}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">City</td>

            <td width="60%">{contactInfo?.city}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">State/County</td>

            <td width="60%">{contactInfo?.state}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Zip/Post Code</td>

            <td width="60%">{contactInfo?.zipCode}</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default ContactForm;
