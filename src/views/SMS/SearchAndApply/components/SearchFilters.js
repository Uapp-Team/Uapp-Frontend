import React, { useState } from "react";
import "../SearchAndApply.css";

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchFilters = ({
  keyword,
  categories,
  selectedCategory,
  setSelectedCategory,
  dates,
  selectedDate,
  setSelectedDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  // const categories = [
  //   [
  //     "Undergraduate",
  //     "Pre-Masters programme",
  //     "Postgraduate",
  //     "Short Course",
  //     "Pre-sessional English",
  //   ],
  //   [
  //     "Research degrees",
  //     "Pathway Programme",
  //     "Professional Course",
  //     "Diploma",
  //     "Secondary School",
  //   ],
  //   ["Higher Secondary School", "HND", "HNC", "Level 3", "Level 4", "Level 5"],
  // ];

  const handleMouseEnter = (index) => {
    setHoveredButton(index);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div className="filter-container">
      <p className="filters-heading">
        <span className="fs-14px">Search results for</span> <br />
        <strong className="fs-20px">{keyword}</strong>
      </p>
      <div className="filter-wrapper">
        <div className="buttons-container">
          {categories[0].map((item, index) => (
            <button key={index} className="filter-button">
              {item}
            </button>
          ))}
        </div>
        <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {isOpen && (
        <div className="dropdown-content">
          {categories.slice(1).map((row, rowIndex) => (
            <div key={rowIndex} className="button-row">
              {row.map((item, itemIndex) => (
                <button key={itemIndex} className="filter-button">
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
