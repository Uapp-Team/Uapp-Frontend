import React from "react";
import SideMenuItem from "./SideMenuItem";

const SideMenuProviderAdmin = () => {
  return (
    <>
      <SideMenuItem title="Overview" icon="fas fa-tachometer-alt" path="/" />
      <SideMenuItem title="Profile" icon="far fa-user" path="/profile" />
      <SideMenuItem
        title="Admission Manager"
        icon="fas fa-user-tie"
        path="/admissionManagerList"
      />
      <SideMenuItem
        title="Admission Officer"
        icon="fas fa-user"
        path="/admissionOfficerList"
      />
      <SideMenuItem
        title="Applications"
        icon="far fa-file"
        path="/applications"
      />
      <SideMenuItem
        title="Universities"
        icon="fas fa-university"
        path="/universityList"
      />
      <SideMenuItem
        title="Department"
        icon="fas fa-building"
        path="/department"
      />
      <SideMenuItem
        title="Sub Department"
        icon="far fa-building"
        path="/subDepartment"
      />
      <SideMenuItem title="Intakes" icon="fas fa-calendar-day" path="/intake" />
      <SideMenuItem title="Report" icon="fas fa-pager" path="/r" />
    </>
  );
};

export default SideMenuProviderAdmin;
