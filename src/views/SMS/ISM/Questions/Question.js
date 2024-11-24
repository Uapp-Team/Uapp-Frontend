import React, { useState } from "react";
import EditBtn from "../../../../components/buttons/EditBtn";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import { Modal, ModalBody } from "reactstrap";
import QueEdit from "./QueEdit";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Question = ({ defaultData, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="px-4 mt-3 mb-4">
        <div className="d-flex align-items-start justify-content-between ">
          <p className="card-heading">{defaultData?.title}</p>

          <p className="text-right">
            <EditBtn action={() => setModalOpen(!modalOpen)} />
            <DeleteBtn url="" refetch={refetch} />
          </p>
        </div>

        <div className="d-flex align-items-start justify-content-between ">
          <p className="fs-12px text-gray-70">
            <span className="mr-3">12 Universities</span>{" "}
            <span>22 Aug 2024</span>
          </p>

          <Link to={`/answersByQue/1`} className="text-black">
            View all answares <AiOutlineRight />
          </Link>
        </div>
      </div>
      <hr />
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-lg"
      >
        <ModalBody className="p-4">
          <QueEdit
            id={defaultData?.id}
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={refetch}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Question;
