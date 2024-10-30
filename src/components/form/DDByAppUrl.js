import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";
import get from "../../helpers/get";

const DDByAppUrl = ({
  label,
  name,
  select = "Select",
  url,
  defaultValue,
  error,
  register,
  placeholder,
  action,
  className = "mb-3",
}) => {
  // const { data, isLoading } = UappGet("key", url);

  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [url]);

  // const list = data?.data;

  const handleChange = (e) => {
    action && action(e.target.value);
  };

  return (
    <>
      <Form.Group className={className}>
        {label && <span>{label}</span>}
        <Form.Select
          {...register(name)}
          defaultValue={defaultValue}
          onChange={handleChange}
          className="mw-120px"
        >
          <option value={0}>{placeholder ? placeholder : select} </option>

          {data?.length > 0 &&
            data?.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
        </Form.Select>
        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default DDByAppUrl;
