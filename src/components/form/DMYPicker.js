import { DatePicker } from "antd";
import moment from "moment";
import React from "react";

const DMYPicker = ({
  label,
  name,
  value,
  setValue,
  error,
  action,
  required = false,
  width = "100%",
}) => {
  const handleDate = (e) => {
    if (e) {
      const day = new Date(e._d).getDate();
      const month = new Date(e._d).getMonth();
      const year = new Date(e._d).getFullYear();
      const convertedValue = `${year}-${month + 1}-${day}`;
      setValue(convertedValue);
      action && action();
    }
  };

  return (
    <>
      {label && required && <span className="text-danger">*</span>}
      {label && <span>{label}</span>}

      <DatePicker
        onChange={(e) => {
          handleDate(e);
        }}
        value={value ? moment(value) : null}
        style={{
          width: width,
        }}
        format="DD/MM/YYYY"
        placeholder="dd/mm/yyyy"
        name={name}
        id={name}
      />
      <span className="text-danger">{error}</span>
    </>
  );
};

export default DMYPicker;
