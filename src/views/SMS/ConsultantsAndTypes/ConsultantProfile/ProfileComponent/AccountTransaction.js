import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";

const AccountTransaction = ({ id }) => {
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
        Account Transaction
      </p>
      {accountTransactions?.length === 0 ? (
        <p>No account transaction found</p>
      ) : (
        <Table className="mb-4">
          <thead className="tablehead">
            <td className="border-0">Transaction Date</td>
            <td className="border-0">Transaction Code</td>
            <td className="border-0">Transaction Type</td>

            <td className="border-0">Amount</td>
          </thead>
          <tbody>
            {accountTransactions?.length > 0 &&
              accountTransactions.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                  <td className="border-0">{item?.transactionDate}</td>
                  <td className="border-0"> {item?.transactionCode}</td>
                  <td className="border-0"> {item?.typeName}</td>

                  <td className="border-0">{item?.amount}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default AccountTransaction;
