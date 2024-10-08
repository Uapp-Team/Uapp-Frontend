import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const EuCommissionList = ({ euCommissions, univerId }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      <div className="hedding-titel d-flex justify-content-between mb-3">
        <p className="section-title"> Home/EU Application Commissions</p>

        {permissions?.includes(permissionList.Edit_University) && (
          <>
            {euCommissions?.length > 0 ? (
              <Link to={`/addUniversityCommissionForm/${univerId}`}>
                <button className="universityEdit" type="submit">
                  Edit
                </button>
              </Link>
            ) : (
              <Link to={`/addUniversityCommissionForm/${univerId}`}>
                <button className="universityEdit" type="submit">
                  Add
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      {euCommissions?.length > 0 ? (
        <>
          {euCommissions?.map((eu, i) => (
            <div
              style={{
                padding: "16px",
                gap: "16px",
                background: "#F7F7F7",
                borderRadius: "5px",
                marginBottom: "30px",
              }}
              key={i}
            >
              <p
                style={{
                  fontWeight: "600",
                  fontSize: "16px",
                  color: "#019088",
                }}
              >
                {eu?.educationLevelName}
              </p>

              <div className="row">
                <div className="col-md-4">
                  <span className="universitycommissiontext">
                    Pay in: {eu?.comissionType === 1 ? "Amount" : "Percentage"}
                  </span>
                  <br />
                  <span className="universitycommissiontext">
                    Installment: {eu?.comissionInstallment}
                  </span>
                  <br />
                  {eu?.hasRange === false && (
                    <span className="universitycommissiontext">
                      Amount: $ {eu?.comissionAmount}
                    </span>
                  )}
                  <br />
                  <br />
                  <span
                    className="universitycommissiontext"
                    style={{ fontSize: "13px" }}
                  >
                    Note
                  </span>
                  <br />
                  <span style={{ opacity: "0.8" }}>{eu?.note}</span>
                </div>
                <div className="col-md-4">
                  {eu?.hasRange === false ? null : (
                    <>
                      <p
                        className="universitycommissiontext"
                        style={{ fontWeight: "600" }}
                      >
                        Conditional range
                      </p>
                      <Table
                        id="table-to-xls"
                        className="table-sm table-bordered text-center"
                      >
                        <thead className="tablehead">
                          <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eu?.commissionRanges?.map((rng, j) => (
                            <tr key={j}>
                              <td>{rng?.from}</td>
                              <td>{rng?.to}</td>
                              <td>{rng?.comissionAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No commission is added for EU/UK application.</p>
        </>
      )}
    </>
  );
};

export default EuCommissionList;
