import { Upload } from "antd";
import React from "react";
import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import DownloadButton from "../../../../../../components/buttons/DownloadButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import UploadButton from "../../../../../../components/buttons/UploadButton";
import Preview from "../../../../../../components/ui/Preview";
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
              Country of Nationality <span className="text-danger">*</span>{" "}
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
                <span>
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
                  defaultValue={exDate}
                />
                <span className="text-danger">{dateError}</span>
              </FormGroup>

              <FormGroup className="has-icon-left position-relative">
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
          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span className="text-danger">* </span>
              <span>Id/Passport : </span>
            </Col>

            <Col md="8">
              <div className="d-flex justify-content-between align-items-center">
                <div>
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
                    <span className="text-danger">File is required</span>
                  )}
                </div>
                {eligibilityData?.idOrPassport?.fileUrl && (
                  <Preview file={eligibilityData?.idOrPassport?.fileUrl} />
                )}
                {eligibilityData?.idOrPassport?.fileUrl != null && (
                  <DownloadButton
                    file={eligibilityData?.idOrPassport?.fileUrl}
                  />
                )}
              </div>
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="" className="text-md-right">
              <span className="text-danger">*</span>
              <span>Proof of Address : </span>
            </Col>

            <Col md="8">
              <div className="d-flex justify-content-between align-items-center">
                <div>
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
                </div>
                {eligibilityData?.proofOfAddress?.fileUrl && (
                  <Preview file={eligibilityData?.proofOfAddress?.fileUrl} />
                )}
                {eligibilityData?.proofOfAddress?.fileUrl != null && (
                  <DownloadButton
                    file={eligibilityData?.proofOfAddress?.fileUrl}
                  />
                )}
              </div>
            </Col>
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ? null : (
            <FormGroup row className="has-icon-left position-relative">
              <Col md="4" className="text-md-right">
                <span>BRP / TRP / Settled / Pre-Settled / Share Code : </span>
              </Col>

              <Col md="8">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
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
                  </div>
                  {eligibilityData?.brp?.fileUrl && (
                    <Preview file={eligibilityData?.brp?.fileUrl} />
                  )}
                  {eligibilityData?.brp?.fileUrl != null && (
                    <DownloadButton file={eligibilityData?.brp?.fileUrl} />
                  )}
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
              <div className="d-flex justify-content-between align-items-center">
                <div>
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

                  {cvError && (
                    <span className="text-danger">File is required </span>
                  )}
                </div>
                {eligibilityData?.cv?.fileUrl && (
                  <Preview file={eligibilityData?.cv?.fileUrl} />
                )}
                {eligibilityData?.cv?.fileUrl != null && (
                  <DownloadButton file={eligibilityData?.cv?.fileUrl} />
                )}
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
