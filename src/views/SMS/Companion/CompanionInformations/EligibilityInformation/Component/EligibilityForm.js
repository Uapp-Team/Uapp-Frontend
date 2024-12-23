import { EyeOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import DownloadButton from "../../../../../../components/buttons/DownloadButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import UploadButton from "../../../../../../components/buttons/UploadButton";
import DMYPicker from "../../../../../../components/form/DMYPicker";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { rootUrl } from "../../../../../../constants/constants";
import Preview from "../../../../../../components/ui/Preview";
import UploadFile from "../../../../../../components/form/UploadFile";

const EligibilityForm = ({
  handleSubmit,
  companionId,
  eligibilityData,
  countryDD,
  uniCountryLabel,
  uniCountryValue,
  errorc,
  selectUniCountry,
  countryDD2,
  uniCountryLabel2,
  uniCountryValue2,
  selectUniCountry2,
  errorc2,
  residencyValue,
  residencyOptions,
  selectResidency,
  residencyError,
  residencyLabel,
  exDate,
  exDateError,
  setExDateError,
  onRadioValueChange,
  rightToWork,
  FileList3,
  setFileList3,
  setIdPassportFile,
  idPassportFile,
  handleChange3,
  idPassportError,
  setIdPassportError,
  FileList4,
  setFileList4,
  handleChange4,
  proofOfAddressFile,
  setProofOfAddressFile,
  setProofOfAddressError,
  proofOfAddressError,
  FileList5,
  setFileList5,
  handleChange5,
  proofOfRightError,
  setProofOfRightError,
  setBrpFile,
  brpFile,
  FileList6,
  setFileList6,
  setCvError,
  cvError,
  cvFile,
  setCvFile,
  handleChange6,
  progress,
  buttonStatus,
  visa,
  visaError,
  handlevisaType,
  dateError,
  setDateError,
  handleDate,
  handlePrevious,
  visaType,
  visaTypeDD,
  visaTypeLabel,
  visaTypeValue,
  selectVisaType,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="companionId"
        id="companionId"
        value={companionId}
      />

      <input
        type="hidden"
        name="id"
        id="id"
        value={eligibilityData !== null ? eligibilityData?.id : 0}
      />

      <Row>
        <Col lg="6" md="8">
          <FormGroup className="has-icon-left position-relative">
            <span>
              Country of Nationality <span className="text-danger">*</span>{" "}
            </span>

            <Select
              options={countryDD}
              value={{
                label: uniCountryLabel,
                value: uniCountryValue,
              }}
              onChange={(opt) => selectUniCountry(opt.label, opt.value)}
              name="CountryOfCitizenShipId"
              id="CountryOfCitizenShipId"
            />

            <span className="text-danger">{errorc}</span>
          </FormGroup>

          <FormGroup className="has-icon-left position-relative">
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
              name="CountryOfResidenceId"
              id="CountryOfResidenceId"
            />

            <span className="text-danger">{errorc2}</span>
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ||
          uniCountryValue === 0 ||
          uniCountryValue2 === 0 ? null : (
            <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> Residency Status
              </span>

              <Select
                options={residencyOptions}
                value={{ label: residencyLabel, value: residencyValue }}
                onChange={(opt) => selectResidency(opt.label, opt.value)}
                name="ResidencyStatusId"
                id="ResidencyStatusId"
              />

              <span className="text-danger">{residencyError}</span>
            </FormGroup>
          )}

          {residencyValue === 2 && uniCountryValue !== uniCountryValue2 ? (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>
                  {" "}
                  <span className="text-danger">*</span> Visa Type
                </span>

                <Select
                  options={visaTypeDD}
                  value={{
                    label: visaTypeLabel,
                    value: visaTypeValue,
                  }}
                  onChange={(opt) => selectVisaType(opt.label, opt.value)}
                  name="visaTypeId"
                  id="visaTypeId"
                />
                <span className="text-danger">{visaError}</span>
              </FormGroup>

              <FormGroup className="has-icon-left position-relative">
                {/* <span>
                  <span className="text-danger">*</span> Expiry Date of Your
                  BRP/TRP or Visa{" "}
                </span>

                 <Input
                  type="date"
                  name="ExpireDate"
                  id="ExpireDate"
                  onChange={(e) => {
                    handleDate(e);
                  }}
                  defaultValue={exDate}
                /> */}
                <DMYPicker
                  label="Expiry Date of Your BRP/TRP or Visa"
                  value={exDate}
                  setValue={handleDate}
                  error={exDateError}
                  action={setExDateError}
                  required={true}
                />
                <span className="text-danger">{dateError}</span>
              </FormGroup>

              <FormGroup className="has-icon-left position-relative">
                <span>Do You Have Right to Work? </span>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="HaveRightToWork"
                    value="true"
                    onChange={onRadioValueChange}
                    name="HaveRightToWork"
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
                    id="HaveRightToWork"
                    onChange={onRadioValueChange}
                    name="HaveRightToWork"
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
        </Col>{" "}
      </Row>
      <Row>
        <Col lg="6" md="8">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              {residencyValue === 2 && <span className="text-danger">* </span>}
              <span>Id/Passport : </span>
            </Col>
            <Col md="8">
              <div className="">
                <UploadFile
                  file={FileList3}
                  id="passportFile"
                  setFile={setFileList3}
                  defaultValue={idPassportFile}
                  setRemove={setIdPassportFile}
                  error={idPassportError}
                  setError={setIdPassportError}
                />
              </div>
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span>Proof of Address</span>
            </Col>
            <Col md="8">
              <div className="">
                <UploadFile
                  file={FileList4}
                  id="proofFile"
                  setFile={setFileList4}
                  defaultValue={proofOfAddressFile}
                  setRemove={setProofOfAddressFile}
                  error={proofOfAddressError}
                  setError={setProofOfAddressError}
                />
              </div>
            </Col>
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ? null : (
            <FormGroup row className="has-icon-left position-relative">
              <Col md="4" className="text-md-right">
                <span>BRP / TRP / Settled / Pre-Settled / Share Code</span>
              </Col>
              <Col md="8">
                <div className="">
                  <UploadFile
                    file={FileList5}
                    id="brpFile"
                    setFile={setFileList5}
                    defaultValue={brpFile}
                    setRemove={setBrpFile}
                    error={proofOfRightError}
                    setError={setProofOfRightError}
                  />
                </div>
              </Col>
            </FormGroup>
          )}
          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span>CV File</span>
            </Col>
            <Col md="8">
              <div className="">
                <UploadFile
                  file={FileList6}
                  id="cvFile"
                  setFile={setFileList6}
                  defaultValue={cvFile}
                  setRemove={setCvFile}
                  error={cvError}
                  setError={setCvError}
                />
              </div>
            </Col>
          </FormGroup>

          <FormGroup className="d-flex justify-content-between mt-4">
            <PreviousButton action={handlePrevious} />
            {permissions?.includes(permissionList?.Edit_Consultant) && (
              <SaveButton
                text="Save and Next"
                progress={progress}
                buttonStatus={buttonStatus}
              />
            )}
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default EligibilityForm;
