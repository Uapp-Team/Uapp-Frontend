import React, { useEffect, useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import Select from "react-select";
import QueForm from "../Questions/QueForm";
import TopicDivider from "../../Components/TopicDivider";
import Filter from "../../../../components/Dropdown/Filter";
import get from "../../../../helpers/get";
import Uget from "../../../../helpers/Uget";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import put from "../../../../helpers/put";
import { userTypes } from "../../../../constants/userTypeConstant";
import { MdOutlineFileUpload } from "react-icons/md";
import { Upload } from "antd";
import UploadButton from "../../../../components/buttons/UploadButton";
import Preview from "../../../../components/ui/Preview";
import Uremove from "../../../../helpers/Uremove";
import PreviewUniDocu from "../../../../components/ui/PreviewUniDocu";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";

const DocumentsRequestFaq = ({ Uid }) => {
  const [faqRequestModalOpen, setFaqRequestModalOpen] = useState(false);
  const [faqUploadModalOpen, setFaqUploadModalOpen] = useState(false);
  const [sopList, setSopList] = useState([]);
  const [sopLabel, setSopLabel] = useState("Select Document Category");
  const [sopValue, setSopValue] = useState(0);
  const [sopError, setSopError] = useState(false);
  const [check, setCheck] = useState(false);
  const [universityList, setUniversityList] = useState([]);
  const [universityListLabel, setUniversityListLabel] =
    useState("Select University");
  const [universityListValue, setUniversityListValue] = useState(0);
  const [universityListError, setUniversityListError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [multiUniversity, setMultiUniversity] = useState([]);
  console.log(multiUniversity.length, "multiuniversity");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [note, setNote] = useState("");
  const [noteError, setNoteError] = useState("");
  const [documentRequest, setDocumentRequest] = useState([]);
  // const [documentRequestByUni, setDocumentRequestByUni] = useState([]);
  const [updateDocumentRequest, setUpdateDocumentRequest] = useState(0);
  const userType = localStorage.getItem("userType");
  const [FileList3, setFileList3] = useState([]);
  const [idPassportError, setIdPassportError] = useState(false);
  const [uploadDocumentId, setUploadDocumentId] = useState(0);

  useEffect(() => {
    get("DocumentCategoryDD/Index").then((res) => {
      setSopList(res);
    });

    Uget(`University/get-dd`).then((res) => {
      setUniversityList(res?.data);
      console.log(res, "university LIst");
    });
  }, [success]);

  useEffect(() => {
    if (Uid) {
      Uget(
        `UniversityDocument/get-paginated?universityId=${Uid}&index=${1}&size=${15}&searchText=${""}`
      ).then((res) => {
        setDocumentRequest(res?.items);
        console.log(res, "request LIst");
      });
      // Uget(`UniversityDocument/get-by-university/${Uid}`).then((res) => {
      //   setDocumentRequest(res?.data);
      //   console.log(res?.data, "request LIst");
      // });
    } else {
      Uget(`UniversityDocument/get-requests`).then((res) => {
        setDocumentRequest(res?.data);
        console.log(res?.data, "request LIst");
      });
    }
  }, [Uid, success]);

  useEffect(() => {
    if (check === false) {
      setMultiUniversity([]);
    }
  }, [check]);

  const handleChange3 = ({ fileList }) => {
    setFileList3(fileList);
    setIdPassportError(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value === "") {
      setTitleError("Title is required");
    } else {
      setTitleError("");
    }
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
    if (e.target.value === "") {
      setNoteError("Note is required");
    } else {
      setNoteError("");
    }
  };

  const handleUniversityChange = (e) => {
    setMultiUniversity(e);
    if (multiUniversity.length === 0) {
      setUniversityListError(false);
    } else {
      setUniversityListError(true);
    }
  };

  const closeFaqRequestModal = () => {
    setFaqRequestModalOpen(false);
    setNote("");
    setNoteError("");
    setTitle("");
    setTitleError("");
    setSopLabel("Select Document Category");
    setSopValue(0);
    setSopError(false);
    setUniversityListLabel("Select University");
    setUniversityListValue(0);
    setUniversityListError(false);
    setMultiUniversity([]);
  };

  const closeFaqUploadModal = () => {
    setFaqUploadModalOpen(false);
    setFileList3([]);
    // setUpdateDocument(0);
  };

  const sopName = sopList?.map((sop) => ({
    label: sop.name,
    value: sop.id,
  }));

  const selectSopName = (label, value) => {
    setSopLabel(label);
    setSopValue(value);
    setSopError(false);
  };

  const UniversityName = universityList?.map((uni) => ({
    label: uni.name,
    value: uni.id,
  }));

  // const selectUniversityName = (label, value) => {
  //   setUniversityListLabel(label);
  //   setUniversityListValue(value);
  // };

  // const handleChange = (selected) => {
  //   setMultiUniversity(selected);
  // };

  const handleTitle = (e) => {
    setTitle(e.target.value);
    // if (e.target.value === "") {
    //   setTitle("First name is required");
    // } else {
    //   setTitle("");
    // }
  };

  const handleNote = (e) => {
    setNote(e.target.value);
    // if (e.target.value === "") {
    //   setNote("First name is required");
    // } else {
    //   setNote("");
    // }
  };

  const handleRequestEdit = (item) => {
    setFaqRequestModalOpen(true);
    setNote(item?.note);
    setTitle(item?.title);
    setCheck(item?.isMandatoryForAll);
    setSopLabel(item?.documentCategoryName);
    setSopValue(item?.documentCategoryId);
    // setUniversityListLabel(item?.universities?.label);
    // setUniversityListValue(item?.universities?.value);

    setMultiUniversity(item?.universities);
    setUpdateDocumentRequest(item?.id);
  };

  const handleUploadDocu = (item) => {
    setFaqUploadModalOpen(true);
    setUploadDocumentId(item?.id);
  };

  const handleDocuUpload = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("id", uploadDocumentId);
    subData.append("universityId", Uid);
    subData.append(
      "document",
      FileList3.length === 0 ? null : FileList3[0]?.originFileObj
    );

    setButtonStatus(true);
    setProgress(true);
    post(`UniversityDocument/upload`, subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setFileList3([]);
        setFaqUploadModalOpen(false);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      // history.push(`/consultantBankInformation/${consultantRegisterId}`);
    });
  };

  const handleDeleteDocumentReq = (item) => {
    post(`UniversityDocument/delete/${item?.id}`).then((res) => {
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      // setDetailsModal(false);
      // setEdit(false);
      // setDropdownOpen(false);
      setSuccess(!success);
    });
  };

  const validateForm = () => {
    var isFormValid = true;
    if (!title) {
      isFormValid = false;
      setTitleError("Title is required");
    }
    if (!note) {
      isFormValid = false;
      setNoteError("Note is required");
    }
    if (sopValue === 0) {
      isFormValid = false;
      setSopError(true);
    }
    if (check === false && multiUniversity.length === 0) {
      isFormValid = false;
      setUniversityListError(true);
    }

    return isFormValid;
  };

  const handleSubmitFaqRequest = (event) => {
    event.preventDefault();
    const valuesArray = multiUniversity.map((option) => option.value);
    console.log(valuesArray, "value array");

    const subData = {
      documentCategoryId: sopValue,
      title: title,
      note: note,
      isMandatoryForAll: check,
      universityIds: valuesArray,
      id: updateDocumentRequest !== 0 ? updateDocumentRequest : 0,
    };

    var formIsValid = validateForm(subData);
    if (formIsValid) {
      if (updateDocumentRequest !== 0) {
        setButtonStatus(true);
        setProgress(true);
        put("UniversityDocument/update-request", subData).then((res) => {
          setProgress(false);
          setButtonStatus(true);

          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess === true ? "success" : "error",
            autoDismiss: true,
          });
          setFaqRequestModalOpen(false);
          setButtonStatus(false);
          setNote("");
          setTitle("");
          setSopLabel("Select Document Category");
          setSopValue(0);
          setUniversityListLabel("Select University");
          setUniversityListValue(0);
          setMultiUniversity([]);
          setSuccess(!success);
          setUpdateDocumentRequest(0);

          // history.push(
          //   `/admissionManagerPersonalInformation/${admissionManagerId}`
          // );
        });
      } else {
        setUpdateDocumentRequest(0);
        setButtonStatus(true);
        setProgress(true);
        post("UniversityDocument/request", subData).then((res) => {
          setProgress(false);

          addToast(res?.data?.message, {
            appearance: res?.data?.isSuccess === true ? "success" : "error",
            autoDismiss: true,
          });
          setFaqRequestModalOpen(false);
          setButtonStatus(false);
          setNote("");
          setTitle("");
          setSopLabel("Select Document Category");
          setSopValue(0);
          setUniversityListLabel("Select University");
          setUniversityListValue(0);
          setMultiUniversity([]);
          setSuccess(!success);

          // history.push(
          //   `/admissionManagerPersonalInformation/${admissionManagerId}`
          // );
        });
      }
    }
  };

  return (
    <div>
      <div className="px-3 pt-3 mt-3 d-flex justify-content-between">
        <p className="section-title mt-2">Documents</p>
        {Uid ? null : (
          <button
            className="btn-documents-request"
            onClick={() => setFaqRequestModalOpen(true)}
          >
            Request <i class="fas fa-chevron-right"></i>
          </button>
        )}
      </div>

      {documentRequest?.map((item, i) => (
        <div key={i} className="px-3 mt-4 d-flex justify-content-between">
          <div className="d-flex">
            <i class="far fa-file-alt" style={{ marginTop: "3px" }}></i>
            <h5 className="ml-2">{item?.name}</h5>
          </div>
          {/* userType === userTypes?.AdmissionManager */}
          {Uid ? (
            <>
              {item?.url === null ? (
                <MdOutlineFileUpload
                  size={20}
                  onClick={() => handleUploadDocu(item)}
                  className="document-upload-icon"
                />
              ) : (
                <div className="d-flex">
                  <div className="mr-3">
                    <PreviewUniDocu file={item?.url} />
                  </div>

                  <div>
                    <DeleteOutlined
                      className="fs-24px pointer"
                      onClick={() => handleDeleteDocumentReq(item)}
                    ></DeleteOutlined>
                  </div>
                </div>
              )}
            </>
          ) : (
            <span className="pointer" onClick={() => handleRequestEdit(item)}>
              <i class="far fa-edit"></i>
            </span>
          )}
        </div>
      ))}

      <Modal
        isOpen={faqRequestModalOpen}
        toggle={closeFaqRequestModal}
        className="uapp-modal2"
      >
        <ModalHeader>Document Request</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmitFaqRequest}>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="5">
                <Select
                  options={sopName}
                  value={{
                    label: sopLabel,
                    value: sopValue,
                  }}
                  onChange={(opt) => selectSopName(opt.label, opt.value)}
                  name="documentCategoryId"
                  id="documentCategoryId"
                />
                {sopError ? (
                  <span className="text-danger">Document is required.</span>
                ) : null}
              </Col>
              <Col md="7">
                <Input
                  type="text"
                  // name="title"
                  // id="title"
                  placeholder="Title here *"
                  onChange={(e) => {
                    handleTitleChange(e);
                  }}
                  value={title}
                />
                <span className="text-danger">{titleError}</span>
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative mb-5">
              <Col md="12">
                <Input
                  type="textarea"
                  placeholder="Add Note *"
                  Row={6}
                  value={note}
                  onChange={(e) => {
                    handleNoteChange(e);
                  }}
                  name="note"
                  id="note"
                />
                <span className="text-danger">{noteError}</span>
              </Col>
            </FormGroup>
            <div className="ml-2 my-4">
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                value=""
                checked={check}
              />{" "}
              <span className="bold-text">Mandatory for all universities?</span>
            </div>

            <TopicDivider text="Or" />

            {check === true ? null : (
              <FormGroup row className="my-4">
                <Col lg="6" md="6">
                  <Select
                    isMulti
                    onChange={(e) => {
                      handleUniversityChange(e);
                    }}
                    // onChange={(e) => {
                    //   setMultiUniversity(e);
                    // }}

                    options={UniversityName}
                    value={multiUniversity}
                    className="mt-1"
                    isDisabled={check === true ? true : false}
                  />
                  {universityListError ? (
                    <span className="text-danger">University is required.</span>
                  ) : null}
                </Col>
              </FormGroup>
            )}

            <FormGroup className="d-flex mt-3">
              <CancelButton cancel={closeFaqRequestModal} />
              <SaveButton
                text="Submit"
                success={success}
                progress={progress}
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={faqUploadModalOpen}
        toggle={closeFaqUploadModal}
        className="uapp-modal2"
      >
        <ModalHeader>Documents Upload</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleDocuUpload}>
            <FormGroup row className="has-icon-left position-relative mb-4">
              <Col md="12">
                <p className="bold-text">Document Title</p>
                <div className="document-upload-btn text-center mb-4">
                  <Upload
                    multiple={false}
                    fileList={FileList3}
                    onChange={handleChange3}
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    {FileList3.length < 1 ? (
                      <>
                        {" "}
                        <p
                          style={{
                            color: "##045D5E",
                            fontWeight: 600,
                            textDecoration: "underlined",
                          }}
                        >
                          {" "}
                          Upload documents
                        </p>
                      </>
                    ) : (
                      ""
                    )}
                  </Upload>
                </div>
                <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                  You must upload document based on current intake.
                </span>
              </Col>
            </FormGroup>

            <FormGroup className="d-flex mt-3">
              <CancelButton cancel={closeFaqUploadModal} />
              <SaveButton
                text="Upload"
                success={success}
                progress={progress}
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DocumentsRequestFaq;
