import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";
import Uget from "../../helpers/Uget";

const DDByAppUrlU = ({
  register,
  name,
  label,
  url,
  defaultValue,
  placeholder = "Select",
  action,
  error,
  setValue,
  className = "mb-3",
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Uget(url).then((res) => {
      setData(res?.data);
    });
  }, [url]);

  const option = data?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  const handleChange = (e) => {
    setValue(e.target.value);
    action && action();
  };

  return (
    <>
      <Form.Group className={className}>
        {label && <span>{label}</span>}

        <Form.Select
          {...register(name)}
          value={defaultValue}
          onChange={handleChange}
        >
          <option value={0}>{placeholder} </option>

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

export default DDByAppUrlU;
