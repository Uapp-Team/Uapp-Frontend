import React from "react";
import SideMenuItem from "./SideMenuItem";

const SideMenuCompanion = () => {
  return (
    <>
      <SideMenuItem title="Overview" icon="fas fa-tachometer-alt" path="/" />
      <SideMenuItem title="Profile" icon="far fa-user" path="/profile" />
      <SideMenuItem
        title="Invitation"
        icon="fas fa-door-open"
        path="/companion-Invitation"
      />
      <SideMenuItem
        title="Earning"
        icon="fas fa-money-check-alt"
        path="/companion-earning"
      />

      <SideMenuItem
        title="My Applications"
        icon="far fa-file"
        path="/applications"
      />
      <SideMenuItem title="Content" icon="far fa-user" path="/content" />

      <SideMenuItem
        title="My Team"
        icon="fas fa-user-tie"
        path="/companion-team-List"
      />
    </>
  );
};

export default SideMenuCompanion;
