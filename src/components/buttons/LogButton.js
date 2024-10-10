import React from "react";
import { FaClipboard } from "react-icons/fa";

const LogButton = ({ text = "All Logs", action }) => {
  return (
    <>
      <button
        className="log-btn mb-1 d-flex align-items-center"
        onClick={action}
      >
        <FaClipboard className="text-dark-green" size={18} />
        <p className="mb-0 ml-2">{text}</p>
      </button>
    </>
  );
};

export default LogButton;
