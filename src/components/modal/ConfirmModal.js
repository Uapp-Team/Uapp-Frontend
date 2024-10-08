import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CancelButton from "../buttons/CancelButton";
import SaveButton from "../buttons/SaveButton";

const ConfirmModal = ({
  text = "Are You Sure to Delete this ? Once Deleted it can't be Undone!",
  noText = "No",
  yesText = "Yes",
  text2,
  isOpen,
  toggle,
  confirm,
  cancel,
  buttonStatus,
  progress,
  permissionName,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="uapp-modal">
        <ModalBody style={{ padding: "30px" }}>
          <p>
            <b>{text}</b>
            <br />
            {text2}
          </p>
          <div>
            <CancelButton text={noText} cancel={cancel} />

            {permissionName ? (
              <>
                {permissions?.includes(permissionName) && (
                  <SaveButton
                    text={yesText}
                    progress={progress}
                    buttonStatus={buttonStatus}
                    action={confirm}
                  />
                )}
              </>
            ) : (
              <SaveButton
                text={yesText}
                progress={progress}
                buttonStatus={buttonStatus}
                action={confirm}
              />
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmModal;
