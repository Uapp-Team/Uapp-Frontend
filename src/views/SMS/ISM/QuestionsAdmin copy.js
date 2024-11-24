import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ButtonForFunctionNonSolid from "../Components/ButtonForFunctionNonSolid";
import "react-quill/dist/quill.snow.css";
import QueAdd from "./Questions/QueAdd";
import Uget from "../../../helpers/Uget";
import Typing from "../../../components/form/Typing";
import Answear from "../Components/Answear";
import Tag from "../../../components/ui/Tag";
import KeyBtn from "../../../components/buttons/KeyBtn";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const QuestionsAdmin = ({
  categoryId,
  categoryName,
  setCategoryId,
  setCategoryName,
}) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusId, setStatusId] = useState(0);
  const [date, setDate] = useState(true);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated?index=${1}&size=${100}&subCategoryId=${categoryId}&start=${startDate}&end=${endDate}&searchText=${searchStr}`
      ).then((res) => {
        console.log(res?.items);
        setData(res?.items);
      });
    }
  }, [success, categoryId, endDate, isTyping, searchStr, startDate]);

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
        <div
          className="d-flex align-items-center bg-theme rounded py-1 px-2 pointer"
          onClick={() => setDate(!date)}
        >
          <span className="mr-1 fs-16px">Date</span>
          <span>
            <AiOutlineUp
              className={`d-block ${date ? "text-black" : "text-gray"}`}
            />
            <AiOutlineDown
              className={`d-block ${!date ? "text-black" : "text-gray"}`}
            />
          </span>
          {/* {date ? <AiOutlineUp /> : <AiOutlineDown />} */}
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
            label="Not Answered"
            data={statusId}
            value={1}
            action={setStatusId}
          />
          <KeyBtn
            label="Draft"
            data={statusId}
            value={2}
            action={setStatusId}
          />
          <KeyBtn
            label="Pending"
            data={statusId}
            value={3}
            action={setStatusId}
          />
          <KeyBtn
            label="Published"
            data={statusId}
            value={4}
            action={setStatusId}
          />
          <KeyBtn
            label="Rejected"
            data={statusId}
            value={5}
            action={setStatusId}
          />
        </div>
      </div>
      <hr />
      {data?.map((item, i) => (
        <div key={i}>
          <Answear defaultData={item} refetch={() => {}} />
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

export default QuestionsAdmin;
