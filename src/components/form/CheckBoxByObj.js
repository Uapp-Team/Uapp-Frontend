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
      <Form.Group className="mb-3">
        {label && <Form.Label className="me-4">{label}</Form.Label>}
        <br />
        {list.map((item, i) => (
          <span key={i} className="d-inline-block">
            <input
              id={`${label}-${i}`}
              value={item.id}
              type={type}
              {...register(name)}
              onClick={handleChange}
              checked={defaultValue?.includes(item.id)}
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

export default CheckBoxByObj;
