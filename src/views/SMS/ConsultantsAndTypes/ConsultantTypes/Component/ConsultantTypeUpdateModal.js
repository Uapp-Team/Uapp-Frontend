import React from "react";
import {
  Input,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Col,
  Button,
} from "reactstrap";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";

const ConsultantTypeUpdateModal = ({
  modalOpen,
  closeModal,
  postId,
  handleSubmit,
  consName,
  consultantType,
  buttonStatus,
  consultantTypeError,
  handleConsultant,
}) => {
  console.log(postId);
  return (
    <div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Consultant Type</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            {postId > 0 ? (
              <Input type="hidden" name="id" id="id" defaultValue={postId} />
            ) : null}
            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>
                  Consultant Name <span className="text-danger">*</span>
                </span>
              </Col>
              <Col md="8">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={consultantType}
                  onChange={(e) => {
                    handleConsultant(e);
                  }}
                  placeholder="Create Consultant Type"
                />
                <span className="text-danger">{consultantTypeError}</span>
              </Col>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={closeModal} />

              <SaveButton text="Submit" buttonStatus={buttonStatus} />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <div></div>
    </div>
  );
};

export default ConsultantTypeUpdateModal;
