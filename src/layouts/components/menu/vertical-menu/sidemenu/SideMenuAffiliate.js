import React from "react";
import SideMenuItem from "./SideMenuItem";

const SideMenuAffiliate = () => {
  return (
    <>
      <SideMenuItem title="Overview" icon="fas fa-tachometer-alt" path="/" />
      <SideMenuItem title="Profile" icon="far fa-user" path="/profile" />
      <SideMenuItem
        title="Invitation"
        icon="fas fa-door-open"
        path="/affiliate-Invitation"
      />
      <SideMenuItem
        title="Earning"
        icon="fas fa-money-check-alt"
        path="/affiliate-earning"
      />
      <SideMenuItem
        title="My Applications"
        icon="far fa-file"
        path="/applications"
      />
      <SideMenuItem title="Content" icon="fas fa-clipboard" path="/content" />
      <SideMenuItem
        title="My Team"
        icon="fas fa-user-tie"
        path="/affiliate-team-List"
      />
    </>
  );
};

export default SideMenuAffiliate;
