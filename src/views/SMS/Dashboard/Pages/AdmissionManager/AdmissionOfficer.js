import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Table } from "reactstrap";

const AdmissionOfficer = ({ data }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <h5>Admission Officer</h5>

        {data?.length === 0 ? (
          <p className="text-center">No Admission Officer</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <th className="border-0">UAPP ID</th>
                  <th className="border-0">Name</th>
                  <th className="border-0">Email</th>
                  <th className="border-0">Application </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td className="cursor-pointer hyperlink-hover">
                      <span>{item?.viewId}</span>{" "}
                    </td>
                    <td>
                      <span style={{ marginLeft: "5px" }}>
                        {item?.fullName}
                      </span>
                    </td>
                    <td>{item?.email}</td>
                    <td>{item?.applications}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/admissionOfficerList">See All</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdmissionOfficer;
