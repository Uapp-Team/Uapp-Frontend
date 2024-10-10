import React from "react";
import SideMenuItem from "./SideMenuItem";
import SideMenuParentItem from "./SideMenuParentItem";
import { recycleMenu } from "./RecycleJson";

const SideMenuBin = () => {
  return (
    <>
      {recycleMenu.map((item, i) => (
        <>
          {item?.children?.length > 0 ? (
            <SideMenuParentItem
              key={i}
              title={item?.title}
              icon={item?.icon}
              path={item?.navLink}
              children={item?.children}
            />
          ) : (
            <SideMenuItem
              key={i}
              title={item?.title}
              icon={item?.icon}
              path={item?.navLink}
            />
          )}
        </>
      ))}

      {/* <SideMenuItem
        title="Accounts Manager"
        icon="fas fa-money-check"
        path="/recycle/accountsManager"
      /> */}
      {/* 
      <SideMenuItem
        title="Accounts Officer"
        icon="fas fa-money-check"
        path="/recycle/accountsOfficer"
      /> */}

      {/* <SideMenuItem title="Admin" icon="fas fa-users" path="/recycle/admin" /> */}

      {/* <SideMenuItem
        title="Compliance Manager"
        icon="fas fa-users"
        path="/recycle/complianceManager"
      />
      <SideMenuItem
        title="Compliance Officer"
        icon="far fa-user"
        path="/recycle/complianceOfficer"
      />
      <SideMenuItem title="Editor" icon="far fa-newspaper" path="/recycle/editor" />

      <SideMenuItem
        title="Finance Manager"
        icon="fas fa-money-check"
        path="/recycle/financeManager"
      /> */}
    </>
  );
};

export default SideMenuBin;
