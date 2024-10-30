import React from "react";
import { Col, Row } from "reactstrap";

const OverviewData = ({ text, value }) => {
  return (
    <>
      {value > 0 && (
        <Row className="mb-0">
          <Col xs={7} md={6} lg={7} xl={6} className="text-gray-70">
            {text}
          </Col>
          <Col xs={5} md={6} lg={5} xl={6} className="fw-500">
            {value}
          </Col>
        </Row>
      )}
    </>
  );
};

export default OverviewData;
