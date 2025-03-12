import React from "react";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import { Table } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { dateFormate } from "../../../../components/date/calenderFormate";

const ApplicationList = ({ applicationList, modalClose }) => {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <h3 className="mb-0">Applications</h3>{" "}
          <span className="count-summery">{applicationList?.length}</span>
        </div>
        <CloseBtn action={modalClose} />
      </div>
      <div className="table-responsive fixedhead">
        <Table id="table-to-xls">
          <thead className="tablehead">
            <tr>
              <th>APP ID</th>
              <th>Student Id</th>
              <th>Name </th>
              <th>University</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {applicationList.map((item, index) => (
              <tr className="border-buttom" key={index}>
                <td>
                  <Link
                    className="text-id hover"
                    to={`/applicationDetails/${item?.applicationId}/${item?.studentId}`}
                  >
                    #{item?.applicationViewId}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-id hover"
                    to={`/studentProfile/${item?.studentId}`}
                  >
                    {item?.studentViewId}
                  </Link>
                </td>
                <td>{item?.studentName}</td>

                <td>
                  <Link
                    className="text-id hover"
                    to={`/universityDetails/${item?.universityId}`}
                  >
                    {item?.universityName}
                  </Link>
                </td>
                <td>
                  <Link
                    className="text-id hover"
                    to={`/subjectProfile/${item?.subjectId}`}
                  >
                    {item?.subjectName}
                  </Link>
                </td>
                <td>{dateFormate(item?.applicationDate)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ApplicationList;
