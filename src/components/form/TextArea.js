import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const TextArea = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  error,
  onChange,
  className,
  disabled = false,
}) => {
  return (
    <Form.Group className={`mb-3 ${className}`}>
      {label && <span>{label}</span>}

      {register ? (
        <textarea
          placeholder={placeholder}
          {...register(name)}
          defaultValue={defaultValue}
          rows="4"
          className="form-control"
          disabled={disabled}
        />
      ) : (
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          value={defaultValue}
          rows="4"
          className="form-control"
          disabled={disabled}
        />
      )}
      <ErrorText error={error} />
    </Form.Group>
  );
};

export default TextArea;
