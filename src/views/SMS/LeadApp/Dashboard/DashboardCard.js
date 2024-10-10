import React from "react";

const DashboardCard = ({ text, value, bg, color, Icon }) => {
  return (
    <div
      className={`pl-24px pr-24px pt-20px pb-20px mb-30px rounded border d-flex justify-content-between`}
    >
      <div className="d-flex">
        {Icon && (
          <div
            className="d-flex align-items-center justify-content-center rounded mr-16px"
            style={{
              backgroundColor: bg,
              color: color,
              width: "56px",
              height: "56px",
            }}
          >
            <Icon size={24} />
          </div>
        )}
        <div>
          <p className="fw-600 fs-24px">{value}</p> <span>{text}</span>
        </div>
      </div>
      {Icon && (
        <div>
          <Icon style={{ color: "#EDF2F2" }} size={60} />
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
