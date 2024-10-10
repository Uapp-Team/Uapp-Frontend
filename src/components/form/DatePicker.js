import React from "react";

const DatePicker = ({ label, value, onChange }) => {
  return (
    <>
      <div className="ml-12px mr-12px">
        {label && <label className="fs-12px">{label}</label>}
        <input
          className="form-control fs-14px border-0 p-0"
          style={{ width: "110px" }}
          type="date"
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default DatePicker;
