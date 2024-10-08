import React from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import Select from "react-select";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const EducationalForm = ({
  oneData,
  attendedFrom,
  attendedTo,
  handleSubmit,
  applicationStudentId,
  educationLevelName,
  educationLevelLabel,
  educationLevelValue,
  selectEducationLevel,
  programError,
  countryName,
  countryLabel,
  countryValue,
  selectCountry,
  countryError,
  handleCancelForm,
  progress,
  buttonStatus,
  isAchieved,
  setAchieved,
  handleQualificationSubject,
  qualificationSubjectError,
  handleAttendedFrom,
  attendedFromError,
  handleDuration,
  durationError,
  handleInstitution,
  institutionError,
  handleAttendedTo,
  attendedToError,
  handlePercentage,
  percentageError,
  minDate,
  qualificationSubject,
  percentage,
  duration,
  institution,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="studentId"
          id="studentId"
          value={applicationStudentId}
        />
        {oneData?.id ? (
          <input type="hidden" name="id" id="id" value={oneData?.id} />
        ) : null}
        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                <span className="text-danger">*</span>Education Level
              </span>

              <Select
                className="form-mt"
                options={educationLevelName}
                value={{
                  label: educationLevelLabel,
                  value: educationLevelValue,
                }}
                onChange={(opt) => selectEducationLevel(opt.label, opt.value)}
                name="educationLevelId"
                id="educationLevelId"
              />
              {programError && (
                <span className="text-danger">Education level is required</span>
              )}
            </FormGroup>
            <FormGroup>
              <span>
                {" "}
                <span className="text-danger">*</span>
                Qualification Course
              </span>
              <Input
                className="form-mt"
                type="text"
                name="qualificationSubject"
                id="qualificationSubject"
                onChange={(e) => {
                  handleQualificationSubject(e);
                }}
                value={qualificationSubject}
                placeholder="Enter Qualification Course"
              />
              <span className="text-danger">{qualificationSubjectError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                <span className="text-danger">*</span> Attended From
              </span>

              <Input
                className="form-mt"
                type="date"
                value={attendedFrom}
                onChange={(e) => {
                  handleAttendedFrom(e);
                }}
                min={minDate}
                name="attendedInstitutionFrom"
                id="attendedInstitutionFrom"
              />
              <span className="text-danger">{attendedFromError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                {" "}
                <span className="text-danger"> *</span>
                Have You Achieved this Qualification?
              </span>

              <div
                className="d-flex flex-wrap form-mt"
                style={{ marginLeft: "17px" }}
              >
                <div>
                  <Input
                    type="radio"
                    onClick={() => {
                      setAchieved(true);
                    }}
                    checked={isAchieved === true}
                  />
                  <span>Yes</span>
                </div>
                <div className="ml-5">
                  <Input
                    checked={isAchieved === false}
                    type="radio"
                    onClick={() => {
                      setAchieved(false);
                    }}
                  />
                  <span>No</span>
                </div>
              </div>
            </FormGroup>
            {isAchieved && (
              <>
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Attended To
                  </span>

                  <Input
                    className="form-mt"
                    type="date"
                    value={attendedTo}
                    name="attendedInstitutionTo"
                    onChange={(e) => {
                      handleAttendedTo(e);
                    }}
                    min={minDate}
                    id="attendedInstitutionTo"
                  />
                  <span className="text-danger">{attendedToError}</span>
                </FormGroup>
                <FormGroup>
                  <span>
                    <span className="text-danger mr-1">*</span>
                    Result In Percentage
                  </span>

                  <Input
                    className="form-mt"
                    type="number"
                    name="finalGrade"
                    id="finalGrade"
                    onChange={(e) => {
                      handlePercentage(e);
                    }}
                    value={percentage}
                    placeholder="Enter Percentage"
                  />
                  <span className="text-danger">{percentageError}</span>
                </FormGroup>
              </>
            )}
            <FormGroup>
              <span>
                <span className="text-danger">*</span> Duration
              </span>

              <Input
                className="form-mt"
                type="text"
                name="duration"
                id="duration"
                onChange={(e) => {
                  handleDuration(e);
                }}
                value={duration}
                placeholder="Enter Duration"
              />
              <span className="text-danger">{durationError}</span>
            </FormGroup>
            <FormGroup>
              <span>
                <span className="text-danger mr-1">*</span>
                Name of Institution
              </span>

              <Input
                className="form-mt"
                type="text"
                name="nameOfInstitution"
                id="nameOfInstitution"
                onChange={(e) => {
                  handleInstitution(e);
                }}
                value={institution}
                placeholder="Enter Name Of Institution"
              />
              <span className="text-danger">{institutionError}</span>
            </FormGroup>
            <FormGroup>
              <span>Language of Institution / MOI</span>

              <Input
                className="form-mt"
                type="text"
                name="languageOfInstitution"
                id="languageOfInstitution"
                defaultValue={oneData?.languageOfInstitution}
                placeholder="Enter Language Of Institution"
              />
            </FormGroup>
            <FormGroup>
              <span>
                {" "}
                <span className="text-danger">*</span> Country of Education{" "}
              </span>

              <Select
                className="form-mt"
                options={countryName}
                value={{
                  label: countryLabel,
                  value: countryValue,
                }}
                onChange={(opt) => selectCountry(opt.label, opt.value)}
                name="countryOfEducationId"
                id="countryOfEducationId"
                required
              />

              {countryError && (
                <span className="text-danger">Country is required</span>
              )}
            </FormGroup>
            {/* <FormGroup row>
              <Col lg="6" md="8" className="phone-input-group">
                <span>
                  <span className="text-danger">*</span>
                  Phone Number
                </span>
                <PhoneInput
                  className="w-100"
                  type="string"
                  name="instituteContactNumber"
                  id="instituteContactNumber"
                  country={"us"}
                  value={
                    oneData?.instituteContactNumber
                      ? oneData?.instituteContactNumber
                      : "1"
                  }
                  inputProps={{
                    required: true,
                  }}
                />
              </Col>
            </FormGroup> */}
            <FormGroup>
              <span>Institute Contact Number</span>

              <Input
                className="form-mt"
                type="text"
                name="instituteContactNumber"
                id="instituteContactNumber"
                defaultValue={oneData?.instituteContactNumber}
                placeholder="Enter Institute Contact Number"
              />
            </FormGroup>
            <FormGroup>
              <span>Institute Address</span>

              <Input
                className="form-mt"
                type="text"
                name="instituteAddress"
                id="instituteAddress"
                defaultValue={oneData?.instituteAddress}
                placeholder="Enter Institute Address"
              />
            </FormGroup>
            <FormGroup className="text-right">
              <CancelButton cancel={handleCancelForm} />
              {permissions?.includes(permissionList?.Edit_Student) ? (
                <SaveButton progress={progress} buttonStatus={buttonStatus} />
              ) : null}
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default EducationalForm;
