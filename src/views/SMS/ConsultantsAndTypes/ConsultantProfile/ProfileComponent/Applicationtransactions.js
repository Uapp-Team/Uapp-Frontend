import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";
import { Link } from "react-router-dom";

const Applicationtransactions = ({ id }) => {
  const [data, setData] = useState({});
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [applicationTransactions, setApplicationTransactions] = useState([]);
  const [widthdrawTransactions, setWidthdrawTransactions] = useState([]);
  useEffect(() => {
    get(`ConsultantProfileTransactions/index/${id}`).then((res) => {
      console.log(res);
      console.log(res.applicationTransactions);
      setAccountTransactions(res.accountTransactions);
      setApplicationTransactions(res.applicationTransactions);
      setWidthdrawTransactions(res.widthdrawTransactions);
      setData(res);
    });
  }, [id]);
  return (
    <>
      <p className="mb-4" style={{ fontWeight: "600", fontSize: "16px" }}>
        Application Transaction
      </p>
      {applicationTransactions?.length === 0 ? (
        <p>No application transaction found</p>
      ) : (
        <Table className="mb-4">
          <thead className="tablehead">
            <td className="border-0">Date</td>
            <td className="border-0">Student</td>
            <td className="border-0">University Name</td>
            <td className="border-0">Intake Range</td>
            <td className="border-0">Amount</td>
          </thead>
          <tbody>
            {applicationTransactions?.length > 0 &&
              applicationTransactions.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td className="border-0">{item?.transactionDate}</td>
                  <td className="border-0"> {item?.student}</td>
                  <td className="border-0"> {item?.university}</td>

                  <td className="border-0">{item?.intakeRange}</td>
                  <td className="border-0">{item?.amount}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default Applicationtransactions;
