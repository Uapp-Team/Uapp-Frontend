import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

const ConsultantNavigation = ({
  activetab,
  consultantId,
  navVisibility,
  success,
}) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  useEffect(() => {
    setcurrentTab(activetab);
  }, [success, activetab]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/consultantInformation/${consultantId}`);
    }

    if (tab === "2") {
      history.push(`/consultantPersonalInformation/${consultantId}`);
    }

    if (tab === "3") {
      history.push(`/consultantContactInformation/${consultantId}`);
    }

    if (tab === "4") {
      history.push(`/consultantEmergencyInformation/${consultantId}`);
    }

    if (tab === "5") {
      history.push(`/consultantEligibilityInformation/${consultantId}`);
    }
    if (tab === "6") {
      history.push(`/consultantBankInformation/${consultantId}`);
    }

    if (tab === "7") {
      history.push(`/consultantRecruitmentInformation/${consultantId}`);
    }

    if (tab === "8") {
      history.push(`/consultantCommissionInformation/${consultantId}`);
    }

    if (tab === "9") {
      history.push(`/consultantTermsInformation/${consultantId}`);
    }
  };
  return (
    <Nav tabs>
      {navVisibility?.general ? (
        <NavItem>
          <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
            Consultant Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.personal ? (
        <NavItem>
          <NavLink active={currentTab === "2"} onClick={() => navigateTo("2")}>
            Personal Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.contact ? (
        <NavItem>
          <NavLink active={currentTab === "3"} onClick={() => navigateTo("3")}>
            Address
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.emergency ? (
        <NavItem>
          <NavLink active={currentTab === "4"} onClick={() => navigateTo("4")}>
            Emergency Contact
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.eligibility ? (
        <NavItem>
          <NavLink active={currentTab === "5"} onClick={() => navigateTo("5")}>
            Right to work
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.bankDetails ? (
        <NavItem>
          <NavLink active={currentTab === "6"} onClick={() => navigateTo("6")}>
            Bank Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.recruitment ? (
        <NavItem>
          <NavLink active={currentTab === "7"} onClick={() => navigateTo("7")}>
            Recruitment
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.commission ? (
        <NavItem>
          <NavLink active={currentTab === "8"} onClick={() => navigateTo("8")}>
            Commission
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.tandC ? (
        <NavItem>
          <NavLink active={currentTab === "9"} onClick={() => navigateTo("9")}>
            Terms & Conditions
          </NavLink>
        </NavItem>
      ) : null}
    </Nav>
  );
};

export default ConsultantNavigation;
