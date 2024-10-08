import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";

const AccountTransactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(`FinanceManagerDashboard/AccountTransactions`).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <h5>Account Transactions</h5>

        {data?.length === 0 ? (
          <p className="text-center">No Account Transactions</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <td className="border-0">Transaction Date</td>
                  <td className="border-0">Consultant Name</td>
                  <td className="border-0">Transaction Code</td>
                  <td className="border-0">Transaction Type</td>
                  <td className="border-0">Amount</td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{item?.transactionDate}</td>
                    <td>{item?.consultantName}</td>
                    <td>{item?.transactionCode}</td>
                    <td>{item?.transactionType}</td>
                    <td>{item?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/accountTransaction">See All</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AccountTransactions;
