import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const BankDetailsCard = ({
  details,
  handleEdit,
  toggleDanger,
  deleteModal,
  setDeleteModal,
  handleDeletePermission,
  buttonStatus,
  progress,
  isDefault,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Card className=" ">
      <CardBody>
        <div className="d-flex justify-content-between">
          <div>
            {" "}
            <span className="card-heading">{details?.bankName}</span>
            {details?.isDefault === true ? (
              <span className="ml-2 badge badge-secondary">Default</span>
            ) : null}
          </div>
          {permissions?.includes(permissionList?.Edit_Consultant) && (
            <span>
              <a href="#bank-details">
                {" "}
                <span
                  className="pointer text-body"
                  onClick={() => handleEdit(details)}
                >
                  Edit
                </span>
              </a>

              {details?.isDefault === false && (
                <>
                  |{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleDanger(details)}
                  >
                    Delete
                  </span>
                </>
              )}
            </span>
          )}
        </div>
        <hr />
        <Row className="text-gray">
          <Col md="4">
            <p>
              <span>Account Holder name</span>
              <br />
              <b>{details?.accountName}</b>
            </p>
            <p>
              <span>Account number</span>
              <br />
              <b>{details?.accountNumber}</b>
            </p>
          </Col>
          <Col md="4">
            <p>
              <span>Sort code</span>
              <br />
              <b>{details?.sortCode}</b>
            </p>
            <p>
              <span>Bank Address</span>
              <br />
              <b>{details?.bankAddress}</b>
            </p>
          </Col>
          <Col md="4">
            <p>
              <span>BIC</span>
              <br />
              <b>{details?.bic}</b>
            </p>
            <p>
              <span>Swift</span>
              <br />
              <b>{details?.swift}</b>
            </p>
          </Col>
        </Row>
      </CardBody>
      <ConfirmModal
        text="Do You Want To Delete Bank Details Information ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeletePermission}
        cancel={() => setDeleteModal(false)}
        buttonStatus={buttonStatus}
        progress={progress}
      />
    </Card>
  );
};

export default BankDetailsCard;
