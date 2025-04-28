import React from "react";

const OverflowHeightText = ({ text, className, height, line = 1 }) => {
  return (
    <>
      <div
        className={className}
        style={{
          height: height,
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
