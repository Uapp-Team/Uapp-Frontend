import React from "react";

const GroupButton = ({
  register,
  name,
  list,
  defaultValue,
  setValue,
  action,
}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
    action && action(e.target.value);
  };

  return (
    <>
      <input id="hi" type="hidden" {...register(name)} value={defaultValue} />

      <div className="w-100" style={{ marginLeft: "-12px" }}>
        {list?.map((item, i) => (
          <span key={i} className="d-inline-block" value={defaultValue}>
            <input
              id={`${name}-${i}`}
              value={item.id}
              type="radio"
              {...register(name)}
              onChange={handleChange}
              defaultChecked={defaultValue === item.id}
              style={{
                opacity: 0,
              }}
            />

            <label
              htmlFor={`${name}-${i}`}
              className={`btn p-2 border-radius-5px fw-600 ${
                defaultValue === item.id
                  ? "bg-white border-faq-modal text-faq-modal"
                  : "bg-white"
              }`}
            >
              {item.name}
            </label>
          </span>
        ))}
      </div>
    </>
  );
};

export default GroupButton;
