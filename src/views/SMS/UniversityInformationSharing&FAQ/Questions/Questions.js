import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import TextForm from "../Form/TextForm";
import Uget from "../../../../helpers/Uget";
import DateForm from "../Form/DateForm";
import post from "../../../../helpers/post";
import { QuestionType } from "../Components/QuestionType";
import DateRangeForm from "../Form/DateRangeForm";
import SingleChoiceForm from "../Form/SingleChoiceForm";
import MultiChoiceForm from "../Form/MultiChoiceForm";
import Typing from "../../../../components/form/Typing";
import { Col, Row } from "react-bootstrap";

const Questions = ({ categoryId, Uid }) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated-by-university?index=${1}&size=${100}&universityId=${Uid}&subCategoryId=${categoryId}&start=${startDate}&end=${endDate}&searchText=${searchStr}`
      ).then((res) => {
        console.log(res?.items);
        setData(res?.items);
      });
    }
  }, [success, categoryId, endDate, isTyping, searchStr, startDate, Uid]);

  return (
    <>
      <Row className="px-3 pt-3">
        <Col></Col>
        <Col>
          <Typing
            placeholder="search by question"
            value={searchStr}
            setValue={setSearchStr}
            setIsTyping={setIsTyping}
          />
        </Col>
      </Row>

      {data?.map((item, i) => (
        <div key={i}>
          {item?.questionType === QuestionType.SingleQuestion ? (
            <TextForm
              uId={Uid}
              method={post}
              defaultData={item}
              submitPath="question/save-answer"
              refetch={() => setSuccess(!success)}
              action={() => {}}
            />
          ) : item?.questionType === QuestionType.MultipleQuestion ? (
            <MultiChoiceForm
              uId={Uid}
              method={post}
              defaultData={item}
              submitPath="question/save-answer"
              refetch={() => setSuccess(!success)}
              action={() => {}}
            />
          ) : item?.questionType === QuestionType.SingleChoice ? (
            <SingleChoiceForm
              uId={Uid}
              method={post}
              defaultData={item}
              submitPath="question/save-answer"
              refetch={() => setSuccess(!success)}
              action={() => {}}
            />
          ) : item?.questionType === QuestionType.DateRange ? (
            <DateRangeForm
              uId={Uid}
              method={post}
              defaultData={item}
              submitPath="question/save-answer"
              refetch={() => setSuccess(!success)}
              action={() => {}}
            />
          ) : item?.questionType === QuestionType.Date ? (
            <DateForm
              uId={Uid}
              method={post}
              defaultData={item}
              submitPath="question/save-answer"
              refetch={() => setSuccess(!success)}
              action={() => {}}
            />
          ) : null}
        </div>
      ))}
    </>
  );
};

export default Questions;
