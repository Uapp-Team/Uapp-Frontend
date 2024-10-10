import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "react-bootstrap";
// import Input from "../../components/ui/Input";
// import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import {
  AdminUsers,
  BranchManager,
  Consultant,
  referenceId,
} from "../../../../components/core/User";
import CardHeading from "../../../../components/ui/CardHeading";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import Input from "../../../../components/form/Input";
import SaveButton from "../../../../components/buttons/SaveButton";
import DDFilterByUrl from "../../../../components/form/DDFilterByUrl";
import DDFilterByAppUrl from "../../../../components/form/DDFilterByAppUrl";
import { useToasts } from "react-toast-notifications";
import Lpost from "../../../../helpers/Lpost";
// import { Post } from "../../api/method";
// import SubHeading from "../../components/ui/SubHeading";
// import CloseBtn from "../../components/buttons/CloseBtn";
// import DDFilterByAppUrl from "../../components/ui/DDFilterByAppUrl";
// import { useContextData } from "../../api/context";
// import {
//   Admin,
//   BranchManager,
//   Consultant,
//   SystemAdmin,
// } from "../../components/User";
// import DDFilterByUrl from "../../components/ui/DDFilterByUrl";

const schema = yup.object({
  branchId: yup.number(),
  consultantId: yup.number(),
  countryId: yup.number(),
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
});

const LeadAdd = ({ refetch, action }) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  // const { mutateAsync } = Post();
  // const [branchId, setBranchId] = useState(
  //   BranchManager()
  //     ? value.user.referenceId
  //     : 0
  // );
  const [consultantId, setConsultantId] = useState(
    Consultant() ? referenceId : 0
  );
  const [countryId, setCountryId] = useState(0);
  // const [branchError, setBranchError] = useState("");
  // const [consultantError, setConsultantError] = useState("");
  // const [countryError, setCountryError] = useState("");
  const defaultData = {
    branchId: BranchManager() ? referenceId : 0,
    consultantId: Consultant() ? referenceId : 0,
    countryId: 0,
    name: "",
    email: "",
    phoneNumber: "",
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
    // const submitData = new FormData();
    // submitData.append("branchId", formData.branchId);
    // submitData.append("consultantId", formData.consultantId);
    // submitData.append("countryId", formData.countryId);
    // submitData.append("name", formData.name);
    // submitData.append("email", formData.email);
    // submitData.append("phoneNumber", formData.phoneNumber);

    const submitData = {
      // branchId: branchId,
      consultantId: consultantId,
      countryId: countryId,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    console.log(submitData);
    setIsSubmit(true);

    Lpost(`Leads`, submitData).then((res) => {
      setIsSubmit(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        reset();
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
    //       reset();
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
      <div className="d-flex justify-content-between mb-3">
        <CardHeading text="Add lead" />
        <CloseBtn action={action} />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-overflow mb-32px">
          {/* {AdminUsers() ? (
            <DDFilterByAppUrl
              label="Select Branch"
              placeholder="Select Branch"
              url="event/BranchApi/Index"
              name="branchId"
              defaultValue={branchId}
              // error={branchError}
              action={setBranchId}
            />
          ) : (
            <Input
              register={register}
              type="hidden"
              name="branchId"
              defaultValue={branchId}
            />
          )} */}
          {AdminUsers() || BranchManager() ? (
            <DDFilterByUrl
              register={register}
              label="Select Consultant"
              placeholder="Select Consultant"
              url={`Consultant/SelectList`}
              name="consultantId"
              defaultValue={consultantId}
              // error={consultantError}
              action={setConsultantId}
            />
          ) : (
            <Input
              register={register}
              type="hidden"
              name="consultantId"
              defaultValue={consultantId}
            />
          )}

          <DDFilterByAppUrl
            register={register}
            label="Destination (Country)"
            placeholder="Select Country"
            url="UniversityCountryDD/index"
            name="countryId"
            defaultValue={countryId}
            // error={countryError}
            action={setCountryId}
          />
          <Input
            register={register}
            label="Name"
            placeholder="Type full name"
            name="name"
            defaultValue={defaultData.name}
            error={errors?.name?.message}
          />

          <Input
            register={register}
            type="email"
            label="Email"
            placeholder="Email"
            name="email"
            defaultValue={defaultData.email}
            error={errors?.email?.message}
          />

          <Input
            register={register}
            type="number"
            label="Phone"
            placeholder="Phone Number"
            name="phoneNumber"
            defaultValue={defaultData.phoneNumber}
            error={errors?.phoneNumber?.message}
          />
        </div>
        <SaveButton text="Save" buttonStatus={isSubmit} />
      </Form>
    </div>
  );
};

export default LeadAdd;
