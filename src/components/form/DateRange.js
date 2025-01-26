import { DatePicker } from "antd";
import React from "react";

const DateRange = ({
  selectedDates,
  setSelectedDates,
  formattedDate = "YYYY-MM-DD",
  action,
}) => {
  const { RangePicker } = DatePicker;
  const handleDateChange = (dates) => {
    if (dates) {
      const formattedDates = dates.map((date) => date.format(formattedDate));
      setSelectedDates(formattedDates);
      action && action();
    } else {
      setSelectedDates([]);
    }
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
