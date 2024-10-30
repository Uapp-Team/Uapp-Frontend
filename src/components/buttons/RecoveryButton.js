import React, { useState } from "react";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";
import ConfirmModal from "../modal/ConfirmModal";
import { useToasts } from "react-toast-notifications";
import put from "../../helpers/put";

const RecoveryButton = ({ url, success, setSuccess }) => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteData = () => {
    put(url).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setDeleteModal(false);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <>
      <ButtonForFunction
        icon={<i className="fas fa-undo"></i>}
        color={"warning"}
        className={"m-1 btn-sm"}
        func={() => setDeleteModal(true)}
      />

      <ConfirmModal
        text="Do You Want To Recover This Information?"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        // buttonStatus={buttonStatus}
        // progress={progress}
      />
    </>
  );
};

export default RecoveryButton;
