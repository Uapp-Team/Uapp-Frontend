import React from "react";

const KeyBtn = ({ label, data, value, action }) => {
  return (
    <>
      <button
        type="button"
        className={` tag-button rounded-pill px-3 py-2 mb-1 ${
          data === value && "bg-theme"
        }`}
        onClick={() => action && action(value)}
      >
        {label}
      </button>
    </>
  );
};

export default KeyBtn;
