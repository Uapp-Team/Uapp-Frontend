import React, { useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const BranchManagerDetailsCard =({
    details,
    handleEdit,
    handleDelete,
    toggleDanger,
    deleteModal,
    setDeleteModal,
    progress
})=>{
 useEffect(() => {
  
  }, [details]);
  
    return(
     <Card>
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            {" "}
            <span className="card-heading">Branch Admin Details</span>
            {details?.isDefault === true ? (
              <span className="ml-2 badge badge-secondary">Default</span>
            ) : null}
          </div>
          {
            <span>
              <a href="#adminEditForm">
                <span
                  className="pointer text-body"
                  onClick={() => handleEdit(details)}
                >
                  Edit
                </span>
              </a>
                  {" "}
                  |{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleDanger(details)}
                  >
                    Delete
                  </span>
               
              
            </span>
          }
        </div>
        <hr />
        <Row className="text-gray">
          <Col md="4">
            <p>
              <span>Branch Admin name</span>
              <br />
              <b>{details?.firstName+" "+details?.lastName}</b>
            </p>
            <p>
              <span>Email</span>
              <br />
              <b>{details?.email}</b>
            </p>
          </Col>
          <Col md="4">
            <p>
              <span>Phone Number</span>
              <br />
              <b>{details?.phoneNumber}</b>
            </p>
          </Col>
        </Row>
      </CardBody>
      <ConfirmModal
        text="Do You Want To Delete This Admin ? "
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDelete}
        cancel={() => setDeleteModal(false)}
        // buttonStatus={buttonStatus}
        progress={progress}
      />
    </Card>
    );
}
export default BranchManagerDetailsCard;