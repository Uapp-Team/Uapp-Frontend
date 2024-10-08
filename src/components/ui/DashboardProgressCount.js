import React from "react";
import { Col } from "reactstrap";

const DashboardProgressCount = ({ title, value, bgColor }) => {
  return (
    <div
      className="dashboard-progress-count-card"
      style={{
        background: bgColor,
      }}
    >
      <p className="dashboard-progress-count-value">{value}</p>
      <p className="dashboard-progress-count-title">{title}</p>
    </div>
  );
};

export default DashboardProgressCount;
