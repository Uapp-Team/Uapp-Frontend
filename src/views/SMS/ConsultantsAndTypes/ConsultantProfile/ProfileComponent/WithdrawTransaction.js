import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";

const WithdrawTransaction = ({ id }) => {
  const [data, setData] = useState({});
  const [accountTransactions, setAccountTransactions] = useState([]);
  const [applicationTransactions, setApplicationTransactions] = useState([]);
  const [widthdrawTransactions, setWidthdrawTransactions] = useState([]);
  useEffect(() => {
    get(`ConsultantProfileTransactions/index/${id}`).then((res) => {
      console.log(res);
      console.log(res.withdrawTransactions);
      setAccountTransactions(res.accountTransactions);
      setApplicationTransactions(res.applicationTransactions);
      setWidthdrawTransactions(res.withdrawTransactions);
      setData(res);
    });
  }, [id]);

  return (
    <>
      <p className="mb-4" style={{ fontWeight: "600", fontSize: "16px" }}>
        Withdraw Transaction
      </p>
      {widthdrawTransactions?.length === 0 ? (
        <p>No withdrawTransaction transaction found</p>
      ) : (
        <Table className="mb-4">
          <thead className="tablehead">
            <td className="border-0">Transaction Date</td>
            <td className="border-0">Transaction Code</td>

            <td className="border-0">Amount</td>
            <td className="border-0">payment Type</td>
          </thead>
          <tbody>
            {widthdrawTransactions?.length > 0 &&
              widthdrawTransactions.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td className="border-0">{item?.transactionDate}</td>
                  <td className="border-0"> {item?.transactionCode}</td>
                  <td className="border-0">{item?.amount}</td>
                  <td className="border-0">{item?.paymentType}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default WithdrawTransaction;
