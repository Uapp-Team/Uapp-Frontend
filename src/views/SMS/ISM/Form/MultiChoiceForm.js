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
import CheckBox from "../../../../components/form/CheckBox";
import { AdminUsers, AdmissionManager } from "../../../../components/core/User";
import Origine from "../Components/Origine";

const schema = yup.object({
  id: yup.string(),
  isSameForAll: yup.boolean(),
  answers: yup.array().when("isSameForAll", {
    is: (val) => val === true,
    then: yup.array().required("Required"),
    otherwise: yup.array().nullable(),
  }),
  answerList: yup.array().when("isSameForAll", {
    is: (val) => val === false,
    then: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        origineType: yup.number(),
        answers: yup.array().required("Required"),
      })
    ),
    otherwise: yup.array().of(
      yup.object().shape({
        id: yup.number(),
        origineType: yup.number(),
        answers: yup.array().nullable(),
      })
    ),
  }),
});

const MultiChoiceForm = ({
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
  const [answers, setAnswers] = useState(
    defaultData?.answers && defaultData?.answers[0]
  );
  const [answers1, setAnswers1] = useState(
    defaultData?.answerList && defaultData?.answerList[0]?.answers
  );
  const [answers2, setAnswers2] = useState(
    defaultData?.answerList && defaultData?.answerList[1]?.answers
  );
  const [answers3, setAnswers3] = useState(
    defaultData?.answerList && defaultData?.answerList[2]?.answers
  );
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
      answers: !isSameForAll ? null : formData.answers,
      answerList: isSameForAll
        ? null
        : [
            {
              id: formData?.answerList[0]?.id,
              origineType: formData?.answerList[0]?.origineType,
              answers: formData?.answerList[0]?.answers,
            },
            {
              id: formData?.answerList[1]?.id,
              origineType: formData?.answerList[1]?.origineType,
              answers: formData?.answerList[1]?.answers,
            },
            {
              id: formData?.answerList[2]?.id,
              origineType: formData?.answerList[2]?.origineType,
              answers: formData?.answerList[2]?.answers,
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

            {!method &&
              (AdminUsers() || AdmissionManager()) &&
              defaultData?.isEdit === true && (
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
            <>
              <CheckBox
                register={register}
                id={defaultData?.title}
                name="answers"
                list={defaultData?.options}
                defaultValue={answers}
                error={errors?.answers?.message && "Required"}
                action={setAnswers}
                className="mb-3"
              />
            </>
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

                  <CheckBox
                    register={register}
                    id={`${defaultData?.title} - ${item?.origineType}`}
                    name={`answerList.${i}.answers`}
                    list={defaultData?.options}
                    defaultValue={
                      i === 0 ? answers1 : i === 1 ? answers2 : answers3
                    }
                    action={
                      i === 0
                        ? setAnswers1
                        : i === 1
                        ? setAnswers2
                        : setAnswers3
                    }
                    error={
                      errors?.answerList?.[i]?.answers?.message && "Required"
                    }
                    className="mb-3 ml-2"
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

export default MultiChoiceForm;
