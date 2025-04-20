import React from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import DMYPicker from "../../../../../../components/form/DMYPicker";
import UploadFile from "../../../../../../components/form/UploadFile";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const EligibilityForm = ({
  handleSubmit,
  consultantRegisterId,
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
  onRadioValueChange,
  rightToWork,
  setRightToWork,
  FileList3,
  setFileList3,
  idPassportFile,
  setIdPassportFile,
  idPassportError,
  setIdPassportError,
  FileList4,
  setFileList4,
  proofOfAddressFile,
  setProofOfAddressFile,
  setProofOfAddressError,
  proofOfAddressError,
  FileList5,
  setFileList5,
  brpFile,
  setBrpFile,
  setProofOfRightError,
  proofOfRightError,
  FileList6,
  setFileList6,
  cvFile,
  setCvFile,
  cvError,
  setCvError,
  FileList7,
  setFileList7,
  bacFile,
  setBacFile,
  handleChange7,
  bacError,
  setBacError,
  progress,
  buttonStatus,
  visa,
  visaError,
  handlevisaType,
  dateError,
  setDateError,
  handleDate,
  handlePrevious,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="consultantId"
        id="consultantId"
        value={consultantRegisterId}
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
              <span className="text-danger">*</span>
              Country of Nationality
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
              name="countryOfResidenceId"
              id="countryOfResidenceId"
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
                name="residencyStatusId"
                id="residencyStatusId"
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

                <Input
                  type="text"
                  name="visaType"
                  id="visaType"
                  onChange={(e) => {
                    handlevisaType(e);
                  }}
                  placeholder="Enter Visa Status"
                  value={visa}
                  // defaultValue={eligibilityData?.visaType}
                />
                <span className="text-danger">{visaError}</span>
              </FormGroup>

              <FormGroup className="has-icon-left position-relative">
                <DMYPicker
                  label="Expiry Date of Your
                  BRP/TRP or Visa"
                  value={exDate}
                  setValue={handleDate}
                  error={dateError}
                  // action={setDateError}
                  required={true}
                />
              </FormGroup>

              <FormGroup className="d-flex has-icon-left position-relative">
                <span className="mr-5">Do You Have Right to Work? </span>

                <FormGroup check inline>
                  <Input
                    className="form-check-input"
                    type="radio"
                    id="haveRightToWork"
                    value="true"
                    onChange={() => {
                      setRightToWork(true);
                    }}
                    name="haveRightToWork"
                    checked={rightToWork === true}
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
                    onChange={() => {
                      setRightToWork(false);
                    }}
                    name="haveRightToWork"
                    value="false"
                    checked={rightToWork === false}
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
              <span className="text-danger">* </span>
              <span>Id/Passport : </span>
            </Col>

            <Col md="8">
              <div>
                <UploadFile
                  file={FileList3}
                  id="idOrPassports"
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
            <Col md="" className="text-md-right">
              <span className="text-danger">*</span>
              <span>Proof of Address : </span>
            </Col>

            <Col md="8">
              <div>
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
                <span className="text-danger">*</span>
                <span>BRP / TRP / Settled / Pre-Settled / Share Code : </span>
              </Col>

              <Col md="8">
                <div>
                  <UploadFile
                    file={FileList5}
                    id="brpFiles"
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
              <span className="text-danger">*</span>
              <span>CV File : </span>
            </Col>

            <Col md="8">
              <div>
                <UploadFile
                  file={FileList6}
                  id="cvFiles"
                  setFile={setFileList6}
                  defaultValue={cvFile}
                  setRemove={setCvFile}
                  error={cvError}
                  setError={setCvError}
                />
              </div>
            </Col>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span className="text-danger">*</span>
              <span>BAC Certificate : </span>
            </Col>

            <Col md="8">
              <div>
                <UploadFile
                  file={FileList7}
                  id="bacCertificateFile"
                  setFile={setFileList7}
                  defaultValue={bacFile}
                  setRemove={setBacFile}
                  error={bacError}
                  setError={setBacError}
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
