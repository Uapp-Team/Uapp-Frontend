import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Modal, ModalBody, Table } from "reactstrap";

const SalesManagerTable = ({ employeeList }) => {
  console.log(employeeList, "ha ha ah");

  return (
    <div className="table-responsive">
      <Table id="table-to-xls" className="table-sm table-bordered">
        <thead className="tablehead">
          <tr style={{ textAlign: "center" }}>
            <th>UAPP Id</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Branch</th>
            <th>Consultant Count</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((emp, i) => (
            <tr key={emp.employeeId} style={{ textAlign: "center" }}>
              <td className="cursor-pointer hyperlink-hover">
                <Link
                  className="text-id hover"
                  to={`/salesTeamLeaderProfile/${emp.employeeId}`}
                >
                  {emp?.uappId}
                </Link>
              </td>
              <td>{emp?.fullName}</td>
              <td>{emp?.email}</td>
              <td>{emp?.phoneNumber}</td>
              <td>{emp.branch}</td>
              <td>{emp.consultantCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SalesManagerTable;
