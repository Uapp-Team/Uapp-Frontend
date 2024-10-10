import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const Radio = ({
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
            <input
              id={`${label}-${i}`}
              value={item}
              type={type}
              {...register(name)}
              onChange={handleChange}
              defaultChecked={defaultValue === item}
            />
            <label htmlFor={`${label}-${i}`} className="mx-2 pointer">
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
