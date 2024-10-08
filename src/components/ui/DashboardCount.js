import React from "react";
import { Link } from "react-router-dom";

const DashboardCount = ({ title, value, link, bgColor, borderColor }) => {
  return (
    <div
      className="dashboard-count-card consultant-dashboard-count-card"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {link ? (
        <>
          <Link to={link}>
            <p className="dashboard-count-value consultant-dashboard-count-value">
              {value}
            </p>
          </Link>
          <Link to={link}>
            <p className="dashboard-count-title consultant-dashboard-count-title">
              {title}
            </p>
          </Link>
        </>
      ) : (
        <>
          <p className="dashboard-count-value consultant-dashboard-count-value">
            {value}
          </p>
          <p className="dashboard-count-title consultant-dashboard-count-title">
            {title}
          </p>
        </>
      )}
    </div>
  );
};

export default DashboardCount;
