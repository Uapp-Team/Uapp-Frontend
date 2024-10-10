import React, { useEffect, useState } from "react";
import Select from "react-select";

const Year = ({
  lable,
  setLable,
  yearValue,
  setYearValue,
  action,
  border = "none",
}) => {
  const [years, setYears] = useState([]);
  //   const [yearLabel, setYearLabel] = useState(lable);

  useEffect(() => {
    var yearlist = [];
    for (let i = 2010; i <= 2099; i++) {
      let obj = { label: i, value: i };
      yearlist.push(obj);
    }
    setYears(yearlist);
  }, []);

  // const yearList = years?.map((key) => ({
  //   label: key.name,
  //   value: key.name,
  // }));

  const selectMonth = (label, value) => {
    setLable(label);
    setYearValue(value);
    action();
  };

  return (
    <>
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: "1px solid rgba(0,0,0,.1)",
            marginRight: "8px",
            marginLeft: "8px",
          }),
        }}
        options={years}
        value={{ label: lable, value: yearValue }}
        onChange={(opt) => selectMonth(opt.label, opt.value)}
        name="year"
        id="year"
        required
      />
    </>
  );
};

export default Year;
