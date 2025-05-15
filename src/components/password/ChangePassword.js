import React from "react";
import { Col, FormGroup, Input } from "reactstrap";
import EyeBtn from "../buttons/EyeBtn";
import CancelButton from "../buttons/CancelButton";
import SaveButton from "../buttons/SaveButton";

const ChangePassword = ({
  submitModalForm,
  PasswordEye,
  setPasswordEye,
  passValidation,
  password,
  passError,
  ConPasswordEye,
  setConPasswordEye,
  ConPassValidation,
  conPassword,
  conPassError,
  handleToggle,
  progress,
  buttonStatus,
}) => {
  return (
    <div>
      <form onSubmit={submitModalForm} className="mt-3">
        <FormGroup row>
          <Col md="8">
            <span>
              <span className="text-danger">*</span> Password{" "}
            </span>
            <div className="d-flex align-items-center">
              {" "}
              <Input
                className="mr-2"
                type={PasswordEye ? "text" : "password"}
                onChange={(e) => {
                  passValidation(e);
                }}
                value={password}
              />
              <EyeBtn eye={PasswordEye} setEye={setPasswordEye} />
            </div>

            <span className="text-danger">{passError}</span>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="8">
            <span>
              <span className="text-danger">*</span> Confirm Password{" "}
            </span>
            <div className="d-flex align-items-center">
              {" "}
              <Input
                className="mr-2"
                type={ConPasswordEye ? "text" : "password"}
                onChange={(e) => {
                  ConPassValidation(e);
                }}
                value={conPassword}
              />
              <EyeBtn eye={ConPasswordEye} setEye={setConPasswordEye} />
            </div>

            <span className="text-danger">{conPassError}</span>
          </Col>
        </FormGroup>
        <FormGroup className="d-flex justify-content-between mt-3">
          <CancelButton cancel={() => handleToggle(false)} />

          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </form>
    </div>
  );
};

export default ChangePassword;
