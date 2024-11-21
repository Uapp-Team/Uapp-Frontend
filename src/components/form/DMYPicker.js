import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DMYPicker = ({
  label,
  name,
  value,
  setValue,
  error,
  action,
  required = false,
}) => {
  const handleDate = (e) => {
    if (e) {
      const day = new Date(e._d).getDate();
      const month = new Date(e._d).getMonth();
      const year = new Date(e._d).getFullYear();
      const convertedValue = `${year}-${month}-${day}`;
      setValue(convertedValue);
      action && action();
    }
  };

  return (
    <>
      <span>
        {required && <span className="text-danger">*</span>} {label}
      </span>

      <DatePicker
        onChange={(e) => {
          handleDate(e);
        }}
        value={value ? moment(value) : null}
        style={{
          width: "100%",
        }}
        format="DD/MM/YYYY"
        placeholder="dd/mm/yyyy"
        // name={name}
        // id={name}
      />
      <span className="text-danger">{error}</span>
    </>
  );
};

export default DMYPicker;
