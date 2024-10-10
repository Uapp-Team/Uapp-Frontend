import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../helpers/get";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { dateFormate } from "../../../../components/date/calenderFormate";

const ConsultantPersonalDetails = ({ id }) => {
  const [ConsultantDetails, setConsultantDetails] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Consultant/GetPersonalInformation/${id}`).then((res) => {
      setConsultantDetails(res);
      console.log(res, "Consultant personal details");
    });
  }, [id, setConsultantDetails]);

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
    <div>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Personal Information</b>
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4 mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Date of Birth</td>

            <td>{dateFormate(ConsultantDetails?.dateOfBirth)}</td>
          </tr>

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport Number</td>
            <td>{ConsultantDetails?.passportId}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Phone Number</td>
            <td>{ConsultantDetails?.phoneNumber}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Gender</td>
            <td>{ConsultantDetails?.gender?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Marital Status</td>
            <td>{ConsultantDetails?.maritalStatus?.name}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ConsultantPersonalDetails;
