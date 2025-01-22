import React from "react";

const PipelineCard = ({
  key,
  title,
  applications,
  students,
  width,
  bgColor,
  activeBgColor,
  isActive,
  onClick,
}) => {
  return (
    <>
      <div
        key={key}
        className={`pipline-card ${
          isActive ? "text-white" : "theme-text-primary"
        }`}
        style={{
          backgroundColor: isActive ? activeBgColor : bgColor,
          minWidth: width,
        }}
        onClick={onClick}
      >
        <p className="fs-12px mb-24px fw-500">{title}</p>
        <div
          className={`d-flex align-items-center justify-content-center rounded-pill w-48px h-48px fw-600 fs-14px ${
            isActive ? "bg-white theme-text-primary" : "bg-367d7e text-white"
          }`}
        >
          {applications}
        </div>
        <p className="fs-10px mb-24px">Applications</p>
        <p className="fs-12px">
          <span className="fw-500">{students} </span>Student
        </p>
      </div>
    </>
  );
};

export default PipelineCard;
