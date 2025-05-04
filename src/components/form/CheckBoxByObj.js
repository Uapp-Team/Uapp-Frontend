import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const CheckBoxByObj = ({
  label,
  type = "checkbox",
  name,
  register,
  list,
  defaultValue,
  error,
  action,
  className = "mb-3",
  itemClassName = "d-block d-flex align-items-center mb-1",
}) => {
  const handleChange = (e) => {
    const type = typeof list[0].id;

    let id =
      type === "string"
        ? e.target.value.toString()
        : type === "number"
        ? parseInt(e.target.value)
        : e.target.value;
    let val = e.target.checked;

    if (defaultValue) {
      if (val === true) {
        if (!defaultValue.includes(id)) {
          action([...defaultValue, id]);
        }
      } else {
        const newD = id;
        const res = defaultValue.filter((c) => c !== newD);

        action(res);
      }
    }
  };

  return (
    <>
      <Form.Group className={className}>
        {label && (
          <>
            <Form.Label className="me-4">{label}</Form.Label> <br />
          </>
        )}

        {list.map((item, i) => (
          <span key={i} className={itemClassName}>
            <input
              id={`${name}-${i}`}
              value={item.id}
              type={type}
              {...register(name)}
              onClick={handleChange}
              checked={defaultValue?.includes(item.id)}
            />
            <label htmlFor={`${name}-${i}`} className="mx-2 pointer mb-0">
              {item.name}
            </label>
          </span>
        ))}

        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default CheckBoxByObj;
