import React, { useEffect, useState } from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";
import profileImage from "../../../../assets/img/profile/user-uploads/user-07.jpg";
import get from "../../../../helpers/get";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import AddButton from "../../../../components/buttons/AddButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { rootUrl } from "../../../../constants/constants";
import ChangeManager from "../ChangeManager/ChangeManager";

const BranchManager = ({ id }) => {
  const [success, setSuccess] = useState(false);
  const [branchManager, setBranchManager] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`BranchManager/GetbyBranch/${id}`).then((res) => {
      setBranchManager(res);
    });
  }, [id, success]);

  return (
    <>
      {branchManager?.id && (
        <div className="custom-card-border p-4 mb-30px">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-between-start">
              <div className="pr-3">
                {branchManager?.managerImageMedia === null ? (
                  <img
                    src={profileImage}
                    alt="img"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50px",
                    }}
                  />
                ) : (
                  <img
                    src={
                      rootUrl + branchManager?.managerImageMedia?.thumbnailUrl
                    }
                    alt="img"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50px",
                    }}
                  />
                )}
              </div>
              <div>
                <h5>Branch Manager</h5>

                <p>
                  <span className="pr-1">
                    {branchManager?.nameTittle?.name}
                  </span>
                  <span className="pr-1">{branchManager?.firstName}</span>
                  <span className=" pl-1">{branchManager?.lastName}</span>
                </p>
              </div>
            </div>
            <span className="pointer" onClick={() => setModalOpen(!modalOpen)}>
              Change
            </span>
          </div>

          <Row>
            <Col>
              <ul className="uapp-ul">
                <li>
                  {" "}
                  <i className="far fa-envelope pr-2"></i>
                  {branchManager?.email}
                </li>
                {branchManager?.consultant?.phoneNumber === null ? null : (
                  <li>
                    {" "}
                    <i className="fas fa-phone pr-2"></i>{" "}
                    {branchManager?.phoneNumber}
                  </li>
                )}
              </ul>
            </Col>
          </Row>
        </div>
      )}

      {!branchManager?.id && (
        <div className="custom-card-border p-4 mb-30px">
          {permissions?.includes(permissionList.Add_New_Branch_Manager) ? (
            <center>
              <div className="container py-3">
                <Link to={`/branchManager/${id}`}>
                  <AddButton text="Add Branch Admin" />
                </Link>
              </div>
            </center>
          ) : (
            <p className="text-center">No Branch Admin</p>
          )}
        </div>
      )}

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-md"
      >
        <ModalBody className="p-4">
          <ChangeManager
            branchId={id}
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={() => setSuccess(!success)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default BranchManager;
