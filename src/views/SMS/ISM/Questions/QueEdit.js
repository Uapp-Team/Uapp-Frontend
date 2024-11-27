import React, { useEffect, useState } from "react";
import QueForm from "./QueForm";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Uget from "../../../../helpers/Uget";
import put from "../../../../helpers/put";

const QueEdit = ({ id, modalClose, refetch }) => {
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
    isRequiredAns: data?.isRequiredAns,
    isSameForAll: data?.isSameForAll,
    answerList: data?.answerList
      ? data?.answerList
      : [
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
    isMandatoryForAll: data?.isMandatoryForAll,
    universities: data?.universities,
    answeredUniversities: data?.answeredUniversities,
    status: data?.status ? data?.status : 3,
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h3>Edit Question</h3>
        <CloseBtn action={modalClose} />
      </div>
      {data?.id && (
        <QueForm
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

export default QueEdit;
