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
      {navVisibility?.showGeneral ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openGeneral === false}
            active={currentTab === "1"}
            onClick={() => navigateTo("1")}
          >
            Consultant Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showPersonal ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openPersonal === false}
            active={currentTab === "2"}
            onClick={() => navigateTo("2")}
          >
            Personal Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showContact ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openContact === false}
            active={currentTab === "3"}
            onClick={() => navigateTo("3")}
          >
            Address
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showemergency ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openemergency === false}
            active={currentTab === "4"}
            onClick={() => navigateTo("4")}
          >
            Emergency Contact
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showEligibility ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openEligibility === false}
            active={currentTab === "5"}
            onClick={() => navigateTo("5")}
          >
            Right to work
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showBankDetails ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openBankDetails === false}
            active={currentTab === "6"}
            onClick={() => navigateTo("6")}
          >
            Bank Details
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showRecruitment ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openRecruitment === false}
            active={currentTab === "7"}
            onClick={() => navigateTo("7")}
          >
            Recruitment
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showcommission ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.opencommission === false}
            active={currentTab === "8"}
            onClick={() => navigateTo("8")}
          >
            Commission
          </NavLink>
        </NavItem>
      ) : null}

      {navVisibility?.showTandC ? (
        <NavItem>
          <NavLink
            disabled={navVisibility?.openTandC === false}
            active={currentTab === "9"}
            onClick={() => navigateTo("9")}
          >
            Terms & Conditions
          </NavLink>
        </NavItem>
      ) : null}
    </Nav>
  );
};

export default ConsultantNavigation;
