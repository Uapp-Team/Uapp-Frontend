import React from "react";

const TagButton = ({ label, setValue, setLabel }) => {
  return (
    <>
      <button type="button" className="tag-button mb-2">
        {label}{" "}
        <span
          className="btn pr-0 pl-1 py-0"
          style={{ color: "rgba(0, 0, 0, 0.45)" }}
          onClick={() => {
            setValue();
            setLabel();
          }}
        >
          X
        </span>
      </button>
    </>
  );
};

export default TagButton;
