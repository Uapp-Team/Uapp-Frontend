import React from "react";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import { Table } from "reactstrap";

const ApplicationList = ({ modalClose }) => {
  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Applications</h3>
        <CloseBtn action={modalClose} />
      </div>
      <div className="table-responsive fixedhead">
        <Table id="table-to-xls">
          <thead className="tablehead">
            <tr>
              <th>Student ID </th>
              <th>Student</th>
              <th>University</th>
              <th>Admission Manager</th>
              <th>Admission Officer</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-buttom">
              <td>#STD002628</td>
              <td>John Doe</td>
              <td>University of Technology</td>
              <td>Admission Manager</td>
              <td>John Doe</td>
              <td>2022-01-01 12:00:00</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ApplicationList;
