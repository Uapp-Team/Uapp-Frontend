import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const GeneralInfo = ({ id }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Consultant/GetGeneralInformation/${id}`).then((res) => {
      console.log(res, "details");
      setData(res);
    });
  }, [id]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Consultant Details</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList.Edit_Consultant) ? (
              <Link to={`/consultantInformation/${id}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td width="60%">Consultant Name</td>
            <td width="40%">
              <span className="mr-1"> {data?.firstName}</span>
              {data?.lastName}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Registration Date</td>
            <td>{data?.createdOn}</td>
          </tr>

          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Consultant type</td>
            <td>{data?.consultantType?.name}</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
            <td>Recruitment Type</td>
            <td>
              {data?.isAcceptedHome === true && "Home/UK"}
              {data?.isAcceptedHome &&
                (data?.isAcceptedEU_UK || data?.isAcceptedInternational) &&
                ", "}
              {data?.isAcceptedEU_UK === true && "EU/EEU"}
              {(data?.isAcceptedHome || data?.isAcceptedEU_UK) &&
                data?.isAcceptedInternational &&
                ", "}
              {data?.isAcceptedInternational === true && "International"}
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #dee2e6" }}>
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
