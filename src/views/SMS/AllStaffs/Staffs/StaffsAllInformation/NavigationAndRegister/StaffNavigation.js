import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const StaffNavigation = ({ activetab, staffId }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  useEffect(() => {
    console.log("activeTab", activetab);
    setcurrentTab(activetab);
  }, [activetab]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/staffGeneralInformation/${staffId}`);
    }

    if (tab === "2") {
      history.push(`/staffPersonalInformation/${staffId}`);
    }

    if (tab === "3") {
      history.push(`/staffContactInformation/${staffId}`);
    }

    if (tab === "4") {
      history.push(`/stafEmergencyInformation/${staffId}`);
    }

    if (tab === "5") {
      history.push(`/staffEligibility/${staffId}`);
    }
  };
  return (
    <Nav tabs>
      <NavItem>
        <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
          General Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "2"} onClick={() => navigateTo("2")}>
          Personal Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "3"} onClick={() => navigateTo("3")}>
          Contact Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "4"} onClick={() => navigateTo("4")}>
          Emergency Contact
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "5"} onClick={() => navigateTo("5")}>
          Eligibility
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default StaffNavigation;
