import React from "react";

const OverflowHeightText = ({ text, className, line = 1 }) => {
  return (
    <>
      <div
        className={className}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: line,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={text}
      >
        {text}
      </div>
    </>
  );
};

export default OverflowHeightText;
