import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import get from "../../../../../../helpers/get";

const PersonalInformationCard = ({
  sId,
  setName,
  studentDetails,
  setStudentDetails,
}) => {
  useEffect(() => {
    get(`Student/Get/${sId}`).then((res) => {
      setStudentDetails(res);

      setName(
        res?.nameTittle?.name + " " + res?.firstName + " " + res?.lastName
      );
    });
  }, [sId, setName, setStudentDetails]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Personal Information</b>
          </td>
          <td className="border-0 text-right"> </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Name</td>
            <td width="40%">
              {studentDetails?.nameTittle?.name} {studentDetails?.firstName}{" "}
              {studentDetails?.lastName}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Mobile Number</td>
            <td>
              {studentDetails?.phoneNumber &&
              studentDetails?.phoneNumber.includes("+")
                ? studentDetails?.phoneNumber
                : studentDetails?.phoneNumber &&
                  !studentDetails?.phoneNumber.includes("+")
                ? "+" + studentDetails?.phoneNumber
                : null}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Email Address</td>
            <td>{studentDetails?.email}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Date of Birth</td>

            <td>{dateFormate(studentDetails?.dateOfBirth)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Nationality</td>
            <td>{studentDetails?.nationality?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Birth</td>
            <td>{studentDetails?.countryOfBirth?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Residence</td>
            <td>{studentDetails?.country?.name}</td>
          </tr>

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport Number</td>
            <td>{studentDetails?.passportNumber}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Issue Date</td>
            <td>{dateFormate(studentDetails?.issueDate)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Expiry Date</td>
            <td>{dateFormate(studentDetails?.expireDate)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Gender</td>
            <td>{studentDetails?.gender?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Marital Status</td>
            <td>{studentDetails?.maritalStatus?.name}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalInformationCard;
