import React, { useEffect } from "react";
import { Card, Col, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useParams } from "react-router-dom";
import get from "../../../helpers/get";
import { useState } from "react";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";
import SubjectIntakeFormComponent from "./SubjectIntakeFormComponent";
import SubjectIntakeListComponent from "./SubjectIntakeListComponent";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import moment from "moment";

const SubjectIntake = () => {
  const { camId } = useParams();
  const { subbId } = useParams();

  const [intake, setIntake] = useState([]);
  const [status, setStatus] = useState([]);

  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [subIntake, setSubIntake] = useState([]);
  const [success, setSuccess] = useState(false);
  const [serialNum, setSerialNum] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);

  const [intId, setIntId] = useState(0);
  const [intName, setIntName] = useState("");

  const [intakeError, setIntakeError] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const [date, setDate] = useState();
  const [dateError, setDateError] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [startdateError, setstartDateError] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    get("Intake/Index").then((res) => {
      setIntake(res);
    });

    get("IntakeStatus/GetAll").then((res) => {
      setStatus(res);
    });

    get(
      `SubjectIntake/GetAllSubjectIntake?subjectId=${subbId}&campusId=${camId}`
    ).then((res) => {
      console.log("intklist", res);
      setSubIntake(res);
    });
  }, [success, subbId, camId]);

  const intakes = intake.map((intakeOptions) => ({
    label: intakeOptions?.name,
    value: intakeOptions?.id,
  }));
  const statuss = status.map((statusOptions) => ({
    label: statusOptions?.name,
    value: statusOptions?.id,
  }));

  const selectIntake = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);
    setDate(moment(new Date(label)).format("YYYY-MM-DD"));
  };

  const selectStatus = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);
  };

  const validateForm = () => {
    let isFormValid = true;

    if (intakeValue === 0) {
      isFormValid = false;
      setIntakeError(true);
    }
    if (statusValue === 0) {
      isFormValid = false;
      setStatusError(true);
    }

    if (!date && statusValue === 1) {
      isFormValid = false;
      setDateError(true);
    }

    return isFormValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    startDate && subData.append(`classStartDate`, startDate);

    if (validateForm()) {
      setButtonStatus(true);
      setProgress1(true);
      post(`SubjectIntake/AssignToSubject`, subData).then((res) => {
        setButtonStatus(false);
        setProgress1(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setIntakeLabel("Select Intake");
          setIntakeValue(0);
          setStatusLabel("Select Status");
          setStatusValue(0);
          setDate("");
        } else {
          addToast(res?.data?.message, {
            appearance: "warning",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const toggleDanger = (name, id) => {
    setIntName(name);
    setIntId(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setIntName("");
    setIntId(0);
  };

  const handleDelete = (id) => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`SubjectIntake/DeleteById/${id}`).then((action) => {
      setButtonStatus1(false);
      setProgress(false);
      setSuccess(!success);
      setDeleteModal(false);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setIntName("");
      setIntId(0);
    });
  };

  const handleReset = () => {
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setStatusLabel("Select Status");
    setStatusValue(0);
    setIntakeError(false);
    setStatusError(false);
    setDate("");
  };

    const handleStartDate = (e) => {
    if (e) {
      setStartDate(e);
      // } else {
      //   setstartDateError("Class Start Date Required");
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <div>
      <BreadCrumb
        title="subject Intake List"
        backTo="Campus Course"
        path={`/campusSubjectList/${camId}`}
      />

      <div className="">
        <Card>
          <Row className="pt-3 gx-4">
            <Col md="4">
              <SubjectIntakeFormComponent
                camId={camId}
                subbId={subbId}
                handleSubmit={handleSubmit}
                intakes={intakes}
                intakeLabel={intakeLabel}
                intakeValue={intakeValue}
                selectIntake={selectIntake}
                intakeError={intakeError}
                statuss={statuss}
                statusLabel={statusLabel}
                statusValue={statusValue}
                selectStatus={selectStatus}
                statusError={statusError}
                date={date}
                setDate={setDate}
                dateError={dateError}
                handleReset={handleReset}
                progress1={progress1}
                buttonStatus={buttonStatus}
                setstartDateError={setstartDateError}
                startdateError={startdateError}
                handleStartDate={handleStartDate}
                startDate={startDate}
              />
            </Col>
            <Col md="8">
              <SubjectIntakeListComponent
                subIntake={subIntake}
                serialNum={serialNum}
                handleDate={handleDate}
                toggleDanger={toggleDanger}
                deleteModal={deleteModal}
                closeDeleteModal={closeDeleteModal}
                intName={intName}
                buttonStatus1={buttonStatus1}
                handleDelete={handleDelete}
                intId={intId}
                progress={progress}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default SubjectIntake;
