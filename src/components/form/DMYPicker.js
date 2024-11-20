import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const DMYPicker = ({
  label,
  name,
  value,
  setValue,
  error,
  setError,
  required = false,
}) => {
  //   const [expireDate, setexpireDate] = useState(null);

  function convertDateFormat(dateString) {
    // Split the input date string into day, month, and year
    const [day, month, year] = dateString.split("/");

    // Return the date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  }

  const handleDate = (e) => {
    // if (!e) {
    //   setexpireDateError("Expire Date is required");
    //   setexpireDate("");
    //   return;
    // }

    if (e) {
      console.log(e);
      const value = new Date(e._d).getDate();
      console.log(value);
      // Split the input date string into day, month, and year
      const [day, month, year] = value.split("/");

      // Return the date in yyyy-MM-dd format
      const convertedValue = `${year}-${month}-${day}`;
      console.log(convertedValue);
      setValue(convertedValue);
      setError && setError("");
    }

    // if (value.toISOString() <= issueDate.toISOString()) {
    //   setexpireDateError("Expiry Date cannot same or previous date");
    // } else {
    //   setexpireDateError("");
    // }
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
        name={name}
        id={name}
      />
      <span className="text-danger">{error}</span>
    </>
  );
};

export default DMYPicker;
