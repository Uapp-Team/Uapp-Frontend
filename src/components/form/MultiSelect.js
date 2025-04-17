import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../helpers/get";

const MultiSelect = ({
  url,
  value,
  setValue,
  error,
  setError,
  errorText,
  action,
  className,
  placeholder,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      setData(res);
    });
  }, [url]);

  const dataOptions = data?.map((b) => ({
    label: b.name,
    value: b.id,
  }));

  const select = (e) => {
    setError && setError(false);
    setValue && setValue(e);
    action && action();
  };

  return (
    <>
      <Select
        isMulti
        onChange={(e) => {
          select(e);
        }}
        options={dataOptions}
        value={value}
        className="d-block"
      />

      {error === true ? <span className="text-danger">{errorText}</span> : null}
    </>
  );
};

export default MultiSelect;
