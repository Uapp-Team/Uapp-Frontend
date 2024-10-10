import React, { useEffect, useState } from "react";
import Select from "react-select";
import Lget from "../../helpers/Lget";
import { Form } from "react-bootstrap";
import ErrorText from "../form/ErrorText";

const DefaultDropdownL = ({
  label,
  placeholder,
  value,
  setValue,
  url,
  name,
  error,
  setError,
  action,
  className = "mb-3",
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Lget(url).then((res) => {
      setData(res?.data);
    });
  }, [url]);

  const options = data?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const select = (e) => {
    setValue && setValue(e.value);
    action && action(e.value);
    setError && setError("");
  };

  return (
    <Form.Group className={className}>
      {label && <span>{label}</span>}
      <Select
        options={options}
        defaultValue={value}
        placeholder={placeholder}
        onChange={select}
        name={name}
        id={name}
      />
      {/* <Select
        options={options}
        value={{
          label: label,
          value: value,
        }}
        onChange={(opt) => select(opt.label, opt.value)}
        name={name}
        id={name}
      /> */}
      <ErrorText error={error} />
    </Form.Group>
  );
};

export default DefaultDropdownL;
