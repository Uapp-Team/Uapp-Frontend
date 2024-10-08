import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const ProviderNavigation = ({ id, activetab }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");

  useEffect(() => {
    setcurrentTab(activetab);
  }, [activetab]);

  const navigateTo = (tab) => {
    setcurrentTab(activetab);
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/updateProvider/${id}`);
    }

    if (tab === "2") {
      history.push(`/providerAddress/${id}`);
    }

    if (tab === "3") {
      history.push(`/adminInformation/${id}`);
    }
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
            Provider Information
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={currentTab === "2"}
            onClick={() => navigateTo("2")}
            // disabled={!activity?.application}
          >
            Provider Address
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={currentTab === "3"}
            onClick={() => navigateTo("3")}
            // disabled={!activity?.contact}
          >
            Admin Information
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ProviderNavigation;
