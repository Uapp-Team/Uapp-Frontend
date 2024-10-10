import React from "react";
import { Table } from "react-bootstrap";
import Heading from "../../components/ui/Heading";

const BranchOverview = () => {
  return (
    <>
      <div className="card">
        <Heading text="Branch overview" className="mb-16px" />
        <Table responsive>
          <thead>
            <tr>
              <th>Branch</th>
              <th>Total</th>
              <th>In Process</th>
              <th>Converted</th>
            </tr>
          </thead>
          <tbody>
            {/* {list?.models?.map((item, i) => ( */}
            {/* <tr key={i}> */}
            <tr>
              <td>Dhaka</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Uk</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Uk</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            <tr>
              <td>Uk</td>
              <td>30,221</td>
              <td>3021</td>
              <td>0%</td>
            </tr>
            {/* ))} */}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default BranchOverview;
