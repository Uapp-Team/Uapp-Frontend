import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import Select from "react-select";
import * as Icon from "react-feather";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import { Upload, Modal as AntdModal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import post from "../../../../../helpers/post";
import { rootUrl } from "../../../../../constants/constants";
import remove from "../../../../../helpers/remove";
import ButtonLoader from "../../../Components/ButtonLoader";
import { userTypes } from "../../../../../constants/userTypeConstant";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import StudentNavigation from "../StudentNavigationAndRegister/StudentNavigation";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import SaveButton from "../../../../../components/buttons/SaveButton";
import doc from "../../../../../assets/icon/doc.png";
import edit from "../../../../../assets/icon/edit.png";
import upload from "../../../../../assets/icon/upload.png";
import download from "../../../../../assets/icon/download.png";
import bin from "../../../../../assets/icon/bin.png";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";

const DocumentUpload = () => {
  const history = useHistory();
  const { applicationStudentId } = useParams();
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [docuType, setDocuType] = useState([]);
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);
  const [FileList1, setFileList1] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
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
  console.log(uploadedDocuData);

  const handleChange1 = ({ fileList }) => {
    setUploadError(false);
    setFileList1(fileList);
  };

  function getBase641(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase641(file.originFileObj);
    }
    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
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
    setDocumentTitle(e.target.value);
    if (e.target.value === "") {
      setDocumentTitleError("Document title is required");
    } else {
      setDocumentTitleError("");
    }
  };

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
    setStudentDocuId(doc?.studentDocumentLevelId);
  };

  const handleCardUpload = () => {
    const subData = new FormData();
    subData.append("studentId", applicationStudentId);
    subData.append("studentDocument", FileList2);
    subData.append("studentDocumentLevelId", parseInt(studentDocuId));

    if (studentDocuId !== 0) {
      setButtonStatus(true);
      setProgress4(true);
      post("StudentUploadDocument/FileCreate", subData).then((res) => {
        setButtonStatus(false);
        setProgress4(false);
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

  if (
    isSelected === true &&
    FileList2 !== undefined &&
    typeof FileList2 === "object"
  ) {
    handleCardUpload();
    setFileList2(undefined);
    setIsSelected(false);
    setStudentDocuId(0);
  }

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
    history.push(`/studentDeclaration/${applicationStudentId}`);
  };

  console.log(uploadedDocuData);
  return (
    <div>
      <BreadCrumb
        title="Upload Documents"
        backTo="Student"
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
              {uploadedDocuData.map((docu, i) => (
                <div key={i} className="border border-warning rounded mb-3">
                  <div className="p-3">
                    <Row className="align-items-center">
                      <Col xs="9">
                        <div className="d-flex align-items-center">
                          <div className="mr-2">
                            <img src={doc} alt="" />
                          </div>

                          <div>
                            <b> {docu?.documentLevelName} </b>
                          </div>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div className="d-flex align-items-center justify-content-between">
                          {/* <div>
                            {docu?.studentDocumentFile === null ? (
                              "No files"
                            ) : (
                              <div>
                                {userType ===
                                  userTypes?.AdmissionManager.toString() ||
                                userType ===
                                  userTypes?.AdmissionOfficer.toString() ||
                                userType === userTypes?.Admin.toString() ||
                                userType ===
                                  userTypes?.SystemAdmin.toString() ||
                                userType ===
                                  userTypes?.ComplianceManager.toString() ? (
                                  <>
                                    <span>
                                      {docu?.statusId === 1
                                        ? "In review"
                                        : docu?.statusId === 2
                                        ? "Accepted"
                                        : "Rejected"}{" "}
                                    </span>

                                    <img
                                      onClick={() =>
                                        statusModal1(docu?.studentDocumentId)
                                      }
                                      src={edit}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      {docu?.statusId === 1
                                        ? "In review"
                                        : docu?.statusId === 2
                                        ? "Accepted"
                                        : "Rejected"}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div> */}

                          <div>
                            {docu?.studentDocumentFile ? (
                              <a
                                key={i}
                                href={rootUrl + docu?.studentDocumentFile}
                                target="blank"
                              >
                                <i class="fas fa-arrow-circle-down text-success fs-24px"></i>
                              </a>
                            ) : (
                              <>
                                {permissions?.includes(
                                  permissionList?.Upload_Student_Document
                                ) ? (
                                  <div
                                    className="pointer"
                                    onChange={(e) => changeHandler(e, docu)}
                                  >
                                    <label htmlFor={`hp+${i}`}>
                                      <i class="fas fa-arrow-circle-up fs-24px text-warning pointer"></i>
                                    </label>

                                    <input
                                      name={i}
                                      id={`hp+${i}`}
                                      type="file"
                                      hidden
                                    />
                                  </div>
                                ) : null}
                              </>
                            )}
                          </div>
                          <div>
                            {permissions?.includes(
                              permissionList?.Delete_Student_Document
                            ) ? (
                              <i
                                class="fas fa-trash pointer text-danger "
                                onClick={() => toggleDanger(docu)}
                              ></i>
                            ) : null}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {docu?.studentDocumentFile != null && (
                      <div className="mt-2">
                        <span className="fs-12px">
                          <a
                            href={rootUrl + docu?.uploadedFile?.fileUrl}
                            target="blank"
                            download
                          >
                            <span style={{ color: "#1D94AB" }}>
                              {docu?.studentDocumentFile?.fileName.slice(0, 15)}
                              {"... "}
                            </span>
                          </a>

                          <span className="text-gray">
                            {docu?.createdBy} at {handleDate(docu?.createdOn)}{" "}
                            {}
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

              {uploadedDocuData.map((docu, i) => (
                <div key={i} className="card mb-3 file-upload-border">
                  <div className="p-4">
                    <Row className="align-items-center">
                      <Col sm="8">
                        <Row className="align-items-center">
                          <Col sm="1">
                            <img src={doc} alt="" />
                          </Col>
                          <Col sm="10">
                            <span>
                              <b> {docu?.documentLevelName}</b>
                            </span>
                            <br />
                            {docu?.studentDocumentFile != null ? (
                              <>
                                <span style={{ fontSize: "12px" }}>
                                  <span style={{ color: "#1D94AB" }}>
                                    {docu?.studentDocumentFile?.fileName.slice(
                                      0,
                                      4
                                    )}
                                    {"... "}
                                  </span>
                                  <span className="text-gray">
                                    {docu?.createdBy} at{" "}
                                    {handleDate(docu?.createdOn)} {}
                                  </span>
                                  {permissions?.includes(
                                    permissionList?.Delete_Student_Document
                                  ) ? (
                                    <i
                                      onClick={() => toggleDangerFile(docu)}
                                      title="delete file"
                                      style={{ cursor: "pointer" }}
                                      className="far fa-times-circle text-danger"
                                    ></i>
                                  ) : null}
                                </span>
                              </>
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="4">
                        <Row className="align-items-center">
                          <Col sm="8">
                            {docu?.studentDocumentFile === null ? (
                              "No files"
                            ) : (
                              <div>
                                {userType ===
                                  userTypes?.AdmissionManager.toString() ||
                                userType ===
                                  userTypes?.AdmissionOfficer.toString() ||
                                userType === userTypes?.Admin.toString() ||
                                userType ===
                                  userTypes?.SystemAdmin.toString() ||
                                userType ===
                                  userTypes?.ComplianceManager.toString() ? (
                                  <>
                                    <span>
                                      {docu?.statusId === 1
                                        ? "Processing"
                                        : docu?.statusId === 2
                                        ? "Accepted"
                                        : "Rejected"}{" "}
                                    </span>
                                    <img
                                      onClick={() =>
                                        statusModal1(docu?.studentDocumentId)
                                      }
                                      src={edit}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      {docu?.statusId === 1
                                        ? "Processing"
                                        : docu?.statusId === 2
                                        ? "Accepted"
                                        : "Rejected"}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </Col>
                          <Col sm="1">
                            {docu?.studentDocumentFile === null ? (
                              <>
                                {permissions?.includes(
                                  permissionList?.Upload_Student_Document
                                ) ? (
                                  <div
                                    style={{ cursor: "pointer" }}
                                    onChange={(e) => changeHandler(e, docu)}
                                  >
                                    {progress4 ? (
                                      <LoadingOutlined
                                        style={{
                                          fontSize: 30,
                                          color: "black",
                                          fontWeight: "bold",
                                        }}
                                        spin
                                      />
                                    ) : (
                                      <label htmlFor={`hp+${i}`}>
                                        <img
                                          src={upload}
                                          style={{
                                            cursor: "pointer",
                                          }}
                                          alt=""
                                        />
                                      </label>
                                    )}

                                    <input
                                      name={i}
                                      id={`hp+${i}`}
                                      type="file"
                                      hidden
                                      // onChange={(e) => changeHandler(e, docu)}
                                    />
                                  </div>
                                ) : null}
                              </>
                            ) : (
                              <a
                                href={
                                  rootUrl + docu?.studentDocumentFile?.fileUrl
                                }
                                target="blank"
                                download
                              >
                                <img
                                  src={download}
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  alt=""
                                />
                              </a>
                            )}
                          </Col>
                          <Col sm="1">
                            {permissions?.includes(
                              permissionList?.Delete_Student_Document
                            ) ? (
                              <img
                                onClick={() => toggleDanger(docu)}
                                src={bin}
                                style={{
                                  cursor: "pointer",
                                }}
                                alt=""
                              />
                            ) : null}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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
              ></ConfirmModal>

              {/* delete file modal */}

              <ConfirmModal
                text={`Do You Want To Delete ${delFileName}?`}
                isOpen={deleteModal2}
                toggle={closeDeleteModalFile}
                buttonStatus={buttonStatus}
                progress={progress3}
                cancel={closeDeleteModalFile}
                confirm={() => handleDeleteFile(delFileId)}
              ></ConfirmModal>
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

          <Row>
            <Col lg="7" md="9">
              <Form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={applicationStudentId}
                />
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>
                    Document Label
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
                    onChange={(opt) => selectDocumentType(opt.label, opt.value)}
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

                    <Col>
                      <div>
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList1}
                          onPreview={handlePreview1}
                          onChange={handleChange1}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList1.length < 1 ? (
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
                              {/* <br /> */}
                              {/* <span>Upload Here</span> */}
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <AntdModal
                          visible={previewVisible1}
                          title={previewTitle1}
                          footer={null}
                          onCancel={handleCancel1}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage1}
                          />
                        </AntdModal>
                        {uploadError && (
                          <span className="text-danger">File is required </span>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <span className="text-gray">
                        Document size should be 2MB and file format .jpg or .png
                      </span>
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
          <Row className="mt-4 ">
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
