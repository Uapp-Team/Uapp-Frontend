import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

import { EyeOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import doc from "../../../../../assets/icon/doc.png";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import UploadButton from "../../../../../components/buttons/UploadButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import Download from "../../../../../components/ui/Download";
import Preview from "../../../../../components/ui/Preview";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import { userTypes } from "../../../../../constants/userTypeConstant";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import put from "../../../../../helpers/put";
import remove from "../../../../../helpers/remove";
import ButtonLoader from "../../../Components/ButtonLoader";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";

const DocumentUpload = () => {
  const history = useHistory();
  const { applicationStudentId } = useParams();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  // const [progress4, setProgress4] = useState(false);
  const [docuType, setDocuType] = useState([]);
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");
  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [studentDocuId, setStudentDocuId] = useState(0);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [delDocNam, setDelDocNam] = useState("");
  const [delFileId, setDelFileId] = useState(0);
  const [delFileName, setDelFileName] = useState("");
  const [delDocData, setdelDocData] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [FileList2, setFileList2] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [docuLabel, setDocuLabel] = useState("Select Status");
  const [docuValue, setDocuValue] = useState(0);
  const [docuDD, setDocuDD] = useState([]);
  const [openStatusModal11, setOpenStatusModal11] = useState(false);
  const [studentDocumentId, setStudentDocumentId] = useState(0);
  const [progress13, setProgress13] = useState(false);
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentTitleError, setDocumentTitleError] = useState("");
  const [addDoc, setAddDoc] = useState(null);
  const [addDocError, setAddDocError] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewFileType, setPreviewFileType] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview1 = async (file) => {
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
      setPreviewImage(file.preview || file.url);
      setPreviewFileType(fileType);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage(pdfPreview);
      setPreviewVisible(true);
      setPreviewFileType(fileType);
      setPreviewTitle(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage(googleViewer);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
      setPreviewFileType(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  useEffect(() => {
    get(`StudentUploadDocument/Index/${applicationStudentId}`).then((res) => {
      console.log(res);
      setUploadedDocuData(res);
    });

    get(`DocumentStatusDD/index`).then((res) => {
      setDocuDD(res);
    });

    get("DocumentDD/Index").then((res) => {
      setDocuType(res);
    });
  }, [success, applicationStudentId]);

  const docuTypeDD = docuType.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  const selectDocumentType = (label, value) => {
    setDocuTypeLabel(label);
    setDocuTypeValue(value);
    setDocuTypeError(false);
  };

  const handleDocumentTitle = (e) => {
    let data = e.target.value.trimStart();
    setDocumentTitle(data);
    if (data === "") {
      setDocumentTitleError("Document title is required");
    } else {
      setDocumentTitleError("");
    }
  };

  useEffect(() => {
    if (addDoc !== null) {
      setAddDocError("");
    }
  }, [addDoc]);

  const validateRegisterForm = () => {
    var isFormValid = true;
    if (docuTypeValue === 0) {
      isFormValid = false;
      setDocuTypeError(true);
    }
    if (!documentTitle) {
      isFormValid = false;
      setDocumentTitleError("Document title is required");
    }
    if (FileList1.length === 0) {
      isFormValid = false;
      setUploadError(true);
    }
    if (addDoc === null) {
      isFormValid = false;
      setAddDocError("Please select an options");
    }
    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append(
      "studentDocument",
      FileList1.length === 0 ? null : FileList1[0]?.originFileObj
    );

    // for (var i of subData) {
    // }

    if (validateRegisterForm()) {
      setButtonStatus(true);
      setProgress(true);
      post("StudentUploadDocument/Create", subData).then((res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList1([]);
          setDocumentTitle("");
          setDocuTypeLabel("Select Document Type");
          setDocuTypeValue(0);
          setAddDoc(null);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const toggleDanger = (docu) => {
    setdelDocData(docu);
    setDelDocNam(docu?.documentLevelName);
    setDeleteModal(true);
  };

  const toggleDangerFile = (docFile) => {
    setDelFileName(docFile?.studentDocumentFile?.fileName);
    setDelFileId(docFile?.studentDocumentLevelId);
    setDeleteModal2(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelDocNam("");
    setdelDocData({});
  };

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDeleteModal2(false);
    setDelFileId(0);
    setDelFileName("");
  };

  const handleDeleteDocument = () => {
    setButtonStatus(true);
    setProgress2(true);
    remove(
      `StudentUploadDocument/LevelDelete/${delDocData?.studentDocumentLevelId}`
    ).then((action) => {
      setProgress2(false);
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelDocNam("");
      setdelDocData({});
    });
  };

  const handleDeleteFile = (id) => {
    setButtonStatus(true);
    setProgress3(true);
    remove(`StudentUploadDocument/FileDelete/${id}`).then((action) => {
      setProgress3(false);
      setButtonStatus(false);
      setDeleteModal2(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelFileName("");
      setDelFileId(0);
    });
  };

  const changeHandler = (e, doc) => {
    setFileList2(e.target.files[0]);
    setIsSelected(true);
    console.log(uploadedDocuData);
    console.log(doc);
    setStudentDocuId(doc);
    // setStudentDocuId(doc?.studentDocumentLevelId);
  };
  const handleCardUpload = () => {
    const subData = new FormData();
    subData.append("studentId", applicationStudentId);
    subData.append("studentDocument", FileList2);
    subData.append("studentDocumentLevelId", parseInt(studentDocuId));

    if (studentDocuId !== 0) {
      setButtonStatus(true);
      // setProgress4(true);
      post("StudentUploadDocument/FileCreate", subData).then((res) => {
        setButtonStatus(false);
        // setProgress4(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList2(undefined);
          setIsSelected(false);
          setStudentDocuId(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }

    return;
  };

  useEffect(() => {
    if (
      isSelected === true &&
      FileList2 !== undefined &&
      typeof FileList2 === "object"
    ) {
      handleCardUpload();
    }
  }, [FileList2, isSelected]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    // const x = localeDate.split(",")[0];
    return localeDate;
  };

  const statusModal1 = (studentDocuId) => {
    setDocuLabel("Select Status");
    setDocuValue(0);
    setStudentDocumentId(studentDocuId);
    get(`StudentUploadDocument/StatusInfo/${studentDocuId}`).then((res) => {
      setDocuLabel(res?.name);
      setDocuValue(res?.id);
    });
    setOpenStatusModal11(true);
  };

  const closeStatusModal11 = () => {
    setDocuLabel("Select Status");
    setDocuValue(0);
    setOpenStatusModal11(false);
  };

  const handleStatusUpdateSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    setProgress13(true);
    put("StudentUploadDocument/UpdateStatus", subdata).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setProgress13(false);
        setOpenStatusModal11(false);
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const selectDocuStatus = (label, value) => {
    setDocuLabel(label);
    setDocuValue(value);
  };

  const statusName = docuDD?.map((docu) => ({
    label: docu?.name,
    value: docu?.id,
  }));

  const goPrevious = () => {
    history.push(`/addOtherInformation/${applicationStudentId}`);
  };
  const goForward = () => {
    if (validateRegisterForm === true) {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  return (
    <div>
      <BreadCrumb
        title="Upload Documents"
        backTo={userType === userTypes?.Student ? null : "Student"}
        path={`/studentList`}
      />

      <StudentNavigation
        studentid={applicationStudentId}
        activetab={"11"}
        success={success}
        setSuccess={setSuccess}
        action={() => {}}
      />
      <Card className="">
        <CardBody>
          <p className="section-title">Document Information</p>

          <Row>
            <Col lg="7" md="9">
              {uploadedDocuData.map((item, i) => (
                <div className="mb-4 border-bottom">
                  <div className="bg-light p-2 rounded mb-3">
                    <p className="mb-0 text-dark">{item.categoryName}</p>
                  </div>
                  {item?.documents?.map((docu, j) => (
                    <div key={j} className="border border-dark rounded mb-3">
                      <div className="p-3">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <div className="d-flex align-items-center">
                              <div className="mr-2">
                                <img src={doc} alt="" />
                              </div>

                              <div>
                                <b> {docu?.documentLevelName} </b>
                              </div>
                            </div>
                          </Col>

                          <Col xs="4">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                {docu?.studentDocumentFile?.fileUrl ? (
                                  <Preview
                                    file={docu?.studentDocumentFile?.fileUrl}
                                  />
                                ) : (
                                  <i class="fas fa-eye text-info fs-24px invisible"></i>
                                )}
                              </div>

                              <div>
                                {docu?.studentDocumentFile ? (
                                  <Download
                                    fileurl={docu?.studentDocumentFile?.fileUrl}
                                    fileName={
                                      docu?.studentDocumentFile?.fileName
                                    }
                                  />
                                ) : (
                                  <>
                                    {permissions?.includes(
                                      permissionList?.Upload_Student_Document
                                    ) ? (
                                      <div
                                        className="pointer"
                                        onChange={(e) =>
                                          changeHandler(
                                            e,
                                            docu?.studentDocumentLevelId
                                          )
                                        }
                                      >
                                        <label htmlFor={`hp+${j}`}>
                                          <i class="fas fa-arrow-circle-up fs-24px text-warning pointer"></i>
                                        </label>

                                        <input
                                          name={j}
                                          id={`hp+${j}`}
                                          type="file"
                                          hidden
                                        />
                                      </div>
                                    ) : null}
                                  </>
                                )}
                              </div>
                              <div>
                                {(userType === userTypes?.SystemAdmin ||
                                  userType === userTypes?.Admin) && (
                                  <>
                                    {permissions?.includes(
                                      permissionList?.Delete_Student_Document
                                    ) ? (
                                      <i
                                        class="fas fa-trash pointer text-danger "
                                        onClick={() => toggleDanger(docu)}
                                      ></i>
                                    ) : null}
                                  </>
                                )}
                              </div>
                            </div>
                          </Col>
                        </Row>

                        {docu?.studentDocumentFile != null && (
                          <div className="mt-2">
                            <span className="fs-12px">
                              <span style={{ color: "#1D94AB" }}>
                                {docu?.studentDocumentFile?.fileName.slice(
                                  0,
                                  15
                                )}
                                {"... "}
                              </span>

                              <span className="text-gray">
                                {docu?.createdBy} at{" "}
                                {handleDate(docu?.createdOn)} {}
                              </span>

                              {permissions?.includes(
                                permissionList.Delete_Student_Document
                              ) ? (
                                <i
                                  onClick={() => toggleDangerFile(docu)}
                                  title="delete file"
                                  style={{ cursor: "pointer" }}
                                  className="far fa-times-circle text-danger"
                                ></i>
                              ) : null}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              <ConfirmModal
                text={`Do You Want To Delete ${delDocNam}?`}
                isOpen={deleteModal}
                toggle={closeDeleteModal}
                buttonStatus={buttonStatus}
                progress={progress2}
                cancel={closeDeleteModal}
                confirm={handleDeleteDocument}
              />

              {/* delete file modal */}

              <ConfirmModal
                text={`Do You Want To Delete ${delFileName}?`}
                isOpen={deleteModal2}
                toggle={closeDeleteModalFile}
                buttonStatus={buttonStatus}
                progress={progress3}
                cancel={closeDeleteModalFile}
                confirm={() => handleDeleteFile(delFileId)}
              />
              {/* delete file modal */}

              {/* status update modal starts here */}
              <Modal
                isOpen={openStatusModal11}
                toggle={closeStatusModal11}
                className="uapp-modal"
              >
                <ModalHeader>Update Status</ModalHeader>
                <ModalBody>
                  <form onSubmit={handleStatusUpdateSubmit}>
                    <input
                      type="hidden"
                      name="studentDocumentId"
                      id="studentDocumentId"
                      value={studentDocumentId}
                    />
                    <FormGroup row>
                      <Col md="3">
                        <span>
                          {" "}
                          Status
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={statusName}
                          value={{
                            label: docuLabel,
                            value: docuValue,
                          }}
                          onChange={(opt) =>
                            selectDocuStatus(opt.label, opt.value)
                          }
                          name="statusId"
                          id="statusId"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="9">
                        <div className="d-flex justify-content-end">
                          <Button
                            color="danger"
                            onClick={closeStatusModal11}
                            className="mr-1 mt-3"
                          >
                            Cancel
                          </Button>

                          {permissions?.includes(
                            permissionList.Edit_Student_Document_Level
                          ) ? (
                            <Button className="ml-1 mt-3" color="primary">
                              {progress13 ? <ButtonLoader /> : "Update"}
                            </Button>
                          ) : null}
                        </div>
                      </Col>
                    </FormGroup>
                  </form>
                </ModalBody>
              </Modal>
              {/* status update modal ends here */}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <p>Do you want to add additional documents ?</p>

              <div>
                <FormGroup check inline>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="isHaveDisability"
                    onChange={() => setAddDoc(true)}
                    name="isHaveDisability"
                    value={true}
                    checked={addDoc === true}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isHaveDisability"
                  >
                    Yes
                  </Label>
                </FormGroup>

                <FormGroup check inline>
                  <input
                    className="form-check-input"
                    type="radio"
                    id="isHaveDisability"
                    onChange={() => setAddDoc(false)}
                    name="isHaveDisability"
                    value={false}
                    checked={addDoc === false}
                  />
                  <Label
                    className="form-check-label"
                    check
                    htmlFor="isHaveDisability"
                  >
                    No
                  </Label>
                </FormGroup>
              </div>
              {addDocError && (
                <span className="text-danger">{addDocError}</span>
              )}
            </Col>
          </Row>

          {addDoc && (
            <Row className="mt-3">
              <Col lg="7" md="9">
                <Form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="studentId"
                    id="studentId"
                    value={applicationStudentId}
                  />
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span>
                      Title
                    </span>

                    <Input
                      type="text"
                      value={documentTitle}
                      name="documentLevelName"
                      id="documentLevelName"
                      placeholder="Write Document Title"
                      onChange={(e) => {
                        handleDocumentTitle(e);
                      }}
                    />
                    <span className="text-danger">{documentTitleError}</span>
                  </FormGroup>

                  <FormGroup>
                    <span>
                      {" "}
                      <span className="text-danger">*</span>
                      Document
                    </span>

                    <Select
                      options={docuTypeDD}
                      value={{ label: docuTypeLabel, value: docuTypeValue }}
                      onChange={(opt) =>
                        selectDocumentType(opt.label, opt.value)
                      }
                      name="documentId"
                      id="documentId"
                    />

                    {docutypeError && (
                      <span className="text-danger">
                        Document type is required.
                      </span>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <div className="row">
                      <Col>
                        <span>
                          <span className="text-danger text-left">*</span>Upload
                          Document:{"  "}
                        </span>
                      </Col>

                      <Col sm="4">
                        <Upload
                          onPreview={handlePreview1}
                          multiple={false}
                          fileList={FileList1}
                          onChange={handleChange1}
                          beforeUpload={(file) => false}
                          itemRender={(originNode, file) => (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "baseLine",
                              }}
                            >
                              {originNode}
                              <EyeOutlined
                                style={{ marginLeft: "8px", cursor: "pointer" }}
                                onClick={() => handlePreview1(file)}
                              />
                            </div>
                          )}
                        >
                          {FileList1.length < 1 ? <UploadButton /> : ""}
                        </Upload>

                        {previewVisible && (
                          <Modal
                            title={previewTitle}
                            visible={previewVisible}
                            footer={null}
                            onCancel={() => setPreviewVisible(false)}
                          >
                            {previewFileType === "application/pdf" ? (
                              <iframe
                                src={previewImage}
                                style={{ width: "100%", height: "80vh" }}
                                frameBorder="0"
                              ></iframe>
                            ) : (
                              <img
                                alt={previewTitle}
                                src={previewImage}
                                style={{ width: "100%" }}
                              />
                            )}
                          </Modal>
                        )}

                        <div className="text-danger d-block">{uploadError}</div>
                      </Col>
                      <Col>
                        {/* <span className="text-gray">
                          Document size should be 2MB and file format .jpg or
                          .png
                        </span> */}
                      </Col>
                    </div>
                  </FormGroup>
                  <FormGroup className="text-right">
                    {permissions?.includes(permissionList?.Edit_Student) ? (
                      <SaveButton
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    ) : null}
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          )}

          <Row>
            <Col className="d-flex justify-content-between mt-4">
              <PreviousButton action={goPrevious} />
              <SaveButton text="Next" action={goForward} />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default DocumentUpload;
