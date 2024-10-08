import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";

const WithdrawTransactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(`FinanceManagerDashboard/WithdrawnTransactions`).then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <h5>Withdraw Transactions</h5>

        {data?.length === 0 ? (
          <p className="text-center">No Withdraw Transactions</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <td className="border-0">Transaction Date</td>
                  <td className="border-0">Consultant Name</td>
                  <td className="border-0">Transaction Code</td>
                  <td className="border-0">Amount</td>
                  <td className="border-0">Payment Type</td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{item?.date}</td>
                    <td>{item?.consultant}</td>
                    <td>{item?.code}</td>
                    <td>{item?.amount}</td>
                    <td>{item?.paymentType}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/withdrawTransaction">See All</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default WithdrawTransactions;
