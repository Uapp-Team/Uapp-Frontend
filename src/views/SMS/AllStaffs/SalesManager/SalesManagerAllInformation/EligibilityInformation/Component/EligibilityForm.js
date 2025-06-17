import React from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import PreviousButton from "../../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../../components/buttons/SaveButton";
import DMYPicker from "../../../../../../../components/form/DMYPicker";
import UploadFile from "../../../../../../../components/form/UploadFile";
import { permissionList } from "../../../../../../../constants/AuthorizationConstant";

const EligibilityForm = ({
  handleSubmit,
  salesManagerId,
  eligibilityData,
  countryDD,
  uniCountryLabel,
  uniCountryValue,
  selectUniCountry,
  errorc,
  countryDD2,
  uniCountryLabel2,
  uniCountryValue2,
  selectUniCountry2,
  errorc2,
  residencyOptions,
  residencyLabel,
  residencyValue,
  selectResidency,
  residencyError,
  exDate,
  onRadioValueChange,
  rightToWork,
  FileList3,
  setFileList3,
  idPassportError,
  setIdPassportError,
  FileList4,
  setFileList4,
  handlePreview4,
  handleChange4,
  proofOfAddressError,
  setProofOfAddressError,
  FileList5,
  setFileList5,
  handlePreview5,
  handleChange5,
  proofOfRightError,
  FileList6,
  handlePreview6,
  handleChange6,
  cvError,
  progress,
  buttonStatus,
  goBackward,
  handlevisaType,
  visaError,
  handleDate,
  dateError,
  setDateError,
  idPassportAttachment,
  proofOfAddressAttachment,
  setProofOfRightError,
  brpAttachment,
  setCvError,
  setFileList6,
  cvAttachment,
  setIdPassportAttachment,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="employeeId"
        id="employeeId"
        value={salesManagerId}
      />

      <input
        type="hidden"
        name="id"
        id="id"
        value={eligibilityData !== null ? eligibilityData?.id : 0}
      />
      <Row>
        <Col lg="6" md="8">
          <FormGroup>
            <span>
              <span className="text-danger">*</span> Country of Citizenship
            </span>

            <Select
              options={countryDD}
              value={{
                label: uniCountryLabel,
                value: uniCountryValue,
              }}
              onChange={(opt) => selectUniCountry(opt.label, opt.value)}
              name="countryOfCitizenShipId"
              id="countryOfCitizenShipId"
            />

            <span className="text-danger">{errorc}</span>
          </FormGroup>

          <FormGroup>
            <span>
              <span className="text-danger">*</span> Country of Residence
            </span>

            <Select
              options={countryDD2}
              value={{
                label: uniCountryLabel2,
                value: uniCountryValue2,
              }}
              onChange={(opt) => selectUniCountry2(opt.label, opt.value)}
              name="countryOfResidenceId"
              id="countryOfResidenceId"
            />

            <span className="text-danger">{errorc2}</span>
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ? null : (
            <FormGroup>
              <span>
                <span className="text-danger">*</span> Residency Status
              </span>

              <Select
                options={residencyOptions}
                value={{ label: residencyLabel, value: residencyValue }}
                onChange={(opt) => selectResidency(opt.label, opt.value)}
                name="residencyStatusId"
                id="residencyStatusId"
              />

              <span className="text-danger">{residencyError}</span>
            </FormGroup>
          )}

          {residencyValue === 2 && uniCountryValue !== uniCountryValue2 ? (
            <>
              <FormGroup>
                <span>
                  <span className="text-danger">*</span> Visa Type
                </span>

                <Input
                  type="text"
                  name="visaType"
                  id="visaType"
                  placeholder="Enter Visa Status"
                  onChange={(e) => {
                    handlevisaType(e);
                  }}
                  defaultValue={eligibilityData?.visaType}
                />
                <span className="text-danger">{visaError}</span>
              </FormGroup>

              <FormGroup>
                <DMYPicker
                  label="Expiry Date of Your
                  BRP/TRP or Visa"
                  value={exDate}
                  setValue={handleDate}
                  error={dateError}
                  // action={setDateError}
                  required={true}
                />
                {/* <span className="text-danger">{dateError}</span> */}
              </FormGroup>

              <FormGroup className="d-flex">
                <span className="pr-5">Do You Have Right to Work?</span>
                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="haveRightToWork"
                    value="true"
                    onChange={onRadioValueChange}
                    name="haveRightToWork"
                    checked={rightToWork === "true"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="haveRightToWork"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="haveRightToWork"
                    onChange={onRadioValueChange}
                    name="haveRightToWork"
                    value="false"
                    checked={rightToWork === "false"}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="haveRightToWork"
                  >
                    No
                  </Label>
                </FormGroup>
              </FormGroup>
            </>
          ) : null}
        </Col>
      </Row>

      <Row>
        <Col lg="6" md="8">
          <FormGroup row>
            <Col md="4">
              <span className="text-danger">* </span>
              <span>ID/Passport</span>
            </Col>
            <Col md="8">
              <UploadFile
                // label="Id/Passport"
                file={FileList3}
                id="Id/Passport"
                setFile={setFileList3}
                defaultValue={idPassportAttachment}
                // setRemove={setIdPassportAttachment}
                error={idPassportError}
                setError={setIdPassportError}
                require={true}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="4">
              <span className="text-danger">* </span>
              <span>Proof of Address</span>
            </Col>
            <Col md="8">
              <UploadFile
                // label="Proof of Address"
                file={FileList4}
                id="Proof of Address"
                setFile={setFileList4}
                defaultValue={proofOfAddressAttachment}
                // setRemove={}
                error={proofOfAddressError}
                setError={setProofOfAddressError}
                require={true}
              />
            </Col>
          </FormGroup>
          {uniCountryValue !== uniCountryValue2 && (
            <FormGroup row>
              <Col md="4">
                <span className="text-danger">* </span>
                <span>BRP / TRP / Settled / Pre-Settled / Share Code</span>
              </Col>
              <Col md="8">
                <UploadFile
                  // label="BRP / TRP / Settled / Pre-Settled / Share Code"
                  file={FileList5}
                  id="BRP"
                  setFile={setFileList5}
                  defaultValue={brpAttachment}
                  // setRemove={setAttachment}
                  error={proofOfRightError}
                  setError={setProofOfRightError}
                />
              </Col>
            </FormGroup>
          )}
          <FormGroup row>
            <Col md="4">
              <span className="text-danger">* </span>
              <span>CV File</span>
            </Col>
            <Col md="8">
              <UploadFile
                file={FileList6}
                id="CV"
                setFile={setFileList6}
                defaultValue={cvAttachment}
                // setRemove={setCvAttachment}
                error={cvError}
                setError={setCvError}
              />
            </Col>
          </FormGroup>
          <FormGroup className="d-flex justify-content-between mt-4">
            <PreviousButton action={goBackward} />
            {permissions?.includes(permissionList?.Update_SalesTeamLeader) && (
              <SaveButton
                text="Save"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            )}
          </FormGroup>
        </Col>
      </Row>

      {/* CV */}
    </Form>
  );
};

export default EligibilityForm;
