import { DatePicker } from "antd";
import React from "react";

const DateRange = ({ selectedDates, setSelectedDates, formattedDate }) => {
  const { RangePicker } = DatePicker;
  const handleDateChange = (dates) => {
    const formattedDates = dates.map((date) => date.format(formattedDate));
    setSelectedDates(formattedDates);
  };

  return (
    <RangePicker
      defaultValue={selectedDates}
      format={formattedDate}
      onChange={handleDateChange}
    />
  );
};

export default DateRange;
