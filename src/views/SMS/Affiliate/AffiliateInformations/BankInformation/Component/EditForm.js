import React from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import ButtonLoader from "../../../../Components/ButtonLoader";

const EditForm = ({
  modalOpen,
  closeModal,
  handleSubmitUpdate,
  consultantRegisterId,
  fetchedData,
  buttonStatus,
  progress,
}) => {
  return (
    <div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
        <ModalHeader>Update Bank Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitUpdate}>
            <input
              type="hidden"
              name="consultantId"
              id="consultantId"
              value={consultantRegisterId}
            />
            <input type="hidden" name="id" id="id" value={fetchedData?.id} />
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Account Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="accountName"
                  id="accountName"
                  placeholder="Enter Account Name"
                  required
                  defaultValue={fetchedData?.accountName}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Account Number <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="accountNumber"
                  id="accountNumber"
                  placeholder="Enter Account Number"
                  required
                  defaultValue={fetchedData?.accountNumber}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Sort Code <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="sortCode"
                  id="sortCode"
                  placeholder="Enter Sort Code"
                  required
                  defaultValue={fetchedData?.sortCode}
                />
              </Col>
            </FormGroup>

            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>
                  Bank Name <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="bankName"
                  id="bankName"
                  placeholder="Enter Bank Name"
                  required
                  defaultValue={fetchedData?.bankName}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>BIC </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="bIC"
                  id="bIC"
                  placeholder="Enter BIC"
                  defaultValue={fetchedData?.bic}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>Swift </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="swift"
                  id="swift"
                  placeholder="Enter Swift"
                  defaultValue={fetchedData?.swift}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3">
                <span>Bank Address </span>
              </Col>
              <Col md="6">
                <Input
                  type="text"
                  name="bankAddress"
                  id="bankAddress"
                  placeholder="Enter Bank Address"
                  defaultValue={fetchedData?.bankAddress}
                />
              </Col>
            </FormGroup>
            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button color="danger" className="mr-1 mt-3" onClick={closeModal}>
                Close
              </Button>
              <Button.Ripple
                color="warning"
                type="submit"
                className="mr-1 mt-3"
                disable={buttonStatus}
              >
                {progress ? <ButtonLoader /> : "Submit"}
              </Button.Ripple>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditForm;
