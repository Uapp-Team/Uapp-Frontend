import React from "react";
import { Col, Row } from "reactstrap";

const OverviewData = ({ text, value }) => {
  return (
    <>
      {value > 0 && (
        <Row className="mb-0">
          <Col xs={7} className="text-gray-70">
            {text}
          </Col>
          <Col xs={5} className="fw-500">
            {value}
          </Col>
        </Row>
      )}
    </>
  );
};

export default OverviewData;
