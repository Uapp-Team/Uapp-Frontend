import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import get from "../../../../../helpers/get";

const StudentNavigation = ({ activetab, studentid, success, action }) => {
  const history = useHistory();
  const [currentTab, setcurrentTab] = useState("");
  const [activity, setActivity] = useState({});

  useEffect(() => {
    setcurrentTab(activetab);
  }, [activetab]);

  useEffect(() => {
    get(`StudentNavbar/Get/${studentid}`).then((res) => {
      setActivity(res);
    });
  }, [studentid, success]);

  useEffect(() => {
    action(activity);
  }, [activity, action]);

  const navigateTo = (tab) => {
    setcurrentTab(tab);

    if (tab === "1") {
      history.push(`/addStudentInformation/${studentid}/${1}`);
    }

    if (tab === "2") {
      history.push(`/addStudentContactInformation/${studentid}/${1}`);
    }

    if (tab === "3") {
      history.push(`/addStudentApplicationInformation/${studentid}/${1}`);
    }

    if (tab === "4") {
      history.push(`/sourceofFund/${studentid}/${1}`);
    }
    if (tab === "5") {
      history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
    }

    if (tab === "6") {
      history.push(`/addTestScore/${studentid}`);
    }

    if (tab === "7") {
      history.push(`/addExperience/${studentid}`);
    }

    if (tab === "8") {
      history.push(`/addReference/${studentid}`);
    }

    if (tab === "8.1") {
      history.push(`/addStudentEmergencyInformation/${studentid}/${1}`);
    }

    if (tab === "9") {
      history.push(`/addPersonalStatement/${studentid}`);
    }
    if (tab === "10") {
      history.push(`/addOtherInformation/${studentid}`);
    }
    if (tab === "11") {
      history.push(`/uploadDocument/${studentid}`);
    }
    if (tab === "12") {
      history.push(`/studentDeclaration/${studentid}`);
    }
  };

  return (
    <Nav tabs>
      <NavItem>
        <NavLink
          active={currentTab === "1"}
          onClick={() => navigateTo("1")}
          disabled={!activity?.personal}
        >
          Personal
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "2"}
          onClick={() => navigateTo("2")}
          disabled={!activity?.contact}
        >
          Contact
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "3"}
          onClick={() => navigateTo("3")}
          disabled={!activity?.application}
        >
          Application
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "4"}
          onClick={() => navigateTo("4")}
          disabled={!activity?.funding}
        >
          Funding
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "5"}
          onClick={() => navigateTo("5")}
          disabled={!activity?.educational}
        >
          Education
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "6"}
          onClick={() => navigateTo("6")}
          disabled={!activity?.testScore}
        >
          ELT Score
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "7"}
          onClick={() => navigateTo("7")}
          disabled={!activity?.experience}
        >
          Experience
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "8"}
          onClick={() => navigateTo("8")}
          disabled={!activity?.reference}
        >
          Reference
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "8.1"}
          onClick={() => navigateTo("8.1")}
          disabled={!activity?.emergency}
        >
          Emergency Contact
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "9"}
          onClick={() => navigateTo("9")}
          disabled={!activity?.statement}
        >
          Statement
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "10"}
          onClick={() => navigateTo("10")}
          disabled={!activity?.others}
        >
          Others
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "11"}
          onClick={() => navigateTo("11")}
          disabled={!activity?.documents}
        >
          Documents
        </NavLink>
      </NavItem>

      <NavItem>
        <NavLink
          active={currentTab === "12"}
          onClick={() => navigateTo("12")}
          disabled={!activity?.declaration}
        >
          Review and Sign
        </NavLink>
      </NavItem>
    </Nav>
  );
};
export default StudentNavigation;
