import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import { useToasts } from "react-toast-notifications";

const DesignationsCommissionForm = ({
  consultant,
  data,
  setData,
  success,
  setSuccess,
  closeModal,
  progress,
}) => {
  console.log(data);
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [levelValue, setLevelValue] = useState(data?.levelValue);
  const [levelValueError, setLevelValueError] = useState();
  const [title, settitle] = useState(data?.title);
  const [titleError, settitleError] = useState(false);
  const [personalStudentTarget, setpersonalStudentTarget] = useState(
    data?.personalStudentTarget
  );
  const [personalStudentTargetError, setpersonalStudentTargetError] =
    useState(false);
  const [consultantTarget, setconsultantTarget] = useState(
    data?.consultantTarget
  );
  const [consultantTargetError, setconsultantTargetError] = useState(false);
  const [studentFromTeam, setstudentFromTeam] = useState(data?.studentFromTeam);
  const [studentFromTeamError, setstudentFromTeamError] = useState(false);
  const [teamBonus, setteamBonus] = useState(data?.teamBonus);
  const [teamBonusError, setteamBonusError] = useState(false);
  const [personalBonus, setpersonalBonus] = useState(data?.personalBonus);
  const [personalBonusError, setpersonalBonusError] = useState(false);
  const [hasFixedSallary, sethasFixedSallary] = useState(
    data?.hasFixedSallary ? data?.hasFixedSallary : false
  );

  const handleLevelValue = (e) => {
    const value = e.target.value;
    setLevelValue(value);
    if (!value) {
      setLevelValueError("Level Value is required");
    } else if (value < 1 || value > 5) {
      setLevelValueError("Level Value Must be 1 to 5");
    } else {
      setLevelValueError("");
    }
  };

  const validateForm = () => {
    let isFormValid = true;

    if (levelValue === "") {
      isFormValid = false;
      setLevelValueError("Level Value is required");
    } else if (levelValue < 1 || levelValue > 5) {
      isFormValid = false;
      setLevelValueError("Level Value Must be 1 to 5");
    } else {
      isFormValid = true;
      setLevelValueError("");
    }

    if (title === "") {
      isFormValid = false;
      settitleError(true);
    }
    if (personalStudentTarget === "") {
      isFormValid = false;
      setpersonalStudentTargetError(true);
    }
    if (consultantTarget === "") {
      isFormValid = false;
      setconsultantTargetError(true);
    }
    if (studentFromTeam === "") {
      isFormValid = false;
      setstudentFromTeamError(true);
    }
    if (teamBonus === "") {
      isFormValid = false;
      setteamBonusError(true);
    }
    if (personalBonus === "") {
      isFormValid = false;
      setpersonalBonusError(true);
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("hasFixedSallary", hasFixedSallary);
    console.log(subData);
    var formIsValid = validateForm();
    if (formIsValid) {
      setButtonStatus(true);
      if (!data?.id) {
        post(`Designation/Create`, subData).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            modalCloseAction();
          }
        });
      } else {
        put(`Designation/Update`, subData).then((res) => {
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            modalCloseAction();
          }
        });
      }
      setButtonStatus(false);
    }
  };

  const modalCloseAction = () => {
    closeModal();
    setData();
    setLevelValue();
    settitle();
    setpersonalStudentTarget();
    setconsultantTarget();
    setstudentFromTeam();
    setteamBonus();
    setpersonalBonus();
    sethasFixedSallary();
  };

  return (
    <div>
      <Row className="fs-16px fw-500 px-4 pt-4">
        <Col xs={10}>
          <span> {consultant?.name}</span>
        </Col>
        <Col xs={2} className="text-right">
          <i className="fas fa-times pointer" onClick={modalCloseAction}></i>
        </Col>
      </Row>
      <hr />
      <Form onSubmit={handleSubmit} className="px-4">
        {data?.id ? (
          <input type="hidden" name="id" id="id" value={data?.id} />
        ) : null}
        <input
          type="hidden"
          name="consultantTypeId"
          id="consultantTypeId"
          value={consultant?.id}
        />
        <FormGroup className="d-none">
          <span>
            Level<span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="levelValue"
            id="levelValue"
            placeholder="Level Value"
            value={levelValue}
            onChange={(e) => {
              handleLevelValue(e);
            }}
          />
          <span className="text-danger">{levelValueError}</span>
        </FormGroup>

        <FormGroup>
          <span>
            Designation <span className="text-danger">*</span>
          </span>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Designation"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
              settitleError(false);
            }}
          />
          {titleError && (
            <span className="text-danger">Designation is required</span>
          )}
        </FormGroup>

        <FormGroup>
          <span>
            Target student <span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="personalStudentTarget"
            id="personalStudentTarget"
            placeholder="Target student"
            value={personalStudentTarget}
            onChange={(e) => {
              setpersonalStudentTarget(e.target.value);
              setpersonalStudentTargetError(false);
            }}
          />
          {personalStudentTargetError && (
            <span className="text-danger">Target student is required</span>
          )}
        </FormGroup>

        <FormGroup>
          <span>
            Consultant target <span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="consultantTarget"
            id="consultantTarget"
            placeholder="Consultant target"
            value={consultantTarget}
            onChange={(e) => {
              setconsultantTarget(e.target.value);
              setconsultantTargetError(false);
            }}
          />
          {consultantTargetError && (
            <span className="text-danger">Consultant target is required</span>
          )}
        </FormGroup>

        <FormGroup>
          <span>
            Team target<span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="studentFromTeam"
            id="studentFromTeam"
            placeholder="Team target"
            value={studentFromTeam}
            onChange={(e) => {
              setstudentFromTeam(e.target.value);
              setstudentFromTeamError(false);
            }}
          />
          {studentFromTeamError && (
            <span className="text-danger">Team target is required</span>
          )}
        </FormGroup>

        <FormGroup>
          <span>
            Team Bonus amount<span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="teamBonus"
            id="teamBonus"
            placeholder="Team Bonus amount"
            value={teamBonus}
            onChange={(e) => {
              setteamBonus(e.target.value);
              setteamBonusError(false);
            }}
          />
          {teamBonusError && (
            <span className="text-danger">Team target is required</span>
          )}
        </FormGroup>

        <FormGroup>
          <span>
            Personal Bonus <span className="text-danger">*</span>
          </span>
          <Input
            type="number"
            name="personalBonus"
            id="personalBonus"
            placeholder="Personal bonus amount"
            value={personalBonus}
            onChange={(e) => {
              setpersonalBonus(e.target.value);
              setpersonalBonusError(false);
            }}
          />
          {personalBonusError && (
            <span className="text-danger">
              Personal bonus Amount is required
            </span>
          )}
        </FormGroup>

        <FormGroup>
          <span>Has Fixed Sallary</span>
          <div>
            <input
              type="radio"
              value={true}
              checked={hasFixedSallary === true}
              onChange={() => sethasFixedSallary(true)}
            />
            <span className="col-1">Yes</span>
            <input
              type="radio"
              value={false}
              checked={hasFixedSallary === false}
              onChange={() => sethasFixedSallary(false)}
            />
            <span className="col-1">No</span>
          </div>
        </FormGroup>

        <FormGroup className="d-flex justify-content-between mt-3">
          <CancelButton cancel={modalCloseAction} />

          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </div>
  );
};

export default DesignationsCommissionForm;
