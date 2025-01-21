import React from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody } from "reactstrap";

const SalesReport = () => {
  return (
    <>
      <BreadCrumb title="Sales Report" />
      <Card>
        <CardBody>
          <div class="carved-div"></div>
        </CardBody>
      </Card>
    </>
  );
};

export default SalesReport;
