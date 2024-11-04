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

const schema = yup.object().shape({
  id: yup.number(),
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  title: yup.string(),
  isRequiredAns: yup.boolean(),
  isMandatoryForAll: yup.boolean(),

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
  const [ansReq, setAnsReq] = useState(defaultData.isRequiredAns);
  const [categoryId, setCategoryId] = useState(defaultData.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(defaultData.subCategoryId);
  const [categoryIdError, setCategoryIdError] = useState("");
  const [subCategoryIdError, setSubCategoryIdError] = useState("");

  const [universityValue, setuniversityValue] = useState(
    defaultData.universities
  );
  const [answers, setAnswers] = useState(defaultData?.answers);
  const [answersError, setAnswersError] = useState("");

  const [title, setTitle] = useState(defaultData?.title);
  const [titleError, setTitleError] = useState("");

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
      ansReq && !answers && setAnswersError("Details is Required");
    } else {
      const submitData = {
        id: formData.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        title: title,
        answers: answers,
        isRequiredAns: ansReq,
        isMandatoryForAll: check,
        universities: universityValue,
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={defaultData?.id} />

        <div className="bg-answer-card-faq p-3 mb-4">
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
        </div>

        <div className="bg-answer-card-faq p-3 mb-3">
          <Card className="p-3">
            <Input
              label="Title"
              type="text"
              name="title"
              // register={register}
              defaultValue={defaultData.title}
              error={titleError}
              onChange={(e) => {
                console.log(e.target.value);
                setTitle(e.target.value);
                setTitleError("");
              }}
            />
            <CheckOne
              name="isRequiredAns"
              label="Is required answer"
              defaultValue={ansReq}
              onChange={(e) => {
                setAnsReq(e.target.checked);
              }}
              className="mb-3 fw-600"
            />
            <RichTextArea
              label="Details"
              defaultValue={answers}
              onChange={setAnswers}
              error={answersError}
              action={() => setAnswersError("")}
              className="mb-3"
            />
          </Card>
        </div>
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
              // error={isuserError}
              // setError={setIsUserError}
              // errorText={userError}
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
