import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import get from "../../../../../../helpers/get";

const AdmissionOfficerNavigation = ({
  activetab,
  admissionOfficerId,
  action,
}) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState(activetab);
  const [navItem, setNavItem] = useState("");
  useEffect(() => {
    get(`AdmissionOfficerNavbar/get/${admissionOfficerId}`).then((res) => {
      setNavItem(res);
    });
  }, [admissionOfficerId]);

  useEffect(() => {
    action(navItem);
  }, [action, navItem]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/admissionOfficerGeneralInfo/${admissionOfficerId}`);
    }

    if (tab === "2") {
      history.push(`/admissionOfficerPersonalInfo/${admissionOfficerId}`);
    }

    if (tab === "3") {
      history.push(`/admissionOfficerContactInfo/${admissionOfficerId}`);
    }

    if (tab === "4") {
      history.push(`/admissionOfficerEmergencyInfo/${admissionOfficerId}`);
    }

    if (tab === "5") {
      history.push(`/admissionOfficerEligibilityInfo/${admissionOfficerId}`);
    }
    if (tab === "6") {
      history.push(
        `/admissionOfficerTermsAndConditionInfo/${admissionOfficerId}`
      );
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
      {navItem?.terms === true && (
        <NavItem>
          <NavLink active={currentTab === "6"} onClick={() => navigateTo("6")}>
            Terms & Conditions
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
};

export default AdmissionOfficerNavigation;
