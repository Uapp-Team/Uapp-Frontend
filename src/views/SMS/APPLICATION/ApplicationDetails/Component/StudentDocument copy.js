import React, { useEffect, useState } from "react";
import { Image, Modal as Modals, Upload } from "antd";
import {
  Button,
  ButtonGroup,
  Col,
  Input,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Row,
} from "reactstrap";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import * as Icon from "react-feather";
import get from "../../../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../../../constants/constants";
import remove from "../../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { userTypes } from "../../../../../constants/userTypeConstant";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import doc from "../../../../../assets/icon/doc.png";
import edit from "../../../../../assets/icon/edit.png";
import upload from "../../../../../assets/icon/upload.png";
import download from "../../../../../assets/icon/download.png";
import bin from "../../../../../assets/icon/bin.png";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const StudentDocument = ({ stdId, applicationInfo, success, setSuccess }) => {
  console.log(applicationInfo);
  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Status");
  const [docuValue, setDocuValue] = useState(0);
  const [docuDD, setDocuDD] = useState([]);
  const [openStatusModal11, setOpenStatusModal11] = useState(false);
  const [studentDocumentId, setStudentDocumentId] = useState(0);
  // const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress4, setProgress4] = useState(false);
  const [progress9, setProgress9] = useState(false);
  const [progress10, setProgress10] = useState(false);
  const [progress11, setProgress11] = useState(false);
  const [progress12, setProgress12] = useState(false);
  const [progress13, setProgress13] = useState(false);
  const [rejected, setRejected] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [FileList, setFileList] = useState([]);

  const [delDocNam, setDelDocNam] = useState("");
  const [delFileId, setDelFileId] = useState(0);
  const [delFileName, setDelFileName] = useState("");
  //   for document upload
  const [FileList2, setFileList2] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [studentDocuId, setStudentDocuId] = useState(0);
  const [delDocData, setdelDocData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);

  const [FileList1, setFileList1] = useState([]);

  const [uploadError, setUploadError] = useState(false);
  const [previewVisible1, setPreviewVisible1] = useState(false);
  const [previewImage1, setPreviewImage1] = useState("");
  const [previewTitle1, setPreviewTitle1] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [docuData, setDocuData] = useState({});

  const [docuType, setDocuType] = useState([]);
  const [docuTypeLabel, setDocuTypeLabel] = useState("Select Document Type");
  const [docuTypeValue, setDocuTypeValue] = useState(0);
  const [docutypeError, setDocuTypeError] = useState(false);

  const [docuCateDD, setDocuCateDD] = useState([]);
  const [docuCateLabel, setDocuCateLabel] = useState("Category");
  const [docuCateValue, setDocuCateValue] = useState(0);
  const [categoryError, setCategoryError] = useState(false);
  const [Document, setDocument] = useState("");
  const [DocumentError, setDocumentError] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [delFile, setDelFile] = useState({});

  const [uploadDocuId, setUploadDocuId] = useState(0);
  const [updateData, setUpdateData] = useState({});

  const { addToast } = useToasts();

  useEffect(() => {
    // document upload
    get(
      `ApplicationDocument/GetDocuments?applicationid=${applicationInfo?.id}`
    ).then((res) => {
      console.log("docu data", res);
      setUploadedDocuData(res);
    });

    get(`ApplicationDocumentStatusDD/Index`).then((res) => {
      console.log("docu data", res);
      setDocuDD(res);
    });
  }, [applicationInfo, success]);
  //   }, []);

  const statusModal1 = (docu) => {
    setDocuLabel(
      docu?.applicationDocumentStatusId == 1
        ? "In Review"
        : docu?.applicationDocumentStatusId == 2
        ? "Accepted"
        : docu?.applicationDocumentStatusId == 3
        ? "Rejected"
        : "No File"
    );
    setDocuValue(0);
    setUpdateData(docu);
    console.log(docu);
    setRejected(docu?.reason);
    setDocuValue(docu?.applicationDocumentStatusId);
    setStudentDocumentId(studentDocuId);

    // get(`StudentUploadDocument/StatusInfo/${studentDocuId}`).then((res) => {
    //   setDocuLabel(res?.name);
    //   setDocuValue(res?.id);
    // });

    setOpenStatusModal11(true);
  };

  const closeStatusModal11 = () => {
    setDocuLabel("Select Status");
    setUpdateData({});
    setDocuValue(0);
    setRejected("");
    setDocuValue(0);
    setOpenStatusModal11(false);
  };

  const handleStatusUpdateSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    // for (var value of subdata.values()) {

    // }

    setProgress13(true);
    post("ApplicationDocument/UpdateStatus", subdata).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess === true) {
        addToast("Document status updated", {
          appearance: "success",
          autoDismiss: true,
        });
        setProgress13(false);
        setOpenStatusModal11(false);
        setUpdateData({});
        setRejected({});
        setSuccess(!success);
      } else {
        addToast("Something went wrong", {
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

  // trial end

  const changeHandler = (e, doc) => {
    console.log(e.target.files);
    setFileList(e.target.files);
    setIsSelected(true);
    setUploadDocuId(doc?.id);
  };

  const toggleDanger = (docu) => {
    console.log(docu);
    setDelFile(docu);

    setDeleteModal(true);
  };

  const toggleDangerFile = (docFile) => {
    setDelFileName(docFile?.studentDocumentFile?.fileName);
    setDelFileId(docFile?.studentDocumentLevelId);
    setDeleteModal2(true);
  };

  // on Close Delete Modal
  // const closeDeleteModal = () => {
  //   setDeleteModal(false);
  //   localStorage.removeItem("delDocNam");
  //   localStorage.removeItem("delDocId");
  // };

  // const handleDeleteDocument = () => {
  //   setProgress11(true);
  //   remove(`ApplicationDocument/Delete/${delFile?.id}`).then((action) => {
  //     setProgress11(false);
  //     setDeleteModal(false);
  //     setDelFile({});
  //     setSuccess(!success);
  //     addToast("Document deleted successfully", {
  //       appearance: "error",
  //       autoDismiss: true,
  //     });
  //     localStorage.removeItem("delDocNam");
  //     localStorage.removeItem("delDocId");
  //   });
  // };

  // const toggleDangerFile = (docFile) => {
  //   localStorage.setItem("delFileName", docFile?.studentDocumentFile?.fileName);
  //   localStorage.setItem("delFileId", docFile?.studentDocumentLevelId);
  //   setDeleteModal2(true);
  // };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelDocNam("");
    setdelDocData({});
  };

  const handleDeleteDocument = () => {
    setButtonStatus(true);
    setProgress2(true);
    remove(`ApplicationDocument/Delete/${delFile?.id}`).then((action) => {
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

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDelFile({});
    setDeleteModal2(false);
  };

  const handleDeleteFile = () => {
    setProgress10(true);
    remove(`ApplicationDocument/DeleteFile/${delFile?.id}`).then((action) => {
      setProgress10(false);
      setDeleteModal2(false);
      setDelFile({});
      setSuccess(!success);
      addToast("Document deleted successfully", {
        appearance: "error",
        autoDismiss: true,
      });
      localStorage.removeItem("delFileName");
      localStorage.removeItem("delFileId");
    });

    // previous Code
  };
  const handleDocument = (e) => {
    setDocument(e.target.value);
    if (e.target.value === "") {
      setDocumentError("Document is required");
    } else {
      setDocumentError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);

    // subData.append(
    //   "studentDocument",
    //   FileList1.length == 0 ? null : FileList1[0]?.originFileObj
    // );

    // for (var i of subData) {
    // }

    // if (docuCateValue == 0) {
    //   setCategoryError(true);
    // }
    // if (docuTypeValue == 0) {
    //   setDocuTypeError(true);
    // }
    // if (FileList1.length < 1) {
    //   setUploadError(true);
    // }

    if (!Document) {
      setDocumentError("Document is required");
    } else {
      setProgress9(true);
      put(
        `AddionalDocumentRequirement/Create?name=${Document}&applicationId=${applicationInfo?.id}`,
        subData
      ).then((res) => {
        setProgress9(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          // history.push('/addUniversityRequiredDocument');
          setSuccess(!success);
          // setFileList1([]);
          setDocument("");
          // setDocuTypeLabel("Select Document Type");
          // setDocuTypeValue(0);
          // setDocuCateLabel("Category");
          // setDocuCateValue(0);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleCardUpload = () => {
    const subData = new FormData();

    subData.append("ApplicationDocumentId", uploadDocuId);
    subData.append("DocumentFile", FileList[0]);

    // for (var i of subData) {

    // }

    if (uploadDocuId !== 0) {
      setProgress12(true);
      post("ApplicationDocument/UploadDocument", subData).then((res) => {
        setProgress12(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast("File uploaded successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setFileList([]);
          setIsSelected(false);
          setUploadDocuId(0);
        } else {
          addToast("Something went wrong", {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  if (isSelected === true && FileList?.length > 0) {
    handleCardUpload();

    setIsSelected(false);
    setUploadDocuId(0);
  }

  return (
    <div className="custom-card-border p-4 mb-3 ">
      <Row>
        <Col>
          {uploadedDocuData.map((docu, i) => (
            <div key={i} className="card mb-3 file-upload-border">
              <div className="p-4">
                <Row className="align-items-center">
                  <Col sm="7">
                    <Row className="align-items-center">
                      <Col sm="1">
                        <img src={doc} alt="" />
                      </Col>
                      <Col sm="10">
                        <span>
                          <b> {docu?.documentName}</b>
                        </span>
                        <br />
                        {docu?.uploadedFiles?.map((docu, i) => (
                          <span key={i} style={{ fontSize: "12px" }}>
                            <a
                              href={rootUrl + docu?.fileUrl}
                              target="blank"
                              download
                            >
                              <span style={{ color: "#1D94AB" }}>
                                {docu?.fileName.slice(0, 8)}
                                {"... "}
                              </span>
                            </a>

                            <span className="text-gray">
                              {docu?.uploadedBy} at {docu?.uploadedOn} {}
                            </span>
                            {applicationInfo.applicationStatusId !== 13 &&
                            docu?.canDelete ? (
                              <>
                                {permissions?.includes(
                                  permissionList.Delete_Application_Document
                                ) ? (
                                  <i
                                    onClick={() => {
                                      setDelFile(docu);
                                      console.log(docu);
                                      setDeleteModal2(true);
                                    }}
                                    title="delete file"
                                    style={{ cursor: "pointer" }}
                                    className="far fa-times-circle text-danger"
                                  ></i>
                                ) : null}
                              </>
                            ) : null}

                            <a
                              href={rootUrl + docu?.fileUrl}
                              target="blank"
                              download
                            >
                              <img
                                src={download}
                                className="pointer ml-2"
                                alt=""
                              />
                            </a>

                            <br />
                          </span>
                        ))}
                        {docu?.studentDocumentFile != null ? (
                          <span style={{ fontSize: "12px" }}>
                            <span style={{ color: "#1D94AB" }}>
                              {docu?.studentDocumentFile?.fileName.slice(0, 4)}
                              {"... "}
                            </span>
                            <span className="text-gray">
                              {docu?.createdBy} at{" "}
                              {dateFormate(docu?.createdOn)} {}
                            </span>
                            {applicationInfo.applicationStatusId !== 13 && (
                              <>
                                <i
                                  onClick={() => toggleDangerFile(docu)}
                                  title="delete file"
                                  style={{ cursor: "pointer" }}
                                  className="far fa-times-circle text-danger"
                                ></i>
                              </>
                            )}
                          </span>
                        ) : null}
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="5">
                    <Row className="align-items-center">
                      <Col sm="7">
                        {docu?.uploadedFiles.length < 1 ? (
                          "No files"
                        ) : (
                          <div>
                            {userType ===
                              userTypes?.AdmissionManager.toString() ||
                            userType ===
                              userTypes?.AdmissionOfficer.toString() ||
                            userType === userTypes?.Admin.toString() ||
                            userType === userTypes?.SystemAdmin.toString() ||
                            userType === userTypes?.ProviderAdmin.toString() ||
                            userType ===
                              userTypes?.ComplianceManager.toString() ? (
                              <>
                                <span>
                                  {docu?.applicationDocumentStatusId === 1
                                    ? "In review"
                                    : docu?.applicationDocumentStatusId === 2
                                    ? "Accepted"
                                    : "Rejected"}{" "}
                                </span>
                                {applicationInfo.applicationStatusId !== 13 && (
                                  <img
                                    onClick={() => statusModal1(docu)}
                                    src={edit}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    alt=""
                                  />
                                )}
                              </>
                            ) : (
                              <>
                                <span>
                                  {docu?.applicationDocumentStatusId === 1
                                    ? "In review"
                                    : docu?.applicationDocumentStatusId === 2
                                    ? "Accepted"
                                    : "Rejected"}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </Col>
                      <Col sm="1">
                        {docu?.templateFileUrl ? (
                          <a
                            href={rootUrl + docu?.templateFileUrl}
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
                        ) : null}
                      </Col>
                      <Col sm="1">
                        {userType === userTypes?.Student ||
                        userType === userTypes?.Consultant ? (
                          <>
                            {applicationInfo.applicationStatusId !== 13 &&
                            docu?.applicationDocumentStatusId !== 2 ? (
                              <>
                                {permissions?.includes(
                                  permissionList.Add_Application_Document
                                ) ? (
                                  <label htmlFor={`hp+${i}`}>
                                    <img
                                      src={upload}
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      alt=""
                                    />
                                  </label>
                                ) : null}

                                <input
                                  name={i}
                                  id={`hp+${i}`}
                                  type="file"
                                  hidden
                                  onChange={(e) => changeHandler(e, docu)}
                                />
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </Col>
                      <Col sm="1">
                        {permissions?.includes(
                          permissionList.Delete_Application_Document
                        ) ? (
                          <>
                            {" "}
                            {applicationInfo.applicationStatusId !== 13 && (
                              <img
                                onClick={() => toggleDanger(docu)}
                                src={bin}
                                style={{
                                  cursor: "pointer",
                                }}
                                alt=""
                              />
                            )}
                          </>
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
                  name="applicationDocumentId"
                  id="applicationDocumentId"
                  value={updateData?.id}
                />

                <FormGroup row className="has-icon-left position-relative">
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
                      onChange={(opt) => selectDocuStatus(opt.label, opt.value)}
                      name="statusId"
                      id="statusId"
                    />
                  </Col>
                </FormGroup>

                {docuValue == 3 ? (
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="3">
                      <span>
                        {" "}
                        Reason
                        <span className="text-danger">*</span>{" "}
                      </span>
                    </Col>
                    <Col md="6">
                      <Input
                        type="textarea"
                        row={8}
                        required
                        name="reason"
                        defaultValue={rejected}
                        id="reason"
                      />
                    </Col>
                  </FormGroup>
                ) : null}

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
                        <Button
                          className="ml-1 mt-3"
                          color="primary"
                          // disabled={buttonStatus}
                        >
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

      {(userType === userTypes?.SystemAdmin ||
        userType === userTypes?.Admin ||
        userType === userTypes?.AdmissionManager) && (
        <>
          {applicationInfo.applicationStatusId !== 13 && (
            <div className="custom-card-border p-4 mb-3 ">
              <div className="mt-1 mb-4 d-flex justify-between">
                <img src={icon_info} alt="" />
                <div className="pl-2">
                  <span>
                    Does the application require additional documents?
                  </span>
                </div>
              </div>

              <Form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="hidden"
                  name="studentId"
                  id="studentId"
                  value={stdId}
                />

                <FormGroup row>
                  <Col sm="11" md="9" lg="7">
                    <p>
                      <span className="text-danger">*</span> Document Label
                    </p>

                    <Input
                      type="text"
                      value={Document}
                      name="name"
                      id="name"
                      placeholder="Title"
                      onChange={(e) => handleDocument(e)}
                    />
                    <span className="text-danger">{DocumentError}</span>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col>
                    {permissions?.includes(
                      permissionList.Add_Application_Document
                    ) ? (
                      <SaveButton text="Add" progress={progress9} />
                    ) : null}
                  </Col>
                </FormGroup>
              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentDocument;
