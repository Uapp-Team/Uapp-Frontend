import React from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import StatusCard from "./Components/StatusCard";
import { Col, Row } from "reactstrap";

const QualityReport = () => {
  return (
    <>
      <BreadCrumb title="Application Quality Report" />

      <Row>
        <Col lg={4}>
          <StatusCard />
        </Col>
      </Row>
    </>
  );
};

export default QualityReport;
