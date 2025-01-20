import React from "react";

const FunnelCard = ({
  title,
  count,
  applicationsLabel,
  studentsLabel,
  isActive,
  backgroundColor,
  height,
  rotateY,
}) => {
  return (
    <div
      className={`funnel-card ${isActive ? "active" : ""}`}
      style={{
        backgroundColor,
        height,
        transform: `rotateY(${rotateY})`,
      }}
    >
      <p className="title">{title}</p>
      <div className={`circle ${isActive ? "circle-active" : ""}`}>
        <p className="circle-count">{count}</p>
      </div>
      <p className={isActive ? "label-active" : "label"}>{applicationsLabel}</p>
      <p className={isActive ? "students-active" : "students"}>
        {studentsLabel}
      </p>
    </div>
  );
};

export default FunnelCard;
