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
    // answers: "",
    answerList: [
      {
        id: 0,
        origineType: 1,
        answers: "",
      },
      {
        id: 0,
        origineType: 2,
        answers: "",
      },
      {
        id: 0,
        origineType: 3,
        answers: "",
      },
    ],
    isMandatoryForAll: false,
    universities: [],
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
