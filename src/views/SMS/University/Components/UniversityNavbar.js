import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { userTypes } from "../../../../constants/userTypeConstant";

export default function UniversityNavbar({ activetab, univerId }) {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    console.log("activeTab", activetab);
    setcurrentTab(activetab);
  }, [activetab]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);
    if (tab === "1") {
      history.push(`/addUniversity/${univerId}`);
    }
    if (tab === "2") {
      history.push(`/addUniversityCampus/${univerId}`);
    }
    if (tab === "3") {
      history.push(`/addUniversityFinancial/${univerId}`);
    }
    if (tab === "4") {
      history.push(`/addUniversityFeaturesGallery/${univerId}`);
    }

    if (tab === "5") {
      history.push(`/addUniversityTemplateDocument/${univerId}`);
    }
    if (tab === "6") {
      history.push(`/addUniversityFunding/${univerId}`);
    }
    if (tab === "7") {
      history.push(`/addUniversityRequirements/${univerId}`);
    }

    if (tab === "8") {
      history.push(`/addUniversityRecruitmentType/${univerId}`);
    }
    if (tab === "9") {
      history.push(`/addUniversityCommission/${univerId}`);
    }
  };
  return (
    <Nav tabs>
      <NavItem>
        <NavLink active={currentTab === "1"} onClick={() => navigateTo("1")}>
          Basic Info.
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={currentTab === "2"} onClick={() => navigateTo("2")}>
          Campuses
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "3"} onClick={() => navigateTo("3")}>
          Financial
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "4"} onClick={() => navigateTo("4")}>
          Features and gallery
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "5"} onClick={() => navigateTo("5")}>
          Template Doc.
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "6"} onClick={() => navigateTo("6")}>
          Funding
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "7"} onClick={() => navigateTo("7")}>
          Requirement
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink active={currentTab === "8"} onClick={() => navigateTo("8")}>
          Recruit. Type
        </NavLink>
      </NavItem>

      {userType === userTypes?.ProviderAdmin ? null : (
        <NavItem>
          <NavLink active={currentTab === "9"} onClick={() => navigateTo("9")}>
            Commission
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}
