import React from "react";

const Line = ({ bgColor, margin, height = "2px" }) => {
  return (
    <div
      style={{
        background: bgColor,
        marginTop: margin,
        marginBottom: margin,
        height: height,
      }}
    ></div>
  );
};

export default Line;
