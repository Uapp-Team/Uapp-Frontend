import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ConsultantStatus from "./ConsultantStatus";
import put from "../../../../../helpers/put";

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
            data={{
              id: id,
              message: "",
            }}
            url="consultant/block-with-note"
            method={put}
            close={() => handleClose()}
            action={() => setModalForStatus(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConsultantActive;
