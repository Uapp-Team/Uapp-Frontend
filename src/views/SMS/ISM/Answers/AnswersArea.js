import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Uget from "../../../../helpers/Uget";
import Typing from "../../../../components/form/Typing";
import Answer from "./Answer";
import Tag from "../../../../components/ui/Tag";
import KeyBtn from "../../../../components/buttons/KeyBtn";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const AnswersArea = ({
  uniValue,
  categoryId,
  categoryName,
  setCategoryId,
  setCategoryName,
}) => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statusId, setStatusId] = useState(0);
  const [date, setDate] = useState(false);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated-by-university?index=${1}&size=${100}&universityId=${uniValue}&subCategoryId=${categoryId}&searchText=${searchStr}&sortingdate=${
          date ? "asc" : "desc"
        }`
      ).then((res) => {
        setData(res?.items);
      });
    }
  }, [success, categoryId, isTyping, searchStr, date, uniValue]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between px-3 pt-3">
        <div className="d-flex align-items-center">
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
              className={`d-block ${!date ? "text-black" : "text-gray"}`}
            />
            <AiOutlineDown
              className={`d-block ${date ? "text-black" : "text-gray"}`}
            />
          </span>
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

      <p className="text-center fw-600 my-5">under construction</p>

      {/* {data?.length > 0 ? (
        <>
          {data?.map((item, i) => (
            <div key={i}>
              <Answer defaultData={item} refetch={() => setSuccess(!success)} />
            </div>
          ))}
        </>
      ) : (
        <p className="text-center fw-600 my-5">No Data Found</p>
      )} */}

      {/* {data?.map((item, i) => (
        <div key={i}>
          <Answer defaultData={item} refetch={() => setSuccess(!success)} />
        </div>
      ))} */}
    </>
  );
};

export default AnswersArea;
