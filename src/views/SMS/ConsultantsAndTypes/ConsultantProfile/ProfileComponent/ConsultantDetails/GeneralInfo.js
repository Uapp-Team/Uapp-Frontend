import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

const GeneralInfo = ({ id }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    get(`Consultant/GetGeneralInformation/${id}`).then((res) => {
      console.log(res, "details");
      setData(res);
    });
  }, [id]);
  console.log(data);

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
            <b>Consultant Details</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            <Link to={`/consultantInformation/${id}`}> Edit</Link>
          </td>
        </thead>
        <tbody>
          <tr>
            <td className="border-0">Consultant Name</td>
            <td className="border-0">
              <span className="mr-1"> {data?.firstName}</span>
              {data?.lastName}
            </td>
          </tr>
          <tr>
            <td>Registration Date</td>
            <td>{handleDate(data?.branch?.createdOn)}</td>
          </tr>

          <tr>
            <td>Consultant type</td>
            <td>{data?.consultantType?.name}</td>
          </tr>
          <tr>
            <td>Recruitment Type</td>
            <td>
              {data?.isAcceptedEU_UK === true
                ? " Eu/Uk"
                : data?.isAcceptedHome === true
                ? "Home"
                : data?.isAcceptedInternational === true
                ? " International"
                : null}
            </td>
          </tr>
          <tr>
            <td>Parent Consultant</td>
            <td>
              <span className="mr-1">{data?.parentConsultant?.firstName}</span>{" "}
              {data?.parentConsultant?.lastName}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default GeneralInfo;
