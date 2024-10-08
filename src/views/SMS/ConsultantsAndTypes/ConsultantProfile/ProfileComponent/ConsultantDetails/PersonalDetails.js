import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const PersonalDetails = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    get(`Consultant/GetPersonalInformation/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

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
      <Table className="border">
        <thead className="tablehead">
          <td className="border-0">
            <b>Consultant Personal Details</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            <Link to={`/consultantPersonalInformation/${id}`}> Edit</Link>
          </td>
        </thead>
        <tbody>
          <tr>
            <td className="border-0">Date Of Birth</td>
            <td className="border-0">{handleDate(data?.dateOfBirth)}</td>
          </tr>
          <tr>
            <td>Passport ID</td>
            <td>{data?.passportId}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{data?.phoneNumber}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{data?.gender?.name}</td>
          </tr>
          <tr>
            <td>Marital Status</td>
            <td>{data?.maritalStatus?.name}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default PersonalDetails;
