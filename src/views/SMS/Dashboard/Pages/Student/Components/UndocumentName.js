import React from "react";
// import get from "../../../../../../helpers/get";
import {
  Col,
  // Form,
  // FormGroup,
  // Input,
  // Modal,
  // ModalBody,
  // ModalHeader,
  Row,
} from "reactstrap";
// import CancelButton from "../../../../../../components/buttons/CancelButton";
// import SaveButton from "../../../../../../components/buttons/SaveButton";
// import post from "../../../../../../helpers/post";
// import { useToasts } from "react-toast-notifications";
// import { FileUploader } from "react-drag-drop-files";
import { Link } from "react-router-dom/cjs/react-router-dom";

const UndocumentName = ({ applicationId, appinfo, referenceId }) => {
  // const { addToast } = useToasts();
  // const [success, setSuccess] = useState(false);
  // const [UnuploadedDocuData, setUnUploadedDocuData] = useState([]);
  // const [modalOpenCheckDetails, setModalOpenCheckDetails] = useState(false);
  // const [progress1, setProgress1] = useState(false);

  // const [uploadDocuId, setUploadDocuId] = useState(0);
  // const [FileList, setFileList] = useState([]);

  // const closeModalCheckDetails = () => {
  //   setModalOpenCheckDetails(false);
  // };

  // const handleChange = (file) => {
  //   setFileList(file);
  // };

  // const handlesubmitForDocuments = (e) => {
  //   const subData = new FormData();

  //   subData.append("ApplicationDocumentId", uploadDocuId);
  //   subData.append("DocumentFile", FileList);

  //   // for (var i of subData) {

  //   // }
  //   setProgress1(true);
  //   post("ApplicationDocument/UploadDocument", subData).then((res) => {
  //     if (res?.status === 200 && res?.data?.isSuccess === true) {
  //       addToast("File uploaded successfully", {
  //         appearance: "success",
  //         autoDismiss: true,
  //       });
  //       setSuccess(!success);
  //       setFileList([]);
  //       setUploadDocuId(0);
  //     } else {
  //       addToast("Something went wrong", {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //     }
  //   });
  //   setProgress1(false);
  // };

  // useEffect(() => {
  //   get(
  //     `ApplicationDocument/GetUnUploadedDocuments?applicationid=${applicationId}`
  //   ).then((res) => {
  //     setUnUploadedDocuData(res);
  //   });
  // }, [applicationId, success]);

  return (
    <>
      {appinfo?.requestedDocuments.length > 0 && (
        <div className="student-dashboard-card-border py-4 px-4">
          <div>
            <div style={{ color: "#495057", fontWeight: 500 }}>
              <div className="d-flex align-items-center">
                <i
                  className="fas fa-file-alt mr-2"
                  style={{ color: "#000000", fontSize: "25px" }}
                ></i>
                <span>
                  Documents requested. Kindly re-upload the following:
                </span>
              </div>

              {appinfo?.requestedDocuments?.map((undoc) => (
                <Row className="student-dashboard-document mx-0">
                  <Col xs={3} className="pl-0">
                    <p>{undoc?.documentName}</p>
                  </Col>
                  <Col xs={9} className="pl-0">
                    <p>{undoc?.message}</p>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
          <Link to={`/applicationDetails/${applicationId}/${referenceId}/5`}>
            <button
              color="primary"
              className="hide-details-student-dashboard mt-20px"
              // onClick={() => setModalOpenCheckDetails(true)}
            >
              Upload Documents
            </button>
          </Link>
        </div>
      )}

      {/* <div>
        <Modal
          isOpen={modalOpenCheckDetails}
          toggle={closeModalCheckDetails}
          className="uapp-modal"
        >
          <ModalHeader>File Upload </ModalHeader>
          <ModalBody>
            <Form onSubmit={handlesubmitForDocuments}>
              <FormGroup row className="has-icon-left position-relative">
                <Col xs="5">
                  {UnuploadedDocuData?.map((undocu) => (
                    <>
                      {undocu?.applicationDocuments?.map((undoc) => (
                        <div
                          className={`std-dasboard-upload-btn pointer ${
                            uploadDocuId === undoc?.id &&
                            "std-dasboard-upload-btn-active"
                          }`}
                          onClick={() => setUploadDocuId(undoc?.id)}
                        >
                          {undoc?.documentName}
                        </div>
                      ))}
                    </>
                  ))}
                </Col>
                <Col xs="7">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    // types={fileTypes}
                    children={
                      <div className="dnd-upload">
                        Drag and drop files here
                        <br />
                        <p className="text-center"> Or </p>
                        <b>Upload from computer</b>
                      </div>
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup className="d-flex justify-content-between mt-3">
                <CancelButton cancel={closeModalCheckDetails} />

                <SaveButton
                  text="Submit"
                  progress={progress1}
              
                />
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div> */}
    </>
  );
};

export default UndocumentName;
