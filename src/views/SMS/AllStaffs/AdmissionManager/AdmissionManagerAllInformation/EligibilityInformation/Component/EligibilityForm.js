import React from "react";
import { FormGroup, Form, Col, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { Upload } from "antd";
import { rootUrl } from "../../../../../../../constants/constants";
import SaveButton from "../../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../../../constants/AuthorizationConstant";
import UploadButton from "../../../../../../../components/buttons/UploadButton";
import DownloadButton from "../../../../../../../components/buttons/DownloadButton";

const EligibilityForm = ({
  handleSubmit,
  admissionManagerId,
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
  FileList3,
  // handlePreview3,
  handleChange3,
  // previewVisible3,
  // previewTitle3,
  // handleCancel3,
  // previewImage3,
  idPassportError,
  FileList4,
  // handlePreview4,
  handleChange4,
  // previewVisible4,
  // previewTitle4,
  // handleCancel4,
  // previewImage4,
  proofOfAddressError,
  FileList5,
  // handlePreview5,
  handleChange5,
  // previewVisible5,
  // previewTitle5,
  // handleCancel5,
  // previewImage5,
  proofOfRightError,
  FileList6,
  // handlePreview6,
  // previewVisible6,
  // previewTitle6,
  // handleCancel6,
  handleChange6,
  cvError,
  progress,
  buttonStatus,
  visa,
  visaError,
  handlevisaType,
  dateError,
  handleDate,
  handlePrevious,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  return (
    <div>
      <Form onSubmit={handleSubmit} className="mt-5">
        <input
          type="hidden"
          name="managerId"
          id="managerId"
          value={admissionManagerId}
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

            <FormGroup>
              <span>
                {" "}
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
                    onChange={(e) => {
                      handlevisaType(e);
                    }}
                    placeholder="Enter Visa Status"
                    defaultValue={visa}
                    // defaultValue={eligibilityData?.visaType}
                  />
                  <span className="text-danger">{visaError}</span>
                </FormGroup>

                <FormGroup>
                  <span>
                    {" "}
                    <span className="text-danger">*</span> Expiry Date of Your
                    BRP/TRP or Visa{" "}
                  </span>

                  <Input
                    type="date"
                    name="expireDate"
                    id="expireDate"
                    onChange={(e) => {
                      handleDate(e);
                    }}
                    value={exDate}
                  />
                  <span className="text-danger">{dateError}</span>
                </FormGroup>

                <FormGroup>
                  <span>Do You Have Right to Work? </span>

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
          </Col>{" "}
        </Row>
        <Row>
          <Col lg="6" md="8">
            <FormGroup row>
              <Col md="4" className="text-md-right">
                {residencyValue === 2 && (
                  <span className="text-danger">* </span>
                )}
                <span>Id/Passport : </span>
              </Col>

              <Col md="4">
                <Upload
                  multiple={false}
                  fileList={FileList3}
                  onChange={handleChange3}
                  beforeUpload={(file) => {
                    return false;
                  }}
                  style={{ height: "32px" }}
                >
                  {FileList3.length < 1 ? <UploadButton /> : ""}
                </Upload>
                {idPassportError && (
                  <span className="text-danger">File is required </span>
                )}
              </Col>
              <Col md="4">
                {eligibilityData?.idOrPassport?.fileUrl != null ? (
                  <a href={rootUrl + eligibilityData?.idOrPassport?.fileUrl}>
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="4" className="text-md-right">
                <span>Proof of Address</span>
              </Col>
              <Col md="4">
                <Upload
                  multiple={false}
                  fileList={FileList4}
                  onChange={handleChange4}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList4.length < 1 ? <UploadButton /> : ""}
                </Upload>

                {proofOfAddressError && (
                  <span className="text-danger">File is required</span>
                )}
              </Col>
              <Col md="4">
                {eligibilityData?.proofOfAddress?.fileUrl ? (
                  <a href={rootUrl + eligibilityData?.proofOfAddress?.fileUrl}>
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>

            {uniCountryValue === uniCountryValue2 ? null : (
              <FormGroup row>
                <Col md="4" className="text-md-right">
                  <span>BRP / TRP / Settled / Pre-Settled / Share Code</span>
                </Col>
                <Col md="4">
                  <Upload
                    multiple={false}
                    fileList={FileList5}
                    onChange={handleChange5}
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    {FileList5.length < 1 ? <UploadButton /> : ""}
                  </Upload>
                  <span className="text-danger">{proofOfRightError}</span>
                </Col>
                <Col md="4">
                  {eligibilityData?.brp?.fileUrl ? (
                    <a href={rootUrl + eligibilityData?.brp?.fileUrl}>
                      <DownloadButton />
                    </a>
                  ) : null}
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Col md="4" className="text-md-right">
                <span>CV File</span>
              </Col>
              <Col md="4">
                <Upload
                  multiple={false}
                  fileList={FileList6}
                  onChange={handleChange6}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList6.length < 1 ? <UploadButton /> : ""}
                </Upload>

                <span className="text-danger">{cvError}</span>
              </Col>
              <Col md="4">
                {eligibilityData?.cv?.fileUrl ? (
                  <a href={rootUrl + eligibilityData?.cv?.fileUrl}>
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>
            <FormGroup className="mt-4 d-flex justify-content-between">
              <PreviousButton action={handlePrevious} />
              {permissions?.includes(permissionList.Update_AdmissionManager) ? (
                <SaveButton
                  text="Save and Next"
                  progress={progress}
                  buttonStatus={buttonStatus}
                />
              ) : null}
            </FormGroup>
          </Col>
        </Row>

        {/* <Row>
        <Col>
          <FormGroup>
            <SaveButton progress={progress} buttonStatus={buttonStatus} />
          </FormGroup>
        </Col>
      </Row> */}
      </Form>
    </div>
  );
};

export default EligibilityForm;
