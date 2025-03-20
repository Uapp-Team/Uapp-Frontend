import React, { useEffect, useState } from "react";
import { Label, Col, Input, Form, FormGroup } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import put from "../../../helpers/put";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const EditAssignUniversityModal = ({
  managerId,
  setModalOpen,
  university,
  success,
  setSuccess,
}) => {
  const [uniValue, setUniValue] = useState(0);
  const [radioIsAcceptHome, setRadioIsAcceptHome] = useState("false");
  const [radioIsAcceptUk, setRadioIsAcceptUk] = useState("true");
  const [radioIsAcceptInt, setRadioIsAcceptInt] = useState("false");
  const [selectedId, setSelectedId] = useState(undefined);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    setUniValue(university?.university?.id);
    setRadioIsAcceptHome(`${university?.isAcceptHome}`);
    setRadioIsAcceptUk(`${university?.isAcceptEU_UK}`);
    setRadioIsAcceptInt(`${university?.isAcceptInternational}`);
    setSelectedId(university?.id);
  }, [university]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUniValue(0);
    setSelectedId(undefined);
    setRadioIsAcceptHome("false");
    setRadioIsAcceptUk("true");
    setRadioIsAcceptInt("false");
  };

  // on change radio button starts here
  const onValueChangeIsAcceptHome = (event) => {
    setRadioIsAcceptHome(event.target.value);
  };

  const onValueChangeIsAcceptUk = (event) => {
    setRadioIsAcceptUk(event.target.value);
  };

  const onValueChangeIsAcceptInt = (event) => {
    setRadioIsAcceptInt(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subData = {
      id: selectedId,
      admissionManagerId: managerId,
      universityId: uniValue,
      isAcceptHome: radioIsAcceptHome === "true" ? true : false,
      isAcceptEU_UK: radioIsAcceptUk === "true" ? true : false,
      isAcceptInternational: radioIsAcceptInt === "true" ? true : false,
    };

    if (selectedId !== undefined) {
      setButtonStatus(true);
      setProgress(true);
      put(`AdmissionManagerUniversity/Update`, subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setModalOpen(false);
          setUniValue(0);
          setSelectedId(undefined);
          setRadioIsAcceptHome("false");
          setRadioIsAcceptUk("true");
          setRadioIsAcceptInt("false");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Col>
            <h4>{university?.university?.name}</h4>
          </Col>
        </FormGroup>

        {uniValue > 0 ? (
          <>
            <p className="pt-3">
              <b>Recruitment Type :</b>
            </p>

            <FormGroup row>
              <Col md="5">
                <span>Home/UK </span>
              </Col>

              <Col md="7">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptHome"
                    onChange={onValueChangeIsAcceptHome}
                    name="isAcceptHome"
                    value="true"
                    checked={radioIsAcceptHome === "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptHome"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptHome"
                    onChange={onValueChangeIsAcceptHome}
                    name="isAcceptHome"
                    value="false"
                    checked={radioIsAcceptHome === "false"}
                  />

                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptHome"
                  >
                    No
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row className="">
              <Col md="5">
                <span>EU/EEU </span>
              </Col>

              <Col md="7">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptEU_UK"
                    onChange={onValueChangeIsAcceptUk}
                    name="isAcceptEU_UK"
                    value="true"
                    checked={radioIsAcceptUk === "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptEU_UK"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptEU_UK"
                    onChange={onValueChangeIsAcceptUk}
                    name="isAcceptEU_UK"
                    value="false"
                    checked={radioIsAcceptUk === "false"}
                  />

                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptEU_UK"
                  >
                    No
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>

            <FormGroup row className="">
              <Col md="5">
                <span>International </span>
              </Col>

              <Col md="7">
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptInternational"
                    onChange={onValueChangeIsAcceptInt}
                    name="isAcceptInternational"
                    value="true"
                    checked={radioIsAcceptInt === "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptInternational"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="isAcceptInternational"
                    onChange={onValueChangeIsAcceptInt}
                    name="isAcceptInternational"
                    value="false"
                    checked={radioIsAcceptInt === "false"}
                  />

                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isAcceptInternational"
                  >
                    No
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
          </>
        ) : null}
        <FormGroup>
          <CancelButton cancel={closeModal} />
          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default EditAssignUniversityModal;
