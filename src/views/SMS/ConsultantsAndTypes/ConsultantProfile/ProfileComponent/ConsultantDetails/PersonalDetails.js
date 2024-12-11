import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { dateFormate } from "../../../../../../components/date/calenderFormate";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const PersonalDetails = ({ id }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`Consultant/GetPersonalInformation/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Personal Information</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList.Edit_Consultant) ? (
              <Link to={`/consultantPersonalInformation/${id}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td cwidth="60%">Date Of Birth</td>
            <td width="40%">{dateFormate(data?.dateOfBirth)}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Passport ID</td>
            <td>{data?.passportId}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Phone Number</td>
            <td>
              {data?.phoneNumber && "+"}
              {data?.phoneNumber}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Gender</td>
            <td>{data?.gender?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Marital Status</td>
            <td>{data?.maritalStatus?.name}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalDetails;
