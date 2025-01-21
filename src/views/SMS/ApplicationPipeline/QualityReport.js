import React from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import StatusCard from "./Components/StatusCard";
import { Card, CardBody, Col, Row } from "reactstrap";

const QualityReport = () => {
  return (
    <>
      <BreadCrumb title="Application Quality Report" />
      <Card>
        <CardBody>
          <Row>
            <Col lg={4}>
              <StatusCard
                title="20% Assessment"
                applications={50}
                students={20}
                confidence={1}
                bgColor="#fff"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default QualityReport;
