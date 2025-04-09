import React from "react";
import { Col, Row } from "reactstrap";
import "./SearchAndApply.css";
import SearchBox from "./components/SearchBox";

function SearchAndApply() {
  return (
    <>
      <Row className="mb-3">
        <Col md={6} className="d-flex h-40px">
          <SearchBox
            name="search"
            placeholder="Search"
            // value={search}
            // setValue={setSearch}
            // setIsTyping={setIsTyping}
            // university={university}
            // setUniversity={setUniversity}
            // universityOptions={["Harvard", "MIT", "Stanford"]}
          />
        </Col>
      </Row>
    </>
  );
}

export default SearchAndApply;
