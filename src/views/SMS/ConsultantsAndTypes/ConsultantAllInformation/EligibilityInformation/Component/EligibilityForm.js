import React, { useState } from "react";
import Select from "react-select";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import DMYPicker from "../../../../../../components/form/DMYPicker";
import UploadFile from "../../../../../../components/form/UploadFile";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

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
  permanetResidencyStatusValue,
  permanetResidencyStatusOptions,
  selectPermanentResidencyStatus,
  permanetResidencyStatusError,
  permanetResidencyStatusLabel,
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
  isIdPassportApproved,
  setIsIdPassportApproved,
  isProofOfAddressApproved,
  setIsProofOfAddressApproved,
  isBrpApproved,
  setIsBrpApproved,
  isCvApproved,
  setIsCvApproved,
  isBacApproved,
  setIsBacApproved,
  extraDocuments,
  setExtraDocuments,
  addExtraDocument,
  removeExtraDocument,
  extraDocumentErrors,
  setExtraDocumentErrors,
  handleExtraDocumentFileNameChange,
  handleExtraDocumentFileChange
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();

  const handleApprove = (newValue, param) => {
    post(
      `ConsultantEligibility/ApproveEligibility?id=${consultantRegisterId}&${param}=${newValue}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
  const handleApproveForExtraDocuments = (id, isDocApproved) => {
    console.log("hit came in method");
    
    post(
      `ConsultantEligibility/ApproveEligibilityExtraDocument?id=${id}&isDocApproved=${isDocApproved}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
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
        <Col lg="9" md="9">
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
          {residencyValue === 1 && uniCountryValue !== uniCountryValue2 ? (
            <>
              <FormGroup className="has-icon-left position-relative">
              <span>
                <span className="text-danger">*</span> Status Type
              </span>

              <Select
                options={permanetResidencyStatusOptions}
                value={{ label: permanetResidencyStatusLabel, value: permanetResidencyStatusValue }}
                onChange={(opt) => selectPermanentResidencyStatus(opt.label, opt.value)}
                name="permanentResidencyStatusId"
                id="permanentResidencyStatusId"
              />

              <span className="text-danger">{residencyError}</span>
            </FormGroup>
            </>
          ) : null}
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
        <Col lg="9" md="9">
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3" className="text-md-right">
              <span className="text-danger">* </span>
              <span>Id/Passport : </span>
            </Col>

            <Col md="6">
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
            {permissions?.includes(
              permissionList?.Approve_Consultant_Eligibility
            ) ? (
              <>
                {" "}
                {idPassportFile !== null ? (
                  <Col md="3">
                    <div className="d-flex">
                      {isIdPassportApproved === null ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(true, "isApproveIdOrPassport");
                              setIsIdPassportApproved(true);
                            }}
                            title="Approve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(false, "isApproveIdOrPassport");
                              setIsIdPassportApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      ) : isIdPassportApproved === true ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(false, "isApproveIdOrPassport");
                            setIsIdPassportApproved(false);
                          }}
                          title="Not Approve"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(true, "isApproveIdOrPassport");
                            setIsIdPassportApproved(true);
                          }}
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ) : null}
              </>
            ) : (
              <>
                {idPassportFile !== null ? (
                  <>
                    {isIdPassportApproved === null ? (
                      <>
                        <p className="d-flex align-items-center text-warning font-weight-bold">
                          In Review
                        </p>
                      </>
                    ) : isIdPassportApproved === true ? (
                      <p className="d-flex align-items-center text-success font-weight-bold">
                        Approved
                      </p>
                    ) : (
                      <p className="d-flex align-items-center text-danger font-weight-bold">
                        Rejected (Need valid document)
                      </p>
                    )}
                  </>
                ) : null}
              </>
            )}
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="3" className="text-md-right">
              <span className="text-danger">*</span>
              <span>Proof of Address : </span>
            </Col>

            <Col md="6">
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
            {permissions?.includes(
              permissionList?.Approve_Consultant_Eligibility
            ) ? (
              <>
                {proofOfAddressFile !== null ? (
                  <Col md="3">
                    <div className="d-flex">
                      {isProofOfAddressApproved === null ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(true, "isApproveProofOfAddress");
                              setIsProofOfAddressApproved(true);
                            }}
                            title="Approve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(false, "isApproveProofOfAddress");
                              setIsProofOfAddressApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      ) : isProofOfAddressApproved === true ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(false, "isApproveProofOfAddress");
                            setIsProofOfAddressApproved(false);
                          }}
                          title="Not Approve"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(true, "isApproveProofOfAddress");
                            setIsProofOfAddressApproved(true);
                          }}
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ) : null}
              </>
            ) : (
              <>
                {proofOfAddressFile !== null ? (
                  <>
                    {isProofOfAddressApproved === null ? (
                      <>
                        <p className="d-flex align-items-center text-warning font-weight-bold">
                          In Review
                        </p>
                      </>
                    ) : isProofOfAddressApproved === true ? (
                      <p className="d-flex align-items-center text-success font-weight-bold">
                        Approved
                      </p>
                    ) : (
                      <p className="d-flex align-items-center text-danger font-weight-bold">
                        Rejected (Need valid document)
                      </p>
                    )}
                  </>
                ) : null}
              </>
            )}
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ? null : (
            <FormGroup row className="has-icon-left position-relative">
              <Col md="3" className="text-md-right">
                <span className="text-danger">*</span>
                <span>BRP/ TRP/ Settled/ Pre-Settled/ Share Code : </span>
              </Col>

              <Col md="6">
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
              {permissions?.includes(
                permissionList?.Approve_Consultant_Eligibility
              ) ? (
                <>
                  {brpFile !== null ? (
                    <Col md="3">
                      <div className="d-flex">
                        {isBrpApproved === null ? (
                          <>
                            <button
                              type="button"
                              className="btn btn-success mr-2"
                              style={{ width: "55px", height: "33px" }}
                              onClick={() => {
                                handleApprove(true, "isApproveBRP");
                                setIsBrpApproved(true);
                              }}
                              title="Approve"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              style={{ width: "55px", height: "33px" }}
                              onClick={() => {
                                handleApprove(false, "isApproveBRP");
                                setIsBrpApproved(false);
                              }}
                              title="Not Approve"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </>
                        ) : isBrpApproved === true ? (
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(false, "isApproveBRP");
                              setIsBrpApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(true, "isApproveBRP");
                              setIsBrpApproved(true);
                            }}
                            title="Approve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                        )}
                      </div>
                    </Col>
                  ) : null}
                </>
              ) : (
                <>
                  {brpFile !== null ? (
                    <>
                      {isBrpApproved === null ? (
                        <>
                          <p className="d-flex align-items-center text-warning font-weight-bold">
                            In Review
                          </p>
                        </>
                      ) : isBrpApproved === true ? (
                        <p className="d-flex align-items-center text-success font-weight-bold">
                          Approved
                        </p>
                      ) : (
                        <p className="d-flex align-items-center text-danger font-weight-bold">
                          Rejected (Need valid document)
                        </p>
                      )}
                    </>
                  ) : null}
                </>
              )}
            </FormGroup>
          )}
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3" className="text-md-right">
              <span className="text-danger">*</span>
              <span>CV File : </span>
            </Col>

            <Col md="6">
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
            {permissions?.includes(
              permissionList?.Approve_Consultant_Eligibility
            ) ? (
              <>
                {cvFile !== null ? (
                  <Col md="3">
                    <div className="d-flex">
                      {isCvApproved === null ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(true, "isApproveCv");
                              setIsCvApproved(true);
                            }}
                            title="Approve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(false, "isApproveCv");
                              setIsCvApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      ) : isCvApproved === true ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(false, "isApproveCv");
                            setIsCvApproved(false);
                          }}
                          title="Not Approve"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(true, "isApproveCv");
                            setIsCvApproved(true);
                          }}
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ) : null}
              </>
            ) : (
              <>
                {cvFile !== null ? (
                  <>
                    {isCvApproved === null ? (
                      <>
                        <p className="d-flex align-items-center text-warning font-weight-bold">
                          In Review
                        </p>
                      </>
                    ) : isCvApproved === true ? (
                      <p className="d-flex align-items-center text-success font-weight-bold">
                        Approved
                      </p>
                    ) : (
                      <p className="d-flex align-items-center text-danger font-weight-bold">
                        Rejected (Need valid document)
                      </p>
                    )}
                  </>
                ) : null}
              </>
            )}
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative">
            <Col md="3" className="text-md-right">
              {/* <span className="text-danger">*</span> */}
              <span>British Accreditation Council Certificate : </span>
            </Col>

            <Col md="6">
              <div>
                <UploadFile
                  file={FileList7}
                  id="bacCertificateFile"
                  setFile={setFileList7}
                  defaultValue={bacFile}
                  setRemove={setBacFile}
                  // error={bacError}
                  // setError={setBacError}
                />
              </div>
            </Col>
            {permissions?.includes(
              permissionList?.Approve_Consultant_Eligibility
            ) ? (
              <>
                {" "}
                {bacFile !== null ? (
                  <Col md="3">
                    <div className="d-flex">
                      {isBacApproved === null ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(true, "isApproveBacCertificate");
                              setIsBacApproved(true);
                            }}
                            title="Approve"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApprove(false, "isApproveBacCertificate");
                              setIsBacApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      ) : isBacApproved === true ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(false, "isApproveBacCertificate");
                            setIsBacApproved(false);
                          }}
                          title="Not Approve"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApprove(true, "isApproveBacCertificate");
                            setIsBacApproved(true);
                          }}
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ) : null}
              </>
            ) : (
              <>
                {bacFile !== null ? (
                  <>
                    {isBacApproved === null ? (
                      <>
                        <p className="d-flex align-items-center text-warning font-weight-bold">
                          In Review
                        </p>
                      </>
                    ) : isBacApproved === true ? (
                      <p className="d-flex align-items-center text-success font-weight-bold">
                        Approved
                      </p>
                    ) : (
                      <p className="d-flex align-items-center text-danger font-weight-bold">
                        Rejected (Need valid document)
                      </p>
                    )}
                  </>
                ) : null}
              </>
            )}
          </FormGroup>
          {/* ----- New Addition ----- */}
          {/* Map function rendering  */}
          {extraDocuments.map((doc, index) => (
            <FormGroup row key={index}>
              {/* Document Name */}
              <Col md="3">
                <Input 
                  type="text"
                  name={`extraDocuments[${index}].Title`}
                  placeholder="Enter Document Name"
                  value={extraDocuments[index].title}
                  onChange={(e)=>handleExtraDocumentFileNameChange(index,e.target.value)}
                />
                {extraDocumentErrors[index]?.titleError && <span className="text-danger">{extraDocumentErrors[index].titleError}</span>}
              </Col>

              {/* Upload */}                                                       
              <Col md="6">
                <UploadFile
                  file={doc.file}
                  id = {`extraDocuments[${index}].Document`}
                  name = {`extraDocuments[${index}].Document`}
                  defaultValue = {extraDocuments[index].fileUrl}
                  setFile={(file) => { handleExtraDocumentFileChange(index,file) }}
                />
                {extraDocumentErrors[index]?.fileError && <span className="text-danger">{extraDocumentErrors[index].fileError}</span>}
              </Col>
              {/* New Portion Added */}
              {permissions?.includes(
              permissionList?.Approve_Consultant_Eligibility
            ) ? (
              <>
                {" "}
                {extraDocuments[index].fileUrl !== null ? (
                  <Col md="3">
                    <div className="d-flex">
                      {extraDocuments[index].isDocumentApproved === null ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success mr-2"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApproveForExtraDocuments(extraDocuments[index].id,true);
                              
                            }}
                            title="Approve ck"
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ width: "55px", height: "33px" }}
                            onClick={() => {
                              handleApproveForExtraDocuments(extraDocuments[index].id,false);
                              // setIsBacApproved(false);
                            }}
                            title="Not Approve"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </>
                      ) : extraDocuments[index].isDocumentApproved === true ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApproveForExtraDocuments(extraDocuments[index].id,false);
                            // setIsBacApproved(false);
                          }}
                          title="Not Approve"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-success mr-2"
                          style={{ width: "55px", height: "33px" }}
                          onClick={() => {
                            handleApproveForExtraDocuments(extraDocuments[index].id,true);
                            // setIsBacApproved(true);
                          }}
                          title="Approve"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                    </div>
                  </Col>
                ) : null}
              </>
            ) : (
              <>
                {extraDocuments[index].fileUrl !== null ? (
                  <>
                    {extraDocuments[index].isDocumentApproved === null ? (
                      <>
                        <p className="d-flex align-items-center text-warning font-weight-bold">
                          In Review
                        </p>
                      </>
                    ) : extraDocuments[index].isDocumentApproved === true ? (
                      <p className="d-flex align-items-center text-success font-weight-bold">
                        Approved
                      </p>
                    ) : (
                      <p className="d-flex align-items-center text-danger font-weight-bold">
                        Rejected (Need valid document)
                      </p>
                    )}
                  </>
                ) : null}
              </>
            )}
            {/* New Portion Added */}

              {/* Remove button */}
              <Col md="3">
                <Button color="danger" onClick={() => removeExtraDocument(index)}>
                  <i className="fas fa-minus"></i>
                </Button>
              </Col>
            </FormGroup>
            
          ))}
 

            
          <Button color="primary" onClick={addExtraDocument}>
            <i className="fas fa-plus"></i> 
          </Button>
          {/* ---- New Addition  ----*/}
        

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
