import { Select } from "antd";
import React from "react";
import { Col, Row } from "reactstrap";
import "./SearchAndApply.css";
import SearchBox from "./SearchBox";

function SearchAndApply() {
  return (
    <>
      <Row className="mb-3">
        <Col md={6} className="d-flex h-40px">
          <SearchBox
            onBlur={false}
            name="search"
            placeholder="Search Course"
            isIcon={true}
          />
          <Select placeholder="Select Institute" />
        </Col>
      </Row>
    </>
  );
}

export default SearchAndApply;
