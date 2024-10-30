import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import DefaultDropdownL from "../../../../components/Dropdown/DefaultDropdownL";
import CardHeading from "../../../../components/ui/CardHeading";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Input from "../../../../components/form/Input";
import { useToasts } from "react-toast-notifications";
import Lput from "../../../../helpers/Lput";

const schema = yup.object({
  leadId: yup.string(),
  branchId: yup.string(),
  consultantId: yup.string(),
  isAutoAssign: yup.boolean(),
});

const LeadAssign = ({ data, refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  // const [autoAssign, setAutoAssign] = useState("false");
  const branchId = 0;
  // const [branchId, setBranchId] = useState(data.branchId ? data.branchId : "0");
  // const [branchError, setBranchError] = useState("");
  const [consultantId, setConsultantId] = useState(
    data.consultantId ? data.consultantId : "0"
  );
  const [consultantError, setConsultantError] = useState("");
  const defaultData = {
    leadId: data.leadId,
    branchId: data.branchId,
    consultantId: data.consultantId,
    isAutoAssign: false,
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultData: defaultData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    if (
      // autoAssign === "false" &&
      // branchId === "0" ||
      consultantId === "0"
    ) {
      // branchId === "0" && setBranchError("Please Select Branch");
      consultantId === "0" && setConsultantError("Please Select Consultant");
    } else {
      const submitData = {
        leadId: formData.leadId,
        branchId: branchId,
        consultantId: consultantId,
        isAutoAssign: formData.isAutoAssign === "true" ? true : false,
      };

      setIsSubmit(true);

      Lput(`LeadAssignment/Assign`, submitData).then((res) => {
        setIsSubmit(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
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
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <CardHeading text={data.consultantId ? "Re Assign" : "Assign"} />
        <CloseBtn action={action} />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="leadId"
          register={register}
          defaultValue={defaultData.leadId}
        />

        {/* <RadioByObj
          label="Do you wants to assign selected leads to consultant automatically ?"
          type="radio"
          name="isAutoAssign"
          register={register}
          list={[
            { id: "true", name: "Auto Assign" },
            { id: "false", name: "No" },
          ]}
          defaultValue={autoAssign}
          error={errors?.isAutoAssign?.message}
          action={setAutoAssign}
        />

        {autoAssign === "true" ? (
          <>
            <p className="gray-500">
              Note: System will detect and find suitable consultant for
              particular leads and those will assign to the consultant
            </p>
          </>
        ) : ( */}
        <>
          {/* <DDFilterByAppUrl
            label="Select Branch"
            name="branchId"
            placeholder="Select Branch"
            url="event/BranchApi/Index"
            defaultValue={branchId}
            error={branchError}
            setError={setBranchError}
            action={setBranchId}
          /> */}

          <DefaultDropdownL
            label="Select Consultant"
            name="consultantId"
            placeholder="Select Consultant"
            url={`Consultant/SelectList`}
            value={consultantId}
            error={consultantError}
            setValue={setConsultantId}
            setError={setConsultantError}
          />
        </>
        {/* )} */}

        <SaveButton text="Update" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default LeadAssign;
