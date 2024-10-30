import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import { dateFormate } from "../../../../../components/date/calenderFormate";
import AddButton from "../../../../../components/buttons/AddButton";
import { Modal, ModalBody } from "reactstrap";
import ConsultantStatus from "../../ConsultantList/Component/ConsultantStatus";
import post from "../../../../../helpers/post";
import EditBtn from "../../../../../components/buttons/EditBtn";
import DeleteBtn from "../../../../../components/buttons/DeleteBtn";
import put from "../../../../../helpers/put";

const Note = ({ id }) => {
  const [data, setData] = useState([]);
  const [sucess, setSucess] = useState(false);
  const [modalForadd, setModalForAdd] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalForEdit, setModalForEdit] = useState(false);

  useEffect(() => {
    get(`Consultant/get-notes/${id}`).then((res) => {
      setData(res);
    });
  }, [sucess, id]);

  return (
    <>
      <div className="custom-card-border mb-3 py-4">
        <div className="d-flex justify-content-between align-items-center px-4">
          <h5>Notes</h5>
          <AddButton action={() => setModalForAdd(true)} />
        </div>
        <hr />
        <div className="overflowY-300px px-4" id="scroll-note">
          {data?.length > 0 ? (
            data?.map((chat, i) => (
              <div className="my-4" key={i}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-gray">
                    {dateFormate(chat?.createdDate)}
                  </span>

                  <span>
                    <EditBtn
                      action={() => {
                        setModalForEdit(!modalForEdit);
                        setModalData({
                          id: chat?.id,
                          message: chat?.note,
                        });
                      }}
                    />
                    <DeleteBtn
                      url={`consultant/delete-note/${chat?.id}`}
                      refetch={() => setSucess(!sucess)}
                    />
                  </span>
                </div>

                <p className="bg-note bg-note-border p-12px mr-1 mt-2">
                  <div
                    className="chat-note-naki"
                    dangerouslySetInnerHTML={{ __html: chat?.note }}
                  />
                </p>
              </div>
            ))
          ) : (
            <p className="text-center">No Note Found</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={modalForadd}
        toggle={() => setModalForAdd(false)}
        className="uapp-modal"
      >
        <ModalBody>
          <ConsultantStatus
            data={{
              id: id,
              message: "",
            }}
            url="consultant/insert-note"
            method={post}
            action={() => {
              setModalForAdd(false);
              setSucess(!sucess);
            }}
            close={() => setModalForAdd(false)}
          />
        </ModalBody>
      </Modal>

      <Modal
        isOpen={modalForEdit}
        toggle={() => setModalForEdit(false)}
        className="uapp-modal"
      >
        <ModalBody>
          <ConsultantStatus
            data={modalData}
            url="consultant/update-note"
            method={put}
            action={() => {
              setModalForEdit(false);
              setSucess(!sucess);
            }}
            close={() => setModalForEdit(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Note;
