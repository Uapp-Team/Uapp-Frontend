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
import SingleTitle from "../Questions/SingleTitle";
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

const DocumentsRequestFaq = () => {
  const [faqRequestModalOpen, setFaqRequestModalOpen] = useState(false);
  const [faqUploadModalOpen, setFaqUploadModalOpen] = useState(false);
  const [sopList, setSopList] = useState([]);
  const [sopLabel, setSopLabel] = useState("Select Document Category");
  const [sopValue, setSopValue] = useState(0);
  const [check, setCheck] = useState(false);
  const [universityList, setUniversityList] = useState([]);
  const [universityListLabel, setUniversityListLabel] =
    useState("Select University");
  const [universityListValue, setUniversityListValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const [multiUniversity, setMultiUniversity] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts();
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [documentRequest, setDocumentRequest] = useState([]);
  const [updateDocument, setUpdateDocument] = useState(0);
  const userType = localStorage.getItem("userType");

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
    Uget(`UniversityDocument/get-requests`).then((res) => {
      setDocumentRequest(res?.data);
      console.log(res?.data, "request LIst");
    });
  }, [success]);

  useEffect(() => {
    if (check === false) {
      setMultiUniversity([]);
    }
  }, [check]);

  const closeFaqRequestModal = () => {
    setFaqRequestModalOpen(false);
    setNote("");
    setTitle("");
    setSopLabel("Select Document Category");
    setSopValue(0);
    setUniversityListLabel("Select University");
    setUniversityListValue(0);
    setMultiUniversity([]);
  };

  const closeFaqUploadModal = () => {
    setFaqUploadModalOpen(false);
    // setUpdateDocument(0);
  };

  const sopName = sopList?.map((sop) => ({
    label: sop.name,
    value: sop.id,
  }));

  const selectSopName = (label, value) => {
    setSopLabel(label);
    setSopValue(value);
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

  const handleUpdate = (item) => {
    setFaqRequestModalOpen(true);
    setNote(item?.note);
    setTitle(item?.title);
    setCheck(item?.isMandatoryForAll);
    setSopLabel(item?.documentCategoryName);
    setSopValue(item?.documentCategoryId);
    // setUniversityListLabel(item?.universities?.label);
    // setUniversityListValue(item?.universities?.value);

    setMultiUniversity(item?.universities);
    setUpdateDocument(item?.id);
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
      id: updateDocument !== 0 ? updateDocument : 0,
    };

    if (updateDocument !== 0) {
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
        setUpdateDocument(0);

        // history.push(
        //   `/admissionManagerPersonalInformation/${admissionManagerId}`
        // );
      });
    } else {
      setUpdateDocument(0);
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
  };

  return (
    <div>
      <div className="px-3 pt-3 mt-3 d-flex justify-content-between">
        <p className="section-title mt-2">Documents</p>
        {userType === userTypes?.AdmissionManager ? null : (
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
            <h5 className="ml-2">{item?.title}</h5>
          </div>
          {userType === userTypes?.AdmissionManager ? (
            <>
              {" "}
              <MdOutlineFileUpload
                size={20}
                onClick={() => setFaqUploadModalOpen(true)}
                className="document-upload-icon"
              />
            </>
          ) : (
            <span className="pointer" onClick={() => handleUpdate(item)}>
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
                {/* {departmentError ? (
    <span className="text-danger">Department is required.</span>
  ) : null} */}
              </Col>
              <Col md="7">
                <Input
                  type="text"
                  // name="title"
                  // id="title"
                  placeholder="Title here"
                  onChange={(e) => {
                    handleTitle(e);
                  }}
                  value={title}
                />
                {/* <span className="text-danger">
                                    {firstNameError}
                                  </span> */}
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative mb-5">
              <Col md="12">
                <Input
                  type="textarea"
                  placeholder="Add Note"
                  Row={6}
                  value={note}
                  onChange={(e) => {
                    handleNote(e);
                  }}
                  name="note"
                  id="note"
                />
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

            <FormGroup row className="my-4">
              <Col lg="6" md="6">
                <Select
                  isMulti
                  onChange={(e) => {
                    setMultiUniversity(e);
                  }}
                  options={UniversityName}
                  value={multiUniversity}
                  className="mt-1"
                  isDisabled={check === true ? true : false}
                />
              </Col>
            </FormGroup>

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
          <Form onSubmit={handleSubmitFaqRequest}>
            <FormGroup row className="has-icon-left position-relative mb-4">
              <Col md="12">
                <p className="bold-text">Document Title</p>
                <div className="document-upload-btn text-center mb-4">
                  <Upload
                    multiple={false}
                    // fileList={FileList6}
                    // onChange={handleChange6}
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
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
