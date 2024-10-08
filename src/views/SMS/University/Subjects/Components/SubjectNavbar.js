import React from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
export default function SubjectNavbar({ title, activeTab, id, subjId }) {
  const history = useHistory();

  const toggle = (tab) => {
    if (tab === "1") {
      history.push(`/add-University-course/${id}/${subjId}`);
    }
    if (tab === "2") {
      history.push(`/add-university-course-Fee/${id}/${subjId}`);
    }

    if (tab === "3") {
      history.push(`/add-university-course-test-score/${id}/${subjId}`);
    }
    if (tab === "4") {
      history.push(`/add-university-course-requirements/${id}/${subjId}`);
    }

    if (tab === "5") {
      history.push(`/add-university-course-assign-to-campus/${id}/${subjId}`);
    }
    if (tab === "6") {
      history.push(`/add-university-course-intake/${id}/${subjId}`);
    }
  };

  return (
    <>
      <BreadCrumb
        title={title}
        backTo="Course"
        path={`/university-courses/${id}`}
      />
      <Nav tabs>
        <NavItem>
          <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
            Course Information
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
            Fees & Delivery pattern
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === "3"} onClick={() => toggle("3")}>
            Elt Score
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "4"} onClick={() => toggle("4")}>
            Requirement
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={activeTab === "5"} onClick={() => toggle("5")}>
            Campus
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={activeTab === "6"} onClick={() => toggle("6")}>
            Intake
          </NavLink>
        </NavItem>
      </Nav>
    </>
  );
}
