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
import StatusDD from "../Components/StatusDD";
import KeyBtn from "../../../../components/buttons/KeyBtn";

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
      originType: yup.number(),
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

const QueForm = ({ method, submitPath, defaultData, modalClose, refetch }) => {
  console.log(defaultData);
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
  const [answers, setAnswers] = useState(
    defaultData?.answerList && defaultData?.answerList[0]?.answers
  );
  const [answersError, setAnswersError] = useState("");
  const [answers1, setAnswers1] = useState(
    defaultData?.answerList && defaultData?.answerList[0]?.answers
  );
  const [answers2, setAnswers2] = useState(
    defaultData?.answerList && defaultData?.answerList[1]?.answers
  );
  const [answers3, setAnswers3] = useState(
    defaultData?.answerList && defaultData?.answerList[2]?.answers
  );
  const [answers1Error, setAnswers1Error] = useState("");
  const [answers2Error, setAnswers2Error] = useState("");
  const [answers3Error, setAnswers3Error] = useState("");
  const [check, setCheck] = useState(defaultData.isMandatoryForAll);
  const [universityValue, setuniversityValue] = useState(
    defaultData.universities
  );

  const [statusValue, setStatusValue] = useState(defaultData?.status);

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { questionType: defaultData.questionType },
  });

  const handleReqAns = (value) => {
    setAnsReq(value);
    if (value === false) {
      setStatusValue(1);
    } else {
      setStatusValue(3);
    }
  };

  const handleValid = () => {
    var isValid = true;

    if (categoryId.toString() === "0") {
      setCategoryIdError("Category is Required");
      isValid = false;
    }
    if (subCategoryId.toString() === "0") {
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
        id: defaultData.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        status: statusValue,
        isRequiredAns: ansReq,
        isSameForAll: isSameForAll,
        answerList: isSameForAll
          ? [
              {
                id: defaultData?.answerList[0]?.id,
                originType: defaultData?.answerList[0]?.originType,
                answer: answers,
              },
              {
                id: defaultData?.answerList[1]?.id,
                originType: defaultData?.answerList[1]?.originType,
                answer: answers,
              },
              {
                id: defaultData?.answerList[2]?.id,
                originType: defaultData?.answerList[2]?.originType,
                answer: answers,
              },
            ]
          : [
              {
                id: defaultData?.answerList[0]?.id,
                originType: defaultData?.answerList[0]?.originType,
                answer: answers1,
              },
              {
                id: defaultData?.answerList[1]?.id,
                originType: defaultData?.answerList[1]?.originType,
                answer: answers2,
              },
              {
                id: defaultData?.answerList[2]?.id,
                originType: defaultData?.answerList[2]?.originType,
                answer: answers3,
              },
            ],
        isMandatoryForAll: check,
        universities: universityValue,
      };

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

        <Row>
          <Col>
            {/* <DDByAppUrlU
              register={() => {}}
              name="category"
              label="Category"
              placeholder="Select Category"
              url="QuestionCategory/get-all"
              defaultValue={categoryId}
              setValue={setCategoryId}
              action={() => setCategoryIdError("")}
              error={categoryIdError}
            /> */}
            <DDFilterByAppUrlU
              label="Category"
              placeholder="Select Category"
              url="QuestionCategory/get-all"
              defaultValue={categoryId}
              action={setCategoryId}
              setError={() => setCategoryIdError("")}
              error={categoryIdError}
            />
          </Col>
          <Col>
            {/* <DDByAppUrlU
              register={() => {}}
              name="category"
              label="Sub Category"
              placeholder="Select Sub Category"
              url={`QuestionSubCategory/get-sub-categories/${categoryId}`}
              defaultValue={subCategoryId}
              setValue={setSubCategoryId}
              action={() => setSubCategoryIdError("")}
              error={subCategoryIdError}
            /> */}
            <DDFilterByAppUrlU
              label="Sub Category"
              placeholder="Select Sub Category"
              url={`QuestionSubCategory/get-sub-categories/${categoryId}`}
              defaultValue={subCategoryId}
              action={setSubCategoryId}
              setError={() => setSubCategoryIdError("")}
              error={subCategoryIdError}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-start">
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
            className="mb-3 w-75"
          />

          <StatusDD
            value={statusValue}
            setValue={setStatusValue}
            isAns={false}
            className="mb-3 w-25 ml-3"
            isDisabled={statusValue === 1 && true}
          />
        </div>
        <div className="d-flex justify-content-between">
          <CheckOne
            name="isRequiredAns"
            label="Is required answer"
            defaultValue={ansReq}
            onChange={(e) => {
              handleReqAns(e.target.checked);
            }}
          />

          {ansReq && (
            <CheckOne
              name="isSameForAll"
              label="Same Answer for all type"
              defaultValue={isSameForAll}
              onChange={(e) => setIsSameForAll(e.target.checked)}
            />
          )}
        </div>

        {ansReq && (
          <>
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
                    <Origine typeId={item?.originType} />
                    <Input
                      register={register}
                      type="hidden"
                      name={`answerList.${i}.id`}
                      defaultValue={item?.id}
                    />
                    <Input
                      register={register}
                      type="hidden"
                      name={`answerList.${i}.originType`}
                      defaultValue={item?.originType}
                    />

                    <RichTextArea
                      defaultValue={
                        i === 0 ? answers1 : i === 1 ? answers2 : answers3
                      }
                      onChange={
                        i === 0
                          ? setAnswers1
                          : i === 1
                          ? setAnswers2
                          : setAnswers3
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

        {defaultData?.answeredUniversities?.length > 0 && (
          <div className="mb-3">
            <p className="fw-500 mb-1"> Answered universities </p>
            {defaultData?.answeredUniversities?.map((item, i) => (
              <span key={i}>
                <KeyBtn
                  label={item?.label}
                  data={item?.value}
                  value={item?.value}
                  // action={setStatusId}
                />
              </span>
            ))}
            <p className="text-orange fw-500">
              <span className="fw-600">Warning:</span> Submitting this question
              and status will overwrite existing answers for all universities.
              Please review carefully and confirm your decision before clicking
              the Submit button.
            </p>
          </div>
        )}

        <div className="d-flex">
          <SaveButton text="Submit" buttonStatus={isSubmit} />
          <CancelButton cancel={modalClose} className="ml-3" />
        </div>
      </Form>
    </>
  );
};

export default QueForm;
