import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
// import { Put, UappPost } from "../../../api/method";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CardHeading from "../../../../../components/ui/CardHeading";
import CloseBtn from "../../../../../components/buttons/CloseBtn";
import Input from "../../../../../components/form/Input";
import SaveButton from "../../../../../components/buttons/SaveButton";
import DDByAppUrl from "../../../../../components/form/DDByAppUrl";
import { useToasts } from "react-toast-notifications";
import Lput from "../../../../../helpers/Lput";
import post from "../../../../../helpers/post";
// import { toast } from "react-toastify";
// import DDByAppUrl from "../../../components/ui/DDByAppUrl";
// import Input from "../../../components/ui/Input";
// import SubHeading from "../../../components/ui/SubHeading";
// import CloseBtn from "../../../components/buttons/CloseBtn";

const schema = yup.object({
  consultantId: yup.number(),
  universityCountryId: yup.number().required("Preferred Country is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required"),
});

const ConvertStudentForm = ({ id, defaultData, refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [converResponse, setConverResponse] = useState({});
  // const { mutateAsync } = UappPost();
  // const { mutateAsync: put } = Put();

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

    post(`event/ConvertToStudent`, formData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setConverResponse(res.data);
        reset();
        action && action();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });

    // mutateAsync({
    //   path: "event/ConvertToStudent",
    //   formData: formData,
    // })
    //   .then((res) => {
    //     if (res.data.isSuccess === true) {
    //       setConverResponse(res.data);
    //       reset();
    //       action && action();
    //       // toast.success(res.data.message);
    //     } else {
    //       toast.warn(res.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Error:", error.message);
    //   });
    setIsSubmit(false);
  };

  const onTokenSubmit = () => {
    Lput(`LeadProfile/Converted/${id}`).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        refetch && refetch();
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });

    // put({
    //   path: `/LeadProfile/Converted/${id}`,
    //   formData: "",
    // })
    //   .then((res) => {
    //     if (res.data.isSuccess === true) {
    //       toast.success(res.data.message);
    //       refetch && refetch();
    //     } else {
    //       toast.warn(res.data.message);
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("Error:", error.message);
    //   });
  };

  useEffect(() => {
    if (converResponse?.isSuccess && converResponse?.data) {
      onTokenSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [converResponse]);

  return (
    <>
      <div className="d-flex justify-content-between">
        <CardHeading text="Convert lead to student" />
        <CloseBtn action={action} />
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-overflow mb-32px">
          <Input
            type="hidden"
            name="consultantId"
            register={register}
            defaultValue={defaultData.consultantId}
          />

          <Input
            type="hidden"
            name="universityCountryId"
            register={register}
            defaultValue={defaultData.universityCountryId}
          />

          <DDByAppUrl
            register={register}
            label="Student Preferred Country"
            name="universityCountryId"
            placeholder="Select Country"
            url="UniversityCountryDD/index"
            defaultValue={defaultData.universityCountryId}
            error={errors?.universityCountryId?.message}
            action={() => {}}
          />

          <Input
            label="First Name"
            placeholder="Type first name"
            name="firstName"
            register={register}
            defaultValue={defaultData.firstName}
            error={errors?.firstName?.message}
          />

          <Input
            label="Last Name"
            placeholder="Type last name"
            name="lastName"
            register={register}
            defaultValue={defaultData.lastName}
            error={errors?.lastName?.message}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Type Email Address"
            name="email"
            register={register}
            defaultValue={defaultData.email}
            error={errors?.email?.message}
          />
        </div>
        <p>
          The conversion process will create a student account on the UAPP
          Portal using the lead information. The unidirectional process can not
          be reverted.
        </p>
        <SaveButton buttonStatus={isSubmit} />
      </Form>
    </>
  );
};

export default ConvertStudentForm;
