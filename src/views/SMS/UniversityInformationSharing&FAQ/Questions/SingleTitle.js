import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Col, Form, Row } from "reactstrap";
import Input from "../../../../components/form/Input";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import TopicDivider from "../../Components/TopicDivider";
import CancelButton from "../../../../components/buttons/CancelButton";
import CheckOne from "../../../../components/form/CheckOne";
import MultiSelectU from "../../../../components/form/MultiSelectU";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import DDFilterByAppUrl from "../../../../components/form/DDFilterByAppUrl";
import QuestionTypesFaq from "../Components/QuestionTypesFaq";

const schema = yup.object({
  label: yup.string().required("Required").max(50),
});

const SingleTitle = ({ modalClose, action, refetch }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [activetab, setActivetab] = useState("1");
  const [check, setCheck] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [subCountryId, setSubCountryId] = useState(0);
  const [universityError, setuniversityError] = useState("Select University");
  const [universityValue, setuniversityValue] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { label } = errors;

  const onSubmit = (formData) => {
    const submitData = new FormData();
    submitData.append("image", "imgFile");
    // const submitData = {
    //   label: formData.label,
    //   typeId: type,
    // };

    setIsSubmit(true);
    post("submitPath", formData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        modalClose();
        refetch && refetch();
        action && action();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
    setIsSubmit(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-answer-card-faq p-3 mb-4">
          <Row>
            <Col>
              <DDFilterByAppUrl
                register={register}
                label="Category"
                placeholder="Select Category"
                url="QuestionCategory/get-all"
                name="categoryId"
                defaultValue={categoryId}
                // error={countryError}
                action={setCategoryId}
              />
            </Col>
            <Col>
              <DDFilterByAppUrl
                register={register}
                label="Sub Category"
                placeholder="Select Sub Category"
                url={`QuestionSubCategory/get-sub-categories/${categoryId}`}
                name="subCategoryId"
                defaultValue={subCountryId}
                // error={countryError}
                action={setSubCountryId}
              />
            </Col>
          </Row>
        </div>

        <div className="bg-answer-card-faq p-3 mb-3">
          <QuestionTypesFaq activetab={activetab} setActivetab={setActivetab} />

          <Card className="p-3">
            <Input
              label="Title"
              type="text"
              name="label"
              register={register}
              error={label?.message}
            />
          </Card>
        </div>
        <CheckOne
          label="Mandatory for all universities"
          defaultValue={check}
          onChange={(e) => {
            setCheck(e.target.checked);
            e.target.checked ? setCheckError("") : setCheckError("Required");
          }}
          error={checkError}
        />
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
        <div className="d-flex">
          <SaveButton text="Add Question" buttonStatus={isSubmit} />
          <CancelButton cancel={modalClose} />
        </div>
      </Form>
    </>
  );
};

export default SingleTitle;
