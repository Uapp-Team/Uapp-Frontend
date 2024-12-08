import React from "react";
import QueForm from "./QueForm";
import post from "../../../../helpers/post";
import CloseBtn from "../../../../components/buttons/CloseBtn";

const QueAdd = ({ modalClose, refetch }) => {
  const defaultData = {
    id: 0,
    categoryId: 0,
    subCategoryId: 0,
    questionType: "1",
    title: "",
    isMandatoryForAll: false,
    options: ["", ""],
    universities: [],
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
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
