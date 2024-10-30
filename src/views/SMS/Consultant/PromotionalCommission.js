import React from "react";

import { Table } from "reactstrap";

const PromotionalCommission = ({ promotionalList }) => {
  return (
    <>
      <div className="mt-5 mx-1">
        <p className="section-title">Promotional Commission List</p>

        <div className=" mt-3">
          <Table>
            <thead className="tablehead">
              <tr style={{ textAlign: "center" }}>
                {/* <th>SL/No</th> */}
                <th>University Name</th>
                <th>Intake</th>
                <th>Minimum Student Requirement</th>
                <th>Promotional Bonus Rate</th>
              </tr>
            </thead>
            <tbody>
              {promotionalList?.map((data, i) => (
                <tr key={data?.id} style={{ textAlign: "center" }}>
                  {/* <th scope="row">{1 + i}</th> */}
                  <td>{data?.university?.name}</td>

                  <td>{data?.accountIntake?.intakeName}</td>

                  <td>{data?.minumumStudentRequirement}</td>

                  <td>{data?.commissionAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PromotionalCommission;
