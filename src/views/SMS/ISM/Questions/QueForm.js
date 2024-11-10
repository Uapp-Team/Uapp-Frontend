import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Col, Form, Row } from "reactstrap";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import CancelButton from "../../../../components/buttons/CancelButton";
import CheckOne from "../../../../components/form/CheckOne";
import DDByAppUrlU from "../../../../components/form/DDByAppUrlU";
import RichTextArea from "../../../../components/form/RichTextArea";
import TopicDivider from "../../Components/TopicDivider";
import MultiSelectU from "../../../../components/form/MultiSelectU";
import Origine from "../Components/Origine";

const schema = yup.object().shape({
  id: yup.number(),
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  title: yup.string(),
  isRequiredAns: yup.boolean(),
  isSameForAll: yup.boolean(),
  isMandatoryForAll: yup.boolean(),
  answers: yup.string(),
  answerList: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      origineType: yup.number(),
      answers: yup.string(),
    })
  ),
  universities: yup.array().of(
    yup.object().shape({
      item: yup.string(),
    })
  ),
});

const QueForm = ({ method, submitPath, defaultData, modalClose, refetch }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [check, setCheck] = useState(defaultData.isMandatoryForAll);
  const [isSameForAll, setIsSameForAll] = useState(defaultData?.isSameForAll);
  const [ansReq, setAnsReq] = useState(defaultData.isRequiredAns);
  const [categoryId, setCategoryId] = useState(defaultData.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(defaultData.subCategoryId);
  const [categoryIdError, setCategoryIdError] = useState("");
  const [subCategoryIdError, setSubCategoryIdError] = useState("");

  const [universityValue, setuniversityValue] = useState(
    defaultData.universities
  );

  const [title, setTitle] = useState(defaultData?.title);
  const [titleError, setTitleError] = useState("");

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

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { questionType: defaultData.questionType },
  });

  const onSubmit = (formData) => {
    if (categoryId === 0 || subCategoryId === 0 || !title || ansReq) {
      categoryId === 0 && setCategoryIdError("Category is Required");
      subCategoryId === 0 && setSubCategoryIdError("Sub Category is Required");
      !title && setTitleError("Title is Required");
      ansReq && isSameForAll && !answers && setAnswersError("Required");
      ansReq && !isSameForAll && !answers1 && setAnswers1Error("Required");
      ansReq && !isSameForAll && !answers2 && setAnswers2Error("Required");
      ansReq && !isSameForAll && !answers3 && setAnswers3Error("Required");
    } else {
      const submitData = {
        id: formData.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        isRequiredAns: ansReq,
        isMandatoryForAll: check,
        universities: universityValue,

        isSameForAll: formData.isSameForAll,
        answers: !isSameForAll ? null : [answers],
        answerList: isSameForAll
          ? null
          : [
              {
                id: formData?.answerList[0]?.id,
                origineType: formData?.answerList[0]?.origineType,
                answers: [answers1],
              },
              {
                id: formData?.answerList[1]?.id,
                origineType: formData?.answerList[1]?.origineType,
                answers: [answers2],
              },
              {
                id: formData?.answerList[2]?.id,
                origineType: formData?.answerList[2]?.origineType,
                answers: [answers3],
              },
            ],
      };
      console.log(formData);
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

        {/* <div className="bg-answer-card-faq p-3 mb-4"> */}
        <Row>
          <Col>
            <DDByAppUrlU
              register={register}
              label="Category"
              placeholder="Select Category"
              url="QuestionCategory/get-all"
              name="categoryId"
              defaultValue={categoryId}
              setValue={setCategoryId}
              action={() => setCategoryIdError("")}
              error={categoryIdError}
            />
          </Col>
          <Col>
            <DDByAppUrlU
              register={register}
              label="Sub Category"
              placeholder="Select Sub Category"
              url={`QuestionSubCategory/get-sub-categories/${categoryId}`}
              name="subCategoryId"
              defaultValue={subCategoryId}
              setValue={setSubCategoryId}
              action={() => setSubCategoryIdError("")}
              error={subCategoryIdError}
            />
          </Col>
        </Row>

        <Input
          label="Title"
          type="text"
          name="title"
          defaultValue={defaultData.title}
          error={titleError}
          onChange={(e) => {
            console.log(e.target.value);
            setTitle(e.target.value);
            setTitleError("");
          }}
        />

        <div className="d-flex justify-content-between">
          <CheckOne
            name="isRequiredAns"
            label="Is required answer"
            defaultValue={ansReq}
            onChange={(e) => {
              setAnsReq(e.target.checked);
            }}
          />

          <CheckOne
            name="isSameForAll"
            label="Same Answer for all type"
            defaultValue={isSameForAll}
            onChange={(e) => setIsSameForAll(e.target.checked)}
          />
        </div>

        {/* <RichTextArea
          label="Details"
          defaultValue={answers}
          onChange={setAnswers}
          error={answersError}
          action={() => setAnswersError("")}
          className="mb-3"
        /> */}

        {isSameForAll === true ? (
          <RichTextArea
            defaultValue={answers}
            onChange={setAnswers}
            error={answersError}
            action={() => setAnswersError("")}
            // className="mb-3"
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
                  // className="mb-3"
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
          <SaveButton text="Add Question" buttonStatus={isSubmit} />
          <CancelButton cancel={modalClose} className="ml-3" />
        </div>
      </Form>
    </>
  );
};

export default QueForm;
