import React from "react";

const Status = ({ text, textColor, bgColor, action }) => {
  const handleClick = () => {
    action && action();
  };

  return (
    <p
      className={`fs-12px pt-2px pl-8px pr-8px pb-2px m-1px d-inline-block rounded-pill ${
        action && "pointer"
      }`}
      style={{
        backgroundColor:
          text === "New"
            ? "#E2E8F0"
            : text === "In Process"
            ? "#DBEAFE"
            : text === "Interested"
            ? "#FEF3C7"
            : text === "Converted"
            ? "#D1FAE5"
            : text === "Not Converted"
            ? "#F6E8FC"
            : text === "Waste"
            ? "#FFE4E6"
            : bgColor,
        color:
          text === "New"
            ? "#334155"
            : text === "In Process"
            ? "#3B82F6"
            : text === "Interested"
            ? "#F59E0B"
            : text === "Converted"
            ? "#10B981"
            : text === "Not Converted"
            ? "#B83BF6"
            : text === "Waste"
            ? "#F43F5E"
            : textColor,
      }}
      onClick={handleClick}
    >
      {text}
    </p>
  );
};

export default Status;
