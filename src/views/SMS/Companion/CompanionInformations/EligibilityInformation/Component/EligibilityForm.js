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
  // handlePreview3,
  handleChange3,
  // previewVisible3,
  // previewTitle3,
  // handleCancel3,
  // previewImage3,
  idPassportError,
  FileList4,
  setFileList4,
  // handlePreview4,
  handleChange4,
  // previewVisible4,
  // previewTitle4,
  // handleCancel4,
  // previewImage4,
  proofOfAddressError,
  FileList5,
  setFileList5,
  // handlePreview5,
  handleChange5,
  // previewVisible5,
  // previewTitle5,
  // handleCancel5,
  // previewImage5,
  proofOfRightError,
  FileList6,
  setFileList6,
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
  setDateError,
  handleDate,
  handlePrevious,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const [previewImage3, setPreviewImage3] = useState("");
  const [previewVisible3, setPreviewVisible3] = useState(false);
  const [previewTitle3, setPreviewTitle3] = useState("");
  const [previewFileType3, setPreviewFileType3] = useState("");

  const [previewImage4, setPreviewImage4] = useState("");
  const [previewVisible4, setPreviewVisible4] = useState(false);
  const [previewTitle4, setPreviewTitle4] = useState("");
  const [previewFileType4, setPreviewFileType4] = useState("");

  const [previewImage5, setPreviewImage5] = useState("");
  const [previewVisible5, setPreviewVisible5] = useState(false);
  const [previewTitle5, setPreviewTitle5] = useState("");
  const [previewFileType5, setPreviewFileType5] = useState("");

  const [previewImage6, setPreviewImage6] = useState("");
  const [previewVisible6, setPreviewVisible6] = useState(false);
  const [previewTitle6, setPreviewTitle6] = useState("");
  const [previewFileType6, setPreviewFileType6] = useState("");

  useEffect(() => {
    if (eligibilityData?.idOrPassport?.fileUrl) {
      setFileList3([
        {
          uid: eligibilityData?.idOrPassportId,
          name: "Attachement",
          status: "done",
          url: rootUrl + eligibilityData?.idOrPassport?.fileUrl,
        },
      ]);
    }
  }, [eligibilityData, setFileList3]);

  useEffect(() => {
    if (eligibilityData?.proofOfAddress?.fileUrl) {
      setFileList4([
        {
          uid: eligibilityData?.proofOfAddressId,
          name: "Attachement",
          status: "done",
          url: rootUrl + eligibilityData?.proofOfAddress?.fileUrl,
        },
      ]);
    }
  }, [eligibilityData, setFileList4]);

  useEffect(() => {
    if (eligibilityData?.brp?.fileUrl) {
      setFileList5([
        {
          uid: eligibilityData?.brpId,
          name: "Attachement",
          status: "done",
          url: rootUrl + eligibilityData?.brp?.fileUrl,
        },
      ]);
    }
  }, [eligibilityData, setFileList5]);

  useEffect(() => {
    if (eligibilityData?.cv?.fileUrl) {
      setFileList6([
        {
          uid: eligibilityData?.cvId,
          name: "Attachement",
          status: "done",
          url: rootUrl + eligibilityData?.cv?.fileUrl,
        },
      ]);
    }
  }, [eligibilityData, setFileList6]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview3 = async (file) => {
    console.log(file, "siam");

    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage3(file.preview || file.url);
      setPreviewFileType3(fileType);
      setPreviewVisible3(true);
      setPreviewTitle3(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage3(pdfPreview);
      setPreviewVisible3(true);
      setPreviewFileType3(fileType);
      setPreviewTitle3(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage3(googleViewer);
      setPreviewVisible3(true);
      setPreviewTitle3(file.name);
      setPreviewFileType3(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  const handlePreview4 = async (file) => {
    console.log(file, "siam");

    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage4(file.preview || file.url);
      setPreviewFileType4(fileType);
      setPreviewVisible4(true);
      setPreviewTitle4(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage4(pdfPreview);
      setPreviewVisible4(true);
      setPreviewFileType4(fileType);
      setPreviewTitle4(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage4(googleViewer);
      setPreviewVisible4(true);
      setPreviewTitle4(file.name);
      setPreviewFileType4(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  const handlePreview5 = async (file) => {
    console.log(file, "siam");

    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage5(file.preview || file.url);
      setPreviewFileType5(fileType);
      setPreviewVisible5(true);
      setPreviewTitle5(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage5(pdfPreview);
      setPreviewVisible5(true);
      setPreviewFileType5(fileType);
      setPreviewTitle5(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage5(googleViewer);
      setPreviewVisible5(true);
      setPreviewTitle5(file.name);
      setPreviewFileType5(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  const handlePreview6 = async (file) => {
    console.log(file, "siam");

    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage6(file.preview || file.url);
      setPreviewFileType6(fileType);
      setPreviewVisible6(true);
      setPreviewTitle6(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage6(pdfPreview);
      setPreviewVisible6(true);
      setPreviewFileType6(fileType);
      setPreviewTitle6(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage6(googleViewer);
      setPreviewVisible6(true);
      setPreviewTitle6(file.name);
      setPreviewFileType6(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

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

                <Input
                  type="text"
                  name="VisaType"
                  id="VisaType"
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

            <Col md="4">
              <Upload
                multiple={false}
                fileList={FileList3}
                onChange={handleChange3}
                beforeUpload={(file) => false}
                itemRender={(originNode, file) => (
                  <div style={{ display: "flex", alignItems: "baseLine" }}>
                    {originNode}
                    <EyeOutlined
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handlePreview3(file)}
                    />
                  </div>
                )}
              >
                {FileList3.length < 1 ? <UploadButton /> : ""}
              </Upload>

              {previewVisible3 && (
                <Modal
                  title={previewTitle3}
                  visible={previewVisible3}
                  footer={null}
                  onCancel={() => setPreviewVisible3(false)}
                >
                  {previewFileType3 === "application/pdf" ? (
                    <iframe
                      src={previewImage3}
                      style={{ width: "100%", height: "80vh" }}
                      frameBorder="0"
                    ></iframe>
                  ) : (
                    <img
                      alt={previewTitle3}
                      src={previewImage3}
                      style={{ width: "100%" }}
                    />
                  )}
                </Modal>
              )}

              {idPassportError && (
                <span className="text-danger">File is required </span>
              )}
            </Col>
            <Col md="4">
              {FileList3.length > 0 &&
              eligibilityData?.idOrPassport?.fileUrl ? (
                <a href={rootUrl + eligibilityData?.idOrPassport?.fileUrl}>
                  <DownloadButton />
                </a>
              ) : null}
            </Col>
          </FormGroup>

          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span>Proof of Address</span>
            </Col>
            <Col md="4">
              <Upload
                multiple={false}
                fileList={FileList4}
                onChange={handleChange4}
                beforeUpload={(file) => false}
                itemRender={(originNode, file) => (
                  <div style={{ display: "flex", alignItems: "baseLine" }}>
                    {originNode}
                    <EyeOutlined
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handlePreview4(file)}
                    />
                  </div>
                )}
              >
                {FileList4.length < 1 ? <UploadButton /> : ""}
              </Upload>

              {previewVisible4 && (
                <Modal
                  title={previewTitle4}
                  visible={previewVisible4}
                  footer={null}
                  onCancel={() => setPreviewVisible4(false)}
                >
                  {previewFileType4 === "application/pdf" ? (
                    <iframe
                      src={previewImage4}
                      style={{ width: "100%", height: "80vh" }}
                      frameBorder="0"
                    ></iframe>
                  ) : (
                    <img
                      alt={previewTitle4}
                      src={previewImage4}
                      style={{ width: "100%" }}
                    />
                  )}
                </Modal>
              )}

              {proofOfAddressError && (
                <span className="text-danger">File is required</span>
              )}
            </Col>
            <Col md="4">
              {FileList4.length > 0 &&
              eligibilityData?.proofOfAddress?.fileUrl ? (
                <a href={rootUrl + eligibilityData?.proofOfAddress?.fileUrl}>
                  <DownloadButton />
                </a>
              ) : null}
            </Col>
          </FormGroup>

          {uniCountryValue === uniCountryValue2 ? null : (
            <FormGroup row className="has-icon-left position-relative">
              <Col md="4" className="text-md-right">
                <span>BRP / TRP / Settled / Pre-Settled / Share Code</span>
              </Col>
              <Col md="4">
                <Upload
                  multiple={false}
                  fileList={FileList5}
                  onChange={handleChange5}
                  beforeUpload={(file) => false}
                  itemRender={(originNode, file) => (
                    <div style={{ display: "flex", alignItems: "baseLine" }}>
                      {originNode}
                      <EyeOutlined
                        style={{ marginLeft: "8px", cursor: "pointer" }}
                        onClick={() => handlePreview5(file)}
                      />
                    </div>
                  )}
                >
                  {FileList5.length < 1 ? <UploadButton /> : ""}
                </Upload>

                {previewVisible5 && (
                  <Modal
                    title={previewTitle5}
                    visible={previewVisible5}
                    footer={null}
                    onCancel={() => setPreviewVisible5(false)}
                  >
                    {previewFileType5 === "application/pdf" ? (
                      <iframe
                        src={previewImage5}
                        style={{ width: "100%", height: "80vh" }}
                        frameBorder="0"
                      ></iframe>
                    ) : (
                      <img
                        alt={previewTitle5}
                        src={previewImage5}
                        style={{ width: "100%" }}
                      />
                    )}
                  </Modal>
                )}

                <span className="text-danger">{proofOfRightError}</span>
              </Col>
              <Col md="4">
                {FileList5.length > 0 && eligibilityData?.brp?.fileUrl ? (
                  <a href={rootUrl + eligibilityData?.brp?.fileUrl}>
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>
          )}
          <FormGroup row className="has-icon-left position-relative">
            <Col md="4" className="text-md-right">
              <span>CV File</span>
            </Col>
            <Col md="4">
              <Upload
                multiple={false}
                fileList={FileList6}
                onChange={handleChange6}
                beforeUpload={(file) => false}
                itemRender={(originNode, file) => (
                  <div style={{ display: "flex", alignItems: "baseLine" }}>
                    {originNode}
                    <EyeOutlined
                      style={{ marginLeft: "8px", cursor: "pointer" }}
                      onClick={() => handlePreview6(file)}
                    />
                  </div>
                )}
              >
                {FileList6.length < 1 ? <UploadButton /> : ""}
              </Upload>

              {previewVisible6 && (
                <Modal
                  title={previewTitle6}
                  visible={previewVisible6}
                  footer={null}
                  onCancel={() => setPreviewVisible6(false)}
                >
                  {previewFileType6 === "application/pdf" ? (
                    <iframe
                      src={previewImage6}
                      style={{ width: "100%", height: "80vh" }}
                      frameBorder="0"
                    ></iframe>
                  ) : (
                    <img
                      alt={previewTitle6}
                      src={previewImage6}
                      style={{ width: "100%" }}
                    />
                  )}
                </Modal>
              )}

              <span className="text-danger">{cvError}</span>
            </Col>
            <Col md="4">
              {FileList6.length > 0 && eligibilityData?.cv?.fileUrl ? (
                <a href={rootUrl + eligibilityData?.cv?.fileUrl}>
                  <DownloadButton />
                </a>
              ) : null}
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
