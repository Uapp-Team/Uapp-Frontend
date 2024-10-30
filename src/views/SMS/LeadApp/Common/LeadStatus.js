import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import { Consultant } from "../../../../components/core/User";
import DefaultDropdownL from "../../../../components/Dropdown/DefaultDropdownL";
import CheckOne from "../../../../components/form/CheckOne";
import TextArea from "../../../../components/form/TextArea";
import Input from "../../../../components/form/Input";
import Status from "./Status";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import CardHeading from "../../../../components/ui/CardHeading";
import { IoMdCheckboxOutline } from "react-icons/io";
import Lput from "../../../../helpers/Lput";
import { useToasts } from "react-toast-notifications";

const schema = yup.object({
  leadId: yup.string(),
  statusId: yup.number().min(1, "Required"),
  message: yup.string().required("Note is required"),
});

const LeadStatus = ({ data, refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [statusId, setStatusId] = useState(data?.status);
  const [statusIdError, setStatusIdError] = useState("");
  const [check, setCheck] = useState(false);
  const [checkError, setCheckError] = useState("");

  const defaultData = {
    leadId: data.leadId,
    statusId: data.status,
    message: "",
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
      leadId: formData.leadId,
      statusId: statusId,
      message: formData.message,
    };
    if (statusId === "1" && !check) {
      setCheckError("Required");
    } else {
      setCheckError("");
      setIsSubmit(true);

      Lput(`Leads/UpdateStatus`, submitData).then((res) => {
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
    }
  };

  return (
    <div className={!action && "custom-card-border p-4 mb-3"}>
      <div className="d-flex justify-content-between mb-3">
        <CardHeading Icon={IoMdCheckboxOutline} text="Status" />
        {action ? (
          <CloseBtn action={action} />
        ) : (
          <span>
            <Status text={data.statusName} />
          </span>
        )}
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="leadId"
          register={register}
          defaultValue={defaultData.leadId}
        />
        <DefaultDropdownL
          label="Update lead status below"
          name="statusId"
          placeholder="Select Status"
          url="LeadStatus/details"
          value={statusId}
          setValue={setStatusId}
          error={statusIdError}
          setError={setStatusIdError}
          action={setStatusId}
        />
        <TextArea
          label="Note"
          register={register}
          name="message"
          placeholder="Write an short note"
          defaultValue={defaultData.message}
          error={errors?.message?.message}
        />
        {statusId === 1 && (
          <CheckOne
            label={
              !Consultant()
                ? "I agree that the process will unassign the consultant from this lead."
                : " I agree that the process will unassign myself from the lead"
            }
            defaultValue={check}
            onChange={(e) => {
              setCheck(e.target.checked);
              e.target.checked ? setCheckError("") : setCheckError("Required");
            }}
            error={checkError}
          />
        )}
        {Consultant() && (
          <p className="text-orange fs-12px fw-600">
            In case you want to send back the lead to admin for reassignment,
            select status as “New”
          </p>
        )}
        <SaveButton text="Update" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default LeadStatus;
