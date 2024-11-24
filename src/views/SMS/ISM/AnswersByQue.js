import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "react-quill/dist/quill.snow.css";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import Uget from "../../../helpers/Uget";
import Typing from "../../../components/form/Typing";
import Answer from "./Answers/Answer";
import KeyBtn from "../../../components/buttons/KeyBtn";
import { Card, CardBody } from "reactstrap";
import { AiOutlineRight } from "react-icons/ai";

const AnswersByQue = () => {
  const { uId } = useParams();
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusId, setStatusId] = useState(0);

  console.log(uId);
  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated?index=${1}&size=${100}&searchText=${searchStr}`
      ).then((res) => {
        setData(res?.items);
      });
    }
  }, [success, isTyping, searchStr]);

  return (
    <>
      <BreadCrumb title="Query Answers" backTo="" path="/" />

      <Card>
        <CardBody>
          <h3>How to reply to a message</h3>
          <p>
            Category <AiOutlineRight /> Subcategory
          </p>
          <div className="custom-card-border">
            <div className="d-flex align-items-start justify-content-between px-3 mt-3">
              <div>
                <Typing
                  placeholder="search by question"
                  value={searchStr}
                  setValue={setSearchStr}
                  setIsTyping={setIsTyping}
                />
              </div>

              <div className="text-right">
                <KeyBtn
                  label="ALL"
                  data={statusId}
                  value={0}
                  action={setStatusId}
                />
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
                <Answer
                  defaultData={item}
                  refetch={() => setSuccess(!success)}
                  byQues={true}
                />
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AnswersByQue;
