import React, { useState } from "react";
import ErrorText from "./ErrorText";
import { Form } from "react-bootstrap";

const CheckSwitch = ({
  label,
  name,
  register,
  defaultValue,
  error,
  action,
}) => {
  const [isCheck, setIsCheck] = useState(defaultValue);

  const onChange = () => {
    setIsCheck(!isCheck);
    action && action();
  };

  return (
    <>
      <Form.Check
        {...register(name)}
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultValue}
        id={label}
        value={defaultValue}
      />

      {/* <label className="toggle-switch">
        <input
          {...register(name)}
          type="checkbox"
          defaultChecked={defaultValue}
          onChange={onChange}
        />
        <span className="switch" />
      </label> */}

      {label && (
        <label htmlFor={label} className="mx-2 pointer">
          {label}
        </label>
      )}

      <ErrorText error={error} />
    </>
  );
};

export default CheckSwitch;
