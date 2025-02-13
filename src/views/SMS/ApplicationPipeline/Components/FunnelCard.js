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
  onClick,
}) => {
  return (
    <>
      <div>
        <div
          className={`funnel-card ${isActive ? "active" : ""}`}
          style={{
            backgroundColor,
            height,
            transform: `rotateY(${rotateY})`,
          }}
          onClick={onClick}
        >
          <p className="title">{title}</p>
          <div className={`circle ${isActive ? "circle-active" : ""}`}>
            <p className="mt-3">{count}</p>
          </div>
          <p className={isActive ? "label-active" : "label"}>
            {applicationsLabel}
          </p>
          <p className={isActive ? "students-active" : "students"}>
            {studentsLabel}
          </p>
        </div>
      </div>
    </>
  );
};

export default FunnelCard;
