import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const InputEdit = ({
  label,
  type = "text",
  name,
  register,
  placeholder,
  defaultValue,
  error,
  onChange,
  className = "mb-1",
}) => {
  return (
    <Form.Group className={className}>
      {label && <Form.Label>{label}</Form.Label>}

      {register ? (
        <Form.Control
          className={error ? `border-danger py-0` : `border-0 py-0`}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      ) : (
        <Form.Control
          className="border-0 py-0"
          type={type}
          placeholder={placeholder}
          value={defaultValue}
          onChange={onChange}
        />
      )}
      <ErrorText error={error} />
    </Form.Group>
  );
};

export default InputEdit;
