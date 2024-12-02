import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import ErrorText from "./ErrorText";
import Uget from "../../helpers/Uget";

const DDFilterByAppUrlU = ({
  label,
  url,
  defaultValue,
  placeholder = "Select",
  action,
  error,
  setError,
  className = "mb-3",
}) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState(placeholder);

  useEffect(() => {
    Uget(url).then((res) => {
      setData(res);
    });
  }, [url]);

  const list = data?.data;

  const option = list?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleChange = (e) => {
    action && action(e.value);
    setError && setError("");
  };

  useEffect(() => {
    const filterData = option?.filter(
      (item) => item.value.toString() === defaultValue.toString()
    );
    filterData?.length === 1
      ? setTitle(filterData[0].label)
      : setTitle(placeholder);
  }, [option, defaultValue, placeholder]);

  return (
    <>
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}

        <Select
          options={option}
          value={{
            label: title,
            value: defaultValue,
          }}
          // defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default DDFilterByAppUrlU;
