import React from "react";
import QueForm from "./QueForm";
import post from "../../../../helpers/post";
import CloseBtn from "../../../../components/buttons/CloseBtn";

const QueAdd = ({ modalClose, refetch }) => {
  const defaultData = {
    id: 0,
    categoryId: 0,
    subCategoryId: 0,
    title: "",
    isRequiredAns: true,
    isSameForAll: true,
    answerList: [
      {
        id: 0,
        originType: 1,
        answer: "",
      },
      {
        id: 0,
        originType: 2,
        answer: "",
      },
      {
        id: 0,
        originType: 3,
        answer: "",
      },
    ],
    isMandatoryForAll: false,
    universities: [],
    status: 3,
    isDeletePreAns: true,
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Add Question</h3>
        <CloseBtn action={modalClose} />
      </div>
      <QueForm
        method={post}
        submitPath="question/save"
        defaultData={defaultData}
        refetch={refetch}
        modalClose={modalClose}
      />
    </>
  );
};

export default QueAdd;
