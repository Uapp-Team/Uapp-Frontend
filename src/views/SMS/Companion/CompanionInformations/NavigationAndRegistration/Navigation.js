import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";

const Navigation = ({ title, activetab, companionId, success, action }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  const userType = localStorage.getItem("userType");
  const [activity, setActivity] = useState({});

  useEffect(() => {
    setcurrentTab(activetab);
  }, [success, activetab]);

  useEffect(() => {
    get(`CompanionNavbar/GetNavbar/${companionId}`).then((res) => {
      setActivity(res);
    });
  }, [companionId, success]);

  useEffect(() => {
    action(activity);
  }, [activity, action]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/companionPersonalInfo/${companionId}`);
    }

    if (tab === "2") {
      history.push(`/companionContactInfo/${companionId}`);
    }

    if (tab === "3") {
      history.push(`/companionEmergencyInfo/${companionId}`);
    }

    if (tab === "4") {
      history.push(`/companionEligibilityInfo/${companionId}`);
    }

    if (tab === "5") {
      history.push(`/companionBankInfo/${companionId}`);
    }
    if (tab === "6") {
      history.push(`/companionCommission/${companionId}`);
    }
    if (tab === "7") {
      history.push(`/companionTerms/${companionId}`);
    }
  };
  return (
    <>
      <BreadCrumb
        title={title}
        backTo={userType === userTypes?.Companion ? null : "Companion"}
        path={`/companion-list`}
      />

      <Nav tabs>
        <NavItem>
          <NavLink
            active={currentTab === "1"}
            onClick={() => navigateTo("1")}
            disabled={!activity?.openDetails}
          >
            Companion Details
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={currentTab === "2"}
            onClick={() => navigateTo("2")}
            disabled={!activity?.openContact}
          >
            Address
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={currentTab === "3"}
            onClick={() => navigateTo("3")}
            disabled={!activity?.openemergency}
          >
            Emergency Contact
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={currentTab === "4"}
            onClick={() => navigateTo("4")}
            disabled={!activity?.openEligibility}
          >
            Right to work
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={currentTab === "5"}
            onClick={() => navigateTo("5")}
            disabled={!activity?.openBankDetails}
          >
            Bank Details
          </NavLink>
        </NavItem>
        {userType === userTypes?.SystemAdmin.toString() ||
        userType === userTypes?.Admin.toString() ? (
          <NavItem>
            <NavLink
              active={currentTab === "6"}
              onClick={() => navigateTo("6")}
              disabled={!activity?.opencommission}
            >
              Commission
            </NavLink>
          </NavItem>
        ) : null}

        <NavItem>
          <NavLink
            active={currentTab === "7"}
            onClick={() => navigateTo("7")}
            disabled={!activity?.openTandC}
          >
            Terms & Conditions
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default Navigation;
