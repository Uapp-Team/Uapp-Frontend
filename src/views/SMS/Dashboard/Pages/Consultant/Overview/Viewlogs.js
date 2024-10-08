import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { Table } from "reactstrap";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const Viewlogs = () => {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    get(`ConsultantDesignation/History/${id}`).then((res) => {
      setData(res);
    });
  }, [id]);

  return (
    <>
      <BreadCrumb title="View logs" backTo="" path="/" />
      <div className="custom-card-border p-4 mb-30px">
        <h5 className="mb-0">View logs</h5>

        <Table responsive className="mt-3">
          <thead className="tablehead">
            <tr>
              <td className="border-0">Designation logs</td>
              <td className="border-0">Intake</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i} className="border-buttom">
                <td>{item?.title}</td>
                <td>
                  {item?.intakeRanges?.map((data, j) => (
                    <span key={j}>
                      {data?.name}
                      <br />
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Viewlogs;
