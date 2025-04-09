import React from "react";
import {
  FaAlignJustify,
  FaExchangeAlt,
  FaHeart,
  FaSlidersH,
} from "react-icons/fa";
import courseIcon from "../../../../assets/icon/course.svg";
import universityIcon from "../../../../assets/icon/university.svg";
import "../SearchAndApply.css";

const ResultsToolbar = () => {
  return (
    <div className="results-toolbar d-flex justify-content-between align-items-center flex-wrap p-2">
      {/* Left Section */}
      <div className="d-flex gap-2 align-items-center flex-wrap">
        <span className="tag mr-2">50 Result</span>
        <span className="tag tag-active mr-2">
          <img src={courseIcon} alt="course" className="w-20px h-20px mr-2" />{" "}
          25 Courses
        </span>
        <span className="tag">
          <img
            src={universityIcon}
            alt="course"
            className="w-20px h-20px mr-2"
          />
          25 University
        </span>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center flex-wrap">
        <button className="action-btn mr-2">
          <FaHeart className="mx-2" /> Favourites{" "}
          <span className="count">24</span>
        </button>
        <button className="action-btn mr-2">
          <FaExchangeAlt className="mx-2" /> Compare{" "}
          <span className="count">5</span>
        </button>
        <button className="action-btn mr-2">
          <FaAlignJustify className="my-1" />
        </button>
        <button className="action-btn filters-btn">
          <FaSlidersH className="mx-2" /> All filters
        </button>
      </div>
    </div>
  );
};

export default ResultsToolbar;
