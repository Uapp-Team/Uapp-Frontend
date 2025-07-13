import React, { useState } from "react";
import EditBtn from "../../../../components/buttons/EditBtn";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import { Modal, ModalBody } from "reactstrap";
import QueEdit from "./QueEdit";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { dateFormate } from "../../../../components/date/calenderFormate";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const Question = ({ defaultData, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      <div className="px-4 mt-3 mb-4">
        <div className="d-flex align-items-start justify-content-between ">
          <p className="ism-question-title">{defaultData?.title}</p>
          <p className="text-right">
            {permissions?.includes(permissionList?.Update_Question) &&
              defaultData?.isEdit && (
                <EditBtn action={() => setModalOpen(!modalOpen)} />
              )}
            {permissions?.includes(permissionList?.Delete_Question) &&
              defaultData?.isDelete && (
                <DeleteBtn
                  url={`Question/delete/${defaultData?.id}`}
                  refetch={refetch}
                />
              )}
          </p>
        </div>

        <div className="d-flex align-items-start justify-content-between ">
          <p className="fs-12px text-gray-70">
            <span className="mr-3">
              {defaultData?.isCommon ? (
                "Common"
              ) : (
                <>{defaultData?.universityCount} Universities</>
              )}
            </span>
            <span>
              {dateFormate(
                defaultData?.updatedOn
                  ? defaultData?.updatedOn
                  : defaultData?.createdOn
              )}
            </span>
          </p>

          <Link to={`/answersByQue/${defaultData?.id}`} className="text-black">
            {defaultData?.isCommon ? "View answer" : "View all answers"}{" "}
            <AiOutlineRight />
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
