import React from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Nav, NavItem, NavLink } from "reactstrap";
import { useHistory } from "react-router-dom";

const BranchNavbar = ({ title, activeTab, branchId }) => {
  const history = useHistory();

  const toggle = (tab) => {
    if (tab === "1") {
      history.push(`/branchInformation/${branchId}`);
    }
    if (tab === "2") {
      history.push(`/branchManager/${branchId}`);
    }

    if (tab === "3") {
      history.push(`/addBranchConsultant/${branchId}`);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Branch Information"
        backTo="Branch"
        path={`/branchList`}
      />
      <Nav tabs>
        <NavItem>
          <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
            Branch
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={activeTab === "2"}
            onClick={() => toggle("2")}
            disabled={branchId ? false : true}
          >
            Branch Admin
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            active={activeTab === "3"}
            onClick={() => toggle("3")}
            disabled={branchId ? false : true}
          >
            Branch Consultant
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default BranchNavbar;
