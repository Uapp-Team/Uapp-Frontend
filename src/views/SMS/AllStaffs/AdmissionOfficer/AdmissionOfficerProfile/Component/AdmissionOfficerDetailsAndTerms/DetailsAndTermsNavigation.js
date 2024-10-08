import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import SpanButton from "../../../../../Components/SpanButton";

const DetailsAndTermsNavigation = ({
  activetab,
  officerId,
  permissions,
  permissionList,
  handleEdit,
}) => {
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
      history.push(`/admissionOfficerDetailsInfo/${officerId}`);
    }

    if (tab == "2") {
      history.push(
        `/admissionOfficerTermsAndConditionDetailsInfo/${officerId}`
      );
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
      <div>
        {permissions?.includes(permissionList.Add_AdmissionOfficer) ? (
          <div className="ml-auto">
            <SpanButton
              icon={
                <i
                  style={{ cursor: "pointer" }}
                  className="fas fa-pencil-alt pencil-style"
                ></i>
              }
              func={handleEdit}
              permission={6}
            />
          </div>
        ) : null}
      </div>
    </Nav>
  );
};

export default DetailsAndTermsNavigation;
