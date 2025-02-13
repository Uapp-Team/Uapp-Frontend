import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../helpers/get";

const DefaultDropdown = ({
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
    get(url).then((res) => {
      setData(res);
      setData([{ id: 0, name: "All" }, ...res]);
    });
  }, [url]);

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
    </>
  );
};

export default DefaultDropdown;
