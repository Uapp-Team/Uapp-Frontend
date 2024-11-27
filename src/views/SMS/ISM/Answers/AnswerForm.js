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
import StatusDD from "../Components/StatusDD";
import KeyBtn from "../../../../components/buttons/KeyBtn";
import TextArea from "../../../../components/form/TextArea";

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

const AnswerForm = ({
  method,
  submitPath,
  defaultData,
  modalClose,
  refetch,
}) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  // const [categoryId, setCategoryId] = useState(defaultData.categoryId);
  // const [subCategoryId, setSubCategoryId] = useState(defaultData.subCategoryId);
  // const [categoryIdError, setCategoryIdError] = useState("");
  // const [subCategoryIdError, setSubCategoryIdError] = useState("");
  // const [title, setTitle] = useState(defaultData?.title);
  // const [titleError, setTitleError] = useState("");
  // const [ansReq, setAnsReq] = useState(defaultData.isRequiredAns);
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
  // const [check, setCheck] = useState(defaultData.isMandatoryForAll);
  // const [universityValue, setuniversityValue] = useState(
  //   defaultData.universities
  // );

  const [statusValue, setStatusValue] = useState(
    defaultData.status !== 1 && defaultData.status !== 5
      ? defaultData.status
      : 3
  );
  const [noteShow, setNoteShow] = useState(false);
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");

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

    // if (categoryId === 0) {
    //   setCategoryIdError("Category is Required");
    //   isValid = false;
    // }
    // if (subCategoryId === 0) {
    //   setSubCategoryIdError("Sub Category is Required");
    //   isValid = false;
    // }
    // if (title === "") {
    //   setTitleError("Title is Required");
    //   isValid = false;
    // }
    if (isSameForAll && !answers) {
      setAnswersError("Required");
      isValid = false;
    }
    if (!isSameForAll && !answers1) {
      setAnswers1Error("Required");
      isValid = false;
    }
    if (!isSameForAll && !answers2) {
      setAnswers2Error("Required");
      isValid = false;
    }
    if (!isSameForAll && !answers3) {
      setAnswers3Error("Required");
      isValid = false;
    }

    if (statusValue === "5") {
      setNoteError("Rejected note Required");
      isValid = false;
    }
    return isValid;
  };

  const onSubmit = (formData) => {
    if (handleValid()) {
      const submitData = {
        id: defaultData.id,
        universityId: defaultData.universityId,
        // categoryId: categoryId,
        // subCategoryId: subCategoryId,
        // title: title,
        status: statusValue,
        // isRequiredAns: ansReq,
        isSameForAll: isSameForAll,
        // answers: !isSameForAll ? null : answers,
        answerList: isSameForAll
          ? [
              {
                id: defaultData?.answerList[0]?.id,
                originType: defaultData?.answerList[0]?.originType,
                answers: answers,
              },
              {
                id: defaultData?.answerList[1]?.id,
                originType: defaultData?.answerList[1]?.originType,
                answers: answers,
              },
              {
                id: defaultData?.answerList[2]?.id,
                originType: defaultData?.answerList[2]?.originType,
                answers: answers,
              },
            ]
          : [
              {
                id: defaultData?.answerList[0]?.id,
                originType: defaultData?.answerList[0]?.originType,
                answers: answers1,
              },
              {
                id: defaultData?.answerList[1]?.id,
                originType: defaultData?.answerList[1]?.originType,
                answers: answers2,
              },
              {
                id: defaultData?.answerList[2]?.id,
                originType: defaultData?.answerList[2]?.originType,
                answers: answers3,
              },
            ],
        // isMandatoryForAll: check,
        // universities: universityValue,
        note: note,
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
        <div className="d-flex justify-content-between align-items-center">
          <span>
            {defaultData?.categoryName} <AiOutlineRight />{" "}
            {defaultData?.subCategoryName}
          </span>

          <StatusDD value={statusValue} setValue={setStatusValue} />
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
        <div className="mb-3">
          <KeyBtn
            label={defaultData?.universityName}
            data={defaultData?.universityId}
            value={defaultData?.universityId}
            // action={setStatusId}
          />
        </div>
        {/* <CheckOne
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
        )} */}
        {defaultData?.notes?.length > 0 && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
              <span className="fw-500">Note</span>
              <span
                className="fs-12px text-uapp pointer text-underline"
                onClick={() => setNoteShow(!noteShow)}
              >
                {noteShow ? "Hide previous" : "See all"}
              </span>
            </div>

            {noteShow ? (
              <>
                {defaultData?.notes?.map((item, i) => (
                  <p className="details-note" key={i}>
                    <span>{item?.createdOn}</span>
                    <hr className="my-1" />
                    <span className="text-gray-70">{item?.note}</span>
                  </p>
                ))}
              </>
            ) : (
              <>
                <p className="details-note">
                  <span>{defaultData?.notes[0]?.createdOn}</span>
                  <hr className="my-1" />
                  <span className="text-gray-70">
                    {defaultData?.notes[0]?.note}
                  </span>
                </p>
              </>
            )}
          </>
        )}
        {/* <p className="details-note">
                  <b>22 Nov 2024</b>
                  <hr className="my-1" />
                  <span className="text-gray-70">
                    Add ansYou can use the reply feature when responding to a
                    specific message in an individual or group chat. You can use
                    the reply feature when responding to a specific message
                    iwers
                  </span>
                </p> */}

        {statusValue === 5 && (
          <TextArea
            placeholder="Add a note explaining the reason for denial"
            defaultValue={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteError("");
            }}
            error={noteError}
          />
        )}
        <div className="d-flex">
          <SaveButton text="Update" buttonStatus={isSubmit} />
          <CancelButton cancel={modalClose} className="ml-3" />
        </div>
      </Form>
    </>
  );
};

export default AnswerForm;
