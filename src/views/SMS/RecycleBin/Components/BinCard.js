import React from "react";
import { Link } from "react-router-dom";

const BinCard = ({
  title,
  value,
  link,
  icon,
  bgColor = "#EDF2F2",
  borderColor = "#689E9E",
}) => {
  return (
    <div
      className="d-flex recycleBin-dashboard-count-card border-1"
      style={{
        // backgroundColor: bgColor,
        // borderLeft: `3px solid ${borderColor}`,

        borderRadius: "12px",
        border: ".5px solid #D3D3D3",
        background: "#FFF",
      }}
    >
      {icon && <div className="recycle-dashboard-count-icon">{icon}</div>}
      <div>
        {link ? (
          <>
            <Link to={link}>
              <p className="recycle-dashboard-count-value">{value}</p>
            </Link>
            <Link to={link}>
              <p className="recycle-dashboard-count-title">{title}</p>
            </Link>
          </>
        ) : (
          <>
            <p className="recycle-dashboard-count-value">{value}</p>
            <p className="recycle-dashboard-count-title">{title}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BinCard;
