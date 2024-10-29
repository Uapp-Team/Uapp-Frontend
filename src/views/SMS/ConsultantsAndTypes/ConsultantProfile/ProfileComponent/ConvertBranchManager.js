import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import Input from "../../../../../components/form/Input";
import DDByAppUrl from "../../../../../components/form/DDByAppUrl";
import SaveButton from "../../../../../components/buttons/SaveButton";
import get from "../../../../../helpers/get";

const schema = yup.object({
  id: yup.string(),
  branchId: yup.number().min(1, "Required"),
});

const ConvertBranchManager = ({ id }) => {
  const { addToast } = useToasts();
  const [fetch, setFetch] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    get(`ConsultantProfile/check/${id}`).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [fetch, id]);

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

    post(`ConsultantProfile/convert-branch-manager/${id}`).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setFetch(!fetch);
        // action && action();
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
    <>
      {!data?.isBranchManager && data?.isEmployee && (
        <div className={"custom-card-border p-4 mb-3"}>
          <h5 className="mb-3">Assign {data?.name} as a Branch Manager </h5>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="hidden"
              name="id"
              register={register}
              defaultValue={defaultData.id}
            />

            {/* <DDByAppUrl
          register={register}
          label=""
          placeholder="Select a Branch"
          name="branchId"
          url="BranchDD/index"
          defaultValue={defaultData.branchId}
          error={errors?.branchId?.message}
          action={() => {}}
        /> */}

            <SaveButton text="Assign Branch Manager" buttonStatus={isSubmit} />
          </Form>
        </div>
      )}
    </>
  );
};

export default ConvertBranchManager;
