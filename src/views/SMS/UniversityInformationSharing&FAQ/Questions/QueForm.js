import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Col, Form, Row } from "reactstrap";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import { useToasts } from "react-toast-notifications";
import TopicDivider from "../../Components/TopicDivider";
import CancelButton from "../../../../components/buttons/CancelButton";
import CheckOne from "../../../../components/form/CheckOne";
import MultiSelectU from "../../../../components/form/MultiSelectU";
import DDByAppUrlU from "../../../../components/form/DDByAppUrlU";
import GroupButton from "../Components/GroupButton";

const schema = yup.object().shape({
  id: yup.number(),
  categoryId: yup.number(),
  subCategoryId: yup.number(),
  questionType: yup.string(),
  title: yup.string().required("Required"),
  isMandatoryForAll: yup.boolean(),
  options: yup.array().when("questionType", {
    is: (val) => val === "2" || val === "3",
    then: yup.array().of(
      yup.object().shape({
        item: yup.string().required("Required"),
      })
    ),
    otherwise: yup.array().of(
      yup.object().shape({
        item: yup.string(),
      })
    ),
  }),
  universities: yup.array().of(
    yup.object().shape({
      item: yup.string(),
    })
  ),
});

const QueForm = ({ method, submitPath, defaultData, modalClose, refetch }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [queType, setQueType] = useState(defaultData?.questionType);
  const [check, setCheck] = useState(defaultData.isMandatoryForAll);
  const [categoryId, setCategoryId] = useState(defaultData.categoryId);
  const [subCategoryId, setSubCategoryId] = useState(defaultData.subCategoryId);
  const [categoryIdError, setCategoryIdError] = useState("");
  const [subCategoryIdError, setSubCategoryIdError] = useState("");
  const [selectList, setSelectList] = useState(
    defaultData.options ? defaultData.options : []
  );
  const [universityValue, setuniversityValue] = useState(
    defaultData.universities
  );

  console.log(categoryId, subCategoryId);

  const action = (value) => {
    if (value === "2" || value === "3") {
      setSelectList(["", ""]);
    } else setSelectList(null);
  };

  const addForm = () => {
    const arrayData = [...selectList];
    arrayData.push("");
    setSelectList(arrayData);
  };

  const removeForm = (i) => {
    selectList.splice(i, 1);
    setSelectList([...selectList]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { questionType: defaultData.questionType },
  });

  const onSubmit = (formData) => {
    if (categoryId === 0 || subCategoryId === 0) {
      categoryId === 0 && setCategoryIdError("Category is Required");
      subCategoryId === 0 && setSubCategoryIdError("Sub Category is Required");
    } else {
      const submitData = {
        id: formData.id,
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        questionType: parseInt(queType),
        title: formData.title,
        isMandatoryForAll: check,
        options: formData.options,
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
          <GroupButton
            register={register}
            name="questionType"
            list={[
              { id: "1", name: "Single Question" },
              { id: "2", name: "Multiple Choice" },
              { id: "3", name: "Single Choice" },
              { id: "4", name: "Date Range" },
              { id: "5", name: "Date" },
            ]}
            defaultValue={queType}
            setValue={setQueType}
            action={action}
          />

          <Card className="p-3">
            <Input
              label="Title"
              type="text"
              name="title"
              register={register}
              defaultValue={defaultData.title}
              error={errors?.title?.message}
            />
            {(queType === "2" || queType === "3") && (
              <div className="w-50">
                <p>Select List</p>
                {selectList?.length > 0 &&
                  selectList?.map((item, i) => (
                    <div
                      key={i}
                      className="d-flex justify-content-between align-items-start w-100"
                    >
                      <div className="w-100">
                        <Input
                          type="text"
                          defaultValue={item}
                          name={`options.${i}.item`}
                          register={register}
                          error={errors?.options?.[i]?.item?.message}
                        />
                      </div>

                      {selectList.length > 2 && (
                        <span
                          className="gray-500 pointer ml-2"
                          onClick={() => removeForm(i)}
                        >
                          Delete
                        </span>
                      )}
                    </div>
                  ))}
                <span className="teal-500 pointer" onClick={() => addForm()}>
                  Add option
                </span>
              </div>
            )}
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
