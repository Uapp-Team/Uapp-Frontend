import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import CloseBtn from "../../../../../components/buttons/CloseBtn";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { Input } from "reactstrap";
import TextArea from "../../../../../components/form/TextArea";

const schema = yup.object({
  id: yup.string(),
  message: yup.string().required("Note is required"),
});

const ConsultantStatus = ({
  title = "Write a note",
  data,
  url,
  method,
  close,
  action,
}) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);

  const defaultData = {
    id: data?.id,
    message: data?.message,
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
    console.log(formData);
    const submitData = {
      id: data?.id,
      message: formData.message,
    };

    setIsSubmit(true);

    method(url, submitData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        action && action();
        reset();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
    setIsSubmit(false);
    // }
  };

  return (
    <div className={!action && "custom-card-border p-4 mb-3"}>
      <div className="d-flex justify-content-between mb-3">
        <h3>{title} </h3>
        <CloseBtn action={close} />
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="id"
          register={register}
          defaultValue={defaultData.id}
        />

        <TextArea
          // label="Note"
          register={register}
          name="message"
          placeholder="Write an short note"
          defaultValue={defaultData.message}
          error={errors?.message?.message}
        />

        <SaveButton text="Submit" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default ConsultantStatus;
