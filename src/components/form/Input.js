import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const Input = ({
  label,
  type = "text",
  name,
  register,
  placeholder,
  defaultValue,
  error,
  onChange,
  className = "mb-3",
  disabled = false,
}) => {
  return (
    <Form.Group className={type !== "hidden" && className}>
      {label && <span>{label}</span>}

      {register ? (
        <Form.Control
          type={type}
          {...register(name)}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          className="mw-150px"
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={defaultValue}
          onChange={onChange}
          disabled={disabled}
          className="mw-150px"
        />
      )}
      <ErrorText error={error} />
    </Form.Group>
  );
};

export default Input;
