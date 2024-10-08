import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const PersonalStatementCard = ({ sId }) => {
  const [studentDetails, setStudentDetails] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`PersonalStatement/GetByStudentId/${sId}`).then((res) => {
      setStudentDetails(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b> Personal Statement</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <Link to={`/addPersonalStatement/${sId}/${1}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <p className="pl-10px">{studentDetails?.statement}</p>
    </>
  );
};

export default PersonalStatementCard;
