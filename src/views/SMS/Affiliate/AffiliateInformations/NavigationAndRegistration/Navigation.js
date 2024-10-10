import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";

const Navigation = ({ title, activetab, affiliateId, success }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    setcurrentTab(activetab);
  }, [success, activetab]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/affiliatePersonalInfo/${affiliateId}`);
    }

    if (tab === "2") {
      history.push(`/affiliateContactInfo/${affiliateId}`);
    }

    if (tab === "3") {
      history.push(`/affiliateEmergencyInfo/${affiliateId}`);
    }

    if (tab === "4") {
      history.push(`/affiliateEligibilityInfo/${affiliateId}`);
    }

    if (tab === "5") {
      history.push(`/affiliateBankInfo/${affiliateId}`);
    }
    if (tab === "6") {
      history.push(`/affiliateCommission/${affiliateId}`);
    }
    if (tab === "7") {
      history.push(`/affiliateTerms/${affiliateId}`);
    }
  };
  return (
    <>
      <BreadCrumb
        title={title}
        backTo={userType === userTypes?.Affiliate ? null : "Affiliate"}
        path={`/affiliate-list`}
      />

      <Nav tabs>
        <NavItem>
          <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
            Affiliate Details
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={currentTab === "2"} onClick={() => navigateTo("2")}>
            Address
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={currentTab === "3"} onClick={() => navigateTo("3")}>
            Emergency Contact
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={currentTab === "4"} onClick={() => navigateTo("4")}>
            Right to work
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={currentTab === "5"} onClick={() => navigateTo("5")}>
            Bank Details
          </NavLink>
        </NavItem>
        {userType === userTypes?.SystemAdmin.toString() ||
        userType === userTypes?.Admin.toString() ? (
          <NavItem>
            <NavLink
              active={currentTab === "6"}
              onClick={() => navigateTo("6")}
            >
              Commission
            </NavLink>
          </NavItem>
        ) : null}

        <NavItem>
          <NavLink active={currentTab === "7"} onClick={() => navigateTo("7")}>
            Terms & Conditions
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default Navigation;
