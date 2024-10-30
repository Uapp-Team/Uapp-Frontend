import React, { useState } from "react";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";
import ConfirmModal from "../modal/ConfirmModal";
import { useToasts } from "react-toast-notifications";
import Uremove from "../../helpers/Uremove";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteBtn = ({ url, refetch }) => {
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
      refetch && refetch();
    });
  };

  return (
    <>
      <span
        className="pointer text-danger ml-4px"
        onClick={() => setDeleteModal(true)}
      >
        <AiOutlineDelete size={20} />
      </span>

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

export default DeleteBtn;
