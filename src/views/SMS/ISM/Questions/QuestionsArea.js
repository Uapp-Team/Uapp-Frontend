import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ButtonForFunctionNonSolid from "../../Components/ButtonForFunctionNonSolid";
import "react-quill/dist/quill.snow.css";
import QueAdd from "./QueAdd";
import Uget from "../../../../helpers/Uget";
import Typing from "../../../../components/form/Typing";
import Tag from "../../../../components/ui/Tag";
import KeyBtn from "../../../../components/buttons/KeyBtn";
import Question from "./Question";

const QuestionsArea = ({
  categoryId,
  categoryName,
  setCategoryId,
  setCategoryName,
}) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusId, setStatusId] = useState(0);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated?index=${1}&size=${100}&subCategoryId=${categoryId}&searchText=${searchStr}`
      ).then((res) => {
        setData(res?.items);
      });
    }
  }, [success, categoryId, isTyping, searchStr]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between px-3 pt-3">
        <div className="d-flex align-items-center">
          <ButtonForFunctionNonSolid
            className={"btn btn-faq-add py-2 mr-3"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add Questions"}
          />
          <Tag
            title="Category"
            label={categoryName}
            action={() => {
              setCategoryId(0);
              setCategoryName("");
            }}
          />
        </div>
      </div>

      <hr />
      <div className="d-flex align-items-start justify-content-between px-3">
        <div>
          <Typing
            placeholder="search by question"
            value={searchStr}
            setValue={setSearchStr}
            setIsTyping={setIsTyping}
          />
        </div>

        <div className="text-right">
          <KeyBtn label="ALL" data={statusId} value={0} action={setStatusId} />
          <KeyBtn
            label="Common"
            data={statusId}
            value={1}
            action={setStatusId}
          />
          <KeyBtn
            label="University"
            data={statusId}
            value={2}
            action={setStatusId}
          />
        </div>
      </div>
      <hr />
      {data?.map((item, i) => (
        <div key={i}>
          <Question defaultData={item} refetch={() => {}} />
        </div>
      ))}

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-lg"
      >
        <ModalBody className="p-4">
          <QueAdd
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={() => setSuccess(!success)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default QuestionsArea;
