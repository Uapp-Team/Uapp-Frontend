import React, { useState } from "react";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";
import ConfirmModal from "../modal/ConfirmModal";
import { useToasts } from "react-toast-notifications";
import Uremove from "../../helpers/Uremove";

const DeleteButton = ({ url, success, setSuccess }) => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteData = () => {
    Uremove(url).then((res) => {
      console.log(res);
      addToast(res?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  return (
    <>
      <ButtonForFunction
        icon={<i className="fas fa-trash-alt"></i>}
        color={"danger"}
        className={"m-1 btn-sm"}
        func={() => setDeleteModal(true)}
      />

      <ConfirmModal
        text="Do You Want To Delete This Information?"
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

export default DeleteButton;
