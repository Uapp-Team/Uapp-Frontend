import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenuItem = ({ key = 0, title, icon, path }) => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <li
      key={key}
      className={`nav-item uapp-nav-item ${
        currentLocation === path && "active"
      }`}
    >
      <Link to={path} className="d-flex justify-content-start sidemenu">
        <div className="menu-text">
          <i className={icon}></i>
          <span className="menu-item menu-title">{title}</span>
        </div>
      </Link>
    </li>
  );
};

export default SideMenuItem;
