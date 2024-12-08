import React, { useState } from "react";
import Origine from "../Components/Origine";
import DOMPurify from "dompurify";
import EditBtn from "../../../../components/buttons/EditBtn";
import Status from "../Components/Status";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import { Modal, ModalBody } from "reactstrap";
import AnswerEdit from "./AnswerEdit";
import { dateFormate } from "../../../../components/date/calenderFormate";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const Answer = ({ defaultData, refetch, byQues = false, isPublic = false }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <>
      <div
        className={`${
          defaultData?.status === 1 ? "bg-f7fafa border rounded" : ""
        } p-4 m-4`}
      >
        <div className="d-flex align-items-start justify-content-between">
          <p className="fs-16px text-gray-70 fw-600">
            {byQues && (
              <span>
                {defaultData?.universityName
                  ? defaultData?.universityName
                  : "No University Selected"}
              </span>
            )}
          </p>
          {defaultData?.status !== 1 && (
            <p className="text-right">
              {!byQues && (
                <span className="text-gray ml-12px">
                  {defaultData?.universityName}
                </span>
              )}

              {!isPublic && (
                <Status statusId={defaultData?.status} className="ml-12px" />
              )}
              <span className="text-gray-70 ml-12px">
                {dateFormate(
                  defaultData?.updatedOn
                    ? defaultData?.updatedOn
                    : defaultData?.createdOn
                )}
              </span>
              {!isPublic && (
                <>
                  {permissions?.includes(permissionList?.AddOrUpdate_Answer) &&
                    defaultData?.isEdit && (
                      <EditBtn action={() => setModalOpen(!modalOpen)} />
                    )}
                  {permissions?.includes(permissionList?.Delete_Answer) &&
                    defaultData?.isDelete && (
                      <DeleteBtn
                        url={`Question/delete-answer?questionId=${defaultData?.id}&universityId=${defaultData?.universityId}`}
                        refetch={refetch}
                      />
                    )}
                </>
              )}
            </p>
          )}
        </div>
        {!byQues && <p className="ism-question-title">{defaultData?.title}</p>}

        {defaultData?.status !== 1 ? (
          <>
            {defaultData?.isSameForAll === true ? (
              <>
                <p className="mt-2" style={{ color: "#626767" }}>
                  <div
                    dangerouslySetInnerHTML={createMarkup(
                      defaultData?.answerList &&
                        defaultData?.answerList[0]?.answers
                    )}
                  ></div>
                </p>
              </>
            ) : (
              <>
                {defaultData?.answerList?.map((item, i) => (
                  <>
                    <div key={i}>
                      <Origine typeId={item?.originType} />

                      <p className="mt-2" style={{ color: "#626767" }}>
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            item?.answers && item?.answers
                          )}
                        ></div>
                      </p>
                    </div>
                  </>
                ))}
              </>
            )}
          </>
        ) : (
          <SaveButton text="Answer" action={() => setModalOpen(!modalOpen)} />
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
            uId={defaultData?.universityId ? defaultData?.universityId : 0}
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={refetch}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Answer;
