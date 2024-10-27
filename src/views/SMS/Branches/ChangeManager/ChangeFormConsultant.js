import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import Input from "../../../../components/form/Input";
import { useToasts } from "react-toast-notifications";
import DDByAppUrl from "../../../../components/form/DDByAppUrl";
import post from "../../../../helpers/post";

const schema = yup.object({
  branchId: yup.string(),
  userId: yup.number().min(1, "Required"),
});

const ChangeFormConsultant = ({ branchId, refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);

  const defaultData = {
    branchId: branchId,
    userId: 0,
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
    setIsSubmit(true);

    post(`Leads/UpdateStatus`, formData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refetch && refetch();
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
  };

  return (
    <div className={"custom-card-border p-4 mb-3"}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="branchId"
          register={register}
          defaultValue={defaultData.branchId}
        />

        <DDByAppUrl
          register={register}
          label="Select a Consultant"
          placeholder="Select a Consultant"
          name="userId"
          url="ConsultantDD/index"
          defaultValue={defaultData.userId}
          error={errors?.userId?.message}
          action={() => {}}
        />

        <SaveButton text="Change Manager" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default ChangeFormConsultant;
