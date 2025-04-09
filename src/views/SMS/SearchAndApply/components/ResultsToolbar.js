import React from "react";
import { FaExchangeAlt, FaHeart, FaSlidersH } from "react-icons/fa";
import { Button } from "reactstrap";
import "../SearchAndApply.css";

const ResultsToolbar = () => {
  return (
    <div className="results-toolbar d-flex justify-content-between align-items-center flex-wrap p-2">
      {/* Left Section */}
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <span className="tag">50 Result</span>
        <span className="tag tag-active"> 25 Courses</span>
        <span className="tag"> 25 University</span>
      </div>

      {/* Right Section */}
      <div className="d-flex gap-3 align-items-center flex-wrap">
        <Button className="action-btn" color="light">
          <FaHeart className="me-1" /> Favourites{" "}
          <span className="count">24</span>
        </Button>
        <Button className="action-btn" color="light">
          <FaExchangeAlt className="me-1" /> Compare{" "}
          <span className="count">5</span>
        </Button>
        <Button className="action-btn filters-btn" color="dark">
          <FaSlidersH className="me-1" /> All filters
        </Button>
      </div>
    </div>
  );
};

export default ResultsToolbar;
