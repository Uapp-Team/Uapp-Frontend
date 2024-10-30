import React from "react";

const TopicDivider = ({ text, bgColor = "#fff", color = "#344054" }) => {
  return (
    <div className="relative">
      <hr />
      <p
        className="hr-heading"
        style={{
          backgroundColor: bgColor,
          color: color,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default TopicDivider;
