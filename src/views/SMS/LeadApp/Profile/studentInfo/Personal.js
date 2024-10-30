import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import Text from "../../UI/Text";
import { Col, Row } from "react-bootstrap";
import EditBtn from "../../../components/buttons/EditBtn";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import { toast } from "react-toastify";
import { Post } from "../../../api/method";
import { useForm } from "react-hook-form";
import Input from "../../../components/ui/Input";
import ButtonLight from "../../../components/buttons/ButtonLight";

const schema = yup.object({
  categoryId: yup.string(),
  name: yup.string().required("Name is required").max(50),
});

const Personal = () => {
  const [isEdit, setEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const { mutateAsync } = Post();
  const defaultData = {
    categoryId: "",
    name: "",
  };

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
    mutateAsync({
      path: "",
      formData: formData,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          toast.success(res.data.message);
          reset();
          setEdit(false);
        } else {
          toast.warn(res.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error:", error.message);
      });
    setIsSubmit(false);
  };

  return (
    <>
      {!isEdit ? (
        <div className="d-flex justify-content-between">
          <Row>
            <Col md={4}>
              <Text title="First Name" text="Mahedi" />
            </Col>
            <Col md={4}>
              <Text title="Last Name" text="Hassan" />
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Text title="Address Line 1" text="775 Rolling Green Road" />
            </Col>
            <Col md={4}>
              <Text title="Address Line 2" text="Unit 203" />
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Text title="City" text="Indianapolis" className="mb-0" />
            </Col>
            <Col md={4}>
              <Text title="State" text="IN - Indiana" className="mb-0" />
            </Col>
            <Col md={4}>
              <Text title="Field Postal Code" text="46280" className="mb-0" />
            </Col>
          </Row>
          <EditBtn action={() => setEdit(true)} />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4}>
              <Input
                label="First Name"
                placeholder=" Enter First Name"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}>
              <Input
                label="Last Name"
                placeholder=" Enter Last Name"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Input
                label="Address Line 1"
                placeholder=" Enter Address Line 1"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}>
              <Input
                label="Address Line 2"
                placeholder=" Enter Address Line 2"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}></Col>
            <Col md={4}>
              <Input
                label="City"
                placeholder=" Enter City"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}>
              <Input
                label="State"
                placeholder=" Enter State"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
            <Col md={4}>
              <Input
                label="Postal Code"
                placeholder=" Enter Postal Code"
                name="name"
                register={register}
                defaultValue={defaultData.name}
                error={errors?.name?.message}
              />
            </Col>
          </Row>
          <ButtonLight action={() => setEdit(false)} className="me-2" />
          <ButtonPrimary buttonStatus={isSubmit} />
        </Form>
      )}
    </>
  );
};

export default Personal;
