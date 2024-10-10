import React from "react";

const Text = ({ title, text, className = "mb-24px" }) => {
  return (
    <div className={className}>
      {title && <p className="fs-12px fw-800 gray-500 mb-8px">{title}</p>}
      {text && <span className="gray-700">{text}</span>}
    </div>
  );
};

export default Text;
