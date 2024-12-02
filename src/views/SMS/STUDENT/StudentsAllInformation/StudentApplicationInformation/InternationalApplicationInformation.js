import { Upload } from "antd";
import React, { useEffect } from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";
import DownloadButton from "../../../../../components/buttons/DownloadButton";
import UploadButton from "../../../../../components/buttons/UploadButton";
import { rootUrl } from "../../../../../constants/constants";

export default function InternationalApplicationInformation({
  applicationInformation,
  studentTypeValue,
  countryLabel,
  applicationStudentId,
  FileList,
  FileList2,
  handleChange,
  handleChange2,
  isApplyingFromInside,
  setIsApplyingFromInside,
  residencyStatus,
  residencyStatusError,
  handleresidencyStatus,
  isAppliedForUkVisa,
  setIsAppliedForUkVisa,
  visaType,
  handleVisaType,
  visaTypeError,
  IsApplyingFromInsideError,
  setIsApplyingFromInsideError,
  isAppliedForUkVisaError,
  setIsAppliedForUkVisaError,
  isRefusedForOtherVisaError,
  setIsRefusedForOtherVisaError,
  isRefusedForOtherVisa,
  setIsRefusedForOtherVisa,
  isRefusedForUKVisa,
  setIsRefusedForUKVisa,
  fileList1Error,
  setFileList1Error,
  fileList2Error,
  setFileList2Error,
  isRefusedForUKVisaError,
}) {
  useEffect(() => {
    setIsApplyingFromInside(
      applicationInformation != null &&
        applicationInformation?.isApplyingFromInside === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isApplyingFromInside === false
        ? false
        : null
    );
    setIsAppliedForUkVisa(
      applicationInformation != null &&
        applicationInformation?.isAppliedForUkVisa === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isAppliedForUkVisa === false
        ? false
        : null
    );
    setIsRefusedForUKVisa(
      applicationInformation != null &&
        applicationInformation?.isRefusedForUKVisa === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isRefusedForUKVisa === false
        ? false
        : null
    );
    setIsRefusedForOtherVisa(
      applicationInformation != null &&
        applicationInformation?.isRefusedForOtherVisa === true
        ? true
        : applicationInformation != null &&
          applicationInformation?.isRefusedForOtherVisa === false
        ? false
        : null
    );
  }, [applicationInformation, setIsAppliedForUkVisa, setIsApplyingFromInside]);
  return (
    <div>
      {" "}
      <input
        type="hidden"
        name="studentId"
        id="studentId"
        value={applicationStudentId}
      />
      <input
        type="hidden"
        name="id"
        id="id"
        value={
          applicationInformation?.id === null ||
          applicationInformation?.id === undefined
            ? 0
            : applicationInformation?.id
        }
      />
      <input
        type="hidden"
        name="studentTypeId"
        id="studentTypeId"
        value={studentTypeValue}
      />
      <FormGroup className="has-icon-left position-relative">
        <span>
          <span className="text-danger">*</span>
          Are You Applying From Inside {countryLabel}?{" "}
        </span>
        <br />

        <FormGroup check inline className="form-mt">
          <input
            className="form-check-input"
            type="radio"
            name="IsApplyingFromInside"
            value={true}
            checked={isApplyingFromInside === true}
            onChange={() => setIsApplyingFromInside(true)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="IsApplyingFromInside"
          >
            Yes
          </Label>
        </FormGroup>

        <FormGroup check inline>
          <input
            className="form-check-input"
            type="radio"
            name="IsApplyingFromInside"
            value={false}
            checked={isApplyingFromInside === false}
            onChange={() => setIsApplyingFromInside(false)}
          />
          <Label
            className="form-check-label"
            check
            htmlFor="isApplyingFromInside"
          >
            No
          </Label>
        </FormGroup>
        <br />
        <span className="text-danger">{IsApplyingFromInsideError}</span>
      </FormGroup>
      {isApplyingFromInside === true ? (
        <FormGroup className="has-icon-left position-relative">
          <span>
            <span className="text-danger">*</span> What is Your Current
            Residency Status?
          </span>

          <Input
            className="form-mt"
            type="text"
            name="CurrentResidencyStatusForInternational"
            id="CurrentResidencyStatusForInternational"
            placeholder="Enter Current Residency Status"
            value={residencyStatus}
            onChange={(e) => {
              handleresidencyStatus(e);
            }}
          />
          <span className="text-danger">{residencyStatusError}</span>
        </FormGroup>
      ) : isApplyingFromInside === false ? (
        <>
          <FormGroup className="has-icon-left position-relative">
            <span>
              <span className="text-danger">*</span>
              Have You Ever Applied for {countryLabel} Visa?{" "}
            </span>
            <br />

            <FormGroup check inline className="form-mt">
              <input
                className="form-check-input"
                type="radio"
                name="IsAppliedForUkVisa"
                value={true}
                checked={isAppliedForUkVisa === true}
                onChange={() => setIsAppliedForUkVisa(true)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsAppliedForUkVisa"
              >
                Yes
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <input
                className="form-check-input"
                type="radio"
                name="IsAppliedForUkVisa"
                value={false}
                checked={isAppliedForUkVisa === false}
                onChange={() => setIsAppliedForUkVisa(false)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsAppliedForUkVisa"
              >
                No
              </Label>
            </FormGroup>
            <br />
            <span className="text-danger">{isAppliedForUkVisaError}</span>
          </FormGroup>

          {isAppliedForUkVisa === true ? (
            <>
              <FormGroup className="has-icon-left position-relative">
                <span>
                  {" "}
                  <span className="text-danger">*</span>What Type of Visa You
                  Have Applied for?
                </span>{" "}
                <Input
                  placeholder="Enter Visa Type"
                  type="text"
                  name="VisaType"
                  id="VisaType"
                  onChange={(e) => {
                    handleVisaType(e);
                  }}
                  value={visaType}
                />
                <span className="text-danger">{visaTypeError}</span>
              </FormGroup>

              <FormGroup className="has-icon-left position-relative">
                <span>
                  <span className="text-danger">*</span>
                  Have You Ever Been Refused for {countryLabel} Visa?{" "}
                </span>
                <br />

                <FormGroup check inline>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="IsRefusedForUKVisa"
                    value={true}
                    checked={isRefusedForUKVisa === true}
                    onChange={() => setIsRefusedForUKVisa(true)}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="IsRefusedForUKVisa"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="IsRefusedForUKVisa"
                    value={false}
                    checked={isRefusedForUKVisa === false}
                    onChange={() => setIsRefusedForUKVisa(false)}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="IsRefusedForUKVisa"
                  >
                    No
                  </Label>
                </FormGroup>
                <br />
                <span className="text-danger">{isRefusedForUKVisaError}</span>
              </FormGroup>

              {isRefusedForUKVisa === true ? (
                <FormGroup className="has-icon-left position-relative">
                  <Row>
                    <Col md="6">
                      <span>Attach the refusal letter</span>{" "}
                    </Col>
                  </Row>
                  <>
                    <Row>
                      <Col md="4">
                        <Upload
                          multiple={false}
                          fileList={FileList}
                          onChange={handleChange}
                          beforeUpload={(file) => {
                            return false;
                          }}
                          style={{ height: "32px" }}
                        >
                          {FileList.length === 0 ? <UploadButton /> : ""}
                        </Upload>
                      </Col>
                      <Col md="4">
                        {applicationInformation?.refusalLetterForUKVisa
                          ?.fileUrl ? (
                          <a
                            href={
                              rootUrl +
                              applicationInformation?.refusalLetterForUKVisa
                                ?.fileUrl
                            }
                            target="blank"
                          >
                            <DownloadButton />
                          </a>
                        ) : null}
                      </Col>
                    </Row>
                    <span className="text-danger">{fileList1Error}</span>
                  </>
                </FormGroup>
              ) : null}
            </>
          ) : null}

          <FormGroup className="has-icon-left position-relative">
            <span className="aaa">
              <span className="text-danger">*</span>
              Have You Ever Been Refused Visa to Any Other Country?{" "}
            </span>
            <br />

            <FormGroup check inline className="form-mt">
              <input
                className="form-check-input"
                type="radio"
                name="IsRefusedForOtherVisa"
                value={true}
                checked={isRefusedForOtherVisa === true}
                onChange={() => setIsRefusedForOtherVisa(true)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsRefusedForOtherVisa"
              >
                Yes
              </Label>
            </FormGroup>

            <FormGroup check inline>
              <input
                className="form-check-input"
                type="radio"
                name="IsRefusedForOtherVisa"
                value={false}
                checked={isRefusedForOtherVisa === false}
                onChange={() => setIsRefusedForOtherVisa(false)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="IsRefusedForOtherVisa"
              >
                No
              </Label>
            </FormGroup>
            <br />
            <span className="text-danger">{isRefusedForOtherVisaError}</span>
          </FormGroup>

          {isRefusedForOtherVisa === true ? (
            <FormGroup className="has-icon-left position-relative">
              <Row>
                <Col md="6">
                  <span>Attach the refusal letter</span>{" "}
                </Col>
              </Row>

              <>
                <Row>
                  <Col md="4">
                    <Upload
                      multiple={false}
                      fileList={FileList2}
                      required
                      onChange={handleChange2}
                      beforeUpload={(file) => {
                        return false;
                      }}
                      style={{ height: "32px" }}
                    >
                      {FileList2.length < 1 ? <UploadButton /> : ""}
                    </Upload>
                  </Col>
                  <Col md="4">
                    {applicationInformation?.refusalLetterForOtherVisa
                      ?.fileUrl ? (
                      <a
                        href={
                          rootUrl +
                          applicationInformation?.refusalLetterForOtherVisa
                            ?.fileUrl
                        }
                        target="blank"
                      >
                        <DownloadButton />
                      </a>
                    ) : null}
                  </Col>
                </Row>
                <span className="text-danger">{fileList2Error}</span>
              </>
            </FormGroup>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
