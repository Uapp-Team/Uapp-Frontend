import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../components/buttons/SaveButton";
import DeleteBtn from "../../../../components/buttons/DeleteBtn";
import EditBtn from "../../../../components/buttons/EditBtn";
import Input from "../../../../components/form/Input";
import CheckSwitch from "../../../../components/form/CheckSwitch";
import { Modal, ModalBody } from "reactstrap";
import QueEdit from "../Questions/QueEdit";
import { AdminUsers } from "../../../../components/core/User";
import Origine from "./Origine";

const schema = yup.object({
  id: yup.string(),
  isSameForAll: yup.boolean(),
  answers: yup.string().when("isSameForAll", {
    is: (val) => val === true,
    then: yup.string().required("Required"),
    otherwise: yup.string(),
  }),
  answerList: yup.array().when("isSameForAll", {
    is: (val) => val === false,
    then: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        origineType: yup.number(),
        answers: yup.string().required("Required"),
      })
    ),
    otherwise: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        origineType: yup.number(),
        answers: yup.string(),
      })
    ),
  }),
});

const DateForm = ({
  uId,
  method,
  defaultData,
  submitPath,
  deletePath,
  refetch,
  action,
}) => {
  const { addToast } = useToasts();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isSameForAll, setIsSameForAll] = useState(defaultData?.isSameForAll);
  const [modalOpen, setModalOpen] = useState(false);

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
      universityId: uId,
      questionId: defaultData?.id,
      title: defaultData?.title,
      options: defaultData?.options,
      questionType: defaultData?.questionType,
      isSameForAll: formData.isSameForAll,
      answers: !isSameForAll ? null : [formData.answers],
      answerList: isSameForAll
        ? null
        : [
            {
              id: formData?.answerList[0]?.id,
              origineType: formData?.answerList[0]?.origineType,
              answers: [formData?.answerList[0]?.answers],
            },
            {
              id: formData?.answerList[1]?.id,
              origineType: formData?.answerList[1]?.origineType,
              answers: [formData?.answerList[1]?.answers],
            },
            {
              id: formData?.answerList[2]?.id,
              origineType: formData?.answerList[2]?.origineType,
              answers: [formData?.answerList[2]?.answers],
            },
          ],
    };

    console.log(formData);
    console.log(submitData);

    setIsSubmit(true);
    method(submitPath, submitData).then((res) => {
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
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} value={defaultData?.id} />
        <div className="bg-answer-card-faq p-3 m-4">
          <div className="d-flex justify-content-between mb-4">
            <span className="card-heading">{defaultData?.title}</span>

            {!method && AdminUsers() && (
              <span>
                <EditBtn action={() => setModalOpen(!modalOpen)} />
                <DeleteBtn url={deletePath} refetch={refetch} />
              </span>
            )}
          </div>

          {method && (
            <div className="d-flex mb-3">
              <span className="mr-4 same-answer">Same Answer for all type</span>
              <CheckSwitch
                register={register}
                name="isSameForAll"
                defaultValue={isSameForAll}
                action={() => setIsSameForAll(!isSameForAll)}
              />
            </div>
          )}

          {isSameForAll === true ? (
            <Input
              register={register}
              type="date"
              name="answers"
              defaultValue={defaultData?.answers && defaultData?.answers[0]}
              error={errors?.answers?.message}
              className="mb-3 w-50"
            />
          ) : (
            <>
              {defaultData?.answerList?.map((item, i) => (
                <div key={i}>
                  <Origine typeId={item?.origineType} />
                  <Input
                    register={register}
                    type="hidden"
                    name={`answerList.${i}.id`}
                    defaultValue={item?.id}
                  />
                  <Input
                    register={register}
                    type="hidden"
                    name={`answerList.${i}.origineType`}
                    defaultValue={item?.origineType}
                  />
                  <Input
                    register={register}
                    type="date"
                    name={`answerList.${i}.answers`}
                    defaultValue={item?.answers && item?.answers[0]}
                    error={errors?.answerList?.[i]?.answers?.message}
                    className="mb-3 w-50"
                  />
                </div>
              ))}
            </>
          )}
          {method && (
            <SaveButton
              text="Save"
              progress={isSubmit}
              buttonStatus={isSubmit}
            />
          )}
        </div>
      </Form>

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-lg"
      >
        <ModalBody className="p-4">
          <QueEdit
            id={defaultData?.id}
            modalClose={() => setModalOpen(!modalOpen)}
            refetch={refetch}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default DateForm;
