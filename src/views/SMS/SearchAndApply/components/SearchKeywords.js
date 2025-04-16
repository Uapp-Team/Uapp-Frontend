import React, { useEffect, useState } from "react";
import "../SearchAndApply.css";
import get from "../../../../helpers/get";

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

const SearchKeywords = ({ item, setItem, url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      setData(res);
    });
  }, [url]);

  return (
    <div className="filter-wrapper">
      <div
        className="buttons-container"
        style={{
          overflow: "hidden",
          height: isOpen ? "auto" : "40px",
        }}
      >
        {data.map((item, index) => (
          <button key={index} className="filter-button mb-1">
            {item?.name}
          </button>
        ))}
      </div>
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
    </div>
  );
};

export default SearchKeywords;
