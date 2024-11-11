import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import ButtonForFunctionNonSolid from "../../Components/ButtonForFunctionNonSolid";
import "react-quill/dist/quill.snow.css";
import QueAdd from "./QueAdd";
import TextForm from "../Form/TextForm";
import Uget from "../../../../helpers/Uget";
import DateForm from "../Form/DateForm";
import { QuestionType } from "../Components/QuestionType";
import DateRangeForm from "../Form/DateRangeForm";
import SingleChoiceForm from "../Form/SingleChoiceForm";
import MultiChoiceForm from "../Form/MultiChoiceForm";
import Typing from "../../../../components/form/Typing";
import { Col } from "react-bootstrap";
import Answear from "../Components/Answear";

const QuestionsAdmin = ({ categoryId }) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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
      <div className="row align-items-center justify-content-between px-3 pt-3">
        <Col>
          <ButtonForFunctionNonSolid
            className={"btn btn-faq-add py-2"}
            func={() => setModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
            name={" Add Questions"}
          />
        </Col>

        <Col>
          <Typing
            placeholder="search by question"
            value={searchStr}
            setValue={setSearchStr}
            setIsTyping={setIsTyping}
          />
        </Col>
      </div>
      {data?.map((item, i) => (
        <div key={i}>
          <Answear defaultData={item} refetch={() => {}} />
        </div>
      ))}
      {/* {data?.map((item, i) => (
        <div key={i}>
          {item?.questionType === QuestionType.SingleQuestion ? (
            <TextForm
              defaultData={item}
              deletePath={`question/delete/${item?.id}`}
              refetch={() => setSuccess(!success)}
            />
          ) : item?.questionType === QuestionType.MultipleQuestion ? (
            <MultiChoiceForm
              defaultData={item}
              deletePath={`question/delete/${item?.id}`}
              refetch={() => setSuccess(!success)}
            />
          ) : item?.questionType === QuestionType.SingleChoice ? (
            <SingleChoiceForm
              defaultData={item}
              deletePath={`question/delete/${item?.id}`}
              refetch={() => setSuccess(!success)}
            />
          ) : item?.questionType === QuestionType.DateRange ? (
            <DateRangeForm
              defaultData={item}
              deletePath={`question/delete/${item?.id}`}
              refetch={() => setSuccess(!success)}
            />
          ) : item?.questionType === QuestionType.Date ? (
            <DateForm
              defaultData={item}
              deletePath={`question/delete/${item?.id}`}
              refetch={() => setSuccess(!success)}
            />
          ) : null}
        </div>
      ))} */}

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
