import React, { useEffect, useState } from "react";
import Select from "react-select";
import Uget from "../../helpers/Uget";
import { Form } from "react-bootstrap";

const MultiSelectU = ({
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
    Uget(url).then((res) => {
      setData(res?.data);
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
    <Form.Group className={className}>
      <Select
        isMulti
        onChange={(e) => {
          select(e);
        }}
        placeholder={placeholder}
        options={dataOptions}
        value={value}
        className="d-block"
      />
      {error === true ? <span className="text-danger">{errorText}</span> : null}
    </Form.Group>
  );
};

export default MultiSelectU;
