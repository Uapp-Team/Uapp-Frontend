import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const CheckOne = ({
  label,
  id = 0,
  name,
  register,
  defaultValue,
  error,
  onChange,
  className = "mb-3",
}) => {
  const [isCheck, setIsCheck] = useState(defaultValue);

  return (
    <>
      <Form.Group className={className}>
        <span className="d-inline-block d-flex align-items-center">
          {register ? (
            <input
              {...register(name)}
              type="checkbox"
              id={`${label}-${id}`}
              onChange={(e) => setIsCheck(!isCheck)}
              checked={isCheck}
              value={isCheck}
            />
          ) : (
            <input
              type="checkbox"
              id={`${label}-${id}`}
              onChange={onChange}
              defaultChecked={defaultValue}
              value={defaultValue}
            />
          )}

          <label htmlFor={`${label}-${id}`} className="mx-2 pointer mb-0">
            {label}
          </label>
        </span>

        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default CheckOne;
