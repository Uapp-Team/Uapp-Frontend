import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import ErrorText from "./ErrorText";
import get from "../../helpers/get";

const DDFilterByAppUrl = ({
  label,
  url,
  defaultValue,
  placeholder = "Select",
  action,
  error,
  setError,
  className = "mb-3",
}) => {
  // const { data } = Get("key", url);

  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [url]);

  // const list = data?.data;
  // const list = [
  //   {
  //     id: 0,
  //     name: "All ",
  //   },
  //   ...fetchData,
  // ];
  console.log(data);
  const option = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleChange = (e) => {
    action && action(e.value);
    setError && setError("");
  };

  return (
    <>
      <Form.Group className={className}>
        {label && <Form.Label>{label}</Form.Label>}

        <Select
          options={option}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
        />
        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default DDFilterByAppUrl;
