import { DatePicker } from "antd";
import moment from "moment";
import React from "react";

const DateRange = ({
  selectedDates,
  setSelectedDates,
  formattedDate = "YYYY-MM-DD",
  action,
}) => {
  const { RangePicker } = DatePicker;
  const handleDateChange = (dates) => {
    setSelectedDates(
      dates ? dates.map((date) => date.format(formattedDate)) : []
    );
    if (action) action();
  };

  return (
    <RangePicker
      value={
        selectedDates.length
          ? selectedDates.map((date) => moment(date, formattedDate))
          : []
      }
      format={formattedDate}
      onChange={handleDateChange}
    />
  );
};

export default DateRange;
