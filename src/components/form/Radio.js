import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const Radio = ({
  id,
  label,
  type = "radio",
  name,
  register,
  list,
  defaultValue,
  error,
  action,
  className = "mb-3",
}) => {
  const handleChange = (e) => {
    action && action(e.target.value);
  };

  return (
    <>
      <Form.Group className={className}>
        {label && (
          <>
            <Form.Label className="me-4">{label}</Form.Label> <br />
          </>
        )}

        {list?.map((item, i) => (
          <span
            key={i}
            className="d-flex align-items-center mb-3"
            value={defaultValue}
          >
            <input
              id={`${label ? label : id}-${i}`}
              value={item}
              type={type}
              {...register(name)}
              onChange={handleChange}
              defaultChecked={defaultValue === item}
            />
            <label
              htmlFor={`${label ? label : id}-${i}`}
              className="mx-2 pointer fs-16px mb-0"
            >
              {item}
            </label>
          </span>
        ))}

        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default Radio;
