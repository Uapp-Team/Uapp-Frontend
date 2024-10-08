import React, { useEffect, useState } from "react";
import { Card, CardBody, Input } from "reactstrap";
import get from "../../../../helpers/get";
import { Link, useHistory, useParams } from "react-router-dom";
import { Table } from "reactstrap";

const UniversityProfileCommission = ({
  uniData,
  iconTrue,
  iconFalse,
  commission,
}) => {
  const history = useHistory();
  const { id } = useParams();
  const activetab = "9";
  const success = false;
  const [loading, setLoading] = useState(true);
  const [euCommissions, setEuCommissions] = useState([]);
  const [intCommissions, setIntCommissions] = useState([]);
  useEffect(() => {
    get(`UniversityComission/GetByUniversity/${id}`).then((res) => {
      console.log(res, "commission");
      setEuCommissions(res);
    });
    get(`InternationalComission/GetByUniversity/${id}`).then((res) => {
      setIntCommissions(res);
    });
    setLoading(false);
  }, [success, id]);
  console.log(euCommissions);
  return (
    <div className="">
      <div className="row mt-4">
        <div className="col">
          <h4>
            <b>Recruitment Type</b>
          </h4>
          <div className="recruit-Type mt-4">
            <div className="recruit-div">
              <div className="d-flex justify-content-around mt-3">
                <p style={{ fontSize: "15px", fontWeight: "400" }}>
                  Accept Home
                </p>{" "}
                <img
                  height="20px"
                  src={uniData?.isAcceptHome ? iconTrue : iconFalse}
                  alt=""
                />
              </div>
            </div>
            <div className="recruit-div">
              <div className="d-flex justify-content-around mt-3">
                <p style={{ fontSize: "15px", fontWeight: "400" }}>
                  Accept EU/UK
                </p>{" "}
                <img
                  height="20px"
                  src={uniData?.isAcceptEU_UK ? iconTrue : iconFalse}
                  alt=""
                />
              </div>
            </div>
            <div className="recruit-div">
              <div className="d-flex justify-content-around mt-3">
                <p style={{ fontSize: "15px", fontWeight: "400" }}>
                  Accept Int.
                </p>{" "}
                <img
                  height="20px"
                  src={uniData?.isAcceptInternational ? iconTrue : iconFalse}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col">
          <h4>
            <b>Commission</b>
          </h4>

          {commission != null ? (
            <div className="mt-4">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="custom-card-border">
                          <div className="custom-card-border-commission  text-center pt-1">
                            <h5 style={{ color: "white" }}>
                              Home/EU Application Commissions{" "}
                            </h5>
                          </div>
                          <div className="p-3">
                            {euCommissions?.length > 0 ? (
                              <>
                                {euCommissions?.map((eu, i) => (
                                  <div key={i}>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      {eu?.educationLevelName}
                                    </p>

                                    <div className="">
                                      <div>
                                        {" "}
                                        <span className="universitycommissiontext">
                                          Pay in:{" "}
                                          {eu?.comissionType === 1
                                            ? "Amount"
                                            : "Percentage"}
                                        </span>
                                        <br />
                                        <span className="universitycommissiontext">
                                          Installment:{" "}
                                          {eu?.comissionInstallment}
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
                                        <span style={{ opacity: "0.8" }}>
                                          {eu?.note}
                                        </span>
                                      </div>

                                      <div className="">
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
                                                {eu?.commissionRanges?.map(
                                                  (rng, j) => (
                                                    <tr key={j}>
                                                      <td>{rng?.from}</td>
                                                      <td>{rng?.to}</td>
                                                      <td>
                                                        {rng?.comissionAmount}
                                                      </td>
                                                    </tr>
                                                  )
                                                )}
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
                                <p>
                                  No commission is added for Home/EU
                                  application.
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="custom-card-border">
                          <div className="custom-card-border-commission  text-center pt-1">
                            <h5 style={{ color: "white" }}>
                              International Application Commissions
                            </h5>
                          </div>
                          <div className="p-3">
                            {intCommissions?.length > 0 ? (
                              <>
                                {intCommissions?.map((eu, i) => (
                                  <div key={i}>
                                    <p
                                      style={{
                                        fontWeight: "600",
                                        fontSize: "16px",
                                        color: "#000",
                                      }}
                                    >
                                      {eu?.educationLevelName}
                                    </p>
                                    <div>
                                      <div className="">
                                        <div className="">
                                          <span className="universitycommissiontext">
                                            Pay in:{" "}
                                            {eu?.comissionType === 1
                                              ? "Amount"
                                              : "Percentage"}
                                          </span>
                                          <br />
                                          <span className="universitycommissiontext">
                                            Installment:{" "}
                                            {eu?.comissionInstallment}
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
                                          <span style={{ opacity: "0.8" }}>
                                            {eu?.note}
                                          </span>
                                        </div>
                                        <div className=" ">
                                          {eu?.hasRange === false ? null : (
                                            <>
                                              <p
                                                className="universitycommissiontext"
                                                style={{ fontWeight: "600" }}
                                              >
                                                Conditional range
                                              </p>
                                              {eu?.commissionRanges.length >
                                                0 && (
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
                                                    {eu?.commissionRanges?.map(
                                                      (rng, j) => (
                                                        <tr key={j}>
                                                          <td>{rng?.from}</td>
                                                          <td>{rng?.to}</td>
                                                          <td>
                                                            {
                                                              rng?.comissionAmount
                                                            }
                                                          </td>
                                                        </tr>
                                                      )
                                                    )}
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
                                          {eu?.countryCommissions?.map(
                                            (cc, j) => (
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
                                                      Installment:{" "}
                                                      {cc?.installment}
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
                                                    {cc?.hasRange ===
                                                    false ? null : (
                                                      <>
                                                        <p
                                                          className="universitycommissiontext"
                                                          style={{
                                                            fontWeight: "600",
                                                          }}
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
                                                            {cc?.range?.map(
                                                              (rng, j) => (
                                                                <tr key={j}>
                                                                  <td>
                                                                    {rng?.from}
                                                                  </td>
                                                                  <td>
                                                                    {rng?.to}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      rng?.amount
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              )
                                                            )}
                                                          </tbody>
                                                        </Table>
                                                      </>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
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
                                <p>
                                  No commission is added for International
                                  application.
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span>There is no commission added here.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityProfileCommission;
