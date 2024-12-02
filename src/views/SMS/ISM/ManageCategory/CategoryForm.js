import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputEdit from "../../../../components/form/InputEdit";
import { useToasts } from "react-toast-notifications";
import CategoryEdit from "./CategoryEdit";
import CategoryAdd from "./CategoryAdd";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import IconBtn from "../../../../components/buttons/IconBtn";
import { FaCheck, FaCirclePlus } from "react-icons/fa6";
import { Col, Row } from "reactstrap";
import EditBtn from "../../../../components/buttons/EditBtn";
import { AiOutlinePlusCircle } from "react-icons/ai";

const schema = yup.object({
  id: yup.string(),
  name: yup
    .string()
    .max(20, "Category not more then 20 character")
    .required("Category is required"),
});

const CategoryForm = ({
  categoryId,
  add,
  setAdd,
  method,
  defaultData,
  submitPath,
  deletePath,
  refetch,
  action,
  isOpen,
  toggleAccordion,
}) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultData: defaultData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    setIsSubmit(true);

    method(submitPath, formData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        refetch && refetch();
        action && action();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
    setIsEdit(!isEdit);
    setIsSubmit(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={defaultData?.id} />
        {categoryId > 0 && (
          <input type="hidden" {...register("categoryId")} value={categoryId} />
        )}
        <Row className="mb-20px">
          <Col xs={11}>
            {add === true || isEdit ? (
              <>
                <InputEdit
                  type="text"
                  name="name"
                  placeholder={`Add ${categoryId > 0 ? "Sub " : ""}Category`}
                  register={register}
                  defaultValue={defaultData?.name}
                  error={errors?.name?.message}
                  className="faq-sub-category mb-0"
                />
              </>
            ) : (
              <div className="d-flex">
                <p
                  className={`faq-sub-category mb-0 ${
                    !categoryId ? "text-black" : ""
                  }`}
                >
                  {defaultData?.name}
                </p>
                <EditBtn action={() => setIsEdit(!isEdit)} />
                {(!defaultData?.subCategories ||
                  defaultData?.subCategories?.length === 0) && (
                  <>
                    <DeleteBtn url={deletePath} refetch={refetch} />
                  </>
                )}
              </div>
            )}
          </Col>

          <Col xs={1} className="text-end mt-1">
            {add ? (
              <IconBtn
                Icon={categoryId > 0 ? AiOutlinePlusCircle : FaCirclePlus}
                color="#045d5e"
                buttonStatus={isSubmit}
              />
            ) : isEdit ? (
              <IconBtn Icon={FaCheck} color="#22C55E" buttonStatus={isSubmit} />
            ) : toggleAccordion && defaultData?.subCategories?.length > 0 ? (
              <span>
                {isOpen ? (
                  <i
                    class="fas fa-chevron-up pointer"
                    onClick={toggleAccordion}
                  ></i>
                ) : (
                  <i
                    class="fas fa-chevron-down pointer"
                    onClick={toggleAccordion}
                  ></i>
                )}
              </span>
            ) : null}
          </Col>
        </Row>
      </Form>

      {isOpen ? (
        <div className="faq-category-list pl-3 border-left">
          {defaultData?.subCategories?.map((item, j) => (
            <div key={j}>
              <CategoryEdit
                categoryId={defaultData?.id}
                data={item}
                submitPath="QuestionSubCategory/update"
                deletePath={`QuestionSubCategory/delete/${item?.id}`}
                refetch={refetch}
              />
            </div>
          ))}

          <CategoryAdd
            categoryId={defaultData?.id}
            submitPath="QuestionSubCategory/save"
            refetch={refetch}
          />
        </div>
      ) : toggleAccordion && defaultData?.subCategories?.length === 0 ? (
        <div className="faq-category-list pl-3 border-left">
          <CategoryAdd
            categoryId={defaultData?.id}
            submitPath="QuestionSubCategory/save"
            refetch={refetch}
          />
        </div>
      ) : null}
    </>
  );
};

export default CategoryForm;
