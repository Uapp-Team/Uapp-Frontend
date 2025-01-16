import { DatePicker } from "antd";
import moment from "moment";
import React from "react";

const DMYPicker = ({
  label,
  id,
  name,
  value,
  setValue,
  error,
  action,
  required = false,
  width = "100%",
}) => {
  const handleDate = (date) => {
    if (date) {
      // Use Moment.js to format the date consistently
      const formattedDate = date.format("YYYY-MM-DD");
      setValue(formattedDate);
      action && action();
    }
  };

  return (
    <>
      {label && required && <span className="text-danger">*</span>}
      {label && <span>{label}</span>}

      <DatePicker
        onChange={handleDate}
        value={value ? moment(value, "YYYY-MM-DD") : null}
        style={{
          width: width,
        }}
        format="DD/MM/YYYY"
        placeholder="dd/mm/yyyy"
        name={name}
        id={id}
      />
      <span className="text-danger">{error}</span>
    </>
  );
};

export default DMYPicker;
