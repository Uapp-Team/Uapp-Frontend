import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Form,
  Row,
} from "reactstrap";

import get from "../../../../../helpers/get";
import Select from "react-select";
import { rootUrl } from "../../../../../constants/constants";
import remove from "../../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import post from "../../../../../helpers/post";
import { userTypes } from "../../../../../constants/userTypeConstant";
import icon_info from "../../../../../assets/img/icons/icon_info.png";
import put from "../../../../../helpers/put";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../../Components/ButtonLoader";
import SaveButton from "../../../../../components/buttons/SaveButton";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import doc from "../../../../../assets/icon/doc.png";
import Preview from "../../../../../components/ui/Preview";
import Download from "../../../../../components/ui/Download";

const StudentDocument = ({ stdId, applicationInfo, success, setSuccess }) => {
  console.log(applicationInfo);
  const [uploadedDocuData, setUploadedDocuData] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Status");
  const [docuValue, setDocuValue] = useState(0);
  const [docuDD, setDocuDD] = useState([]);
  const [openStatusModal11, setOpenStatusModal11] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const [progress9, setProgress9] = useState(false);
  const [progress13, setProgress13] = useState(false);

  const [FileList, setFileList] = useState([]);

  //   for document upload
  const [isSelected, setIsSelected] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [Document, setDocument] = useState("");
  const [DocumentError, setDocumentError] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const userType = localStorage.getItem("userType");
  const [delFile, setDelFile] = useState({});

  const [uploadDocuId, setUploadDocuId] = useState(0);
  const [updateData, setUpdateData] = useState({});
  const [rejected, setRejected] = useState("");
  const [rejectedError, setRejectedError] = useState("");

  const { addToast } = useToasts();

  useEffect(() => {
    get(
      `ApplicationDocument/GetDocuments?applicationid=${applicationInfo?.id}`
    ).then((res) => {
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
      docu?.applicationDocumentStatusId === 1
        ? "In Review"
        : docu?.applicationDocumentStatusId === 2
        ? "Accepted"
        : docu?.applicationDocumentStatusId === 3
        ? "Rejected"
        : "No File"
    );
    setDocuValue(0);
    setUpdateData(docu);
    console.log(docu);
    setRejected(docu?.reason);
    setDocuValue(docu?.applicationDocumentStatusId);
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

  const handleReason = (e) => {
    setRejected(e.target.value);
    if (e.target.value === "") {
      setRejectedError("Reason is required");
    } else {
      setRejectedError("");
    }
  };

  const handleStatusUpdateSubmit = (event) => {
    event.preventDefault();

    const subdata = new FormData(event.target);

    if (docuValue === 3 && !rejected) {
      setRejectedError("Reason is required");
    } else {
      setProgress13(true);
      post("ApplicationDocument/UpdateStatus", subdata).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
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
    }
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
    setFileList(e.target.files);
    setIsSelected(true);
    setUploadDocuId(doc?.id);
  };

  const toggleDanger = (docu) => {
    setDelFile(docu);

    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteDocument = () => {
    setButtonStatus(true);
    setProgress2(true);
    remove(`ApplicationDocument/Delete/${delFile?.id}`).then((action) => {
      setProgress2(false);
      setButtonStatus(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast("Document deleted successfully", {
        appearance: "error",
        autoDismiss: true,
      });
    });
  };

  // on Close Delete Modal
  const closeDeleteModalFile = () => {
    setDelFile({});
    setDeleteModal2(false);
  };

  const handleDeleteFile = () => {
    setProgress3(true);
    remove(`ApplicationDocument/DeleteFile/${delFile?.id}`).then((action) => {
      setProgress3(false);
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

    if (!Document) {
      setDocumentError("Document is required");
    } else {
      setProgress9(true);
      put(
        `AddionalDocumentRequirement/Create?name=${Document}&applicationId=${applicationInfo?.id}`,
        subData
      ).then((res) => {
        setProgress9(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);

          setDocument("");
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
      post("ApplicationDocument/UploadDocument", subData).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
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
  console.log(uploadedDocuData);
  return (
    <div className="custom-card-border p-4 mb-3 ">
      <Row>
        <Col>
          {uploadedDocuData.map((item, i) => (
            <div className="mb-4 border-bottom">
              <div className="bg-light p-2 rounded mb-3">
                <p className="mb-0 text-dark">{item.categoryName}</p>
              </div>
              {item?.applicationDocuments?.map((docu, j) => (
                <div
                  key={j}
                  className={
                    docu?.uploadedFile === null
                      ? "border border-dark rounded mb-3"
                      : docu?.applicationDocumentStatusId === 2
                      ? "border border-success rounded mb-3"
                      : docu?.applicationDocumentStatusId === 3
                      ? "border border-danger rounded mb-3"
                      : "border border-warning rounded mb-3"
                  }
                >
                  <div className="p-3">
                    <Row className="align-items-center">
                      <Col xs="6">
                        <div className="d-flex align-items-center">
                          <div className="mr-2">
                            <img src={doc} alt="" />
                          </div>
                          <div>
                            <div>
                              <b> {docu?.documentName} </b>
                              {docu?.templateFileUrl ? (
                                <a
                                  href={rootUrl + docu?.templateFileUrl}
                                  target="blank"
                                  className="file-download"
                                >
                                  Download
                                </a>
                              ) : null}
                            </div>
                            {docu?.templateFileUrl ? (
                              <span className="fs-12px">
                                Download & Upload again following instructions
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </Col>

                      <Col xs="6">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            {docu?.uploadedFile === null ? (
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
                                  userTypes?.ProviderAdmin.toString() ||
                                userType ===
                                  userTypes?.ComplianceManager.toString() ? (
                                  <>
                                    <span>
                                      {docu?.applicationDocumentStatusId === 1
                                        ? "In review"
                                        : docu?.applicationDocumentStatusId ===
                                          2
                                        ? "Accepted"
                                        : "Rejected"}{" "}
                                    </span>
                                    {applicationInfo.applicationStatusId !==
                                      13 && (
                                      <i
                                        onClick={() => statusModal1(docu)}
                                        className={
                                          docu?.applicationDocumentStatusId ===
                                          2
                                            ? "fas fa-pen text-success pointer"
                                            : docu?.applicationDocumentStatusId ===
                                              3
                                            ? "fas fa-pen text-danger pointer"
                                            : "fas fa-pen text-warning pointer"
                                        }
                                      ></i>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <span>
                                      {docu?.applicationDocumentStatusId === 1
                                        ? "In review"
                                        : docu?.applicationDocumentStatusId ===
                                          2
                                        ? "Accepted"
                                        : "Rejected"}
                                    </span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                          <div>
                            {docu?.uploadedFile?.fileUrl ? (
                              <Preview file={docu?.uploadedFile?.fileUrl} />
                            ) : (
                              <i class="fas fa-eye text-info fs-24px invisible"></i>
                            )}
                          </div>

                          <div>
                            {docu?.uploadedFile?.fileUrl &&
                            docu?.applicationDocumentStatusId !== 3 ? (
                              <Download
                                fileurl={docu?.uploadedFile?.fileUrl}
                                fileName={docu?.uploadedFile?.fileName}
                              />
                            ) : (
                              <>
                                {userType === userTypes?.Student ||
                                userType === userTypes?.Consultant ? (
                                  <>
                                    {applicationInfo.applicationStatusId !==
                                      13 &&
                                    docu?.applicationDocumentStatusId !== 2 ? (
                                      <>
                                        {permissions?.includes(
                                          permissionList.Add_Application_Document
                                        ) ? (
                                          <label htmlFor={`hp+${j}`}>
                                            <i class="fas fa-arrow-circle-up fs-24px text-warning pointer"></i>
                                          </label>
                                        ) : null}

                                        <input
                                          name={i}
                                          id={`hp+${j}`}
                                          type="file"
                                          hidden
                                          onChange={(e) =>
                                            changeHandler(e, docu)
                                          }
                                        />
                                      </>
                                    ) : null}
                                  </>
                                ) : null}
                              </>
                            )}
                          </div>
                          <div>
                            {userType !== userTypes?.Consultant &&
                              userType !== userTypes?.Student && (
                                <>
                                  {permissions?.includes(
                                    permissionList.Delete_Application_Document
                                  ) ? (
                                    <>
                                      {applicationInfo.applicationStatusId !==
                                        13 && (
                                        <i
                                          class="fas fa-trash pointer text-danger "
                                          onClick={() => toggleDanger(docu)}
                                        ></i>
                                      )}
                                    </>
                                  ) : null}
                                </>
                              )}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {docu?.uploadedFile && (
                      <div className="mt-2">
                        <span className="fs-12px">
                          <span style={{ color: "#1D94AB" }}>
                            {docu?.uploadedFile?.fileName.slice(0, 15)}
                            {"... "}
                          </span>

                          <span className="text-gray">
                            {docu?.uploadedFile?.uploadedBy} at{" "}
                            {docu?.uploadedFile?.uploadedOn} {}
                          </span>
                          {applicationInfo.applicationStatusId !== 13 &&
                          docu?.uploadedFile?.canDelete ? (
                            <>
                              {permissions?.includes(
                                permissionList.Delete_Application_Document
                              ) ? (
                                <i
                                  onClick={() => {
                                    setDelFile(docu?.uploadedFile);
                                    setDeleteModal2(true);
                                  }}
                                  title="delete file"
                                  className="far fa-times-circle text-danger pointer"
                                ></i>
                              ) : null}
                            </>
                          ) : null}
                        </span>
                      </div>
                    )}

                    {docu?.reason && (
                      <div className="mt-1">
                        <span className="file-upload-warning">
                          <i class="fa-solid fa-triangle-exclamation"></i>
                          {docu?.reason}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Col>
      </Row>

      {(userType === userTypes?.SystemAdmin ||
        userType === userTypes?.Admin ||
        userType === userTypes?.AdmissionOfficer ||
        userType === userTypes?.ProviderAdmin ||
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
                      <span className="text-danger">*</span> Title
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

            {docuValue === 3 ? (
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
                    name="reason"
                    onChange={(e) => {
                      handleReason(e);
                    }}
                    value={rejected}
                    id="reason"
                  />
                  <span className="text-danger">{rejectedError}</span>
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

      {/* delete doc modal */}
      <ConfirmModal
        text={`Do You Want To Delete ${delFile?.documentName}?`}
        isOpen={deleteModal}
        toggle={closeDeleteModal}
        buttonStatus={buttonStatus}
        progress={progress2}
        cancel={closeDeleteModal}
        confirm={handleDeleteDocument}
      />

      {/* delete file modal */}

      <ConfirmModal
        text={`Do You Want To Delete ${delFile?.fileName}?`}
        isOpen={deleteModal2}
        toggle={closeDeleteModalFile}
        buttonStatus={buttonStatus}
        progress={progress3}
        cancel={closeDeleteModalFile}
        confirm={() => handleDeleteFile(delFile?.id)}
      />
    </div>
  );
};

export default StudentDocument;
