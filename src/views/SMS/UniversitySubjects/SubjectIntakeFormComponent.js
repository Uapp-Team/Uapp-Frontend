import React from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import moment from "moment";
import { permissionList } from "../../../constants/AuthorizationConstant";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import DMYPicker from "../../../components/form/DMYPicker";

const SubjectIntakeFormComponent = ({
  camId,
  subbId,
  handleSubmit,
  intakes,
  intakeLabel,
  intakeValue,
  selectIntake,
  intakeError,
  statuss,
  statusLabel,
  statusValue,
  selectStatus,
  statusError,
  date,
  setDate,
  dateError,
  handleReset,
  progress1,
  buttonStatus,setstartDateError,startdateError,handleStartDate,startDate
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Row>
      <Col xs={9}>
        <Form className="mt-2 ml-4" onSubmit={handleSubmit}>
          <input type="hidden" name="campusId" id="campusId" value={camId} />

          <input type="hidden" name="subjectId" id="subjectId" value={subbId} />

          <p className="section-title">Add Course Intake</p>

          <FormGroup>
            <span>
              <span className="text-danger">*</span>
              Name
            </span>

            <Select
              options={intakes}
              value={{ label: intakeLabel, value: intakeValue }}
              onChange={(opt) => selectIntake(opt.label, opt.value)}
              defaultValue={intakeValue}
              name="intakeId"
              id="intakeId"
            />

            {intakeError && (
              <span className="text-danger">Intake is required</span>
            )}
          </FormGroup>

          <FormGroup>
            <span>
              <span className="text-danger">*</span>
              Status
            </span>

            <Select
              options={statuss}
              value={{ label: statusLabel, value: statusValue }}
              onChange={(opt) => selectStatus(opt.label, opt.value)}
              name="statusId"
              id="statusId"
            />

            {statusError && (
              <span className="text-danger">Status is required</span>
            )}
          </FormGroup>

            {(statusValue === 1 || statusValue === 3) && (
                            
          <FormGroup>
            <span>
              <span className="text-danger">*</span>
              Deadline
            </span>

            <Input
              type="date"
              name="applicationDeadLine"
              id="applicationDeadLine"
              value={date}
              onChange={(e) =>
                setDate(moment(new Date(e.target.value)).format("YYYY-MM-DD"))
              }
            />
            {dateError ? (
              <span className="text-danger">Date is required</span>
            ) : null}
          </FormGroup>
           )}

          {statusValue === 1 && (

          <FormGroup>
             <DMYPicker
                    label="Class Start Date"
                    value={startDate}
                    setValue={handleStartDate}
                    error={startdateError}
                    action={setstartDateError}
                    />
      
          </FormGroup>
          
       )}


          <FormGroup>
            <CancelButton text="Clear" cancel={handleReset} />
            {permissions?.includes(permissionList.Edit_Subjects) && (
              <SaveButton
                text="Save"
                progress={progress1}
                buttonStatus={buttonStatus}
              />
            )}
          </FormGroup>
        </Form>
      </Col>
    </Row>
  );
};

export default SubjectIntakeFormComponent;
