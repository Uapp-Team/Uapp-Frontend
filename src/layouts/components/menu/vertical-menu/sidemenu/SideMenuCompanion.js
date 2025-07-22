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
        path="/referrer-Invitation"
      />
      <SideMenuItem
        title="Earning"
        icon="fas fa-money-check-alt"
        path="/referrer-earning"
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
        path="/referrer-team-List"
      />
    </>
  );
};

export default SideMenuCompanion;
