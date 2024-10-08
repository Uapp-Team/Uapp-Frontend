import React from "react";
import { Col, Row } from "reactstrap";

const TargetData = ({ text, value }) => {
  return (
    <>
      {value > 0 && (
        <Row className="mb-0">
          <Col xs={7} className="fs-16px p-3">
            {text}
          </Col>
          <Col xs={5} className="fs-16px fw-600 p-3">
            {value}
          </Col>
        </Row>
      )}
    </>
  );
};

export default TargetData;
