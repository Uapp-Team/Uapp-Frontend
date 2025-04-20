import React, { useEffect, useState } from "react";
import Select from "react-select";

const DropdownCircle = ({
  method,
  selectAll = false,
  all = "All",
  label,
  setLabel,
  value,
  setValue,
  url,
  name,
  error,
  setError,
  errorText,
  action,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    method(url).then((res) => {
      selectAll ? setData([{ id: 0, name: all }, ...res]) : setData(res);
    });
  }, [method, all, selectAll, url]);

  const options = data?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
    setError && setError(false);
    action && action(label, value);
  };

  return (
    <>
      <div className="dropdown-circle">
        <Select
          options={options}
          value={{
            label: label,
            value: value,
          }}
          onChange={(opt) => select(opt.label, opt.value)}
          name={name}
          id={name}
        />
      </div>
      {error === true ? <span className="text-danger">{errorText}</span> : null}
    </>
  );
};

export default DropdownCircle;
