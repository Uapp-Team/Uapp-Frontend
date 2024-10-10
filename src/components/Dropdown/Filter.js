import React from "react";
import Select from "react-select";

const Filter = ({
  data,
  label,
  setLabel,
  value,
  setValue,
  action,
  isDisabled,
}) => {
  const options = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
    action && action();
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
        isDisabled={isDisabled}
      />
    </>
  );
};

export default Filter;
