import { Select } from "antd";
import React from "react";
import "../SearchAndApply.css";

const { Option } = Select;

const SearchFilters = ({
  keyword,
  categories,
  selectedCategory,
  setSelectedCategory,
  dates,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <div className="filters-container">
      <p className="filters-heading">
        <span className="fs-14px">Search results for</span> <br />{" "}
        <strong className="fs-20px">{keyword}</strong>
      </p>

      <div className="filters-row">
        <div className="filters-group">
          {categories.map((cat, i) =>
            cat.options ? (
              <Select
                key={i}
                defaultValue={cat.label}
                bordered={false}
                className="filter-select"
                onChange={(val) => setSelectedCategory(val)}
              >
                {cat.options.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            ) : (
              <span
                key={i}
                className={`filter-chip ${
                  selectedCategory === cat.label ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.label)}
              >
                {cat.label}
              </span>
            )
          )}
        </div>

        <div className="filters-group">
          {dates.map((date, i) =>
            date.options ? (
              <Select
                key={i}
                defaultValue={date.label}
                bordered={false}
                className="filter-select"
                onChange={(val) => setSelectedDate(val)}
              >
                {date.options.map((opt) => (
                  <Option key={opt} value={opt}>
                    {opt}
                  </Option>
                ))}
              </Select>
            ) : (
              <span
                key={i}
                className={`filter-chip ${
                  selectedDate === date.label ? "active" : ""
                }`}
                onClick={() => setSelectedDate(date.label)}
              >
                {date.label}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
