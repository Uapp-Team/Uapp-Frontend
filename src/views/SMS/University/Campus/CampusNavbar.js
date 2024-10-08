import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

export default function CampusNavbar({ title, activeTab, id, subId }) {
  const history = useHistory();

  const toggle = (tab) => {
    if (tab === "1") {
      history.push(`/CampusInformation/${id}/${subId}`);
    }
    if (tab === "2") {
      history.push(`/CampusAssignSubject/${id}/${subId}`);
    }

    if (tab === "3") {
      history.push(`/CampusSubjectIntake/${id}/${subId}`);
    }
    if (tab === "4") {
      history.push(`/CampusGallery/${id}/${subId}`);
    }
  };

  return (
    <>
      <BreadCrumb title={title} backTo="Campus" path={`/campusList/${id}`} />
      <Nav tabs>
        <NavItem>
          <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
            Information
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
            Assign Courses
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === "3"} onClick={() => toggle("3")}>
            Course intake
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "4"} onClick={() => toggle("4")}>
            Gallery
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
}
