import React from "react";

const IconBtn = ({
  Icon,
  type = "submit",
  buttonStatus,
  action,
  className,
  color,
}) => {
  return (
    <span>
      <button
        className={`fs-20px ${className}`}
        type={type}
        onClick={action}
        disabled={buttonStatus === true ? true : false}
        style={{
          color: color,
          padding: 0,
          border: "none",
          background: "transparent",
        }}
      >
        <Icon />
      </button>
    </span>
  );
};

export default IconBtn;
