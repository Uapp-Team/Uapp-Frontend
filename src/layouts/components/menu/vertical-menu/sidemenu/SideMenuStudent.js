import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import SideMenuItem from "./SideMenuItem";

const SideMenuStudent = () => {
  const [info, setInfo] = useState(false);
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    get(`Student/CheckIfStudentIsConsultant/${currentUser?.displayEmail}`).then(
      (res) => {
        setInfo(res);
      }
    );
  }, [currentUser]);

  return (
    <>
      <SideMenuItem title="Overview" icon="fas fa-tachometer-alt" path="/" />
      <SideMenuItem title="Profile" icon="far fa-user" path="/profile" />
      <SideMenuItem
        title="Search and Apply"
        icon="fas fa-magnifying-glass"
        path="/search"
      />
      <SideMenuItem
        title="My Applications"
        icon="far fa-file"
        path="/applications"
      />

      {info ? null : (
        <li className="nav-item uapp-nav-item ">
          <Link to="/becomeConsultant" className="d-flex justify-content-start">
            <button type="button" class="btn btn-primary">
              Become Consultant
            </button>
          </Link>
        </li>
      )}
    </>
  );
};

export default SideMenuStudent;
