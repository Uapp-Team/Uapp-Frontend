import React from "react";
import DatePicker from "./DatePicker";

const DateRangePicker = ({
  formData,
  setFormDate,
  toDate,
  setToDate,
  label,
  value,
  onChange,
  className = "mb-3",
}) => {
  return (
    <>
      <span
        className={`border rounded d-flex align-items-center px-1 ${className}`}
        style={{ width: "290px" }}
      >
        <DatePicker
          label=""
          value={formData}
          onChange={(e) => {
            setFormDate(e.target.value);
          }}
        />
        <b className="mx-1">-</b>
        <DatePicker
          label=""
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
        />
      </span>
    </>
  );
};

export default DateRangePicker;
