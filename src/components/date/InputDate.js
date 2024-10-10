import moment from "moment";
import React from "react";
import { Input } from "reactstrap";

const InputDate = ({ value, onChange, name }) => {
  return (
    <div className="w-100">
      <label htmlFor="dateInput">
        <Input
          type="text"
          value={moment(new Date(value)).format("DD-MM-YYYY")}
        />
      </label>
      <input
        type="date"
        id="dateInput"
        name={name}
        value={value}
        onChange={onChange}
        className="d-none"
      />
    </div>
  );
};

export default InputDate;
