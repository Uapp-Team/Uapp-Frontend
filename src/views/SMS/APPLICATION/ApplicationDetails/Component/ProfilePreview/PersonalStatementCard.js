import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";

const PersonalStatementCard = ({ sId }) => {
  const [studentDetails, setStudentDetails] = useState({});

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
          <td className="border-0 text-right"> </td>
        </thead>
      </Table>
      <p className="pl-10px">
        {studentDetails?.statement
          ? studentDetails?.statement
          : "Personal Statement is not added."}
      </p>
    </>
  );
};

export default PersonalStatementCard;
