import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const PersonalInformationCard = ({ sId, setName }) => {
  const [studentDetails, setStudentDetails] = useState({});
  useEffect(() => {
    get(`Student/Get/${sId}`).then((res) => {
      setStudentDetails(res);
      setName(res?.firstName + " " + res?.lastName);
    });
  }, [sId, setName]);

  console.log(studentDetails);

  const handleDate = (e) => {
    let format =
      new Date(e).getDate() +
      "-" +
      (new Date(e).getMonth() + 1) +
      "-" +
      new Date(e).getFullYear();

    return format;
  };

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Personal Information</b>
          </td>
          <td className="border-0 text-right"> </td>
        </thead>
        <tbody>
          <tr>
            <td className="border-0">Name</td>
            <td className="border-0">
              {studentDetails?.firstName} {studentDetails?.lastName}
            </td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{studentDetails?.phoneNumber}</td>
          </tr>
          <tr>
            <td>Email Address</td>
            <td>{studentDetails?.email}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>

            <td>{handleDate(studentDetails?.dateOfBirth)}</td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td>{studentDetails?.nationality?.name}</td>
          </tr>
          <tr>
            <td>Country of Birth</td>
            <td>{studentDetails?.country?.name}</td>
          </tr>

          <tr>
            <td>Passport Number</td>
            <td>{studentDetails?.passportNumber}</td>
          </tr>
          <tr>
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
