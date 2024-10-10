import React from "react";

const TextBeside = ({
  title,
  text,
  link,
  className = "d-flex justify-content-between mb-8px",
}) => {
  return (
    <div className={className}>
      {title && (
        <p className={`fs-14px fw-600 gray-500 ${text && "w-50"} mb-0`}>
          {title}
        </p>
      )}
      {text && !link && (
        <p className="fs-14px fw-400 gray-700 w-50 mb-0">{text}</p>
      )}
      {text && link && (
        <a
          href={link}
          target="blank"
          className="fs-14px fw-400 teal-600 w-50 mb-0"
        >
          {text}
        </a>
      )}
    </div>
  );
};

export default TextBeside;
