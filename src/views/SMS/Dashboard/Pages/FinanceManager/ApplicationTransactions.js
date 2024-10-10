import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";

const ApplicationTransactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(`FinanceManagerDashboard/ApplicationTransactions`).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <h5>Application Transactions</h5>

        {data?.length === 0 ? (
          <p className="text-center">No Application Transactions</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <td className="border-0">Transaction Date</td>
                  <td className="border-0">Consultant Name</td>
                  <td className="border-0">University Name</td>
                  <td className="border-0">Intake Range</td>
                  <td className="border-0">Amount</td>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{item?.transactionDate}</td>
                    <td>
                      {" "}
                      <Link
                        className="text-body"
                        to={`consultantProfile/${item?.consultantId}`}
                      >
                        {item?.consultantName}
                      </Link>
                    </td>
                    <td>{item?.university}</td>
                    <td>{item?.accountIntake}</td>
                    <td>{item?.amount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/applicationTransaction">See All</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ApplicationTransactions;
