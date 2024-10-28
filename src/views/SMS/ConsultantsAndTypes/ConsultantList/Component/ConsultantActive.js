import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ConsultantStatus from "./ConsultantStatus";

const ConsultantActive = ({ isActive, id }) => {
  const [check, setCheck] = useState(isActive);

  const [modalForStaus, setModalForStatus] = useState(false);

  const handleUpdate = (data) => {
    setCheck(!check);
    setModalForStatus(true);
  };

  const handleClose = (data) => {
    setModalForStatus(false);
    setCheck(!check);
  };

  return (
    <>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={check}
          onChange={() => handleUpdate()}
        />
        <span className="switch" />
      </label>

      <Modal
        isOpen={modalForStaus}
        toggle={() => handleClose()}
        className="uapp-modal"
      >
        <ModalBody>
          <ConsultantStatus
            id={id}
            close={() => setModalForStatus(false)}
            action={() => handleClose()}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConsultantActive;
