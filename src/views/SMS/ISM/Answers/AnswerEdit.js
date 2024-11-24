import React, { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Uget from "../../../../helpers/Uget";
import put from "../../../../helpers/put";

const AnswerEdit = ({ id, modalClose, refetch }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    Uget(`question/get-by-id/${id}`).then((res) => {
      console.log(res?.data);
      setData(res?.data);
    });
  }, [id]);

  const defaultData = {
    id: data?.id,
    categoryId: data?.categoryId,
    subCategoryId: data?.subCategoryId,
    title: data?.title,
    answers: data?.answers,
    answerList: data?.answerList,
    isRequiredAns: data?.isRequiredAns,
    isMandatoryForAll: data?.isMandatoryForAll,
    universities: data?.universities,
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3 className="teal-500">{defaultData?.title}</h3>
        <CloseBtn action={modalClose} />
      </div>
      {data?.id && (
        <AnswerForm
          method={put}
          submitPath="question/update"
          defaultData={defaultData}
          refetch={refetch}
          modalClose={modalClose}
        />
      )}
    </>
  );
};

export default AnswerEdit;
