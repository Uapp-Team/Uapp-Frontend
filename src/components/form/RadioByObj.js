import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const RadioByObj = ({
  label,
  type = "radio",
  name,
  register,
  list,
  defaultValue,
  error,
  action,
}) => {
  const handleChange = (e) => {
    action && action(e.target.value);
  };

  return (
    <>
      <Form.Group className="mb-3">
        {label && <Form.Label className="me-4">{label}</Form.Label>}
        <br />
        {list.map((item, i) => (
          <span key={i} className="d-inline-block" value={defaultValue}>
            {/* <span key={i} className="d-inline-block"> */}
            <input
              id={`${label}-${i}`}
              value={item.id}
              type={type}
              {...register(name)}
              onChange={handleChange}
              checked={defaultValue === item.id.toString()}
            />
            <label htmlFor={`${label}-${i}`} className="mx-2 pointer">
              {item.name}
            </label>
          </span>
        ))}

        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default RadioByObj;
