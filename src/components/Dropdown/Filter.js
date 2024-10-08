import React from "react";
import Select from "react-select";

const Filter = ({ data, label, setLabel, value, setValue, action }) => {
  const options = data?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
    action(value);
  };

  return (
    <>
      <Select
        options={options}
        value={{
          label: label,
          value: value,
        }}
        onChange={(opt) => select(opt.label, opt.value)}
      />
    </>
  );
};

export default Filter;
