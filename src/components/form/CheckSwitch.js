import React, { useState } from "react";
import ErrorText from "./ErrorText";

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
      {/* <Form.Check
        {...register(name)}
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultValue}
        id={label}
        value={defaultValue}
      /> */}

      <div className="d-flex">
        <label className="toggle-switch">
          <input
            {...register(name)}
            type="checkbox"
            defaultChecked={defaultValue}
            onChange={onChange}
          />
          <span className="switch" />
        </label>

        {label && (
          <label htmlFor={label} className="mx-2 fs-12px pointer">
            {label}
          </label>
        )}
      </div>

      <ErrorText error={error} />
    </>
  );
};

export default CheckSwitch;
