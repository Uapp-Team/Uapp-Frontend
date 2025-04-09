import React from "react";
import { Col, Row } from "reactstrap";
import "./SearchAndApply.css";
import SearchBox from "./components/SearchBox";
import SearchFilters from "./components/SearchFilters";

function SearchAndApply() {
  const categories = [
    { label: "Undergraduate" },
    { label: "Pre-Masters programme" },
    { label: "Postgraduate" },
    { label: "Short Course" },
    {
      label: "Pre-sessional English",
      options: ["Pre-sessional English", "Option 2", "Option 3"],
    },
  ];

  const dates = [
    { label: "April 2025" },
    { label: "May 2025" },
    {
      label: "June 2025",
      options: ["June 2025", "July 2025", "August 2025"],
    },
  ];
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
      <Row className="mb-3">
        <Col>
          <SearchFilters
            keyword="Search keyword"
            categories={categories}
            // selectedCategory={selectedCategory}
            // setSelectedCategory={setSelectedCategory}
            dates={dates}
            // selectedDate={selectedDate}
            // setSelectedDate={setSelectedDate}
          />
        </Col>
      </Row>
    </>
  );
}

export default SearchAndApply;
