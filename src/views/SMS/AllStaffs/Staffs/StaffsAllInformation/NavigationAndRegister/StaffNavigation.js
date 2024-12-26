import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import get from "../../../../../../helpers/get";

const StaffNavigation = ({ activetab, staffId, success, action }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  const [activity, setActivity] = useState({});

  useEffect(() => {
    setcurrentTab(activetab);
  }, [activetab]);

  useEffect(() => {
    get(`EmployeeNavbar/GetNavbar/${staffId}`).then((res) => {
      setActivity(res);
    });
  }, [staffId, success]);

  useEffect(() => {
    action(activity);
  }, [activity, action]);

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
        <NavLink
          active={currentTab === "1"}
          onClick={() => navigateTo("1")}
          disabled={!activity?.general}
        >
          General Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "2"}
          onClick={() => navigateTo("2")}
          disabled={!activity?.personal}
        >
          Personal Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "3"}
          onClick={() => navigateTo("3")}
          disabled={!activity?.contact}
        >
          Contact Information
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "4"}
          onClick={() => navigateTo("4")}
          disabled={!activity?.emergency}
        >
          Emergency Contact
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "5"}
          onClick={() => navigateTo("5")}
          disabled={!activity?.eligibility}
        >
          Eligibility
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default StaffNavigation;
