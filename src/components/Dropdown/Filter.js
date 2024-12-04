import React from "react";
import Select from "react-select";

const Filter = ({
  data,
  label,
  setLabel,
  value,
  setValue,
  action,
  onChange,
  className,
  isDisabled,
}) => {
  const options = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const select = (label, value) => {
    setLabel && setLabel(label);
    setValue && setValue(value);
    action && action();
    onChange && onChange(label, value);
  };

  return (
    <>
      <Select
        className={className}
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
