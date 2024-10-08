import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Card, CardBody, Col, Input, Row, Form, FormGroup } from "reactstrap";
import get from "../../../../../helpers/get";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CampusNavbar from "../CampusNavbar";
import CancelButton from "../../../../../components/buttons/CancelButton";
import moment from "moment";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import post from "../../../../../helpers/post";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const CampusSubjectIntake = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { uniId, campusId } = useParams();
  const history = useHistory();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [intakeData, setIntakeData] = useState([]);
  const [intakeStatusData, setIntakeStatusData] = useState([]);
  const [intakeLabel, setIntakeLabel] = useState("Select Intake");
  const [intakeValue, setIntakeValue] = useState(0);
  const [intakeError, setIntakeError] = useState(false);
  const [statusLabel, setStatusLabel] = useState("Select Status");
  const [statusValue, setStatusValue] = useState(0);
  const [statusError, setStatusError] = useState(false);
  const [subjectIds, setSubjectIds] = useState([]);
  const [progress5, setProgress5] = useState(false);
  const { addToast } = useToasts();

  const [date, setDate] = useState();
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    get(`IntakeDD/Index`).then((res) => {
      setIntakeData(res);
    });

    get(`IntakeStatus/GetAll`).then((res) => {
      setIntakeStatusData(res);
    });
  }, []);

  // for intake dropdown
  const intakeDropDown = intakeData?.map((intake) => ({
    label: intake?.name,
    value: intake?.id,
  }));

  const intakeStatusDropDown = intakeStatusData?.map((status) => ({
    label: status?.name,
    value: status?.id,
  }));

  const selectIntakeType = (label, value) => {
    setIntakeError(false);
    setIntakeLabel(label);
    setIntakeValue(value);

    get(
      `CampusSubjectIntake/Get/${intakeValue}/${statusValue}/${campusId}`
    ).then((res) => {
      console.log(res);
      setSubjectIds(res);
    });
  };

  const selectStatusType = (label, value) => {
    setStatusError(false);
    setStatusLabel(label);
    setStatusValue(value);

    get(
      `CampusSubjectIntake/Get/${intakeValue}/${statusValue}/${campusId}`
    ).then((res) => {
      console.log(res);
      setSubjectIds(res);
    });
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

  const handleSubjectAssignInIntake = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    subdata.append(`subjectIntakes`, JSON.stringify(subjectIds));

    const postData = {
      campusId: campusId,
      intakeId: intakeValue,
      statusId: statusValue,
      applicationDeadline: date,
      subjectIntakes: subjectIds,
    };

    // setButtonStatus5(true);
    if (validateForm()) {
      setButtonStatus(true);
      setProgress5(true);
      post(`CampusSubjectIntake/Save`, postData).then((res) => {
        setButtonStatus(false);
        setProgress5(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          history.push(`/CampusSubjectIntake/${uniId}/${campusId}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleClearSearch = () => {
    setStatusLabel("Select Status");
    setStatusValue(0);
    setIntakeLabel("Select Intake");
    setIntakeValue(0);
    setDate("");
  };

  const handleSelectAll = (e) => {
    console.log(e.target.checked);
    const values = [...subjectIds];
    values.map((per) => {
      per.isAssigned = e.target.checked;
    });
    setSubjectIds(values);
  };
  const handleCheck = (e, i) => {
    const values = [...subjectIds];
    values[i].isAssigned = e.target.checked;
    setSubjectIds(values);
  };

  const goPrevious = () => {
    history.push(`/CampusAssignSubject/${uniId}/${campusId}`);
  };
  const goNext = () => {
    history.push(`/CampusGallery/${uniId}/${campusId}`);
  };
  return (
    <div>
      <CampusNavbar
        title="Course Intake"
        activeTab="3"
        id={uniId}
        subId={campusId}
      />
      <Card>
        <CardBody>
          <p className="section-title">Course Intake</p>

          <Form onSubmit={handleSubjectAssignInIntake}>
            <Input
              type="hidden"
              id="campusId"
              name="campusId"
              value={campusId}
            />
            <FormGroup>
              <Row>
                <Col lg="4" md="4" sm="6" xs="12">
                  <span>
                    <span className="text-danger">*</span> Intake
                  </span>
                  <Select
                    options={intakeDropDown}
                    value={{ label: intakeLabel, value: intakeValue }}
                    onChange={(opt) => selectIntakeType(opt.label, opt.value)}
                    name="intakeId"
                    id="intakeId"
                  />
                  {intakeError ? (
                    <span className="text-danger">Intake is required</span>
                  ) : null}
                </Col>

                <Col lg="4" md="4" sm="6" xs="12">
                  <span>
                    <span className="text-danger">*</span> Status
                  </span>

                  <Select
                    options={intakeStatusDropDown}
                    value={{ label: statusLabel, value: statusValue }}
                    onChange={(opt) => selectStatusType(opt.label, opt.value)}
                    name="statusId"
                    id="statusId"
                  />
                  {statusError ? (
                    <span className="text-danger">Status is required</span>
                  ) : null}
                </Col>
                <Col className="date-input" lg="4" md="4" sm="6" xs="12">
                  <span>
                    <span className="text-danger">*</span> Select date
                  </span>
                  <Input
                    type="date"
                    name="applicationDeadline"
                    id="applicationDeadline"
                    value={date}
                    onChange={(e) => {
                      setDate(
                        moment(new Date(e.target.value)).format("YYYY-MM-DD")
                      );
                      setDateError(false);
                    }}
                  />
                  {dateError ? (
                    <span className="text-danger">Date is required</span>
                  ) : null}
                </Col>
              </Row>
            </FormGroup>

            <FormGroup>
              <Row>
                <Col sm="12">
                  {subjectIds?.length > 1 && (
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={(e) => handleSelectAll(e)}
                        type="checkbox"
                        name=""
                      // checked={
                      //   checked?.length === subjectIds?.length ? true : false
                      // }
                      />
                      <label className="form-check-label" htmlFor="">
                        Select All
                      </label>
                    </div>
                  )}
                </Col>
                {subjectIds?.map((per, i) => (
                  <Col xs="6" sm="4" md="3" lg="2" key={per?.subjectId}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={(e) => handleCheck(e, i)}
                        type="checkbox"
                        checked={per?.isAssigned === true ? true : false}
                      />
                      <label className="form-check-label" htmlFor="">
                        {per?.subjectName}
                      </label>
                    </div>
                  </Col>
                ))}
              </Row>
            </FormGroup>
            <FormGroup row>
              <Col className="text-right">
                <CancelButton text="Clear" cancel={handleClearSearch} />
                {permissions?.includes(permissionList.Edit_University) && (
                  <SaveButton
                    text="Save"
                    progress={progress5}
                    buttonStatus={buttonStatus}
                  />
                )}
              </Col>
            </FormGroup>
          </Form>
          <FormGroup row>
            <Col className="d-flex justify-content-between">
              <PreviousButton action={goPrevious} />
              <SaveButton text=" Next" action={goNext} />
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default CampusSubjectIntake;
