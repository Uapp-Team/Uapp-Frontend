import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import Input from "../../../../../components/form/Input";
import DDByAppUrl from "../../../../../components/form/DDByAppUrl";
import SaveButton from "../../../../../components/buttons/SaveButton";

const schema = yup.object({
  id: yup.string(),
  branchId: yup.number().min(1, "Required"),
});

const ConvertBranchManager = ({ id, refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);

  const defaultData = {
    id: id,
    branchId: 0,
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
          name="id"
          register={register}
          defaultValue={defaultData.id}
        />

        <DDByAppUrl
          register={register}
          label="Convert as a Branch Manager"
          placeholder="Select a Branch"
          name="branchId"
          url="BranchDD/index"
          defaultValue={defaultData.branchId}
          error={errors?.branchId?.message}
          action={() => {}}
        />

        <SaveButton text="Submit" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default ConvertBranchManager;
