import React from "react";
import { Button, Col, Form, FormGroup, Input } from "reactstrap";

import Select from "react-select";
import CustomButtonRipple from "../../../Components/CustomButtonRipple";
import ButtonLoader from "../../../Components/ButtonLoader";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CancelButton from "../../../../../components/buttons/CancelButton";

const PromotionalCommissionForm = ({
  handleSubmit,
  update,
  data,
  uniOptions,
  universityLabel,
  universityValue,
  selectUniversity,
  uniError,
  min,
  handleDate,
  date,
  accountIntakeOptions,
  selectAccountIntake,
  intakeError,
  intakeLabel,
  intakeValue,
  amount,
  commissionError,
  commissionGroupOptions,
  commissionLabel,
  commissionValue,
  selectCommissionGroup,
  handleMin,
  minError,
  handleAmount,
  dateError,
  closeModal,
  progress,
  buttonStatus,
  amountError,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      {update ? (
        <input type="hidden" name="id" id="id" value={data?.id} />
      ) : null}

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            University <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Select
            options={uniOptions}
            value={{ label: universityLabel, value: universityValue }}
            onChange={(opt) => selectUniversity(opt.label, opt.value)}
            name="universityId"
            id="universityId"
          />
          <span className="text-danger">{uniError}</span>
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            Minimum Student Requirement <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Input
            type="number"
            name="minumumStudentRequirement"
            id="minumumStudentRequirement"
            placeholder="Enter Minimum Student Requirement"
            value={min}
            onChange={(e) => {
              handleMin(e);
            }}
          />
          <span className="text-danger">{minError}</span>
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            Start From <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Input
            type="date"
            name="startFrom"
            id="startFrom"
            value={date}
            onChange={(e) => {
              handleDate(e);
            }}
          />
          <span className="text-danger">{dateError}</span>
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            Account Intake <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Select
            options={accountIntakeOptions}
            value={{ label: intakeLabel, value: intakeValue }}
            onChange={(opt) => selectAccountIntake(opt.label, opt.value)}
            name="accountIntakeId"
            id="accountIntakeId"
          />
          <span className="text-danger">{intakeError}</span>
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            Commission Amount <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Input
            type="number"
            name="commissionAmount"
            id="commissionAmount"
            placeholder="Enter Commission Amount"
            value={amount}
            onChange={(e) => {
              handleAmount(e);
            }}
          />
          <span className="text-danger">{amountError}</span>
        </Col>
      </FormGroup>

      <FormGroup row className="has-icon-left position-relative">
        <Col md="4">
          <span>
            Commission Group <span className="text-danger">*</span>{" "}
          </span>
        </Col>
        <Col md="8">
          <Select
            options={commissionGroupOptions}
            value={{ label: commissionLabel, value: commissionValue }}
            onChange={(opt) => selectCommissionGroup(opt.label, opt.value)}
            name="commissionGroupId"
            id="commissionGroupId"
          />
          <span className="text-danger">{commissionError}</span>
        </Col>
      </FormGroup>

      <FormGroup className="d-flex justify-content-between mt-3">
        <CancelButton cancel={closeModal} />

        <SaveButton
          text="Submit"
          progress={progress}
          buttonStatus={buttonStatus}
        />
      </FormGroup>
    </Form>
  );
};

export default PromotionalCommissionForm;
