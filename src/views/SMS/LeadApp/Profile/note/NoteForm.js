import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { Post } from "../../../api/method";
// import Input from "../../../components/ui/Input";
// import TextArea from "../../../components/ui/TextArea";
import Lpost from "../../../../../helpers/Lpost";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../components/buttons/SaveButton";
import Input from "../../../../../components/form/Input";
import TextArea from "../../../../../components/form/TextArea";

const schema = yup.object({
  id: yup.string(),
  noteContent: yup.string(),
  leadRecordId: yup.string(),
});

const NoteForm = ({ id, refetch }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  // const { mutateAsync } = Post();

  const defaultData = {
    id: 0,
    noteContent: "",
    leadRecordId: id,
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultData: defaultData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    const submitData = {
      id: formData.id,
      noteContent: formData.noteContent,
      leadRecordId: formData.leadRecordId,
    };

    setIsSubmit(true);

    Lpost(`leadNote`, submitData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
        refetch && refetch();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });

    //   mutateAsync({
    //     path: "leadNote",
    //     formData: submitData,
    //   })
    //     .then((res) => {
    //       if (res.data.isSuccess === true) {
    //         toast.success(res.data.message);
    //         refetch();
    //         reset();
    //       } else {
    //         toast.warn(res.data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       toast.error("Error:", error.message);
    //     });
    setIsSubmit(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="id"
          register={register}
          defaultValue={defaultData.id}
        />
        <Input
          type="hidden"
          name="leadRecordId"
          register={register}
          defaultValue={defaultData.leadRecordId}
        />

        <TextArea
          label=""
          placeholder="Write a note about this lead"
          name="noteContent"
          register={register}
          defaultValue={defaultData.noteContent}
          error={errors?.noteContent?.message}
        />

        <SaveButton text="Save" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default NoteForm;
