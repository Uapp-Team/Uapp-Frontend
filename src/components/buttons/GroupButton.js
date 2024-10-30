import React from "react";

const GroupButton = ({ list, value, setValue, action }) => {
  const handleChange = (item) => {
    setValue(item.id);
    action && action();
  };

  return (
    <>
      <div className="btn-group" role="group" aria-label="Basic example">
        {list?.map((item, i) => (
          <button
            key={i}
            onClick={() => handleChange(item)}
            className={`btn border px-3 py-2 mb-3 fw-600 ${
              value === item?.id ? "bg-orange text-white" : "bg-white"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default GroupButton;
