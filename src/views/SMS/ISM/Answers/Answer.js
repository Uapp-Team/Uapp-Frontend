import React, { useState } from "react";
import Origine from "../Components/Origine";
import DOMPurify from "dompurify";
import EditBtn from "../../../../components/buttons/EditBtn";
import Status from "../Components/Status";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import { Modal, ModalBody } from "reactstrap";
import AnswerEdit from "./AnswerEdit";

const Answer = ({ defaultData, refetch, byQues = false }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className="px-4 mt-3 mb-4">
        <div className="d-flex align-items-start justify-content-between">
          <p className="fs-16px text-gray-70 fw-600">
            {byQues && <span>Arden University</span>}
          </p>

          <p className="text-right">
            {!byQues && (
              <span className="text-gray ml-12px">Arden University</span>
            )}
            <Status statusId={4} className="ml-12px" />
            <span className="text-gray ml-12px">22 Aug 2024</span>
            <EditBtn action={() => setModalOpen(!modalOpen)} />
            <DeleteBtn url="" refetch={refetch} />
          </p>
        </div>
        {!byQues && <p className="card-heading">{defaultData?.title}</p>}

        {defaultData?.isSameForAll === true ? (
          <>
            {defaultData?.answers === null ? (
              <p className="mt-2" style={{ color: "#626767" }}>
                No answer for this university
              </p>
            ) : (
              <p className="mt-2" style={{ color: "#626767" }}>
                <div
                  dangerouslySetInnerHTML={createMarkup(
                    defaultData?.answers && defaultData?.answers[0]
                  )}
                ></div>
              </p>
            )}
          </>
        ) : (
          <>
            {defaultData?.answerList?.map((item, i) => (
              <>
                <div key={i}>
                  <Origine typeId={item?.origineType} />
                  {item?.answers === null ? (
                    <p className="mt-2" style={{ color: "#626767" }}>
                      There is no answer
                    </p>
                  ) : (
                    <p className="mt-2" style={{ color: "#626767" }}>
                      <div
                        dangerouslySetInnerHTML={createMarkup(
                          item?.answers && item?.answers[0]
                        )}
                      ></div>
                    </p>
                  )}
                </div>
              </>
            ))}
          </>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-lg"
      >
        <ModalBody className="p-4">
          <AnswerEdit
            id={defaultData?.id}
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={refetch}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Answer;
