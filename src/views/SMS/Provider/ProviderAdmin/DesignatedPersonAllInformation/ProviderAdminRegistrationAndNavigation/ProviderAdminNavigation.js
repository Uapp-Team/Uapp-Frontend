import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const ProviderAdminNavigation = ({
  activetab,
  providerId,
  providerAdminId,
}) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  useEffect(() => {
    console.log("activeTab", activetab);
    setcurrentTab(activetab);
  }, []);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab == "1") {
      history.push(
        `/providerAdminGeneralInfo/${providerId}/${providerAdminId}`
      );
    }

    if (tab == "2") {
      history.push(
        `/providerAdminPersonalInfo/${providerId}/${providerAdminId}`
      );
    }

    if (tab == "3") {
      history.push(
        `/providerAdminContactInfo/${providerId}/${providerAdminId}`
      );
    }

    if (tab == "4") {
      history.push(
        `/providerAdminEligibilityInfo/${providerId}/${providerAdminId}`
      );
    }
    if (tab == "5") {
      history.push(
        `/providerAdminTermsAndConditionInfo/${providerId}/${providerAdminId}`
      );
    }
  };

  return (
    <Nav tabs>
      <NavItem>
        <NavLink active={currentTab == "1"} onClick={() => navigateTo("1")}>
          General Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab == "2"} onClick={() => navigateTo("2")}>
          Personal Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab == "3"} onClick={() => navigateTo("3")}>
          Contact Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab == "4"} onClick={() => navigateTo("4")}>
          Eligibility
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab == "5"} onClick={() => navigateTo("5")}>
          Terms & Condition
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default ProviderAdminNavigation;
