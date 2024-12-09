import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import get from "../../../../../helpers/get";

const PersonalInformationCard = ({
  sId,
  studentDetails,
  setStudentDetails,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Student/Get/${sId}`).then((res) => {
      setStudentDetails(res);
      console.log(res, "personal details");
    });
  }, [sId, setStudentDetails]);

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
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Name</td>
            <td width="40%">
              {studentDetails?.firstName} {studentDetails?.lastName}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Date of Birth</td>

            <td>
              {studentDetails?.dateOfBirth
                ? dateFormate(studentDetails?.dateOfBirth)
                : ""}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Nationality</td>
            <td>{studentDetails?.nationality?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Residence</td>
            <td>{studentDetails?.country?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Country of Birth</td>
            <td>{studentDetails?.countryOfBirth?.name}</td>
          </tr>

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport Number</td>
            <td>{studentDetails?.passportNumber}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Phone Number</td>
            <td>+{studentDetails?.phoneNumber}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Email</td>
            <td>{studentDetails?.email}</td>
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
