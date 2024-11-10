import React, { useEffect, useState } from "react";
import Select from "react-select";
import Uget from "../../helpers/Uget";

const DefaultDropdownU = ({
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
  className,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Uget(url).then((res) => {
      setData(res?.data);
    });
  }, [url]);

  const options = data?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const select = (label, value) => {
    setError && setError(false);
    setLabel && setLabel(label);
    setValue && setValue(value);
    action && action(label, value);
  };

  return (
    <div className={className}>
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
      {error === true ? <span className="text-danger">{errorText}</span> : null}
    </div>
  );
};

export default DefaultDropdownU;
