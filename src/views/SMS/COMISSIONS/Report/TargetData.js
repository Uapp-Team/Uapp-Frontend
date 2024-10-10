import React from "react";
import { Col, Row } from "reactstrap";

const TargetData = ({ text, value }) => {
  return (
    <>
      {/* { value > 0 && ( */}
      <Row className="mb-0">
        <Col xs={8} className="fs-16px px-3 py-1">
          {text}
        </Col>
        <Col xs={4} className="fs-16px fw-600 px-3 py-1">
          {value}
        </Col>
      </Row>
      {/* )} */}
    </>
  );
};

export default TargetData;
