import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CancelButton from "../buttons/CancelButton";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";

const ContinueModal = ({
  text,
  text2,
  cancel,
  isOpen = true,
  icon = true,
  contineText = "Continue",
}) => {
  return (
    <>
      <Modal isOpen={isOpen} className="uapp-modal">
        <ModalBody style={{ padding: "30px" }}>
          <div className="text-center mb-3">
            {icon && (
              <i className="fas fa-exclamation-triangle text-orange fs-63px mb-2"></i>
            )}
            <p className="text-orange fs-18px">{text}</p>
            <p>{text2}</p>
          </div>
          {/* <div className="mb-3"></div> */}
          <div className="text-right">
            {cancel && <CancelButton text={contineText} cancel={cancel} />}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ContinueModal;
