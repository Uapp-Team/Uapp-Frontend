import React from "react";

const CancelButton = ({ text = "Cancel", cancel, className }) => {
  return (
    <span>
      <button
        className={`cancel-button ${className}`}
        onClick={cancel}
        type="reset"
      >
        {text}
      </button>
    </span>
  );
};

export default CancelButton;
