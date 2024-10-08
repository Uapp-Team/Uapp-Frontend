import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const PersonalInformationCard = ({ sId }) => {
  const [studentDetails, setStudentDetails] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`Student/Get/${sId}`).then((res) => {
      setStudentDetails(res);
    });
  }, [sId]);

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
          <td className="border-0 text-right">
            {" "}
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addStudentInformation/${sId}/${1}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
        <tbody>
          <tr>
            <td className="border-0">Name</td>
            <td className="border-0">
              {studentDetails?.firstName} {studentDetails?.lastName}
            </td>
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
