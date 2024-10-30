import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Paginations from "../../components/ui/Paginations";
import Heading from "../../components/ui/Heading";

const ConsultantPerformance = () => {
  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div className="card">
        <Heading text="Consultant performance" className="mb-16px" />
        <Table responsive>
          <thead>
            <tr>
              <th>Consultant Name</th>
              <th>Total</th>
              <th>Converted</th>
              <th>Conversion ratio</th>
            </tr>
          </thead>
          <tbody>
            {/* {list?.models?.map((item, i) => ( */}
            {/* <tr key={i}> */}
            <tr>
              <td>Wade Warren</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Esther Howard</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Esther Howard</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Esther Howard</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            {/* ))} */}
          </tbody>
        </Table>
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataPerPage={dataPerPage}
          setDataPerPage={setDataPerPage}
          // totalData={data?.totalEntity}
          totalData={105}
        />
      </div>
    </>
  );
};

export default ConsultantPerformance;
