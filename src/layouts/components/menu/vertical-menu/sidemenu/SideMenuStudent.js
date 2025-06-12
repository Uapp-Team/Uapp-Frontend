import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import SideMenuItem from "./SideMenuItem";
import { Modal } from "reactstrap";
import StudentRegRefer from "../../../../../components/Refer/StudentRegRefer";
import StudentJoinBanner from "../../../../../views/SMS/Affiliate/AffiliateComponents/StudentJoinBanner";
import { useContextData } from "../../../../context/AppContext";

const SideMenuStudent = () => {
  const value = useContextData();
  // const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const referenceId = localStorage.getItem("referenceId");
  // const [canConsultant, setCanConsultant] = useState(false);
  const [conscentData, setConscentData] = useState({});
  const isLead = JSON?.parse(localStorage.getItem("IsLead"));
  const [modalShow, setModalShow] = useState(false);

  // useEffect(() => {
  //   get(`Student/CanBecomeConsultant/${currentUser?.referenceId}`).then(
  //     (res) => {
  //       setCanConsultant(res);
  //     }
  //   );
  // }, [currentUser]);

  useEffect(() => {
    get(`StudentConsent/Get/${referenceId}`).then((res) => {
      setConscentData(res);
    });
  }, [referenceId]);

  return (
    <>
      <SideMenuItem title="Overview" icon="fas fa-tachometer-alt" path="/" />
      <SideMenuItem title="Profile" icon="far fa-user" path="/profile" />
      {conscentData?.isDeclared === true && (
        <>
          <SideMenuItem
            title="Search and Apply"
            icon="fas fa-magnifying-glass"
            path="/search"
          />
          {!isLead && (
            <SideMenuItem
              title="My Applications"
              icon="far fa-file"
              path="/applications"
            />
          )}
        </>
      )}

      {/* {canConsultant && (
        <li className="nav-item uapp-nav-item ">
          <Link to="/becomeConsultant" className="d-flex justify-content-start">
            <button type="button" class="btn btn-primary">
              Become Consultant
            </button>
          </Link>
        </li>
      )} */}

      {/* {!isLead && (
        <> */}
      {/* <button
            onClick={() => {
              setModalShow(true);
            }}
            type="button"
            className="login-to-lead"
          >
            Refer a friend
          </button> */}
      {/* 
          <li
            className={`nav-item uapp-nav-item`}
            onClick={() => {
              setModalShow(true);
            }}
          >
            <Link to="" className="d-flex justify-content-start sidemenu">
              <div className="menu-text text-orange fw-900">
                <span className="menu-item menu-title"> Refer a friend</span>
              </div>
            </Link>
          </li> */}

      {/* <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            isOpen={modalShow}
            toggle={() => setModalShow(false)}
            centered
          >
            <StudentRegRefer
              apiUrl={`Consultant/referralForStudent/${referenceId}`}
              modalClose={() => setModalShow(false)}
            />
          </Modal> */}
      {/* </>
      )} */}

      {!value.sidebar && <StudentJoinBanner />}
    </>
  );
};

export default SideMenuStudent;
