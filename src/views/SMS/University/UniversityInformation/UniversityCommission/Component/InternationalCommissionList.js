import React from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const InternationalCommissionList = ({ intCommissions, univerId }) => {
  console.log(intCommissions);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      <div className="hedding-titel d-flex justify-content-between mb-3">
        <p className="section-title">International Application Commissions</p>

        {permissions?.includes(permissionList.Edit_University) && (
          <>
            {intCommissions?.length > 0 ? (
              <Link to={`/addUniversityCommissionFormInt/${univerId}`}>
                <button className="universityEdit" type="submit">
                  Edit
                </button>
              </Link>
            ) : (
              <Link to={`/addUniversityCommissionFormInt/${univerId}`}>
                <button className="universityEdit" type="submit">
                  Add
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      {intCommissions?.length > 0 ? (
        <>
          {intCommissions?.map((eu, i) => (
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
              <div>
                <div className="row">
                  <div className="col-md-4 ">
                    <span className="universitycommissiontext">
                      Pay in:{" "}
                      {eu?.comissionType === 1 ? "Amount" : "Percentage"}
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
                  <div className="col-md-4 ">
                    {eu?.hasRange === false ? null : (
                      <>
                        <p
                          className="universitycommissiontext"
                          style={{ fontWeight: "600" }}
                        >
                          Conditional range
                        </p>
                        {eu?.commissionRanges.length > 0 && (
                          <Table
                            id="table-to-xls"
                            className="table-sm table-bordered"
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
                        )}
                      </>
                    )}
                  </div>
                </div>

                {eu?.hasCountrySpecific === true &&
                eu?.countryCommissions.length ? (
                  <>
                    {eu?.countryCommissions?.map((cc, j) => (
                      <div key={j} className="my-3">
                        <div className="row">
                          <div className="col-md-4 ">
                            <span
                              className="universitycommissiontext"
                              style={{
                                fontWeight: "600px",
                                color: "#495057",
                                fontSize: "16px",
                              }}
                            >
                              {cc?.countryName}
                            </span>
                            <br />
                            <span className="universitycommissiontext">
                              Pay in:{" "}
                              {cc?.comissionType === 1
                                ? "Amount"
                                : "Percentage"}
                            </span>
                            <br />

                            <span className="universitycommissiontext">
                              Installment: {cc?.installment}
                            </span>
                            <br />
                            {cc?.hasRange === false && (
                              <span className="universitycommissiontext">
                                Amount: $ {cc?.amount}
                              </span>
                            )}
                            <br />
                          </div>
                          <div className="col-md-4 ">
                            {cc?.hasRange === false ? null : (
                              <>
                                <p
                                  className="universitycommissiontext"
                                  style={{ fontWeight: "600" }}
                                >
                                  Conditional range
                                </p>
                                <Table
                                  id="table-to-xls"
                                  className="table-sm table-bordered"
                                >
                                  <thead className="tablehead">
                                    <tr>
                                      <th>From</th>
                                      <th>To</th>
                                      <th>Amount</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {cc?.range?.map((rng, j) => (
                                      <tr key={j}>
                                        <td>{rng?.from}</td>
                                        <td>{rng?.to}</td>
                                        <td>{rng?.amount}</td>
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
                  <></>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <p>No commission is added for International application.</p>
        </>
      )}
    </>
  );
};

export default InternationalCommissionList;
