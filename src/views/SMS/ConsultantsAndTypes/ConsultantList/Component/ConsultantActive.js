import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ConsultantStatus from "./ConsultantStatus";

const ConsultantActive = ({ isActive, item }) => {
  const [check, setCheck] = useState(isActive);
  const [modalData, setModalData] = useState();

  const [modalForStaus, setModalForStatus] = useState(false);

  const handleUpdate = (data) => {
    setCheck(!check);
    setModalData(data);
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
          onChange={() => handleUpdate(item)}
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
            data={modalData}
            close={() => setModalForStatus(false)}
            action={() => handleClose()}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConsultantActive;
