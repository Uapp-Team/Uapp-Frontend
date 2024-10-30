import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import SaveButton from "../../../../components/buttons/SaveButton";
import Input from "../../../../components/form/Input";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import CardHeading from "../../../../components/ui/CardHeading";
import Lput from "../../../../helpers/Lput";
import { useToasts } from "react-toast-notifications";
// import { toast } from "react-toastify";
// import { Put } from "../../api/method";
// import Input from "../../components/ui/Input";
// import SubHeading from "../../components/ui/SubHeading";
// import CloseBtn from "../../components/buttons/CloseBtn";

const schema = yup.object({
  id: yup.string(),
  name: yup.string(),
  email: yup.string(),
  phoneNumber: yup.string(),
  whatsappNumber: yup.string(),
});

const ProfileEdit = ({ defaultData, refetch, action }) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultData: defaultData,
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData) => {
    const submitData = {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      whatsappNumber: formData.whatsappNumber,
    };

    setIsSubmit(true);

    Lput(`Leads`, submitData).then((res) => {
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

    // mutateAsync({
    //   path: "Leads",
    //   formData: submitData,
    // })
    //   .then((res) => {
    //     if (res.data.isSuccess === true) {
    //       toast.success(res.data.message);
    //       refetch();
    //       action();
    //     } else {
    //       toast.warn(res.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Error:", error.message);
    //   });
    setIsSubmit(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <CardHeading text="Update Profile Info" />
        <CloseBtn action={action} />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="hidden"
          name="id"
          register={register}
          defaultValue={defaultData.id}
        />

        <Input
          label="Name"
          placeholder="Type Name"
          name="name"
          register={register}
          defaultValue={defaultData.name}
          error={errors?.name?.message}
        />
        <Input
          label="Email"
          placeholder="Type Email"
          name="email"
          register={register}
          defaultValue={defaultData.email}
          error={errors?.email?.message}
        />
        <Input
          label="Phone Number"
          placeholder="Type Phone Number"
          name="phoneNumber"
          register={register}
          defaultValue={defaultData.phoneNumber}
          error={errors?.phoneNumber?.message}
        />
        <Input
          label="Whatsapp Number"
          placeholder="Type Whatsapp Number"
          name="whatsappNumber"
          register={register}
          defaultValue={defaultData.whatsappNumber}
          error={errors?.whatsappNumber?.message}
        />

        <SaveButton className="w-100" text="Update" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default ProfileEdit;
