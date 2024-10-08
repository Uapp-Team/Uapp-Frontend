import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const DetailsAndTermsNavigation = ({ activetab, admissionManagerId }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  useEffect(() => {
    console.log("activeTab", activetab);
    setcurrentTab(activetab);
  }, []);

  const navigateTo = (tab) => {
    setcurrentTab(tab);
    console.log(tab);

    if (tab == "1") {
      history.push(`/admissionManagerDetails/${admissionManagerId}`);
    }

    if (tab == "2") {
      history.push(`/admissionManagerTermsandConditions/${admissionManagerId}`);
    }
  };
  return (
    <Nav tabs>
      <NavItem>
        <NavLink active={currentTab == "1"} onClick={() => navigateTo("1")}>
          Details
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab == "2"} onClick={() => navigateTo("2")}>
          Terms & Conditrions
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default DetailsAndTermsNavigation;
