import React from "react";
import { Button, Col, Form, FormGroup, Input } from "reactstrap";
import Select from "react-select";

import moment from "moment";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import ButtonLoader from "../Components/ButtonLoader";
import { permissionList } from "../../../constants/AuthorizationConstant";

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
  value,
  setValue,
  handleReset,
  progress1,
  buttonStatus,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <div>
      <div className="hedding-titel d-flex justify-content-between ml-3 mb-4">
        <div>
          <h5>
            {" "}
            <b>Add Course Intake</b>{" "}
          </h5>

          <div className="bg-h"></div>
        </div>
      </div>

      <Form className="mt-2 ml-4" onSubmit={handleSubmit}>
        <input type="hidden" name="campusId" id="campusId" value={camId} />

        <input type="hidden" name="subjectId" id="subjectId" value={subbId} />

        <FormGroup row className="has-icon-left position-relative">
          <Col md="4">
            <span>
              Name <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="8">
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
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col md="4">
            <span>
              Status <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col md="8">
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
          </Col>
        </FormGroup>

        <FormGroup row className="has-icon-left position-relative">
          <Col md="4">
            <span>
              Deadline <span className="text-danger">*</span>{" "}
            </span>
          </Col>
          <Col className="date-input" md="8">
            <Input
              type="date"
              name="applicationDeadLine"
              id="applicationDeadLine"
              value={value}
              // defaultValue={handleDate(currUpdateData?.endDate)}
              onChange={(e) =>
                setValue(moment(new Date(e.target.value)).format("YYYY-MM-DD"))
              }
              required
            />
          </Col>
        </FormGroup>

        <FormGroup
          className="has-icon-left position-relative"
          style={{ display: "flex", justifyContent: "end" }}
        >
          <Button color="danger" className={"mr-0 mt-3"} onClick={handleReset}>
            Reset
          </Button>

          {permissions?.includes(permissionList.Edit_Subjects) ? (
            <CustomButtonRipple
              type={"submit"}
              className={"mr-0 mt-3 ml-1 badge-primary"}
              name={progress1 ? <ButtonLoader /> : "Submit"}
              permission={6}
              isDisabled={buttonStatus}
            />
          ) : null}
        </FormGroup>
      </Form>
    </div>
  );
};

export default SubjectIntakeFormComponent;
