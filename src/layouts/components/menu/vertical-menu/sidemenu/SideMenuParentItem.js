import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideMenuItem from "./SideMenuItem";

const SideMenuParentItem = ({ key = 0, title, icon, path, children }) => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      <li
        key={key}
        className={`nav-item uapp-nav-item has-sub ${
          currentLocation === path && "active"
        }`}
      >
        <Link
          onClick={() => setCollapse(!collapse)}
          className="d-flex justify-content-start"
        >
          <div className="menu-text">
            <i className={icon}></i>
            <span className="menu-item menu-title">{title}</span>
          </div>
          {collapse ? (
            <i class="fas fa-angle-down fs-12px"></i>
          ) : (
            <i className="fas fa-angle-right fs-12px"></i>
          )}
        </Link>
      </li>
      {collapse &&
        children.length > 0 &&
        children.map((item, i) => (
          <SideMenuItem
            key={i}
            title={item?.title}
            icon={item?.icon}
            path={item?.navLink}
          />
        ))}
    </>
  );
};

export default SideMenuParentItem;
