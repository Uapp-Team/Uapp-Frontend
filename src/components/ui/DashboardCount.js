import React from "react";
import { Link } from "react-router-dom";

const DashboardCount = ({
  title,
  value,
  link,
  bgColor,
  borderColor,
  secondValue,
  secondColor,
  secondBgColor,
}) => {
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
              {secondValue > 0 && (
                <span
                  className="fs-12px fw-500 rounded nopointer d-inline-block"
                  style={{
                    padding: "4px 6px",
                    marginLeft: "16px",
                    backgroundColor: secondBgColor,
                    color: secondColor,
                  }}
                >
                  {secondValue} Students
                </span>
              )}
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
            {secondValue > 0 && (
              <span
                className="fs-12px fw-500 rounded nopointer d-inline-block"
                style={{
                  padding: "4px 6px",
                  marginLeft: "16px",
                  backgroundColor: secondBgColor,
                  color: secondColor,
                }}
              >
                {secondValue} Students
              </span>
            )}
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
