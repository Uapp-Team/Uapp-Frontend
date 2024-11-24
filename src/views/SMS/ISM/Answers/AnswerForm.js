import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Row } from "reactstrap";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import CancelButton from "../../../../components/buttons/CancelButton";
import CheckOne from "../../../../components/form/CheckOne";
import RichTextArea from "../../../../components/form/RichTextArea";
import TopicDivider from "../../Components/TopicDivider";
import MultiSelectU from "../../../../components/form/MultiSelectU";
import Origine from "../Components/Origine";
import DDFilterByAppUrlU from "../../../../components/form/DDFilterByAppUrlU";
import { AiOutlineRight } from "react-icons/ai";
import Filter from "../../../../components/Dropdown/Filter";
import Pointer from "../../../../components/buttons/Pointer";

const schema = yup.object().shape({
  id: yup.number(),
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  title: yup.string(),
  isRequiredAns: yup.boolean(),
  isSameForAll: yup.boolean(),
  answers: yup.string(),
  answerList: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      origineType: yup.number(),
      answers: yup.string(),
    })
  ),
  isMandatoryForAll: yup.boolean(),
  universities: yup.array().of(
    yup.object().shape({
      item: yup.string(),
    })
  ),
});

const AnswerForm = ({
  method,
  submitPath,
  defaultData,
  modalClose,
  refetch,
}) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [categoryId, setCategoryId] = useState(defaultData.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(defaultData.subCategoryId);
  const [categoryIdError, setCategoryIdError] = useState("");
  const [subCategoryIdError, setSubCategoryIdError] = useState("");
  const [title, setTitle] = useState(defaultData?.title);
  const [titleError, setTitleError] = useState("");
  const [ansReq, setAnsReq] = useState(defaultData.isRequiredAns);
  const [isSameForAll, setIsSameForAll] = useState(defaultData?.isSameForAll);
  const [answers, setAnswers] = useState(defaultData?.answers);
  const [answersError, setAnswersError] = useState("");
  const [answers1, setAnswers1] = useState(
    defaultData?.answerList && defaultData?.answerList[0]?.answers?.[0]
  );
  const [answers2, setAnswers2] = useState(
    defaultData?.answerList && defaultData?.answerList[1]?.answers?.[0]
  );
  const [answers3, setAnswers3] = useState(
    defaultData?.answerList && defaultData?.answerList[2]?.answers?.[0]
  );
  const [answers1Error, setAnswers1Error] = useState("");
  const [answers2Error, setAnswers2Error] = useState("");
  const [answers3Error, setAnswers3Error] = useState("");
  const [check, setCheck] = useState(defaultData.isMandatoryForAll);
  const [universityValue, setuniversityValue] = useState(
    defaultData.universities
  );

  const [userTypeLabel, setUserTypeLabel] = useState("All User");
  const [userTypeValue, setUserTypeValue] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { questionType: defaultData.questionType },
  });

  const handleValid = () => {
    var isValid = true;

    if (categoryId === 0) {
      setCategoryIdError("Category is Required");
      isValid = false;
    }
    if (subCategoryId === 0) {
      setSubCategoryIdError("Sub Category is Required");
      isValid = false;
    }
    if (title === "") {
      setTitleError("Title is Required");
      isValid = false;
    }
    if (ansReq && isSameForAll && !answers) {
      setAnswersError("Required");
      isValid = false;
    }
    if (ansReq && !isSameForAll && !answers1) {
      setAnswers1Error("Required");
      isValid = false;
    }
    if (ansReq && !isSameForAll && !answers2) {
      setAnswers2Error("Required");
      isValid = false;
    }
    if (ansReq && !isSameForAll && !answers3) {
      setAnswers3Error("Required");
      isValid = false;
    }
    return isValid;
  };

  const onSubmit = (formData) => {
    if (handleValid()) {
      const submitData = {
        id: formData.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        status: 1,
        isRequiredAns: ansReq,
        isSameForAll: formData.isSameForAll,
        // answers: !isSameForAll ? null : answers,
        answerList: isSameForAll
          ? [
              {
                id: formData?.answerList[0]?.id,
                origineType: formData?.answerList[0]?.origineType,
                answers: answers,
              },
              {
                id: formData?.answerList[1]?.id,
                origineType: formData?.answerList[1]?.origineType,
                answers: answers,
              },
              {
                id: formData?.answerList[2]?.id,
                origineType: formData?.answerList[2]?.origineType,
                answers: answers,
              },
            ]
          : [
              {
                id: formData?.answerList[0]?.id,
                origineType: formData?.answerList[0]?.origineType,
                answers: answers1,
              },
              {
                id: formData?.answerList[1]?.id,
                origineType: formData?.answerList[1]?.origineType,
                answers: answers2,
              },
              {
                id: formData?.answerList[2]?.id,
                origineType: formData?.answerList[2]?.origineType,
                answers: answers3,
              },
            ],
        isMandatoryForAll: check,
        universities: universityValue,
      };

      console.log(submitData);

      setIsSubmit(true);
      method(submitPath, submitData).then((res) => {
        setIsSubmit(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          reset();
          modalClose();
          refetch && refetch();
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
      setIsSubmit(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className="modal-overflow">
        <input type="hidden" {...register("id")} value={defaultData?.id} />

        <div className="d-flex justify-content-between">
          <p>
            Category <AiOutlineRight /> Subcategory
          </p>

          <Filter
            data={[
              { id: 0, name: `${(<Pointer color="#1890FF" />)} "Hello` },
              { id: 1, name: "Consultant" },
              { id: 2, name: "Affiliate" },
              { id: 3, name: "Companion" },
            ]}
            label={userTypeLabel}
            setLabel={setUserTypeLabel}
            value={userTypeValue}
            setValue={setUserTypeValue}
          />
        </div>
        <div className="d-flex justify-content-end">
          <CheckOne
            name="isSameForAll"
            label="Same Answer for all type"
            defaultValue={isSameForAll}
            onChange={(e) => setIsSameForAll(e.target.checked)}
          />
        </div>

        {isSameForAll === true ? (
          <RichTextArea
            defaultValue={answers}
            onChange={setAnswers}
            error={answersError}
            action={() => setAnswersError("")}
          />
        ) : (
          <>
            {defaultData?.answerList?.map((item, i) => (
              <div key={i}>
                <Origine typeId={item?.origineType} />
                <Input
                  register={register}
                  type="hidden"
                  name={`answerList.${i}.id`}
                  defaultValue={item?.id}
                />
                <Input
                  register={register}
                  type="hidden"
                  name={`answerList.${i}.origineType`}
                  defaultValue={item?.origineType}
                />

                <RichTextArea
                  defaultValue={
                    i === 0 ? answers1 : i === 1 ? answers2 : answers3
                  }
                  onChange={
                    i === 0 ? setAnswers1 : i === 1 ? setAnswers2 : setAnswers3
                  }
                  error={
                    i === 0
                      ? answers1Error
                      : i === 1
                      ? answers2Error
                      : answers3Error
                  }
                  action={() =>
                    i === 0
                      ? setAnswers1Error("")
                      : i === 1
                      ? setAnswers2Error("")
                      : setAnswers3Error("")
                  }
                />
              </div>
            ))}
          </>
        )}

        <CheckOne
          name="isMandatoryForAll"
          label="Mandatory for all universities"
          defaultValue={check}
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
          className="mb-3 fw-600"
        />

        {!check && (
          <>
            <TopicDivider text="Or" />
            <MultiSelectU
              url="University/get-dd"
              value={universityValue}
              setValue={setuniversityValue}
              name="userTypeIds"
              className="mb-3"
              placeholder="Select University"
            />
          </>
        )}

        <div className="d-flex">
          <SaveButton text="Add" buttonStatus={isSubmit} />
          <CancelButton cancel={modalClose} className="ml-3" />
        </div>
      </Form>
    </>
  );
};

export default AnswerForm;
