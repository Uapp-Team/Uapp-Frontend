import React, { useState } from "react";
import Origine from "./Origine";
import DOMPurify from "dompurify";
import EditBtn from "../../../../components/buttons/EditBtn";
import Status from "./Status";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import { Modal, ModalBody } from "reactstrap";
import QueEdit from "../Questions/QueEdit";

const Answear = ({ defaultData, refetch }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div className="px-4 mt-3 mb-4">
        <p className="text-right">
          <span className="text-gray ml-12px">Arden University</span>
          <Status statusId={2} className="ml-12px" />
          <span className="text-gray ml-12px">22 Aug 2024</span>
          <EditBtn action={() => setModalOpen(!modalOpen)} />
          <DeleteBtn url="" refetch={refetch} />
        </p>
        <p className="card-heading">{defaultData?.title}</p>

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

export default Answear;
