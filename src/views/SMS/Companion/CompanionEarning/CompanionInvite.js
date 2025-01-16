import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";

const CompanionInvite = () => {
  const { addToast } = useToasts();
  const referenceId = localStorage.getItem("referenceId");

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const closeModal = () => {
    setModalOpen(false);
    setEmail("");
    setEmailError("");
    // setSuccess(!success);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError("Email is not Valid");
    } else {
      setButtonStatus(true);
      setProgress(true);
      post(`CompanionInvitation/Invite/${email}`, subData).then((action) => {
        setButtonStatus(false);
        setProgress(false);
        setSuccess(!success);
        setEmail("");
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    }
  };

  const handleEmailError = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };
  return (
    <>
      <div className="custom-card-border p-4 relative mb-3 h-100">
        <div>
          <div className="p-4 pb-3 d-flex justify-content-center flex-collumn ">
            <i
              className="fas fa-gift fs-63px"
              style={{
                color: "#1E98B0",
              }}
            ></i>
          </div>
          <div className="text-center">
            <h1 className="mb-3 fs-16px fw-500">
              Refer a student, Earn Unlimited
            </h1>
            <p className="fs-13px ">
              Refer a friend or family and receive up to £100!
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="btn btn-primary btn-invite relative"
            >
              <i className="fas fa-envelope invite-now"></i>
              <span>Invite Now</span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
        {/* <ModalHeader></ModalHeader> */}
        <ModalBody>
          <h4 className="mb-3">Send an invitation to email</h4>
          <Form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="consultantId"
              id="consultantId"
              value={referenceId}
            />

            <FormGroup row className="has-icon-left position-relative">
              <Col md="4">
                <span>
                  <span className="text-danger">*</span>Email
                </span>
              </Col>
              <Col md="8">
                <Input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Write Email"
                  onChange={(e) => {
                    handleEmailError(e);
                  }}
                />
                <span className="text-danger">{emailError}</span>
              </Col>
            </FormGroup>
            <FormGroup className="d-flex justify-content-between mt-3">
              <CancelButton cancel={closeModal} />

              <SaveButton
                text="Send Email"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CompanionInvite;
