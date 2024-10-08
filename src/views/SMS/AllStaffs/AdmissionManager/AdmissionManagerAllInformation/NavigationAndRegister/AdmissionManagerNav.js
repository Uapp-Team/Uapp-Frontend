import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import get from "../../../../../../helpers/get";

const AdmissionManagerNav = ({ activetab, admissionManagerId, action }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState(activetab);
  const [navItem, setNavItem] = useState("");
  useEffect(() => {
    get(`AdmissionManagerNavbar/get/${admissionManagerId}`).then((res) => {
      setNavItem(res);
    });
  }, [admissionManagerId]);

  useEffect(() => {
    action(navItem);
  }, [action, navItem]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);
    console.log(tab);

    if (tab === "1") {
      history.push(`/admissionManagerGeneralInformation/${admissionManagerId}`);
    }

    if (tab === "2") {
      history.push(
        `/admissionManagerPersonalInformation/${admissionManagerId}`
      );
    }

    if (tab === "3") {
      history.push(`/admissionManagerContactInformation/${admissionManagerId}`);
    }

    if (tab === "4") {
      history.push(
        `/admissionManagerEmergencyInformation/${admissionManagerId}`
      );
    }

    if (tab === "5") {
      history.push(
        `/admissionManagerEligibilityInformation/${admissionManagerId}`
      );
    }

    if (tab === "6") {
      history.push(
        `/admissionManagersOfficerInformation/${admissionManagerId}`
      );
    }
    if (tab === "7") {
      history.push(`/admissionManagerTermsInformation/${admissionManagerId}`);
    }
  };

  return (
    <Nav tabs>
      {navItem?.general === true && (
        <NavItem>
          <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
            General Information
          </NavLink>
        </NavItem>
      )}
      {navItem?.personal === true && (
        <NavItem>
          <NavLink active={currentTab === "2"} onClick={() => navigateTo("2")}>
            Personal Information
          </NavLink>
        </NavItem>
      )}
      {navItem?.contact === true && (
        <NavItem>
          <NavLink active={currentTab === "3"} onClick={() => navigateTo("3")}>
            Contact Information
          </NavLink>
        </NavItem>
      )}
      {navItem?.emergency === true && (
        <NavItem>
          <NavLink active={currentTab === "4"} onClick={() => navigateTo("4")}>
            Emergency Contact
          </NavLink>
        </NavItem>
      )}
      {navItem?.eligibility === true && (
        <NavItem>
          <NavLink active={currentTab === "5"} onClick={() => navigateTo("5")}>
            Eligibility
          </NavLink>
        </NavItem>
      )}
      {navItem?.admissionOfficer === true && (
        <NavItem>
          <NavLink active={currentTab === "6"} onClick={() => navigateTo("6")}>
            Admission officer
          </NavLink>
        </NavItem>
      )}

      {navItem?.terms === true && (
        <NavItem>
          <NavLink active={currentTab === "7"} onClick={() => navigateTo("7")}>
            Terms & Conditions
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
};

export default AdmissionManagerNav;
