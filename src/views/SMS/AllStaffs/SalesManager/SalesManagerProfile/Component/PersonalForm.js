import React from "react";
import { Card, CardBody, Table } from "reactstrap";
import { dateFormate } from "../../../../../../components/date/calenderFormate";

const PersonalForm = ({ personalInfo }) => {
  return (
    <Card className="p-4">
      <span
        className="app-style-const p-2"
        style={{ backgroundColor: "#DFEEEE" }}
      >
        Personal Information
      </span>

      <Table borderless responsive className="mb-4">
        <tbody>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Date of Birth</td>

            <td width="60%">{dateFormate(personalInfo?.dateOfBirth)}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Passport/ID</td>

            <td width="60%">{personalInfo?.passportId}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Gender</td>

            <td width="60%">{personalInfo?.gender?.name}</td>
          </tr>

          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Marital Status</td>

            <td width="60%">{personalInfo?.maritalStatus?.name}</td>
          </tr>
          <tr
            style={{
              borderBottom: "1px solid #2525251F",
            }}
          >
            <td width="40%">Phone Number</td>

            <td width="60%">
              {personalInfo?.phoneNumber &&
              personalInfo?.phoneNumber.includes("+")
                ? personalInfo?.phoneNumber
                : personalInfo?.phoneNumber &&
                  !personalInfo?.phoneNumber.includes("+")
                ? "+" + personalInfo?.phoneNumber
                : null}
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  );
};

export default PersonalForm;
