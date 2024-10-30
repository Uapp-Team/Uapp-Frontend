import React from "react";
import { Form } from "react-bootstrap";
import ErrorText from "./ErrorText";

const CheckBox = ({
  id,
  label,
  type = "checkbox",
  name,
  register,
  list,
  defaultValue,
  error,
  action,
  isValueShow = true,
  className = "mb-3",
}) => {
  // const handleChange = (e) => {
  //   if (e.target.checked) {
  //     defaultValue.push(e.target.value);
  //   } else {
  //     let index = defaultValue.indexOf(e.target.value);
  //     defaultValue.splice(index, 1);
  //   }
  //   action(defaultValue);
  // };

  const handleChange = (e) => {
    let id = e.target.value;
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
          <span key={i} className="d-flex align-items-center mb-3">
            <input
              id={`${id}-${i}`}
              value={item}
              type={type}
              {...register(name)}
              onChange={handleChange}
              defaultChecked={defaultValue?.includes(item)}
            />
            {isValueShow && (
              <label
                htmlFor={`${id}-${i}`}
                className="mx-2 pointer fs-16px mb-0"
              >
                {item}
              </label>
            )}
          </span>
        ))}

        <ErrorText error={error} />
      </Form.Group>
    </>
  );
};

export default CheckBox;
