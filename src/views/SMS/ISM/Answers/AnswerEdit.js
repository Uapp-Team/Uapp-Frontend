import React, { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Uget from "../../../../helpers/Uget";
import post from "../../../../helpers/post";

const AnswerEdit = ({ id, uId, modalClose, refetch }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    Uget(`question/get-answer?questionId=${id}&universityId=${uId}`).then(
      (res) => {
        setData(res?.data);
      }
    );
  }, [id, uId]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="teal-500">{data?.title}</h3>
        <CloseBtn action={modalClose} />
      </div>
      {data?.id && (
        <AnswerForm
          method={post}
          submitPath="question/save-answer"
          defaultData={data}
          refetch={refetch}
          modalClose={modalClose}
        />
      )}
    </>
  );
};

export default AnswerEdit;
